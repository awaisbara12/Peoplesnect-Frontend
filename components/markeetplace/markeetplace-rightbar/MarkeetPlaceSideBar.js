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
      <div className="font-bold p-2">Marketplace Categories</div>
      <div className="navbar-body px-3">
        <ul>
          <Link href="/" className="">
            <a>
              <li className="flex font-light text-sm items-center justify-between  border-b py-3 gap-3">
                <div className="">Vehicles</div>
                <TruckIcon className="h-5 w-5 text-indigo-400" />
              </li>
            </a>
          </Link>
          <Link href="/" className="">
            <a>
              <li className="flex font-light text-sm items-center border-b justify-between  py-3 gap-3">
                <div className="">Property</div>
                <OfficeBuildingIcon className="h-5 w-5 text-indigo-400" />
              </li>
            </a>
          </Link>
          <Link href="/" className="">
            <a>
              <li className="flex font-light text-sm items-center justify-between pt-3 gap-3">
                <div className="">Electronics</div>
                <DesktopComputerIcon className="h-5 w-5 text-indigo-400" />
              </li>
            </a>
          </Link>
        </ul>
      </div>

      <Link href="/" className="">
        <a>
          <li className="flex justify-center rounded-b-xl py-2 bg-gray-100 font-normal text-xl items-center mt-5 gap-3">
            <div className="">See More</div>
            <ChevronDownIcon className="h-5 w-5 text-indigo-400" />
          </li>
        </a>
      </Link>
    </div>
  );
};

export default MarkeetPlaceSideBar;
