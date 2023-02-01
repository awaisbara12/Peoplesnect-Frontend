import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import BlogShowallFeed from "../../../components/blog/BlogShowallFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <BlogShowallFeed />
    </PrivateRoutes>
  );
};

export default index;
