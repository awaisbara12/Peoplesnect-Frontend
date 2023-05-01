import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import ArticleListFeed from "../../../components/Admin-view/Article-List/ArticleListFeed";

const index = () => {
  return (
    <PrivateRoutes >
      <ArticleListFeed />
    </PrivateRoutes>
  );
};

export default index;
