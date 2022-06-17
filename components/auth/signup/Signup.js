import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import Logo from "../../../public/images/logo.png";
import Footer from "../../footer/Footer";

import { EyeIcon } from "@heroicons/react/outline";
import Link from "next/link";

import { SIGN_UP_API_KEY } from "../../../pages/config";

const Signup = () => {
  const [data, setData] = useState([]);
  const [FirstName, setFirstName] = useState("");
  const [LastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const [passwordShow, setPasswordShow] = useState(false);

  const showPassword = () => {
    setPasswordShow(!passwordShow);
  };

  const signUpData = (e) => {
    e.preventDefault();

    const data = {
      user: {
        email: email,
        first_name: FirstName,
        last_name: LastName,
        password: password,
        password_confirmation: confirmPassword,
      },
    };

    console.log(data);

    fetch(SIGN_UP_API_KEY, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((result) => result.json())
      .then((resp) => {
        setData(resp);
      });

    setFirstName("");
    setLastName("");
    setEmail("");
    setPassword("");
    setconfirmPassword("");
  };

  console.log(data);

  return (
    <Fragment>
      <div className="signUp--background min-h-screen overflow-y-auto">
        <div className="block md:flex items-center justify-start">
          <div className="w-full xl:w-[64%] lg:[70%] h-screen flex flex-col justify-between ml-auto relative z-50">
            <div className="flex justify-center items-start pt-24">
              <div className="w-11/12 xl:w-2/3 lg:w-2/3 bg-white py-8 px-8 mb-6 rounded-xl">
                <div className="text-center">
                  <Image
                    src={Logo}
                    width={234}
                    height={45}
                    placeholder="blur"
                    alt=""
                  />
                </div>
                <div className="flex w-full md:w-72 sm:w-72 items-center mt-6 mx-auto lg:mx-auto gap-2 bg-indigo-400 p-2 cursor-pointer rounded-md">
                  <div className="bg-white w-9 rounded-sm">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      xmlnsXlink="http://www.w3.org/1999/xlink"
                      viewBox="-380.2 274.7 65.7 65.8"
                      width={34}
                      height={34}
                    >
                      <defs>
                        <path
                          id="a"
                          d="M-326.3 303.3h-20.5v8.5h11.8c-1.1 5.4-5.7 8.5-11.8 8.5-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4c-3.9-3.4-8.9-5.5-14.5-5.5-12.2 0-22 9.8-22 22s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                        />
                      </defs>
                      <clipPath id="b">
                        <use xlinkHref="#a" overflow="visible" />
                      </clipPath>
                      <path
                        d="M-370.8 320.3v-26l17 13z"
                        style={{
                          clipPath: "url(#b)",
                          fill: "#fbbc05",
                        }}
                      />
                      <defs>
                        <path
                          id="c"
                          d="M-326.3 303.3h-20.5v8.5h11.8c-1.1 5.4-5.7 8.5-11.8 8.5-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4c-3.9-3.4-8.9-5.5-14.5-5.5-12.2 0-22 9.8-22 22s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                        />
                      </defs>
                      <clipPath id="d">
                        <use xlinkHref="#c" overflow="visible" />
                      </clipPath>
                      <path
                        d="m-370.8 294.3 17 13 7-6.1 24-3.9v-14h-48z"
                        style={{
                          clipPath: "url(#d)",
                          fill: "#ea4335",
                        }}
                      />
                      <defs>
                        <path
                          id="e"
                          d="M-326.3 303.3h-20.5v8.5h11.8c-1.1 5.4-5.7 8.5-11.8 8.5-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4c-3.9-3.4-8.9-5.5-14.5-5.5-12.2 0-22 9.8-22 22s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                        />
                      </defs>
                      <clipPath id="f">
                        <use xlinkHref="#e" overflow="visible" />
                      </clipPath>
                      <path
                        d="m-370.8 320.3 30-23 7.9 1 10.1-15v48h-48z"
                        style={{
                          clipPath: "url(#f)",
                          fill: "#34a853",
                        }}
                      />
                      <defs>
                        <path
                          id="g"
                          d="M-326.3 303.3h-20.5v8.5h11.8c-1.1 5.4-5.7 8.5-11.8 8.5-7.2 0-13-5.8-13-13s5.8-13 13-13c3.1 0 5.9 1.1 8.1 2.9l6.4-6.4c-3.9-3.4-8.9-5.5-14.5-5.5-12.2 0-22 9.8-22 22s9.8 22 22 22c11 0 21-8 21-22 0-1.3-.2-2.7-.5-4z"
                        />
                      </defs>
                      <clipPath id="h">
                        <use xlinkHref="#g" overflow="visible" />
                      </clipPath>
                      <path
                        d="m-322.8 331.3-31-24-4-3 35-10z"
                        style={{
                          clipPath: "url(#h)",
                          fill: "#4285f4",
                        }}
                      />
                    </svg>
                  </div>
                  <h1 className="text-white font-semibold text-sm sm:text-lg">
                    Sign Up with Google
                  </h1>
                </div>
                <div className="relative mt-10">
                  <div className="border-gray-100 border"></div>
                  <div className="absolute -top-3 inset-x-1/2 bg-white w-6 h-6 text-center">
                    or
                  </div>
                </div>
                <form onSubmit={signUpData} className="relative z-10 mt-4">
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
                        value={FirstName}
                        onChange={(e) => setFirstName(e.target.value)}
                        placeholder="First Name"
                        className="w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400"
                      />
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
                        value={LastName}
                        onChange={(e) => setLastName(e.target.value)}
                        placeholder="Last Name"
                        className="w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400"
                      />
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      className="w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400"
                    />
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
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Password"
                      autoComplete="false"
                      className="w-full border-gray-100 border py-2 mt-2 px-3 rounded-md focus: outline-none focus:border-indigo-400"
                    />
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
                      type={passwordShow ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setconfirmPassword(e.target.value)}
                      placeholder="Password"
                      autoComplete="false"
                      className="w-full border-gray-100 border py-2 mt-2 px-3 rounded-md focus: outline-none focus:border-indigo-400"
                    />
                  </div>

                  <button
                    type="submit"
                    className="bg-indigo-400 text-white text-xl text-center cursor-pointer font-semibold w-full py-2 rounded-full mt-6"
                  >
                    Join Now
                  </button>
                  <div className="flex items-start gap-2 justify-start mt-8 px-1">
                    <input type="checkbox" name="" id="agreeCheckbox" />
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
            <Fragment>
              <Footer />
            </Fragment>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Signup;
