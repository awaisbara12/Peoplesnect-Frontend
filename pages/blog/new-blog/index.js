import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import AddBlogsFeed from "../../../components/blog/AddBlogsFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <AddBlogsFeed />
    </PrivateRoutes>
  );
};

export default index;
