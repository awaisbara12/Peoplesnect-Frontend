import React from "react";
import PrivateRoutes from "../../components/auth/routes/PrivateRoutes";
import AdminViewFeed from "../../components/Admin-view/AdminViewFeed";
import AddNewsLetterFeed from "../../components/group/admin-view/AddNewsLetter/AddNewsLetterFeed";

const index = () => {
  return (
    <PrivateRoutes >
      <AddNewsLetterFeed />
    </PrivateRoutes>
  );
};

export default index;
