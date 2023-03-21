import React, { useEffect, useState } from "react";
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
import { CATEGORY_API } from "../../../pages/config";

const MarkeetPlaceSideBar = () => {
  const [category, setcategory] = useState();
  // Bareer Key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }
  
  function getCategory() {
    fetch(CATEGORY_API, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setcategory(result.data)
          // console.log("cata",result.data);
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getCategory();
  },[])
  return (
    <div className="w-70 bg-white mt-5 p-1 rounded-xl">
      <div className="font-bold p-2">Categories</div>
      <div className="navbar-body px-3">
        <ul>
          {category &&
            category.map((i)=>(
              <Link href={{pathname:"/markeet-place/category", query:i.id}} className="" key={i.id}>
                <a>
                  <li className="flex font-light text-sm items-center justify-between  border-b py-3 gap-3">
                    <div className="">{i.name}</div>
                    {/* <TruckIcon className="h-5 w-5 text-indigo-400" /> */}
                  </li>
                </a>
              </Link>
            ))
          }
          
          

          {/* <Link href="/" className="">
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
          </Link> */}
        </ul>
      </div>

      {/* <Link href="/" className="">
        <a>
          <li className="flex justify-center rounded-b-xl py-2 bg-gray-100 font-normal text-xl items-center mt-5 gap-3">
            <div className="">See More</div>
            <ChevronDownIcon className="h-5 w-5 text-indigo-400" />
          </li>
        </a>
      </Link> */}
    </div>
  );
};

export default MarkeetPlaceSideBar;
