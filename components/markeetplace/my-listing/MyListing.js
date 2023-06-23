import Image from "next/image";
import React, { Fragment, useEffect, useState } from "react";
import Link from "next/link";
import AliceCarousel, { Classnames } from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { PRODUCT_API, USE_APPLY_JOB_API } from "../../../pages/config";
import { BookmarkIcon, ClipboardCopyIcon, DocumentDuplicateIcon, DotsHorizontalIcon, LocationMarkerIcon, PencilAltIcon, TrashIcon } from "@heroicons/react/outline";
import { Menu, Transition } from "@headlessui/react";
import Compnylogo1 from "../../../public/images/logo1.jpeg";
import InfiniteScroll from 'react-infinite-scroll-component';
import ClipLoader from 'react-spinners/ClipLoader';




const MyListing = () => {
  const [Product, setProduct] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  // Bareer Key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore");}

  //  Delete product
  function DeleteProduct(id) {
    var a = confirm("yes");
    if(a){
      fetch(PRODUCT_API+"/"+id, {
        method: "DELETE",
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
  }
  //  Get All product
  function product() {
    fetch(PRODUCT_API+"/my_product?page="+ currentpage, {
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
  }, []);
  const fetchMoreData = async()=>{
    product();
  }
  return (
    <div className="mt-0">
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 xl:px-0 lg:px-0">
        <div className="bg-white rounded-xl">
          <div className="border-b-1 p-4">
            <div className="heading font-bold">All Product</div>
          </div>
          <InfiniteScroll
            dataLength={Product && Product.length }
            next={fetchMoreData}
            hasMore={currentpage != null }
            loader={Product && Product.length!=0?<div className="flex justify-center"><ClipLoader className="my-8" color="#818CF8" size={40} /> </div>:""}
            // className="grid xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2 grid-cols-1 gap-8 mx-auto"
          >
            {Product?(
              Product.map((i)=>(
                <div className="border-b-1" key={i.id}>
                  <div className="jobs-profile px-4 py-10 ">
                    <div className="flex  justify-between">
                      <Link href={{pathname:"/markeet-place/marketplace-show",query:i.id}}>
                      <a>
                        <div className="flex items-center gap-5">
                          {
                            i.product_pic?(
                              <img
                                src={i.product_pic[0]}
                                className="object-cover rounded-xl w-[100px] h-[80px]"
                              />
                            ):('')
                          }
                          <div className="">
                            <div className="username text-sm font-bold">{i.name}</div>
                            <div className="userfield font-light">{i.category.name}</div>
                            <div className="">{i.city?i.city+", ":''} {i.country?i.country:""} </div>
                            <div className="mt-0 font-thin">Product Posted {i.created_at}</div>
                          </div>
                        </div>
                      </a>
                      </Link>
                      <Menu as="div" className="relative inline-block text-left">
                        <div>
                          <Menu.Button className="inline-flex justify-center">
                            <DotsHorizontalIcon
                              className="-mr-1 ml-2 h-5 w-5"
                              aria-hidden="true"
                            />
                          </Menu.Button>
                        </div>
                        <Transition
                          as={Fragment}
                          enter="transition ease-out duration-100"
                          enterFrom="transform opacity-0 scale-95"
                          enterTo="transform opacity-100 scale-100"
                          leave="transition ease-in duration-75"
                          leaveFrom="transform opacity-100 scale-100"
                          leaveTo="transform opacity-0 scale-95"
                        >
                          <Menu.Items className="absolute top-6 w-48 right-0">
                            <div className="flex items-start flex-col gap-2 border-1 rounded-xl p-2">
                            <Menu.Item>
                                {({ active }) => (
                                  <Link href={{pathname:"/markeet-place/add-your-items", query:i.id}}>
                                  <a
                                    className="text-sm flex gap-2 cursor-pointer"
                                  >
                                    <PencilAltIcon className="h-5 w-5" />
                                      Edit Product
                                  </a>
                                  </Link>
                                )}
                              </Menu.Item>

                              <Menu.Item>
                                {({ active }) => (
                                  <a 
                                  onClick={()=>DeleteProduct(i.id)} 
                                  className="text-sm flex py-2 border-b gap-2 cursor-pointer"
                                  >
                                    <TrashIcon className="h-5 w-5" />
                                    Remove From Listing
                                  </a>
                                )}
                              </Menu.Item>
                            </div>
                          </Menu.Items>
                        </Transition>
                      </Menu>
                    </div>
                  </div>
                </div>
              ))
            ):('')}
          </InfiniteScroll>
        </div>
      </div>
    </div>
  );
};


export default MyListing;
