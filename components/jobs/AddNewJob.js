import React from "react";
import Link from "next/link";

const AddNewJob = () => {
  return (
    <div className="add_new_button sticky top-16 text-right">
      <Link href="/" className="">
        <a>
          <button
            type="submit"
            className="shadow-lg shadow-blue-500 text-white text-md cursor-pointer font-bold p-4 rounded-full mt-6 bg-blue-500 hover:text-white"
          >
            Add New Job
          </button>
        </a>
      </Link>
    </div>
  );
};

export default AddNewJob;
