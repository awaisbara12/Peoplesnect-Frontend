import React from "react";
import StepThree from "../../../components/onboarding/StepThree";

import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";

const index = () => {
  return (
    <>
      <PrivateRoutes>
        <StepThree />
      </PrivateRoutes>
    </>
  );
};

export default index;
