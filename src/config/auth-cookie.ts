export const AUTH_COOKIE_NAME = "accessToken";

export const authCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax" as const,
  path: "/",
};

export const AUTH_COOKIE_MAX_AGE = 15 * 60 * 1000;
