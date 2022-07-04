import React from "react";
import StepOne from "../../../components/onboarding/StepOne";
import PrivateRoutes from "../../../components/auth/routes/PrivateRoutes";

const index = () => {
  return (
    <>
      <PrivateRoutes>
        <StepOne />
      </PrivateRoutes>
    </>
  );
};

export default index;
