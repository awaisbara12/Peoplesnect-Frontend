import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import LikedPagesFeed from "../../../components/page-design/liked-pages/LikedPagesFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <LikedPagesFeed />
    </PrivateRoutes>
  );
};

export default index;
