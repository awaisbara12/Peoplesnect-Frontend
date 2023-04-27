import React from "react";
import PrivateRoutes from "../../../../components/auth/routes/PrivateRoutes";
import EditArticlesFeed from "../../../../components/Admin-view/Article-List/Edit-Articles/EditArticlesFeed";



const index = () => {
  return (
    <PrivateRoutes >
      <EditArticlesFeed/>
    </PrivateRoutes>
  );
};

export default index;
