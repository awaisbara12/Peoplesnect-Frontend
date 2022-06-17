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
      <div className="flex justify-between items-center md:gap-6">
        {CategoryCard.map((category, i) => (
          <div key={i} className="bg-white py-2 px-4 rounded-full">
            <Link href="">
              <a className="flex items-center justify-center gap-1">
                <div className="h-9 w-9 rounded-full flex items-center justify-center bg-zinc-100">
                  <category.categoryIcon className=" rounded-full h-5 w-5" />
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
