import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Spinner from "../../common/Spinner";
import axios from "axios";
import { USER_DETAILS_API_KEY } from "../../../pages/config";

const PrivateRoutes = ({ children }) => {
  const router = useRouter();
  const [loader, setLoader] = useState(true);

  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }

  useEffect(() => {
    if (!authKey) {
      localStorage.removeItem("keyStore");
      localStorage.removeItem("userData");
      router.push("/login");
    }
    axios(USER_DETAILS_API_KEY, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=utf-8",
        Authorization: authKey,
      },
    })
    .then((response) => response.data)
    .then((data) => {
      if(data && data.success == false){
        localStorage.removeItem("keyStore");
        localStorage.removeItem("userData");
        router.push('/login')
      }
    });
  }, []);

  useEffect(() => {
    setLoader(false);
  }, [loader, setLoader]);

  return children;
};

export default PrivateRoutes;
