import React from "react";
import Link from "next/link";
import {
  OfficeBuildingIcon,
  FilmIcon,
  PuzzleIcon,
  DesktopComputerIcon,
  TruckIcon,
  TagIcon,
  ChevronDownIcon,
} from "@heroicons/react/outline";

const MarkeetPlaceSideBar = () => {
  return (
    <div className="w-full bg-white mt-5 p-1 rounded-xl">
      <div className="font-bold p-5">Markeetplace Categories</div>
      <div className="navbar-body px-5">
        <ul>
          <Link href="/" className="">
            <a>
              <li className="flex font-normal text-xl items-center gap-3">
                <TruckIcon className="h-5 w-5" />
                <div className="">Vehicles</div>
              </li>
            </a>
          </Link>
          <Link href="/" className="">
            <a>
              <li className="flex font-normal text-xl items-center my-5 gap-3">
                <OfficeBuildingIcon className="h-5 w-5" />
                <div className="">Property</div>
              </li>
            </a>
          </Link>
          <Link href="/" className="">
            <a>
              <li className="flex font-normal text-xl items-center my-5 gap-3">
                <DesktopComputerIcon className="h-5 w-5" />
                <div className="">Electronics</div>
              </li>
            </a>
          </Link>
          <Link href="/" className="">
            <a>
              <li className="flex font-normal text-xl items-center my-5 gap-3">
                <FilmIcon className="h-5 w-5" />
                <div className="">Entertainment</div>
              </li>
            </a>
          </Link>
          <Link href="/" className="">
            <a>
              <li className="flex font-normal text-xl items-center gap-3">
                <TagIcon className="h-5 w-5" />
                <div className="">Classifieds</div>
              </li>
            </a>
          </Link>
          <Link href="/" className="">
            <a>
              <li className="flex font-normal text-xl items-center mt-5 gap-3">
                <PuzzleIcon className="h-5 w-5" />
                <div className="">Toys & Games</div>
              </li>
            </a>
          </Link>
        </ul>
      </div>

      <Link href="/" className="">
        <a>
          <li className="flex justify-center rounded-b-xl py-2 bg-gray-100 font-normal text-xl items-center mt-5 gap-3">
            <div className="">See More</div>
            <ChevronDownIcon className="h-5 w-5" />
          </li>
        </a>
      </Link>
    </div>
  );
};

export default MarkeetPlaceSideBar;
