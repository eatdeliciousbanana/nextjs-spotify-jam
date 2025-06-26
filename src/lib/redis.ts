import { DashboardData } from "@/types/spotify";
import { Redis } from "@upstash/redis";

const ACCESS_TOKEN_KEY = "spotify_jam:access_token";
const REFRESH_TOKEN_KEY = "spotify_jam:refresh_token";
const DASHBOARD_DATA_KEY = "spotify_jam:dashboard_data";

const redis = Redis.fromEnv();

export const storeTokens = async (
  accessToken: string,
  expiresIn: number,
  refreshToken?: string
) => {
  await redis.set(ACCESS_TOKEN_KEY, accessToken, { ex: expiresIn });
  if (refreshToken) {
    await redis.set(REFRESH_TOKEN_KEY, refreshToken);
  }

  return accessToken;
};

export const refreshTokenExists = async () => {
  return (await redis.exists(REFRESH_TOKEN_KEY)) > 0;
};

export const getRefreshToken = async () => {
  return await redis.get<string>(REFRESH_TOKEN_KEY);
};

export const getAccessToken = async () => {
  return await redis.get<string>(ACCESS_TOKEN_KEY);
};

export const getDashboardData = async () => {
  return await redis.get<DashboardData>(DASHBOARD_DATA_KEY);
};

export const getDashboardDataTtlMs = async () => {
  return await redis.pttl(DASHBOARD_DATA_KEY);
};

export const setDashboardData = async (
  dashboardData: DashboardData,
  expiresIn: number
) => {
  await redis.set(DASHBOARD_DATA_KEY, dashboardData, { ex: expiresIn });
};

export const clearDashboardData = async () => {
  await redis.del(DASHBOARD_DATA_KEY);
};
