import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Spinner from "../../common/Spinner";
import { fetchUser } from "../../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const PrivateRoutes = ({ children }) => {
  const router = useRouter();
  const [loader, setLoader] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  var { data: user } = useSelector((state) => state.user);

  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }

  useEffect(() => {
    if (!authKey) {
      router.push("/login");
    } else {
      console.log(user)
      if(user.error){
        localStorage.removeItem("keyStore");
        localStorage.removeItem("userData");
        router.push('/login')
      }
    }
  }, []);

  useEffect(() => {
    setLoader(false);
  }, [loader, setLoader]);

  return children;
};

export default PrivateRoutes;
