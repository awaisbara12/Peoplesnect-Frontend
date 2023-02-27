import React from "react";
import Image from "next/image";
import Link from "next/link";
import SugestionProfile from "../../../public/images/profile-avatar.png";
import MariaProfile from "../../../public/images/mariamomo.png";
import MiraProfile from "../../../public/images/mira.png";
import {
  PlusIcon,
  DotsHorizontalIcon,
  UserGroupIcon,
  LightBulbIcon,
  SparklesIcon,
  StarIcon,
  ShoppingBagIcon,
} from "@heroicons/react/outline";

const MarkeetplaceSuggestion = () => {
  return (
    <>
      <div className="bg-white p-3 mt-5 rounded-xl">
        <div className="text-base font-bold">
          Products Suggestions
        </div>
        <Link href="/markeet-place/my-listing">
          <a>
            <div className="px-3 hover:bg-gray-100 rounded-xl flex justify-between items-center mt-4">
                <p className="text-sm font-light">My Product</p>
                <StarIcon className="w-5 h-5 text-indigo-400" />
            </div>
          </a>
        </Link>
        <div className="border-b-1 my-3"></div>
        <Link href="">
          <a href="">
            <div className="px-3 hover:bg-gray-100 rounded-xl flex justify-between items-center mt-4">
                <p className="text-sm font-light">Best Saler</p>
                <SparklesIcon className="w-5 h-5 text-indigo-400" />
            </div>
          </a>
        </Link>
        <Link href="/markeet-place/add-your-items">
          <a className="mt-4 flex gap-1 border bg-gray-100 justify-center rounded-full p-2">
            <PlusIcon className="h-5 w-5" />
            Add your item
          </a>
        </Link>
      </div>
    </>
  );
};

export default MarkeetplaceSuggestion;
