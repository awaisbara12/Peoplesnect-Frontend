import React, { useState, Fragment } from "react";
import Image from "next/image";
import Logo from "../../public/images/logo.png";
import { useFormik } from "formik";
import { XIcon } from "@heroicons/react/outline";
import { XCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

import { getCookie } from "cookies-next";

import { OnboardingSchemaThree } from "../auth/schemas/OnboardSchema";
import { ONBOARDING_STEP_THREE_URL } from "../../pages/config";

const authKey = getCookie("authKey");

const StepThree = () => {
  const router = useRouter();

  const [err, setErr] = useState();
  const [close, setClose] = useState(false);

  const handleClose = () => {
    setClose(true);
  };

  const stepData = async (e) => {
    e.preventDefault();

    const data = {
      user: {
        otp: values.otp,
      },
    };

    const resp = await fetch(ONBOARDING_STEP_THREE_URL, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${authKey}`,
      },
      body: JSON.stringify(data),
    });

    const result = await resp.json();

    try {
      if (result && result.error) {
        setErr(result.error);
      } else {
        if (result && 200) {
          router.push("/news-feed");
        }
      }
    } catch (err) {
      console.log(err);
    }
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
      otp: "",
    },
    validationSchema: OnboardingSchemaThree,
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
          <div className="bg-white w-[45%] rounded-xl p-5 mb-6">
            {err ? (
              <div
                className={`bg-red-50 mt-4 text-red-600 px-4 py-4 rounded relative ${
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
            <div className="text-center pt-6">
              <h1 className="font-bold text-xl pb-2">
                Your profile help you to grow on
                <br /> peoplesnect
              </h1>
              <div className="border border-gray-100 mt-4"></div>
            </div>
            <form onSubmit={stepData} className="w-3/4 mx-auto pt-8 pb-6">
              <div className={`form-group pb-4`}>
                <label htmlFor="OnboardingSchemaThree" className="font-medium">
                  Enter Otp <span className="text-red-400">*</span>
                </label>
                <input
                  name="otp"
                  value={values.otp}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="number"
                  id="recentJob"
                  className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400 ${
                    errors.otp && touched.otp ? "border-red-600" : ""
                  }`}
                />
                {errors.otp && touched.otp ? (
                  <div className="text-red-600 pt-2 pl-1">{errors.otp}</div>
                ) : null}
              </div>

              <button
                disabled={isSubmitting}
                className="disabled:bg-indigo-100 bg-indigo-400 w-full text-white font-semibold py-3 rounded-md mt-4"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default StepThree;
