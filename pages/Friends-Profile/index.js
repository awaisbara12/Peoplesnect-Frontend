import React from "react";
import PrivateRoutes from "../../components/auth/routes/PrivateRoutes";
import FriendsProfileViewFeed from "../../components/Friends-Profile/FriendsProfileViewFeed";
import { useRouter } from "next/router";
const index = () => {
const router = useRouter();
const data = router.asPath;
const myArray = data.split("?");
  return (
    <PrivateRoutes>
      <FriendsProfileViewFeed id={myArray[1]} />
    </PrivateRoutes>
  );
};

export default index;
