import React from "react";
import { router } from "next/router";
import { getCookie } from "cookies-next";

import { SIGN_OUT_API_KEY } from "../../../pages/config";

const authKey = getCookie("authKey", { maxAge: 60 * 6 * 24 });

export const signout = async () => {
  const res = await fetch(SIGN_OUT_API_KEY, {
    method: "DELETE",
    headers: {
      Authorization: `${authKey}`,
    },
  });

  const result = await res.json();

  try {
    if (result && 200) {
      router.push("/login");
    }
  } catch (error) {
    console.log(error);
  }
};
