import React from "react";
import StepTwo from "../../../components/onboarding/StepTwo";

import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";

const index = () => {
  return (
    <>
      <PrivateRoutes>
        <StepTwo />
      </PrivateRoutes>
    </>
  );
};

export default index;
