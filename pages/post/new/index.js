import React from "react";
import BlogNew from "../../components/blog/BlogNew";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
const PostNew = () => {
  return (
    <div>
      <PrivateRoutes>
        <BlogNew />
      </PrivateRoutes>
    </div>
  );
};

export default PostNew;
