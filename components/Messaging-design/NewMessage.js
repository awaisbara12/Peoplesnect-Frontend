import { PencilAltIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React from "react";

const NewMessage = () => {
  return (
    <div>
      {" "}
      <div className="w-[380px] lg:w-[680px] md:w-[580px] bg-white rounded-r-xl">
        <div className="font-bold  h-[747px] flex items-center justify-center">
          <Link href="/">
            <a href="" className="flex">
              <PencilAltIcon className="w-5 h-5" />
              type New Messages here
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewMessage;
