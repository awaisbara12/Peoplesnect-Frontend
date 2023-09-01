import React from "react";
import PrivateRoutes from "../../../../components/auth/routes/PrivateRoutes";
import PagesAddNewsLetterFeed from "../../../../components/page-design/page-admin/AddPageNewsLetter/Pages-AddNewsLetter/PagesAddNewsLetterFeed";


const index = () => {
  return (
    <PrivateRoutes >
        <PagesAddNewsLetterFeed />
    </PrivateRoutes>
  );
};

export default index;
