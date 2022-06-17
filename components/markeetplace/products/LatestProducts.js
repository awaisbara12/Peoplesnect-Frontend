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

  {
    image: productImage4,
    title: "Adidas white soccer shoes set",
    price: 110,
    status: "Brand new",
    catTitle: "Men Shoes",
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
      <div className="flex justify-between gap-6">
        {ProductCard.map((product, i) => (
          <div key={i} className="bg-white w-80 h-80 lg:h-auto sm:w-{50%} rounded-xl mt-6">
            <div className="relative">
              <Image
                src={product.image}
                width={326}
                height={230}
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
            <div className="px-3 mt-4 mb-7">
              <div className="flex justify-between items-center font-semibold text-base mb-1.5">
                <div className="lg:text-xs">{product.title}</div>
                <div className="bg-indigo-400 px-3 py-1 text-white rounded-md">
                  <Link href="">
                    <a>
                      <product.cartIcon className="f-5 w-5" />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="flex  lg:text-xs lg:justify-between gap-3">
                <div className="flex items-center gap-2">
                  <product.mapIcon className="h-5 w-5" />
                  <div className="">{product.locationtitle}</div>
                </div>
                <Link href="">
                  <a>
                    <div className="flex items-center gap-2">
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
    </Fragment>
  );
};

export default HomeProducts;
