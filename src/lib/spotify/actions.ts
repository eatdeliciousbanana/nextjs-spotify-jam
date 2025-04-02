"use server";

import { getAuthorizeUrl } from "@/lib/spotify/api";
import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const redirectToSpotify = async () => {
    const generateRandomString = (length: number) => {
        return crypto.randomBytes(60).toString("hex").slice(0, length);
    };

    const state = generateRandomString(16);
    (await cookies()).set("spotify_auth_state", state);

    redirect(await getAuthorizeUrl(state));
};
