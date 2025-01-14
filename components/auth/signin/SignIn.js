import React, { Fragment, useState, useEffect } from "react";
import Image from "next/image";
import Logo from "../../../public/images/logo.png";
import { EyeIcon, XIcon } from "@heroicons/react/outline";
import Link from "next/link";
import Footer from "../../footer/Footer";
import Router from "next/router";
import { XCircleIcon } from "@heroicons/react/solid";
import Spinner from "../../../components/common/Spinner";
import { SIGN_IN_API_KEY } from "../../../pages/config";
import GoogleLogo from "../../../public/images/google.png";
import { useFormik } from "formik";
import { LoginSchema } from "../schemas/LoginSchema";
import { useDispatch, useSelector } from "react-redux";
import { fetchUser } from "../../../store/userSlice";

const Login = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

  var { data: user } = useSelector((state) => state.user);

  const [passwordShow, setPasswordShow] = useState(false);
  const [spinner, setSpinner] = useState(false);
  const showPassword = () => {
    setPasswordShow(!passwordShow);
  };

  const [close, setClose] = useState(false);

  const handleClose = () => {
    setClose(true);
  };

  const [err, setErr] = useState();

  const onSubmit = (actions) => {
    actions.resetForm();
  };

  const { values, errors, touched, handleBlur, handleChange, handleSubmit } = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: LoginSchema,
    onSubmit,
  });

  const LoginData = async (e) => {
    e.preventDefault();
    handleSubmit();

    const isValid = await LoginSchema.isValid(values)

    if(isValid){
      const data = {
        user: {
          email: values.email,
          password: values.password,
        },
      };

      const signin = async () => {
        setSpinner(true);
        const res = await fetch(SIGN_IN_API_KEY, {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-type": "application/json; charset=utf-8",
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Credentials": true,
          },
          credentials: "same-origin",
          body: JSON.stringify(data),
        });

        const result = await res.json();

        const headers = res.headers.get("Authorization");

        if (result) {
          localStorage.setItem("keyStore", headers);
          const currentuserSting = JSON.stringify(result.user);     // convert json into string
          localStorage.setItem("currentuser", currentuserSting);    // save currentuser in localstorage as string
        }

        try {
          if (result && result.error) {
            setErr(result.error);
          } else {
            if (user.user && user.user.onboarded == false) {
              Router.push("/onboarding/step-one");
            } else {
              if (result && 200) {
                Router.push("/news-feed");
              }
            }
          }
        } catch (error) {
          console.log(error);
        }

        setSpinner(false);
      };

      signin();

    }

  };

  useEffect(() => {
    // Prefetch the dashboard page
    Router.prefetch("/news-feed");
  }, []);

  useEffect(() => {
    // redirect to home if already logged in
    if (localStorage.getItem("keyStore")) {
      Router.push('/news-feed');
    }
  }, []);

  return (
    <Fragment>
      <div className="signUp--background min-h-screen overflow-y-auto">
        <div className="block md:flex items-center justify-start">
          <div className="w-full xl:w-[70%] h-full flex flex-col justify-end ml-auto relative z-50">
            <div className="flex justify-center items-start pt-10">
              <div className="w-11/12 xl:w-1/2 lg:w-1/2 bg-white py-8 px-8 mb-8 rounded-xl">
                <div className="text-center">
                  <Image
                    src={Logo}
                    width={234}
                    height={45}
                    placeholder="blur"
                    alt=""
                  />
                </div>
                <div className="border-gray-100 border mt-4"></div>



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

                <form
                  onSubmit={LoginData}
                  autoComplete="off"
                  className="relative z-10"
                >
                  <div className="mt-4">
                    <label
                      htmlFor="email"
                      className="text-neutral-900 font-semibold px-1"
                    >
                      Email or Phone
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      placeholder="Email"
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
                      autoComplete="off"
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
                  <button
                    type="submit"
                    className="bg-indigo-400 flex gap-2 items-center justify-center text-white text-xl text-center cursor-pointer font-semibold w-full py-2 rounded-full mt-6"
                  >
                    Sign In {spinner && true ? <Spinner /> : ""}
                  </button>
                </form>
                <div className="mt-4 text-center">
                  Not Join?{" "}
                  <Link href="/">
                    <a className="text-indigo-400">Sign Up</a>
                  </Link>{" "}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default Login;
