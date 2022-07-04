import React, { Fragment, useEffect, useState } from "react";
import { useFormik } from "formik";

import Image from "next/image";
import Logo from "../../../public/images/logo.png";
import GoogleLogo from "../../../public/images/google.png";
import Footer from "../../footer/Footer";
import { EyeIcon, XIcon } from "@heroicons/react/outline";
import { XCircleIcon } from "@heroicons/react/solid";
import Link from "next/link";
import { useRouter } from "next/router";

import Spinner from "../../../components/common/Spinner";

import { SIGN_UP_API_KEY } from "../../../pages/config";
import { SignupSchema } from "../schemas/SignupSchema";

const Signup = () => {
  const router = useRouter();
  const [passwordShow, setPasswordShow] = useState(false);
  const [err, setErr] = useState();
  const [close, setClose] = useState(false);
  const [spinner, setSpinner] = useState(false);

  console.log(err);

  const showPassword = () => {
    setPasswordShow(!passwordShow);
  };

  const handleClose = () => {
    setClose(true);
  };

  const onSubmit = (actions) => {
    actions.resetForm();
  };

  const {
    values,
    errors,
    touched,
    isSubmitting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      fName: "",
      lName: "",
      email: "",
      password: "",
      confirmPassword: "",
      checkbox: false,
    },
    validationSchema: SignupSchema,
    onSubmit,
  });

  const signUpData = (e) => {
    e.preventDefault();

    const data = {
      user: {
        email: values.email,
        first_name: values.fName,
        last_name: values.lName,
        password: values.password,
        password_confirmation: values.confirmPassword,
      },
    };

    const signup = async () => {
      setSpinner(true);
      fetch(SIGN_UP_API_KEY, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((response) => {
          localStorage.setItem(
            "keyStore",
            response.headers.get("Authorization")
          );
          if (response && response.error) {
            setErr(response.error);
          } else {
            if (response && 200) {
              router.push("/onboarding/step-one");
            }
          }
        })
        .catch((error) => {
          console.log(error);
        });

      setSpinner(false);
    };

    signup();

    handleSubmit();
  };

  useEffect(() => {
    // Prefetch the dashboard page
    router.prefetch("/onboarding/step-one");
  }, []);

  return (
    <Fragment>
      <div className="signUp--background min-h-screen overflow-y-auto">
        <div className="block md:flex items-center justify-start">
          <div className="w-full xl:w-[64%] lg:[70%] h-full flex flex-col justify-between ml-auto relative z-50">
            <div className="flex justify-center items-start pt-6">
              <div className="w-11/12 xl:w-2/3 lg:w-2/3 bg-white py-8 px-8 mb-8 rounded-xl">
                <div className="text-center">
                  <Image
                    src={Logo}
                    width={234}
                    height={45}
                    placeholder="blur"
                    alt="peoplesNect-logo"
                  />
                </div>
                <div className="flex justify-center w-64 md:w-64 sm:w-48 items-center mt-6 mx-auto lg:mx-auto gap-2 bg-indigo-400 p-2 cursor-pointer rounded-md">
                  <div className="bg-white w-10 py-1 rounded-full flex justify-center items-center">
                    <Image
                      src={GoogleLogo}
                      width={30}
                      height={30}
                      alt="google-signup"
                    />
                  </div>
                  <h1 className="text-white font-semibold text-sm sm:text-lg">
                    Sign Up with Google
                  </h1>
                </div>
                {err ? (
                  <div
                    className={`bg-red-50 mt-8 text-red-600 px-4 py-4 rounded relative ${
                      close === true ? "hidden" : "visible"
                    }`}
                    role="alert"
                    onClick={() => handleClose()}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <XCircleIcon className="fill-current h-6 w-6 text-red-500" />
                        <span className="block sm:inline">{err}</span>
                      </div>
                      <XIcon className="fill-current h-6 w-6 text-red-500 cursor-pointer" />
                    </div>
                  </div>
                ) : (
                  ""
                )}
                <div className="relative mt-10">
                  <div className="border-gray-100 border"></div>
                  <div className="absolute -top-3 inset-x-1/2 bg-white w-6 h-6 text-center">
                    or
                  </div>
                </div>

                <form
                  onSubmit={signUpData}
                  autoComplete="off"
                  className="relative z-10 mt-4"
                >
                  <div className="block sm:flex gap-4">
                    <div className="w-full sm:w-[50%] mt-4">
                      <label
                        htmlFor="email"
                        className="text-neutral-900 font-semibold px-1"
                      >
                        First Name
                      </label>
                      <input
                        type="text"
                        name="fName"
                        value={values.fName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="First Name"
                        className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400 ${
                          errors.fName && touched.fName ? "border-red-600" : ""
                        }`}
                      />
                      {errors.fName && touched.fName ? (
                        <div className="text-red-600 pt-2 pl-1">
                          {errors.fName}
                        </div>
                      ) : null}
                    </div>
                    <div className="w-full sm:w-[50%] mt-4">
                      <label
                        htmlFor="email"
                        className="text-neutral-900 font-semibold px-1"
                      >
                        Last Name
                      </label>
                      <input
                        type="text"
                        name="lName"
                        value={values.lName}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        placeholder="Last Name"
                        className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400 ${
                          errors.lName && touched.lName ? "border-red-600" : ""
                        }`}
                      />
                      {errors.lName && touched.lName ? (
                        <div className="text-red-600 pt-2 pl-1">
                          {errors.lName}
                        </div>
                      ) : null}
                    </div>
                  </div>
                  <div className="mt-4">
                    <label
                      htmlFor="email"
                      className="text-neutral-900 font-semibold px-1"
                    >
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Email"
                      autoComplete="false"
                      className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400 ${
                        errors.email && touched.email ? "border-red-600" : ""
                      }`}
                    />
                    {errors.email && touched.email ? (
                      <div className="text-red-600 pt-2 pl-1">
                        {errors.email}
                      </div>
                    ) : null}
                  </div>
                  <div className="mt-4 relative">
                    <label
                      htmlFor="Password"
                      className="text-neutral-900 font-semibold px-1"
                    >
                      Password
                    </label>

                    <input
                      type={passwordShow ? "text" : "password"}
                      name="password"
                      value={values.password}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Password"
                      autoComplete="false"
                      className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400 ${
                        errors.password && touched.password
                          ? "border-red-600"
                          : ""
                      }`}
                    />
                    {errors.password && touched.password ? (
                      <div className="text-red-600 pt-2 pl-1">
                        {errors.password}
                      </div>
                    ) : null}
                    <EyeIcon
                      onClick={() => showPassword()}
                      className="h-5 w-5 text-indigo-400 absolute top-10 right-3 cursor-pointer"
                    />
                  </div>

                  <div className="mt-4 relative">
                    <label
                      htmlFor="Password"
                      className="text-neutral-900 font-semibold px-1"
                    >
                      Confirm Password
                    </label>

                    <input
                      type="password"
                      name="confirmPassword"
                      value={values.confirmPassword}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Password"
                      autoComplete="false"
                      className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400 ${
                        errors.confirmPassword && touched.confirmPassword
                          ? "border-red-600"
                          : ""
                      }`}
                    />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <div className="text-red-600 pt-2 pl-1">
                        {errors.confirmPassword}
                      </div>
                    ) : null}
                  </div>

                  <button
                    type="submit"
                    className="bg-indigo-400 flex gap-2 items-center justify-center text-white text-xl text-center cursor-pointer font-semibold w-full py-2 rounded-full mt-6"
                  >
                    Join Now {spinner && true ? <Spinner /> : ""}
                  </button>
                  <div className="flex items-start gap-2 justify-start mt-8 px-1">
                    <input
                      value={values.checkbox}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="checkbox"
                      name="checkbox"
                      id="agreeCheckbox"
                    />
                    {errors.checkbox && touched.checkbox ? (
                      <div className="text-red-600 pt-2 pl-1">
                        {errors.checkbox}
                      </div>
                    ) : null}
                    <p className="font-light -mt-2 text-sm sm:text-lg">
                      creating an account at peoplesNect you must agree{" "}
                      <Link href="/">
                        <a className="text-indigo-400 font-medium">
                          User Agreement
                        </a>
                      </Link>{" "}
                      ,
                      <Link href="/">
                        <a className="text-indigo-400 font-medium">
                          Privacy Policy
                        </a>
                      </Link>{" "}
                      and{" "}
                      <Link href="/">
                        <a className="text-indigo-400 font-medium">
                          Cookies Policy
                        </a>
                      </Link>{" "}
                    </p>
                  </div>
                  <div className="border-gray-100 border mt-4"></div>
                  <div className="mt-4 text-center">
                    Already Join?{" "}
                    <Link href="/login">
                      <a className="text-indigo-400">Sign In</a>
                    </Link>{" "}
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Signup;
