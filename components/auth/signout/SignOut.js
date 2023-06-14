import React from "react";
import { router } from "next/router";
import { SIGN_OUT_API_KEY } from "../../../pages/config";

export const signout = async () => {
  const authKey = localStorage.getItem("keyStore");

  fetch(SIGN_OUT_API_KEY, {
    method: "DELETE",
    headers: {
      Authorization: authKey,
    },
  })
    .then((response) => {
      if (response && 200) {
        router.push("/login");
        localStorage.removeItem("keyStore");
        localStorage.removeItem("userData");
        localStorage.removeItem("currentuser");
      }
    })
    .catch((error) => console.log(error));
};
