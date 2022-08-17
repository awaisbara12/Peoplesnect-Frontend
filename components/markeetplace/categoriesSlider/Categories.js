import React, { Fragment } from "react";
import Link from "next/link";
import {
  TruckIcon,
  OfficeBuildingIcon,
  DesktopComputerIcon,
  FilmIcon,
  TagIcon,
  PuzzleIcon,
} from "@heroicons/react/outline";

const CategoryCard = [
  {
    categoryIcon: TruckIcon,
    categoryName: "vehicles",
  },
  {
    categoryIcon: OfficeBuildingIcon,
    categoryName: "property",
  },
  {
    categoryIcon: DesktopComputerIcon,
    categoryName: "Electronics",
  },
  {
    categoryIcon: FilmIcon,
    categoryName: "Entertainment",
  },
  {
    categoryIcon: TagIcon,
    categoryName: "Classifieds",
  },
  {
    categoryIcon: PuzzleIcon,
    categoryName: "Toys & Games",
  },
];

const MarkeetplaceCategories = () => {
  return (
    <Fragment>
      <div className="flex justify-between items-center">
        {CategoryCard.map((category, i) => (
          <div
            key={i}
            className="bg-white lg:text-lg md:text-sm sm:text-xs lg:py-2 md:py-1 md:px-2 lg:px-4 rounded-full"
          >
            <Link href="">
              <a className="flex items-center justify-center gap-1 ">
                <div className="lg:p-2 md:p-1 rounded-full flex items-center justify-center bg-zinc-100">
                  <category.categoryIcon className=" rounded-full lg:h-5 lg:w-5 md:h-3 md:w-3" />
                </div>
                <div className="">{category.categoryName}</div>
              </a>
            </Link>
          </div>
        ))}
      </div>
    </Fragment>
  );
};

export default MarkeetplaceCategories;
