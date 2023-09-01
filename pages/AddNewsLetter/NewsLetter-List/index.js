import React from "react";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";
import GroupAddNewsLetterFeed from "../../../components/group/admin-view/AddNewsLetter/Group-AddNewsLetter/GroupAddNewsLetterFeed";


const index = () => {
  return (
    <PrivateRoutes >
        <GroupAddNewsLetterFeed />
    </PrivateRoutes>
  );
};

export default index;
