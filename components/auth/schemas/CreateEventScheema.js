import * as Yup from "yup";

export const eventScheema = Yup.object().shape({
  eventName: Yup.string()
    .min(4, "Too Short!")
    .max(18, "Too Long!")
    .required("Please enter event name"),
  timezone: Yup.string()
    .min(4, "Too Short!")
    .max(18, "Too Long!")
    .required("Please select event timezone"),
  startDate: Yup.string()
    .min(4, "Too Short!")
    .max(18, "Too Long!")
    .required("Please select event start date"),
  startTime: Yup.string()
    .min(4, "Too Short!")
    .max(18, "Too Long!")
    .required("Please select start time"),
  address: Yup.string()
    .min(4, "Too Short!")
    .max(70, "Too Long!")
    .required("Please enter event address"),
  venue: Yup.string()
    .min(4, "Too Short!")
    .max(18, "Too Long!")
    .required("Please enter event venue"),
  externalLink: Yup.string().required("Please enter event external link"),
  description: Yup.string().required("Please enter event description"),
  speakers: Yup.string().required("Please enter event speakers"),
});
