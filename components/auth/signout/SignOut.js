import React from "react";
import { router } from "next/router";
import { getCookie } from "cookies-next";
import { SIGN_OUT_API_KEY } from "../../../pages/config";

const authKey = getCookie("authKey");

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
      localStorage.getItem("sessionKey");
      localStorage.removeItem("sessionKey");
    }
  } catch (error) {
    console.log(error);
  }
};
