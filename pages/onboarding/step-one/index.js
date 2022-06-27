import React from "react";
import StepOne from "../../../components/onboarding/StepOne";

import RegistrationRoutes from "../../../components/auth/RegistrationRoutes";

const index = () => {
  return (
    <>
      <StepOne />
    </>
  );
};

export default RegistrationRoutes(index);
