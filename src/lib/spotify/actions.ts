"use server";

import { setFlash } from "@/lib/flash";
import * as api from "@/lib/spotify/api";
import crypto from "crypto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export const redirectToSpotify = async () => {
  const generateRandomString = (length: number) => {
    return crypto.randomBytes(60).toString("hex").slice(0, length);
  };

  const state = generateRandomString(16);
  (await cookies()).set("spotify_auth_state", state);

  redirect(api.getAuthorizeUrl(state));
};

export const startPlayback = async () => {
  try {
    await api.startPlayback();
    await setFlash("success", "Playback started successfully.");
  } catch (error) {
    console.log(error);
    await setFlash("error", "Failed to start playback.");
  }

  redirect("/player");
};

export const pausePlayback = async () => {
  try {
    await api.pausePlayback();
    await setFlash("success", "Playback paused successfully.");
  } catch (error) {
    console.log(error);
    await setFlash("error", "Failed to pause playback.");
  }

  redirect("/player");
};

export const skipToNext = async () => {
  try {
    await api.skipToNext();
    await setFlash("success", "Skipped to next track successfully.");
  } catch (error) {
    console.log(error);
    await setFlash("error", "Failed to skip to next track.");
  }

  redirect("/player");
};

export const skipToPrevious = async () => {
  try {
    await api.skipToPrevious();
    await setFlash("success", "Skipped to previous track successfully.");
  } catch (error) {
    console.log(error);
    await setFlash("error", "Failed to skip to previous track.");
  }

  redirect("/player");
};

export const setPlaybackVolume = async (volumePercent: number) => {
  try {
    await api.setPlaybackVolume(volumePercent);
    await setFlash("success", "Volume set successfully.");
  } catch (error) {
    console.log(error);
    await setFlash("error", "Failed to set volume.");
  }

  redirect("/player");
};
