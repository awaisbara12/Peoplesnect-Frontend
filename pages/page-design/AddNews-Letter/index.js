import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import NewsLetterFeed from "../../../components/page-design/page-admin/AddPageNewsLetter/NewsLetterFeed";


const index = () => {
  return (
    <PrivateRoutes >
      <NewsLetterFeed />
    </PrivateRoutes>
  );
};

export default index;
