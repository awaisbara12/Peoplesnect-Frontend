import React from "react";
import Link from "next/link";

const UnauthorizedContent = () => {
  return (
    <div className="bg-indigo-50 m-5 rounded-xl overflow-hidden w-[98%] h-[95vh] mx-auto flex flex-col gap-4 justify-center items-center">
      <h1 className="font-semibold text-2xl text-gray-900">Unathorized 😟</h1>
      <Link href="/login">
        <a className="bg-indigo-400 text-white w-40 h-10 flex items-center justify-center uppercase font-semibold">
          Login
        </a>
      </Link>
    </div>
  );
};

export default UnauthorizedContent;
