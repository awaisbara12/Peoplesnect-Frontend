import React from "react";
import PrivateRoutes from "../../components/auth/routes/PrivateRoutes";
import UserProfileViewFeed from "../../components/User-Profile/UserProfileViewFeed";
import { useRouter } from "next/router";
const Index = () => {
   
const router = useRouter();
const data = router.asPath;
const myArray = data.split("?");

  return (
    <PrivateRoutes>
      <UserProfileViewFeed id={myArray[1]}/>
    </PrivateRoutes>
  );
};

export default Index;
