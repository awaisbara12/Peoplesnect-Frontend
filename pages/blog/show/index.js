import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import BlogShowFeed from "../../../components/blog/BlogShowFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <BlogShowFeed />
    </PrivateRoutes>
  );
};

export default index;
