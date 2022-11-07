import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import ShowAllBlogsFeed from "../../../components/blog/ShowAllBlogsFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <ShowAllBlogsFeed />
    </PrivateRoutes>
  );
};

export default index;
