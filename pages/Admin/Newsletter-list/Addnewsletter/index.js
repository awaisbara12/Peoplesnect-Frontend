import React from "react";
import PrivateRoutes from "../../../../components/auth/routes/PrivateRoutes";
import AddNewsLetterFeed from "../../../../components/Admin-view/Newsletter-List/AddNewsLetter/AddNewsLetterFeed";

const index = () => {
  return (
    <PrivateRoutes >
      <AddNewsLetterFeed />
    </PrivateRoutes>
  );
};

export default index;