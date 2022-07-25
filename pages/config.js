import React from "react";

export const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
export const POST_NEWSFEED_API_KEY = process.env.NEXT_PUBLIC_NEWSFEED_POST_URL;
export const USER_DETAILS_API_KEY = process.env.NEXT_PUBLIC_USER_DETAILS_URL;
export const SIGN_UP_API_KEY = process.env.NEXT_PUBLIC_SIGN_UP_API_URL;
export const SIGN_IN_API_KEY = process.env.NEXT_PUBLIC_SIGN_IN_API_URL;
export const SIGN_OUT_API_KEY = process.env.NEXT_PUBLIC_SIGN_OUT_API_URL;
export const ONBOARDING_STEP_ONE_URL =
  process.env.NEXT_PUBLIC_ONBOARDING_STEP_ONE;
export const ONBOARDING_STEP_TWO_URL =
  process.env.NEXT_PUBLIC_ONBOARDING_STEP_TWO;
export const ONBOARDING_STEP_THREE_URL =
  process.env.NEXT_PUBLIC_ONBOARDING_STEP_THREE;
export const BLOG_POST_USER_API_KEY = process.env.NEXT_PUBLIC_BLOG_POST_API;
export const BOOKMARK_NEWSFEED_API_KEY = process.env.NEXT_PUBLIC_BOOKMARK_NEWSFEED_API;

function Config() {
  return <></>;
}

export default Config;
