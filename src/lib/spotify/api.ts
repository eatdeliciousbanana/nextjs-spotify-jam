"use server";

import axios from "axios";
import { Redis } from "@upstash/redis";
import {
  Album,
  Artist,
  DashboardData,
  PlaybackState,
  Queue,
  RecentlyPlayedTracksPage,
  SearchResult,
} from "@/types/spotify";

const SPOTIFY_CLIENT_ID = process.env.SPOTIFY_CLIENT_ID as string;
const SPOTIFY_CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET as string;
const SPOTIFY_REDIRECT_URI = process.env.SPOTIFY_REDIRECT_URI as string;
const SPOTIFY_SCOPES = [
  "user-read-playback-state",
  "user-modify-playback-state",
  "user-read-currently-playing",
  "user-read-recently-played",
];

const redis = Redis.fromEnv();

export const getAuthorizeUrl = async (state: string) => {
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

  await storeTokens(
    response.data.access_token,
    response.data.expires_in,
    response.data.refresh_token
  );
};

const storeTokens = async (
  accessToken: string,
  expiresIn: number,
  refreshToken?: string
) => {
  await redis.set("spotify_access_token", accessToken, { ex: expiresIn });
  if (refreshToken) {
    await redis.set("spotify_refresh_token", refreshToken);
  }

  return accessToken;
};

export const refreshTokenExists = async () => {
  return (await redis.exists("spotify_refresh_token")) > 0;
};

const refreshAccessToken = async () => {
  const refreshToken = await redis.get<string>("spotify_refresh_token");

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

  return await storeTokens(
    response.data.access_token,
    response.data.expires_in
  );
};

const getAccessToken = async () => {
  let accessToken = await redis.get<string>("spotify_access_token");

  if (!accessToken) {
    accessToken = await refreshAccessToken();
  }

  return accessToken;
};

export const getArtist = async (id: string): Promise<Artist> => {
  const token = await getAccessToken();

  const response = await axios({
    method: "get",
    url: `https://api.spotify.com/v1/artists/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getArtistAlbums = async (id: string): Promise<Album[]> => {
  const token = await getAccessToken();

  const response = await axios({
    method: "get",
    url: `https://api.spotify.com/v1/artists/${id}/albums`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data.items;
};

export const getAlbum = async (id: string): Promise<Album> => {
  const token = await getAccessToken();

  const response = await axios({
    method: "get",
    url: `https://api.spotify.com/v1/albums/${id}`,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const search = async (
  q: string,
  type: string
): Promise<SearchResult> => {
  if (!q || !["artist", "album", "track"].includes(type)) {
    return {};
  }

  const token = await getAccessToken();

  const response = await axios({
    method: "get",
    url: "https://api.spotify.com/v1/search",
    headers: {
      Authorization: `Bearer ${token}`,
    },
    params: {
      q: q,
      type: type,
    },
  });

  return response.data;
};

const getCurrentlyPlayingTrack = async (): Promise<PlaybackState> => {
  const token = await getAccessToken();

  const response = await axios({
    method: "get",
    url: "https://api.spotify.com/v1/me/player/currently-playing",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const getQueue = async (): Promise<Queue> => {
  const token = await getAccessToken();

  const response = await axios({
    method: "get",
    url: "https://api.spotify.com/v1/me/player/queue",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

const getRecentlyPlayedTracks = async (): Promise<RecentlyPlayedTracksPage> => {
  const token = await getAccessToken();

  const response = await axios({
    method: "get",
    url: "https://api.spotify.com/v1/me/player/recently-played",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export const getDashboardData = async (): Promise<DashboardData> => {
  let dashboardData = await redis.get<DashboardData>("spotify_dashboard_data");

  if (dashboardData) {
    if (dashboardData.playback.is_playing) {
      const ttlMs = await redis.pttl("spotify_dashboard_data");
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

    await redis.set("spotify_dashboard_data", dashboardData, { ex: expiresIn });
  }

  return dashboardData;
};
