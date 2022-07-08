import React from "react";
import BlogLayout from "../../../components/blog/BlogLayout";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
const PostNew = () => {
  return (
    <div>
      <PrivateRoutes>
        <BlogLayout />
      </PrivateRoutes>
    </div>
  );
};

export default PostNew;
