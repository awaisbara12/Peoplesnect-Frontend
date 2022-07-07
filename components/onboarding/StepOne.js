import React, { useState } from "react";
import Image from "next/image";
import Logo from "../../public/images/logo.png";
import { useFormik } from "formik";
import { XIcon } from "@heroicons/react/outline";
import { XCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import { OnboardingSchemaFitst } from "../auth/schemas/OnboardSchema";
import { ONBOARDING_STEP_ONE_URL } from "../../pages/config";

import Spinner from "../common/Spinner";

const StepOne = () => {
  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);
  const [err, setErr] = useState();
  const [close, setClose] = useState(false);

  const handleClose = () => {
    setClose(true);
  };

  const stepData = async (e) => {
    e.preventDefault();
    setSpinner(true);

    const data = {
      user: {
        country: values.country,
        city: values.city,
      },
    };

    const resp = await fetch(ONBOARDING_STEP_ONE_URL, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: authKey,
      },
      body: JSON.stringify(data),
    });

    const result = await resp.json();

    try {
      if (result && result.error) {
        setErr(result.error);
      } else {
        if (result && 200) {
          router.push("/onboarding/step-two");
        }
      }
    } catch (err) {
      console.log(err);
    }
    setSpinner(false);

    handleSubmit();
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
      country: "",
      city: "",
    },
    validationSchema: OnboardingSchemaFitst,
  });

  return (
    <>
      <div className="signUp--background min-h-screen overflow-y-auto">
        <div className="text-center py-6">
          <Image
            src={Logo}
            width={234}
            height={45}
            placeholder="blur"
            alt="peoplesNect-logo"
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <div className="bg-white w-[95%] lg:w-[50%] md:w-[60%] rounded-xl p-5">
            {err ? (
              <div
                className={`bg-red-50 mt-4 text-red-600 px-4 py-4 rounded relative ${
                  close === true ? "hidden" : "visible"
                }`}
                role="alert"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <XCircleIcon className="fill-current h-6 w-6 text-red-500" />
                    <span className="block sm:inline">{err}</span>
                  </div>
                  <XIcon
                    onClick={() => handleClose()}
                    className="fill-current h-6 w-6 text-red-500 cursor-pointer"
                  />
                </div>
              </div>
            ) : (
              ""
            )}
            <div className="text-center pt-6">
              <h1 className="font-bold text-xl pb-2">
                Welcome at PeoplesNect 👋{" "}
                {/* {userDetails && userDetails.user ? (
                  <> {userDetails.user.first_name}</>
                ) : (
                  ""
                )} */}
              </h1>
              <p className="font-light">
                Lets start your profile, connect with peoples
                <br /> communries, companies & find jobs
              </p>
            </div>

            <form onSubmit={stepData} className="w-3/4 mx-auto pt-8 pb-6">
              <div className="form-group pb-4">
                <label htmlFor="" className="font-medium">
                  Country - Region <span className="text-red-400">*</span>
                </label>
                <input
                  name="country"
                  value={values.country}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400 ${
                    errors.country && touched.country ? "border-red-600" : ""
                  }`}
                />
                {errors.country && touched.country ? (
                  <div className="text-red-600 pt-2 pl-1">{errors.country}</div>
                ) : null}
              </div>
              <div className="form-group pb-4">
                <label htmlFor="" className="font-medium">
                  City / State <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400 ${
                    errors.city && touched.city ? "border-red-600" : ""
                  }`}
                />
                {errors.city && touched.city ? (
                  <div className="text-red-600 pt-2 pl-1">{errors.city}</div>
                ) : null}
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-indigo-400 flex gap-2 items-center justify-center text-white text-xl text-center cursor-pointer font-semibold w-full py-2 rounded-full mt-6"
              >
                Continue {spinner && true ? <Spinner /> : ""}
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepOne;
