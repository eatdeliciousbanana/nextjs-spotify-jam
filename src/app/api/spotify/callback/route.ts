import { requestAccessToken } from "@/lib/spotify/api";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

export const GET = async (request: NextRequest) => {
  const searchParams = request.nextUrl.searchParams;
  const code = searchParams.get("code");
  const state = searchParams.get("state");

  const cookieStore = await cookies();
  const storedState = cookieStore.get("spotify_auth_state")?.value;

  if (state === null || state !== storedState) {
    throw new Error("state mismatch");
  } else {
    cookieStore.delete("spotify_auth_state");

    if (code !== null) {
      await requestAccessToken(code);
    }
  }

  return NextResponse.redirect(new URL("/spotify/login", request.url));
};
