import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import AddBlogsFeed from "../../../components/blog/AddBlogsFeed";
const PostNew = () => {
  return (
    <div>
      <PrivateRoutes>
        <AddBlogsFeed />
      </PrivateRoutes>
    </div>
  );
};

export default PostNew;
