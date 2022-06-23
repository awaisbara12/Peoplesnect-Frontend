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
  jobtitle: Yup.string()
    .min(4, "Too Short!")
    .max(18, "Too Long!")
    .required("Please enter your recent jobtitle"),
  institute: Yup.string()
    .min(4, "Too Short!")
    .max(18, "Too Long!")
    .required("Please enter your institute"),
  degree: Yup.string()
    .min(4, "Too Short!")
    .max(18, "Too Long!")
    .required("Please enter your degree"),
  startYear: Yup.string().required("Please select start year"),
  endYear: Yup.string().required("Please select end year"),
});
