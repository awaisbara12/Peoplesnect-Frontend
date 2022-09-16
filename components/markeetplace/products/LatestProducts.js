import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  DotsHorizontalIcon,
  LocationMarkerIcon,
  DocumentDuplicateIcon,
} from "@heroicons/react/outline";
import { ShoppingCartIcon } from "@heroicons/react/solid";
import productImage from "../../../public/images/product1.png";
import productImage2 from "../../../public/images/product2.png";
import productImage3 from "../../../public/images/product3.png";
import productImage4 from "../../../public/images/product4.png";

const ProductCetagory = [
  {
    heading: "✨ Latest Products",
    moreabout: "See All",
    dotIcon: DotsHorizontalIcon,
  },
];

const ProductCard = [
  {
    image: productImage,
    title: "Adidas white soccer shoes set",
    price: 40,
    status: "New",
    catTitle: "Shoes",
    locationtitle: "New York",
    mapIcon: LocationMarkerIcon,
    catIcon: DocumentDuplicateIcon,
  },
  {
    image: productImage2,
    title: "Eartrh lotion for smooth skin",
    price: 78,
    status: "New",
    catTitle: "Cosmatics",
    locationtitle: "New York",
    mapIcon: LocationMarkerIcon,
    catIcon: DocumentDuplicateIcon,
  },
  {
    image: productImage3,
    title: "Adidas white soccer shoes set",
    price: 110,
    status: "New",
    catTitle: "EarPods",
    locationtitle: "New York",
    mapIcon: LocationMarkerIcon,
    catIcon: DocumentDuplicateIcon,
  },
  {
    image: productImage4,
    title: "Adidas white soccer shoes set",
    price: 110,
    status: "New",
    catTitle: "EarPods",
    locationtitle: "New York",
    mapIcon: LocationMarkerIcon,
    catIcon: DocumentDuplicateIcon,
  },
];

const HomeProducts = () => {
  return (
    <Fragment>
      {ProductCetagory.map((category, i) => (
        <div key={i} className="flex justify-between font-semibold text-xl">
          <Link href="">
            <a>
              <div className="">{category.heading}</div>
            </a>
          </Link>
        </div>
      ))}
      <div className="w-[720px] xl:w-[1020px] lg:w-[700px] md:w-[760px] px-5 md:px-0 lg:px-0">
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8 mx-auto">
          {ProductCard.map((product, i) => (
            <div key={i} className="bg-white w-auto h-auto rounded-xl mt-6">
              <div className="relative">
                <Image
                  src={product.image}
                  width={726}
                  height={530}
                  className="object-cover rounded-xl"
                  placeholder="blur"
                />
                <div className="absolute top-5 left-5">
                  <div className="bg-gray-900 rounded-xl py-1 px-3 text-white font-medium text-sm">
                    ${product.price}
                  </div>
                </div>
                <div className="absolute top-5 left-20">
                  <div className="bg-red-400 rounded-xl py-1 px-3 text-white font-medium text-sm">
                    {product.status}
                  </div>
                </div>
              </div>
              <div className="lg:px-3 md:px-4 px-6 mt-4 mb-3">
                <div className="flex justify-between items-center font-semibold lg:text-base md:text-sm mb-1.5">
                  <div className="">{product.title}</div>
                </div>
                <div className="flex md:justify-between lg:gap-3 lg:text-sm text-xs gap-4 leading-4 items-center">
                  <div className="flex items-center lg:gap-2 gap-1">
                    <product.mapIcon className="h-5 w-5" />
                    <div className="">{product.locationtitle}</div>
                  </div>
                  <Link href="">
                    <a>
                      <div className="flex items-center lg:gap-2 md:gap-1">
                        <product.catIcon className="h-5 w-5" />
                        <div className="">{product.catTitle}</div>
                      </div>
                    </a>
                  </Link>
                </div>
                <Link href="/markeet-place/marketplace-show">
                  <a className="flex justify-end">
                    <div className="border text-xs border-indigo-400 text-center text-indigo-400 w-22 mt-4 p-2 rounded-full">
                      Show Details
                    </div>
                  </a>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default HomeProducts;
