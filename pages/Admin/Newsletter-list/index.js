import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import NewsLetterFeed from "../../../components/Admin-view/Newsletter-List/NewsLetterFeed";

const index = () => {
  return (
    <PrivateRoutes >
      <NewsLetterFeed />
    </PrivateRoutes>
  );
};

export default index;