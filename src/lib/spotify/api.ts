"use server";

import axios from "axios";
import { Redis } from "@upstash/redis";
import { Album, Artist } from "@/types/spotify";

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
                Buffer.from(
                    SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET
                ).toString("base64"),
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
                Buffer.from(
                    SPOTIFY_CLIENT_ID + ":" + SPOTIFY_CLIENT_SECRET
                ).toString("base64"),
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
