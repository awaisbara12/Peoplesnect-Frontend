import * as Yup from "yup";

export const OnboardingSchemaFitst = Yup.object().shape({
  country: Yup.string()
    .min(3, "Too Short!")
    .max(14, "Too Long!")
    .required("Please enter your country"),
  city: Yup.string()
    .min(3, "Too Short!")
    .max(14, "Too Long!")
    .required("Please enter your city"),
});

export const OnboardingSchemaSecond = Yup.object().shape({
  jobtitle: Yup.string().required("Please enter your recent job title"),
  recentCompany: Yup.string().required("Please select recent company"),
});

export const OnboardingSchemaThree = Yup.object().shape({
  otp: Yup.string().required("Please enter correct otp"),
});
