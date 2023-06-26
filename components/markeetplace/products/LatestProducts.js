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
import InfiniteScroll from 'react-infinite-scroll-component';
import ClipLoader from 'react-spinners/ClipLoader';
const HomeProducts = () => {
  const [Product, setProduct] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  // Bareer key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }
  
  
  const fetchMoreData = () => {
    product();
  }
  //  Get All product
  function product() {
    fetch(PRODUCT_API+"?page="+currentpage, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          const mergedata = [...Product, ...result.data]
          setProduct(mergedata)
          setcurrentpage(result.pages.next_page)
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
      <div className="w-[620px] xl:w-[1020px] lg:w-[700px] md:w-[760px] px-5 md:px-0 lg:px-0">
        {/* <div className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8 mx-auto"> */}
          {Product?
           (<InfiniteScroll
              dataLength={Product.length}
              next={fetchMoreData}
              className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8 mx-auto"
              hasMore={currentpage != null}
              loader={Product && Product.length!=0?(<div className="flex justify-center "><ClipLoader className="my-8" color="#818CF8" size={40} /> </div>):("")}
            >
           {Product.map((i) => (
            <div key={i.id} className="bg-white w-auto h-auto rounded-xl mt-6">
                {/* product Image */}
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
                  <div className=" flex absolute top-5 left-5">
                    {/*  product price */}
                    <div className="">
                      <div className="bg-gray-900 rounded-xl py-1 px-3 text-white font-medium text-sm">
                        ${i.price}
                      </div>
                    </div>
                    {/*  Product status */}
                    {/* <div className="ml-2">
                      <div className="bg-red-400 rounded-xl py-1 px-3 text-white font-medium text-sm">
                        {i.status}
                      </div>
                    </div> */}
                  </div>


                </div>
                <div className="lg:px-3 md:px-4 px-6 mt-0 mb-3">
                  {/*  Product title */}
                  <div className="flex justify-between items-center font-semibold lg:text-base md:text-sm mb-1.5">
                    <div className="">{i.name.length>38?i.name.slice(2, 38)+"...":i.name}</div>
                  </div>
                  {/* Category name & user location */}
                  <div className="flex md:justify-between lg:gap-3 lg:text-sm text-xs gap-4 leading-4 items-center">
                    <div className="flex items-center lg:gap-2 gap-1">
                      <LocationMarkerIcon className="h-5 w-5" />
                      <div className="">{i.city?i.city+", ":''}{i.country?i.country:""} </div>
                    </div>
                    <div className="flex items-center lg:gap-2 md:gap-1">
                      <DocumentDuplicateIcon className="h-5 w-5" />
                      <div className="">{i.category?i.category.name:''}</div>
                    </div>
                  </div>
                  <Link href={{pathname:"/markeet-place/marketplace-show", query:i.id}}>
                    <a className="flex justify-between">
                      <div className="text-xs border-indigo-400 mt-4 p-2">
                        {i.created_at}
                      </div>
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
          </InfiniteScroll>):('')
          }
        {/* </div> */}
      </div>
    </Fragment>
  );
};

export default HomeProducts;
