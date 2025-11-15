import axios from "axios";
import * as redis from "@/lib/redis";
import {
  Album,
  Artist,
  DashboardData,
  Device,
  PlaybackState,
  Playlist,
  Queue,
  RecentlyPlayedTracksPage,
  SearchResult,
} from "@/types/spotify";

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID!;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET!;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI!;
const SPOTIFY_SCOPES = [
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
];

export const getAuthorizeUrl = (state: string) => {
  return (
    "https://accounts.spotify.com/authorize?" +
    new URLSearchParams({
      response_type: "code",
      client_id: SPOTIFY_CLIENT_ID,
      scope: SPOTIFY_SCOPES.join(" "),
      redirect_uri: SPOTIFY_REDIRECT_URI,
      state: state,
    }).toString()
  );
};

export const requestAccessToken = async (code: string) => {
  const response = await axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET).toString(
          "base64"
        ),
    },
    data: new URLSearchParams({
      code: code,
      redirect_uri: SPOTIFY_REDIRECT_URI,
      grant_type: "authorization_code",
    }),
  });

  await redis.storeTokens(
    response.data.access_token,
    response.data.expires_in,
    response.data.refresh_token
  );
};

const refreshAccessToken = async () => {
  const refreshToken = await redis.getRefreshToken();

  if (!refreshToken) {
    throw new Error("missing refresh token");
  }

  const response = await axios({
    method: "post",
    url: "https://accounts.spotify.com/api/token",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      Authorization:
        "Basic " +
        Buffer.from(SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET).toString(
          "base64"
        ),
    },
    data: new URLSearchParams({
      grant_type: "refresh_token",
      refresh_token: refreshToken,
    }),
  });

  return await redis.storeTokens(
    response.data.access_token,
    response.data.expires_in
  );
};

const getAccessToken = async () => {
  let accessToken = await redis.getAccessToken();

  if (!accessToken) {
    accessToken = await refreshAccessToken();
  }

  return accessToken;
};

const sendRequest = async (
  method: string,
  uri: string,
  params?: Record<string, string | number | boolean | undefined>
) => {
  const token = await getAccessToken();

  const response = await axios({
    method,
    url: "https://api.spotify.com/v1" + uri,
    params,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getArtist = async (id: string): Promise<Artist> => {
  return await sendRequest("get", `/artists/${id}`);
};

export const getArtistAlbums = async (id: string): Promise<Album[]> => {
  return (await sendRequest("get", `/artists/${id}/albums`)).items;
};

export const getAlbum = async (id: string): Promise<Album> => {
  return await sendRequest("get", `/albums/${id}`);
};

export const getPlaylist = async (id: string): Promise<Playlist> => {
  return await sendRequest("get", `/playlists/${id}`);
};

export const search = async (
  q: string,
  type: string
): Promise<SearchResult> => {
  if (!q || !["artist", "album", "track", "playlist"].includes(type)) {
    return {};
  }
  return await sendRequest("get", "/search", {
    q,
    type,
  });
};

const getCurrentlyPlayingTrack = async (): Promise<PlaybackState> => {
  return await sendRequest("get", "/me/player/currently-playing");
};

const getQueue = async (): Promise<Queue> => {
  return await sendRequest("get", "/me/player/queue");
};

const getRecentlyPlayedTracks = async (): Promise<RecentlyPlayedTracksPage> => {
  return await sendRequest("get", "/me/player/recently-played");
};

export const getDashboardData = async (): Promise<DashboardData> => {
  let dashboardData = await redis.getDashboardData();

  if (dashboardData) {
    if (dashboardData.playback.is_playing) {
      const ttlMs = await redis.getDashboardDataTtlMs();
      dashboardData.playback.progress_ms =
        dashboardData.playback.item.duration_ms - ttlMs;
    }
  } else {
    const playback = (await getCurrentlyPlayingTrack()) || {
      is_playing: false,
    };
    const queue = (await getQueue()).queue.filter((track) => "album" in track);
    const recent = (await getRecentlyPlayedTracks()).items.map(
      (item) => item.track
    );

    dashboardData = { playback, queue, recent };

    const expiresIn = playback.is_playing
      ? Math.floor((playback.item.duration_ms - playback.progress_ms) / 1000)
      : 300;

    await redis.setDashboardData(dashboardData, expiresIn);
  }

  return dashboardData;
};

export const getAvailableDevices = async (): Promise<Device[]> => {
  return (await sendRequest("get", "/me/player/devices")).devices;
};

export const startPlayback = async () => {
  await sendRequest("put", "/me/player/play");
  await redis.clearDashboardData();
};

export const pausePlayback = async () => {
  await sendRequest("put", "/me/player/pause");
  await redis.clearDashboardData();
};

export const skipToNext = async () => {
  await sendRequest("post", "/me/player/next");
  await redis.clearDashboardData();
};

export const skipToPrevious = async () => {
  await sendRequest("post", "/me/player/previous");
  await redis.clearDashboardData();
};

export const setPlaybackVolume = async (volumePercent: number) => {
  await sendRequest("put", "/me/player/volume", {
    volume_percent: volumePercent,
  });
};

export const addItemToPlaybackQueue = async (uri: string) => {
  await sendRequest("post", "/me/player/queue", { uri });
  await redis.clearDashboardData();
};
