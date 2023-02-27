import React, { Fragment, useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import Link from "next/link";
import Image from "next/image";
import {
  DotsHorizontalIcon,
  LocationMarkerIcon,
  DocumentDuplicateIcon,
  MapIcon,
} from "@heroicons/react/outline";
import { ShoppingCartIcon } from "@heroicons/react/solid";
import productImage from "../../../public/images/product1.png";
import productImage2 from "../../../public/images/product2.png";
import productImage3 from "../../../public/images/product3.png";
import productImage4 from "../../../public/images/product4.png";
import {  PRODUCT_API } from "../../../pages/config";
const HomeProducts = () => {
  const [Product, setProduct] = useState();
  // Bareer key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }
  //  Get All product
  function product() {
    fetch(PRODUCT_API, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setProduct(result.data)
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    product();
  },[])
  return (
    <Fragment>
      {/* {ProductCetagory.map((category, i) => (
        <div key={i} className="flex justify-between font-semibold text-xl">
          <Link href="">
            <a>
              <div className="">{category.heading}ss</div>
            </a>
          </Link>
        </div>
      ))} */}

      <div className="flex justify-between font-semibold text-xl">
        <div className="">Latest Product</div>
      </div>
      <div className="w-[720px] xl:w-[1020px] lg:w-[700px] md:w-[760px] px-5 md:px-0 lg:px-0">
      <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8 mx-auto">
          {Product && Product.map((i) => (
            <div key={i.id} className="bg-white w-auto h-auto rounded-xl mt-6">
             
                <div className="relative">
                  <AliceCarousel>
                    {i.product_pic && i.product_pic.map((j)=>(
                        <Link href={{pathname:"/markeet-place/marketplace-show", query:i.id}} key={j}>
                        <a>
                        <img
                          src={j}
                          key={j}
                          className="object-cover rounded-xl w-[1050px] h-[200px]"
                        />
                        </a>
                        </Link>
                      ))}
                  </AliceCarousel>
                  {/*  product price */}
                  <div className="absolute top-5 left-5">
                    <div className="bg-gray-900 rounded-xl py-1 px-3 text-white font-medium text-sm">
                      ${i.price}
                    </div>
                  </div>
                  {/*  Product status */}
                  <div className="absolute top-5 left-20">
                    <div className="bg-red-400 rounded-xl py-1 px-3 text-white font-medium text-sm">
                      {i.status}
                    </div>
                  </div>
                </div>
                <div className="lg:px-3 md:px-4 px-6 mt-0 mb-3">
                  {/*  Product title */}
                  <div className="flex justify-between items-center font-semibold lg:text-base md:text-sm mb-1.5">
                    <div className="">{i.name}</div>
                  </div>
                  {/* Category name & user location */}
                  <div className="flex md:justify-between lg:gap-3 lg:text-sm text-xs gap-4 leading-4 items-center">
                    <div className="flex items-center lg:gap-2 gap-1">
                      <LocationMarkerIcon className="h-5 w-5" />
                      <div className="">{i.user.country}</div>
                    </div>
                    <div className="flex items-center lg:gap-2 md:gap-1">
                      <DocumentDuplicateIcon className="h-5 w-5" />
                      <div className="">{i.category?i.category.name:''}</div>
                    </div>
                  </div>
                  <Link href={{pathname:"/markeet-place/marketplace-show", query:i.id}}>
                    <a className="flex justify-end">
                      <div className="border font-semibold text-xs border-indigo-400 text-center text-indigo-400 w-22 mt-4 p-2 rounded-full">
                        Show Details
                      </div>
                    </a>
                  </Link>
                </div>
               {/* </a>
              </Link> */}
            </div>
          ))}
        </div>
      </div>
    </Fragment>
  );
};

export default HomeProducts;
