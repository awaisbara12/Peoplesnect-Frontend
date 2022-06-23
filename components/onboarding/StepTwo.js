import React, { useState, Fragment } from "react";
import Image from "next/image";
import Logo from "../../public/images/logo.png";
import { useFormik } from "formik";
import { Listbox, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import { XCircleIcon, CheckIcon, SelectorIcon } from "@heroicons/react/solid";

import { OnboardingSchemaSecond } from "../auth/schemas/OnboardSchema";
import { ONBOARDING_STEP_ONE_URL } from "../../pages/config";

const dataUser = [{ name: "I AM STUDENT" }, { name: "I AM EMPLOYE" }];

const StepTwo = () => {
  const [selected, setSelected] = useState(dataUser[0]);
  const [err, setErr] = useState();
  const [close, setClose] = useState(false);

  const handleClose = () => {
    setClose(true);
  };

  const stepData = async (e) => {
    e.preventDefault();

    const data = {
      user: {
        jobtitle: values.jobtitle,
      },
    };

    const resp = await fetch(ONBOARDING_STEP_ONE_URL, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    const result = await resp.json();

    try {
      if (result && result.error) {
        setErr(result.error);
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
      country: "",
      city: "",
      institute: "",
      degree: "",
      startYear: "",
      endYear: "",
    },
    validationSchema: OnboardingSchemaSecond,
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
          <div className="bg-white w-[45%] rounded-xl p-5">
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
              <div className="form-group pb-4">
                <label htmlFor="" className="font-medium">
                  Recent Job Title <span className="text-red-400">*</span>
                </label>
                <input
                  name="jobtitle"
                  value={values.jobtitle}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  type="text"
                  className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400 ${
                    errors.jobtitle && touched.jobtitle ? "border-red-600" : ""
                  }`}
                />
                {errors.jobtitle && touched.jobtitle ? (
                  <div className="text-red-600 pt-2 pl-1">
                    {errors.jobtitle}
                  </div>
                ) : null}
              </div>

              <div className="student-details">
                <div className="form-group pb-4">
                  <label htmlFor="" className="font-medium">
                    School College - university{" "}
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="institute"
                    value={values.institute}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400 ${
                      errors.institute && touched.institute
                        ? "border-red-600"
                        : ""
                    }`}
                  />
                  {errors.institute && touched.institute ? (
                    <div className="text-red-600 pt-2 pl-1">
                      {errors.institute}
                    </div>
                  ) : null}
                </div>
                <div className="form-group pb-4">
                  <label htmlFor="" className="font-medium">
                    Degree
                    <span className="text-red-400">*</span>
                  </label>
                  <input
                    name="degree"
                    value={values.degree}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    type="text"
                    className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400 ${
                      errors.degree && touched.degree ? "border-red-600" : ""
                    }`}
                  />
                  {errors.degree && touched.degree ? (
                    <div className="text-red-600 pt-2 pl-1">
                      {errors.degree}
                    </div>
                  ) : null}
                </div>
                <div className="block sm:flex gap-4 items-center">
                  <div className="w-full sm:w-[50%] form-group pb-4">
                    <label htmlFor="" className="font-medium">
                      Start Year
                      <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="startYear"
                      value={values.startYear}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="date"
                      className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400 ${
                        errors.startYear && touched.startYear
                          ? "border-red-600"
                          : ""
                      }`}
                    />
                    {errors.startYear && touched.startYear ? (
                      <div className="text-red-600 pt-2 pl-1">
                        {errors.startYear}
                      </div>
                    ) : null}
                  </div>
                  <div className="w-full sm:w-[50%] form-group pb-4">
                    <label htmlFor="" className="font-medium">
                      Start Year
                      <span className="text-red-400">*</span>
                    </label>
                    <input
                      name="endYear"
                      value={values.endYear}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      type="date"
                      className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400 ${
                        errors.endYear && touched.endYear
                          ? "border-red-600"
                          : ""
                      }`}
                    />
                    {errors.degree && touched.degree ? (
                      <div className="text-red-600 pt-2 pl-1">
                        {errors.degree}
                      </div>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className="w-full">
                <Listbox value={selected} onChange={setSelected}>
                  <div className="relative mt-1">
                    <Listbox.Button className="relative w-full cursor-default rounded-lg bg-white py-3 pl-3 pr-10 text-left border border-gray-100 focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm">
                      <span className="block truncate">{selected.name}</span>
                      <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <SelectorIcon
                          className="h-5 w-5 text-gray-400"
                          aria-hidden="true"
                        />
                      </span>
                    </Listbox.Button>
                    <Transition
                      as={Fragment}
                      leave="transition ease-in duration-100"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <Listbox.Options className="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                        {dataUser.map((person, personIdx) => (
                          <Listbox.Option
                            key={personIdx}
                            className={({ active }) =>
                              `relative cursor-default select-none py-2 pl-10 pr-4 ${
                                active
                                  ? "bg-indigo-50 text-indigo-900"
                                  : "text-gray-900"
                              }`
                            }
                            value={person}
                          >
                            {({ selected }) => (
                              <>
                                <span
                                  className={`block truncate ${
                                    selected ? "font-medium" : "font-normal"
                                  }`}
                                >
                                  {person.name}
                                </span>
                                {selected ? (
                                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-indigo-900">
                                    <CheckIcon
                                      className="h-5 w-5"
                                      aria-hidden="true"
                                    />
                                  </span>
                                ) : null}
                              </>
                            )}
                          </Listbox.Option>
                        ))}
                      </Listbox.Options>
                    </Transition>
                  </div>
                </Listbox>
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

export default StepTwo;
