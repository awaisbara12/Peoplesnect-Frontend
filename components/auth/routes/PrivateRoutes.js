import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Spinner from "../../common/Spinner";

const PrivateRoutes = ({ children }) => {
  const router = useRouter();
  const [loader, setLoader] = useState(true);

  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }

  useEffect(() => {
    if (!authKey) {
      router.push("/login");
    }
  }, []);

  if (!authKey && loader) {
    return (
      <div className="h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  useEffect(() => {
    setLoader(false);
  }, [loader, setLoader]);

  return children;
};

export default PrivateRoutes;
