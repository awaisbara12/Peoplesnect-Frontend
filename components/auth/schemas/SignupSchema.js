import * as Yup from "yup";

// const passwordCheck = "/^[A-Za-z]w{7,14}$/";

export const SignupSchema = Yup.object().shape({
  fName: Yup.string()
    .min(3, "Too Short!")
    .max(20, "Too Long!")
    .required("Please enter your first name"),
  lName: Yup.string()
    .min(3, "Too Short!")
    .max(20, "Too Long!")
    .required("Please enter your last name"),
  email: Yup.string().email("Please enter a valid email").required("Required"),
  checkbox: Yup.boolean().oneOf(
    [true],
    "please agree our terms before continue"
  ),
  password: Yup.string()

    .min(
      6,
      "Password must be at least 6 character, atleast one number or letter"
    )
    // .matches(passwordCheck, { message: "Please enter a stronger password" })
    .required("Please enter your password"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password Must Match")
    .min(6, "Too Short!")
    .required("Please confirm your password"),
});
