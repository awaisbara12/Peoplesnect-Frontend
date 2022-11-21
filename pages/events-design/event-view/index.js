import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import PostViewFeed from "../../../components/post-view/PostViewFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <PostViewFeed/>
    </PrivateRoutes>
  );
};

export default index;
