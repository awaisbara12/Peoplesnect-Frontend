import React from "react";
import PrivateRoutes from "../../components/auth/routes/PrivateRoutes";
import BlogsFeed from "../../components/blog/BlogsFeed";
import AboutUsFeed from "../../components/footer/About-us/AboutUsFeed";

const index = () => {
  return (
    // <PrivateRoutes>
      <AboutUsFeed />
    // </PrivateRoutes>
  );
};

export default index;
