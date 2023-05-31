import React, { useEffect, useState } from "react";
import PrivateRoutes from "../../components/auth/routes/PrivateRoutes";
import UserProfileViewFeed from "../../components/User-Profile/UserProfileViewFeed";
import { useRouter } from "next/router";
import { CURENT_USER_LOGIN_API } from "../config";
const Index = () => {

  const [show, setshow] = useState(false);  
  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
  // Bareer Key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }
  const Current_User=async()=>{
    await fetch(CURENT_USER_LOGIN_API, {
      method: "GET",
       headers: {
        Accept: "application/json",
         Authorization: `${authKey}`,
       },
    })
       .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          console.log(result.data.id+" prr  "+myArray[1])
          if(result.data.id==myArray[1]){
            router.push("/profile");
            setshow(false);
          }else{
            setshow(true);
          }
        }
      })
      .catch((err) => console.log(err));
  }
  useEffect(()=>{
    Current_User();
  },[])
  return (
    <PrivateRoutes>
      {show?(<UserProfileViewFeed id={myArray[1]}/>):("")}
    </PrivateRoutes>
  );
};

export default Index;
