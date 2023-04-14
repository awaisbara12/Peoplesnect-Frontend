import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { EyeIcon, SearchIcon } from '@heroicons/react/solid';
import Post from "../../../public/images/groupcover.jpg";
import { TrashIcon } from '@heroicons/react/outline';
import { ADMIN_PRODUCT_API, CURENT_USER_LOGIN_API } from '../../../pages/config';
import InfiniteScroll from 'react-infinite-scroll-component';
import ClipLoader from 'react-spinners/ClipLoader';
import axios from "axios";
import Router from "next/router";

const ProductsList =()=>{
  const [products, setProducts] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const [currentpage1, setcurrentpage1] = useState(1);
  const [lastpage, setlastpage] = useState(0);
  const [search, setsearch] = useState(0);
  const [search1, setsearch1] = useState([]);


  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }

  const GetProducts = async()=>{      
    await fetch(ADMIN_PRODUCT_API+"?page=" + currentpage, {
      method: "GET",
      headers: {
        Accept: "application/json", 
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          const mergedata = [...products, ...result.data]
          setProducts(mergedata);
          setcurrentpage(result.pages.next_page)
          setlastpage(result.pages.total_pages)
        }
      })
      .catch((err) => console.log(err)); 
  }

  const searchproduct = async()=>{      
    await fetch(ADMIN_PRODUCT_API+"?page=1", {
      method: "GET",
      headers: {
        Accept: "application/json", 
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setProducts(result.data);
          setcurrentpage(result.pages.next_page);
          setlastpage(result.pages.total_pages);
        }
      })
      .catch((err) => console.log(err)); 
  }

  async function deteleProduct(productId){
    var checks =confirm("Are you sure..?");
    if(checks){
      const res = await axios(ADMIN_PRODUCT_API + "/" + productId, {
        method: "DELETE",
        headers: {
          Accept: "application/json",
          "Content-type": "application/json; charset=utf-8",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": true,
          Authorization: authKey,
        },
        credentials: "same-origin",
      });
      const result = await res;
      if(result){
        document.getElementById(`product-${productId}`).classList.add("hidden");
      }
    }
  }

  const fetchMoreData = async()=>{
    if(search == "0"){
      setcurrentpage1(1);
      await GetProducts();
    }else{
      await searchmultiples2(search1);
    }
  }

  const handlechange = (event)=>{
    if( event.target.value !==undefined){
      setsearch1(event.target.value);
      searchmultiples(event.target.value);
    }
  }

  const searchmultiples  = async(event) =>{
    if (!event?.length>0){
      setcurrentpage(1);
      setcurrentpage1(1);
      setsearch(0);
      searchproduct();
    }else{
      await fetch(ADMIN_PRODUCT_API+"/product_search"+"?query="+event, {
        method: "GET",
         headers: {
          Accept: "application/json", 
           Authorization: `${authKey}`,
         },
      })
         .then((resp) => resp.json())
        .then(async (result) => {
          if (result) {
            if (!event){
              setsearch(0);
              searchproduct();
            }else{
              setsearch(1);
              setProducts(result.data);
              setcurrentpage(result.pages.next_page);
              setcurrentpage1(result.pages.next_page);
              setlastpage(result.pages.total_pages);
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }

  const searchmultiples2  = async(event) =>{
    if (!event?.length>0){
      setcurrentpage(1);
      setcurrentpage1(1);
      setsearch(0);
      searchproduct();
    }else{
      await fetch(ADMIN_PRODUCT_API+"/product_search"+"?query="+event+"&page="+currentpage1, {
        method: "GET",
         headers: {
          Accept: "application/json", 
           Authorization: `${authKey}`,
         },
      })
         .then((resp) => resp.json())
        .then(async (result) => {
          if (result) {
            if (!event){
              setsearch(0);
              searchproduct();
            }else{
              setsearch(1);
              const mergedata = [...products, ...result.data]
              setProducts(mergedata);
              setcurrentpage(result.pages.next_page);
              setcurrentpage1(result.pages.next_page);
              setlastpage(result.pages.total_pages);
            }
          }
        })
        .catch((err) => console.log(err));
    }
  }

  useEffect(() => {
    GetProducts();
  }, []);

  return (
    <div className="mt-8">
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
        <div className="mt-8">
          <div className="">
            <div className="text-center">
              <div className="heading text-4xl font-semibold text-indigo-400">Productst List</div>
            </div>
            <div className="relative w-1/2 mx-auto mt-4">
              <input
                className="placeholder:text-md placeholder:text-indigo-500 pl-12  hover:shadow-lg bg-white placeholder:rounded-full  border-indigo-400 w-full rounded-full"
                placeholder="Search Products"
                type="text"
                name="search"
                onChange={handlechange}
                onScroll={handlechange}
              />
              <div className="absolute top-3 left-6">
                <SearchIcon className="h-5 w-5 text-indigo-400" />
              </div>
            </div>
            <div className="mt-8">
              <div className="">
                <InfiniteScroll
                    dataLength={products.length}
                    next={fetchMoreData}
                    hasMore={currentpage != null }
                    loader={<div className="flex justify-center"><ClipLoader className="my-8" color="#818CF8" size={40} /> </div>}
                    className="grid grid-cols-3 gap-6"
                  >
                    {products && products.map((product)=>(
                      <div 
                        className="hover:shadow-2xl shadow-lg bg-white rounded-xl"
                        id={`product-${product.id}`}
                        key={product.id}>
                        <div className="">
                          <Link href={{pathname: "/markeet-place/marketplace-show", query: product.id}}>
                            <a>
                            {product && product.product_pic?(
                                <img
                                  src={product.product_pic}
                                  className="object-fit rounded-t-xl h-[180px] w-[380px]"
                                  placeholder="empty"
                                  alt="profile-image"
                                />
                                ):( 
                                <Image
                                  src={Post}
                                  className="object-fit rounded-t-xl"
                                  width={380}
                                  height={180}
                                  alt=""
                                />
                              )}
                              <div className="p-3">
                                <div className="flex justify-between items-center mb-1">
                                  <div className="font-bold text-indigo-400">{product.name}</div>
                                  <Link href="">
                                    <a>
                                      <div className="flex gap-1">
                                        <Link href={{pathname: "/markeet-place/marketplace-show", query: product.id}}>
                                          <a>
                                            <EyeIcon className="h-5 w-5 text-indigo-400" />
                                          </a>
                                        </Link>
                                        <button
                                          key="Delete"
                                          onClick={() => deteleProduct(product.id)}
                                        >
                                          <TrashIcon className="h-5 w-5 text-indigo-400" />
                                        </button>
                                      </div>
                                    </a>
                                  </Link>
                                </div>
                                <div className="font-extralight"><b className="font-bold text-indigo-400">discription:</b> {product.description}
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
            {/* <div className="mt-8 text-center">
              <Button className="border-indigo-400 border text-indigo-400 rounded-full">Show More </Button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductsList;