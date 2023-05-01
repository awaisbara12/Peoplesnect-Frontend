import { ChatAltIcon, PencilAltIcon } from "@heroicons/react/outline";
import Link from "next/link";
import React from "react";

const NewMessage = () => {
  return (
    <div>
      {" "}
      <div className="w-[340px] xl:w-[780px] lg:w-[419px] md:w-[540px] bg-white rounded-r-xl">
        <div className="font-bold  h-[747px] flex items-center justify-center">
          <Link href="/">
            <a href="" className="flex">
              <ChatAltIcon className="w-5 h-5" />
              4 Unread Messages
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default NewMessage;