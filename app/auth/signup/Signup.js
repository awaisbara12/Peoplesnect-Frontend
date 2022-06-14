import React, { Fragment } from "react";
import Image from "next/image";
import Logo from "../../../public/images/logo.png";
import SignBG from "../../../public/images/bg.jpg";
import Footer from "../../footer/Footer";

import { EyeIcon } from "@heroicons/react/outline";

const Signup = () => {
  return (
    <div className="min-h-screen overflow-y-hidden">
      <div className="block md:flex items-center justify-start">
        <div className="w-1/4 min-h-screen block">
          <Image
            src={SignBG}
            layout="fill"
            style={{ height: "auto", zIndex: "-1" }}
            placeholder="blur"
          />
        </div>
        <div className="w-9/12 h-screen flex flex-col justify-between">
          <div className="flex justify-center items-start pt-24">
            <div className="w-2/5 bg-slate-50 py-8 px-8 rounded-xl">
              <div className="text-center">
                <Image src={Logo} width={234} height={45} placeholder="blur" />
              </div>
              <form action="#" className="relative z-10">
                <div className="mt-8">
                  <label
                    htmlFor="email"
                    className="text-neutral-900 font-semibold px-1"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400"
                  />
                </div>
                <div className="mt-8 relative">
                  <label
                    htmlFor="Password"
                    className="text-neutral-900 font-semibold px-1"
                  >
                    Password
                  </label>

                  <input
                    type="Password"
                    placeholder="Password"
                    className="w-full border-gray-100 border py-2 mt-2 px-3 rounded-md focus: outline-none focus:border-indigo-400"
                  />
                  <EyeIcon className="h-5 w-5 text-indigo-400 absolute top-11 right-3 cursor-pointer" />
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
  );
};

export default Signup;
