import { PencilAltIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React from "react";

const NewMessage = () => {
  return (
    <div>
      {" "}
      <div className="w-[480px]  bg-white">
        <div className="font-bold  h-[740px] flex items-center justify-center">
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
