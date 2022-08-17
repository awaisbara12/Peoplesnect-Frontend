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
    locationtitle: "New York, Usa",
    mapIcon: LocationMarkerIcon,
    catIcon: DocumentDuplicateIcon,
    cartIcon: ShoppingCartIcon,
  },
  {
    image: productImage2,
    title: "Eartrh lotion for smooth skin",
    price: 78,
    status: "Hot",
    catTitle: "Cosmatics",
    locationtitle: "New York, Usa",
    mapIcon: LocationMarkerIcon,
    catIcon: DocumentDuplicateIcon,
    cartIcon: ShoppingCartIcon,
  },
  {
    image: productImage3,
    title: "Adidas white soccer shoes set",
    price: 110,
    status: "Iphon",
    catTitle: "EarPods Pro",
    locationtitle: "New York, Usa",
    mapIcon: LocationMarkerIcon,
    catIcon: DocumentDuplicateIcon,
    cartIcon: ShoppingCartIcon,
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
          <div className="flex gap-1 items-center">
            <Link href="">
              <a>{category.moreabout}</a>
            </Link>
            <Link href="">
              <a>
                <category.dotIcon className="h-5 w-5" />
              </a>
            </Link>
          </div>
        </div>
      ))}
      <div className="flex justify-between lg:gap-6 md:gap-4">
        <div className="grid lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 grid-cols-1 gap-8 mx-auto">
          {ProductCard.map((product, i) => (
            <div key={i} className="bg-white w-auto h-auto rounded-xl mt-6">
              <div className="relative">
                <Image
                  src={product.image}
                  width={326}
                  height={230}
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
              <div className="lg:px-3 px-2 mt-4 lg:mb-7 mb-3">
                <div className="flex justify-between items-center font-semibold lg:text-base md:text-sm mb-1.5">
                  <div className="">{product.title}</div>
                  <div className="bg-indigo-400  lg:px-3 py-2 md:px-2  text-white rounded-md">
                    <Link href="">
                      <a>
                        <product.cartIcon className="lg:f-5 lg:w-5 md:h-3 md:w-3" />
                      </a>
                    </Link>
                  </div>
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
              </div>
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default HomeProducts;
