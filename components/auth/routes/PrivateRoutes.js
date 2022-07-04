import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

const PrivateRoutes = ({ children }) => {
  const router = useRouter();
  const [loaded, setLoaded] = useState(false);

  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }

  useEffect(() => {
    setLoaded(true);
  }, []);

  const data = authKey
    ? children
    : useEffect(() => {
        router.push("/login");
      }, []);

  if (loaded) {
    return data;
  }
};

export default PrivateRoutes;
