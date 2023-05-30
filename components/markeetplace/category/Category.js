import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import productImage1 from "../../../public/images/71zny7BTRlL._AC_SX522_.jpg";
import productImage2 from "../../../public/images/intro-1645809394.jpg";
import productImage3 from "../../../public/images/airpodsprom.webp";
import productImage4 from "../../../public/images/Apple-AirPods-Pro-12.webp";
import productImage5 from "../../../public/images/266-hero.jpg";
import { PRODUCT_API } from "../../../pages/config";
import { useRouter } from "next/router";
import { DocumentDuplicateIcon, LocationMarkerIcon } from "@heroicons/react/outline";
import InfiniteScroll from 'react-infinite-scroll-component';
import ClipLoader from 'react-spinners/ClipLoader';



const Category = () => {
  const [Product, setProduct] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
  // Bareer key
  if (typeof window !== "undefined") { var authKey = window.localStorage.getItem("keyStore"); }
  //  Get All product
  function product() {
    fetch(PRODUCT_API + "/category_product?id=" + myArray[1] + "&page=" + currentpage, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          // setProduct(result.data)
          const mergedata = [...Product, ...result.data]
          setProduct(mergedata);
          setcurrentpage(result.pages.next_page)
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    product();
  }, [myArray[1]])

  const fetchMoreData = async () => {
    product();
  }
  return (
    <div className="w-full xl:w-[980px] lg:w-[730px] md:w-[780px] pb-4 mt-[14px p-4">
      {Product && Product.length != 0 ? (
        <div className="flex justify-between font-semibold text-xl">
          <div className="capitalize">{Product[0].category.name}</div>
        </div>
      ) : (
        <div className="flex justify-between font-semibold text-xl">
          <div className="">No Product Found</div>
        </div>
      )}
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
        <div >

          <InfiniteScroll
            dataLength={Product && Product.length}
            next={fetchMoreData}
            hasMore={currentpage != null}
            loader={<div className="flex justify-center"><ClipLoader className="my-8" color="#818CF8" size={40} /> </div>}
            className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8 mx-auto"
          >
            {Product && Product.length != 0 && Product.map((i) => (
              <div key={i.id} className="bg-white w-auto h-auto rounded-xl mt-6">

                <div className="relative">
                  <AliceCarousel>
                    {
                      i.product_pic && i.product_pic.map((j) => (
                        <Link href={{ pathname: "/markeet-place/marketplace-show", query: i.id }} key={j}>
                          <a>
                            <img
                              src={j}
                              className="object-cover rounded-xl w-[1050px] h-[200px]"
                            />
                          </a>
                        </Link>
                      ))
                    }
                  </AliceCarousel>
                  {/*  product price */}
                  <div className="absolute top-2 left-2">
                    <div className="flex gap-2">
                      <div className="">
                        <div className="bg-gray-900 rounded-xl py-1 px-3 text-white font-medium text-sm">
                          ${i.price}
                        </div>
                      </div>
                      {/*  Product status */}
                      <div className="">
                        <div className="bg-red-400 rounded-xl py-1 px-3 text-white font-medium text-sm">
                          {i.status}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="lg:px-3 md:px-4 px-6 mt-4 mb-3">
                  {/*  Product title */}
                  <div className="flex justify-between items-center font-semibold lg:text-base md:text-sm mb-1.5">
                    <div className="">{i.name}</div>
                  </div>
                  {/* Category name & user location */}
                  <div className="flex md:justify-between lg:gap-3 lg:text-sm text-xs gap-4 leading-4 items-center">
                    <div className="flex items-center lg:gap-2 gap-1">
                      <LocationMarkerIcon className="h-5 w-5" />
                      <div className="">{i.city ? i.city + ", " : ''}{i.state ? i.state + ", " : ""} {i.country ? i.country + ", " : ""} </div>
                    </div>
                    <div className="flex items-center lg:gap-2 md:gap-1">
                      <DocumentDuplicateIcon className="h-5 w-5" />
                      <div className="">{i.category.name}</div>
                    </div>
                  </div>
                  <Link href={{ pathname: "/markeet-place/marketplace-show", query: i.id }}>
                    <a>
                      <div className="flex justify-end">
                        <div className="border font-semibold text-xs border-indigo-400 text-center text-indigo-400 w-22 mt-4 p-2 rounded-full">
                          Show Details
                        </div>
                      </div>
                    </a>
                  </Link>
                </div>
              </div>
            ))}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};

export default Category;
