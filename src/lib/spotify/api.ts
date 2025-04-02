"use server";

import axios from "axios";
import { Redis } from "@upstash/redis";

const redis = Redis.fromEnv();

export const getAuthorizeUrl = async (state: string) => {
    const client_id = process.env.SPOTIFY_CLIENT_ID as string;
    const redirect_uri = process.env.SPOTIFY_REDIRECT_URI as string;
    const scope = [
        "user-read-playback-state",
        "user-modify-playback-state",
        "user-read-currently-playing",
        "user-read-recently-played",
    ];

    return (
        "https://accounts.spotify.com/authorize?" +
        new URLSearchParams({
            response_type: "code",
            client_id: client_id,
            scope: scope.join(" "),
            redirect_uri: redirect_uri,
            state: state,
        }).toString()
    );
};

export const requestAccessToken = async (code: string) => {
    const client_id = process.env.SPOTIFY_CLIENT_ID as string;
    const client_secret = process.env.SPOTIFY_CLIENT_SECRET as string;
    const redirect_uri = process.env.SPOTIFY_REDIRECT_URI as string;

    const response = await axios({
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization:
                "Basic " +
                Buffer.from(client_id + ":" + client_secret).toString("base64"),
        },
        data: new URLSearchParams({
            code: code,
            redirect_uri: redirect_uri,
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
    refreshToken: string
) => {
    await redis.set("spotify_access_token", accessToken, { ex: expiresIn });
    await redis.set("spotify_refresh_token", refreshToken);

    return accessToken;
};

export const refreshTokenExists = async () => {
    return (await redis.exists("spotify_refresh_token")) > 0;
};

const getAccessToken = async () => {
    const refreshToken = "";

    const response = await axios({
        method: "post",
        url: "https://accounts.spotify.com/api/token",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        data: new URLSearchParams({
            grant_type: "refresh_token",
            refresh_token: refreshToken,
            client_id: "",
        }),
    });
};

export const getArtist = async (id: string) => {
    // const token = "";

    // const response = await axios({
    //     method: "get",
    //     url: `https://api.spotify.com/v1/artists/${id}`,
    //     headers: {
    //         Authorization: `Bearer ${token}`,
    //     },
    // });

    console.log("ok");
};
