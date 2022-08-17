import React from "react";
import PrivateRoutes from "../../components/auth/routes/PrivateRoutes";
import BlogsFeed from "../../components/blog/BlogsFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <BlogsFeed />
    </PrivateRoutes>
  );
};

export default index;
