import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import SuggestedPagesFeed from "../../../components/page-design/Suggested-pages/SuggestedPagesFeed";

const index = () => {
  return (
    <PrivateRoutes>
      <SuggestedPagesFeed />
    </PrivateRoutes>
  );
};

export default index;
