import { CloudUploadIcon } from "@heroicons/react/outline";
import React from "react";

const AddYourItems = () => {
  return (
    <div className="">
      <div className="bg-white p-5 rounded-xl">
        <div className="my-5 font-bold">Add Details About Ur Product</div>
        <div className="w-10/12 mx-auto">
          <div className="border p-5 rounded-xl">
            <div className="">
              <div className="flex justify-between items-center mb-4">
                <label htmlFor="" className="font-semibold">
                  Type Your Product Category:
                </label>
                <input
                  type="text"
                  name="search"
                  placeholder="Type Your Product Category"
                  className="w-96 bg-gray-100 py-2 px-3 mt-2 border-none rounded-xl focus:drop-shadow-indigo-400"
                />
              </div>
              <div className="flex justify-between items-center my-4">
                <label htmlFor="" className="font-semibold">
                  Product Name:
                </label>
                <input
                  type="text"
                  name="search"
                  placeholder="Add Name"
                  className="w-96 bg-gray-100 py-2 px-3 mt-2 border-none rounded-xl focus:drop-shadow-indigo-400"
                />
              </div>
              <div className="flex justify-between items-center my-4">
                <label htmlFor="" className="font-semibold">
                  Product Color:
                </label>
                <input
                  type="text"
                  name="search"
                  placeholder="Add Color"
                  className="w-96 bg-gray-100 py-2 px-3 mt-2 border-none rounded-xl focus:drop-shadow-indigo-400"
                />
              </div>
              <div className="flex justify-between items-center my-4">
                <label htmlFor="" className="font-semibold">
                  Price:
                </label>
                <input
                  type="Number"
                  name=""
                  placeholder="Add Price"
                  className="w-96 bg-gray-100 py-2 px-3 mt-2 border-none rounded-xl focus:drop-shadow-indigo-400"
                />
              </div>
              <div className="flex justify-between items-center my-4">
                <label htmlFor="" className="font-semibold">
                  Product feature:
                </label>
                <input
                  type="text"
                  name="search"
                  placeholder="Add Features"
                  className="w-96 bg-gray-100 py-2 px-3 mt-2 border-none rounded-xl focus:drop-shadow-indigo-400"
                />
              </div>

              <div className="flex justify-between items-center my-4">
                <label htmlFor="" className="font-semibold">
                  Phone Number:
                </label>
                <input
                  type="Number"
                  name=""
                  placeholder="Add Your Phone Number"
                  className="w-96 bg-gray-100 py-2 px-3 mt-2 border-none rounded-xl focus:drop-shadow-indigo-400"
                />
              </div>
            </div>
            <div className="flex justify-between my-4">
              <label htmlFor="" className="font-semibold">
                Add Description:
              </label>
              <div className="">
                <textarea
                  className="placeholder:text-md bg-gray-100 placeholder:rounded-full  border-none w-96 rounded-xl"
                  placeholder="Write Description About Your Product....."
                  type="textarea"
                  name="search"
                  rows={5}
                  cols={10}
                />
              </div>
            </div>
            <div className="flex justify-between w-full">
              <div className="font-semibold">Add Photos:</div>
              <label
                htmlFor="dropzone-file"
                className="flex flex-col justify-center items-center w-96 h-32 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                  <CloudUploadIcon className="w-10 h-10 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> your
                    items
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG
                  </p>
                </div>
              </label>
              <input id="dropzone-file" type="file" className="hidden" />
            </div>
            <div className="flex justify-center mt-7">
              <div className="bg-indigo-400 text-white p-3 rounded-xl font-bold">
                Post Your Add
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddYourItems;
