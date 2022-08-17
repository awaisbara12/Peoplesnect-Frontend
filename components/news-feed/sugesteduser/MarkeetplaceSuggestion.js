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
      <div className="bg-white p-5 mt-5 rounded-xl">
        <div className="text-base font-bold leading-5">
          Products Suggestions
        </div>
        <Link href="">
          <a href="">
            <div className="px-3 py-2 hover:bg-gray-100 rounded-xl flex justify-between items-center mt-4">
              <div className="flex gap-2 items-center">
                <StarIcon className="w-5 h-5" />
                <p className="text-base font-semibold">Latest Products</p>
              </div>
            </div>
          </a>
        </Link>
        <Link href="">
          <a href="">
            <div className="px-3 py-2 hover:bg-gray-100 rounded-xl flex justify-between items-center mt-4">
              <div className="flex gap-2 items-center">
                <SparklesIcon className="w-5 h-5" />
                <p className="text-base font-semibold">Best Saler</p>
              </div>
            </div>
          </a>
        </Link>
        <Link href="">
          <a href="">
            <div className="px-3 py-2 hover:bg-gray-100 rounded-xl flex justify-between items-center mt-4">
              <div className="flex gap-2 items-center">
                <ShoppingBagIcon className="w-5 h-5" />
                <p className="text-base font-semibold">Discounts Products</p>
              </div>
            </div>
          </a>
        </Link>
        <Link href="">
          <a className="mt-2 flex gap-1 border bg-gray-100 justify-center rounded-full p-2">
            <PlusIcon className="h-5 w-5" />
            Add your item
          </a>
        </Link>
      </div>
    </>
  );
};

export default MarkeetplaceSuggestion;
