import * as Yup from "yup";

export const BlogSchema = Yup.object().shape({
  title: Yup.string()
    .min(3, "Too Short!")
    .max(200, "Too Long!")
    .required("Please enter blog title"),
  description: Yup.string()
    .min(3, "Too Short!")
    .max(20, "Too Long!")
    .required("Please enter blog description"),
});
