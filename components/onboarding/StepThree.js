import React, { useState, useEffect, Fragment } from "react";
import Image from "next/image";
import Logo from "../../public/images/logo.png";
import { useFormik } from "formik";
import { XIcon } from "@heroicons/react/outline";
import { XCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import Spinner from "../common/Spinner";
import { OnboardingSchemaThree } from "../auth/schemas/OnboardSchema";
import { ONBOARDING_STEP_THREE_URL } from "../../pages/config";
import { fetchUser } from "../../store/userSlice";
import { useDispatch, useSelector } from "react-redux";

const StepThree = () => {
  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }
  const router = useRouter();
  const [spinner, setSpinner] = useState(false);
  const [err, setErr] = useState();
  const [close, setClose] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  var { data: user } = useSelector((state) => state.user);

  const handleClose = () => {
    setClose(true);
  };

  const onSubmit = (actions) => {
    actions.resetForm();
  };

  const stepData = async (e) => {
    e.preventDefault();
    handleSubmit();

    const isValid = await OnboardingSchemaThree.isValid(values)

    if(isValid){
      setSpinner(true);

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
      setSpinner(false);
    }
  };
  const {
    values,
    errors,
    touched,
    isSubmiting,
    handleBlur,
    handleChange,
    handleSubmit,
  } = useFormik({
    initialValues: {
      otp: "",
    },
    validationSchema: OnboardingSchemaThree,
    onSubmit,
  });

  useEffect(() => {
    // redirect to home if already onboarded
    const getUser = () => {
      if(user.user && user.user.onboarded){
        router.push('/news-feed')
      }
    };
    getUser();
  }, [user]);

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
          <div className="bg-white w-[95%] lg:w-[50%] md:w-[60%] rounded-xl p-5 mb-6">
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
                type="submit"
                disabled={isSubmiting}
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

export default StepThree;
