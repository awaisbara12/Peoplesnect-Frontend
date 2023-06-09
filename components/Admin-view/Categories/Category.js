import React, { useState, useEffect, Fragment } from 'react';
import Link from "next/link";
import Image from "next/image";
import { EyeIcon, SearchIcon, XIcon } from '@heroicons/react/solid';
import Post from "../../../public/images/groupcover.jpg";
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import { ADMIN_CATEGORY_API, ADMIN_PRODUCT_API, CURENT_USER_LOGIN_API } from '../../../pages/config';
import InfiniteScroll from 'react-infinite-scroll-component';
import ClipLoader from 'react-spinners/ClipLoader';
import axios from "axios";
import Router from "next/router";
import { Menu, Transition } from "@headlessui/react";
import { Dialog } from "@headlessui/react";

const Category =()=>{
  const [products, setProducts] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const [currentpage1, setcurrentpage1] = useState(1);
  const [lastpage, setlastpage] = useState(0);
  const [search, setsearch] = useState(0);
  const [search1, setsearch1] = useState([]);
  const [c_name, setc_name] = useState();
  const [Editc_name, setEditc_name] = useState();
  const [EditId, setEditId] = useState();


  let [editOpen, seteditOpen] = useState(false);
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }
  // for Close  Edit-modal
  function closeeditModal() { seteditOpen(false); setEditc_name('')}
  // for Open  Edit-modal
  function openeditModal(i) { seteditOpen(true);setEditc_name(i.name);setEditId(i.id)}
  //  Update Category
  function AddCategory() {
    const dataForm = new FormData();
    if(c_name){
      dataForm.append("categories[name]", c_name);
      setc_name('');
      fetch(ADMIN_CATEGORY_API, {
        method: "POST",
        headers: {
          Accept: "application/json",
          Authorization: `${authKey}`,
        },body:dataForm,
      })
        .then((resp) => resp.json())
        .then((result) => {
          if (result) {
            alert('Category Added Successfully');
            setProducts(result.data);
          }
        })
        .catch((err) => console.log(err));
    }else{alert("Enter Category")}
    
  }//  Update Category
  function UpdateCategory(id) {
    const dataForm = new FormData();
    dataForm.append("categories[name]", Editc_name);
    // if(productPic && productPic.length!=0){
    //   for (let i = 0; i < productPic.length; i++) {
    //     dataForm.append(`products[product_pic][]`, productPic[i]);
    //   }
    // }
    fetch(ADMIN_CATEGORY_API+"/"+id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },body:dataForm,
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          closeeditModal();
          alert('Update Successfully');
          setProducts(result.data);
           
        }
      })
      .catch((err) => console.log(err));
  }
  // Get All Category
  const GetCategory = async()=>{      
    await fetch(ADMIN_CATEGORY_API+"?page=" + currentpage, {
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
  const searchCategory = async()=>{      
    await fetch(ADMIN_CATEGORY_API+"?page=1", {
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
  // Delete Category
  async function deteleCategory(id){
    var checks =confirm("Are you sure..?");
    if(checks){
      const res = await axios(ADMIN_CATEGORY_API + "/" + id, {
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
        document.getElementById(`product-${id}`).classList.add("hidden");
      }
    }
  }

  const fetchMoreData = async()=>{
    if(search == "0"){
      setcurrentpage1(1);
      await GetCategory();
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
      searchCategory();
    }else{
      await fetch(ADMIN_CATEGORY_API+"/product_search"+"?query="+event, {
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
              searchCategory();
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
      searchCategory();
    }else{
      await fetch(ADMIN_CATEGORY_API+"/product_search"+"?query="+event+"&page="+currentpage1, {
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
              searchCategory();
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
    GetCategory();
  }, []);
  
  return (
    <div className="mt-8">
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
        <div className="mt-8">
          <div className="">
            {/* Heading Category-List */}
            <div className=" flex justify-center">
              <div className="heading text-4xl font-semibold text-indigo-400">Category List</div>
            </div>
            {/* Search Category */}
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
            {/* Add Category Input */}
            <div className="flex mt-5">
            <input
      className='placeholder:text-md placeholder:text-indigo-500 pl-12  hover:shadow-lg bg-white placeholder:rounded-full  border-indigo-400 w-full rounded-l-full'
                placeholder='Add Category'
                type='text'
                value={c_name}
                onChange={(e)=>setc_name(e.target.value)}
              />
              <button class="bg-indigo-400 text-white p-2 w-36 rounded-r-full" onClick={()=>AddCategory()}>Add category</button>
            </div>
            {/* CAtegory Show */}
            <div className="mt-8">
              <div className="">
                <InfiniteScroll
                  dataLength={lastpage}
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
                        
                          {/* {product && product.product_pic?(
                              <img
                                src={product.product_pic[0]}
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
                            )} */}
                            <div className="p-3">
                              <div className="flex justify-between items-center mb-1">
                                <div className="font-bold text-indigo-400">{product.name.slice(0,25)}</div>
                                  <div className="flex gap-1">
                                    <div className="text-sm flex gap-2 cursor-pointer" onClick={()=>openeditModal(product)}>
                                        <PencilAltIcon className="h-5 w-5 text-indigo-400" />
                                      </div>
                                    <Link href={{pathname: "/markeet-place/category", query: product.id}}>
                                      <a>
                                        <EyeIcon className="h-5 w-5 text-indigo-400" />
                                      </a>
                                    </Link>
                                    <button
                                      key="Delete"
                                      onClick={() => deteleCategory(product.id)}
                                    >
                                      <TrashIcon className="h-5 w-5 text-indigo-400" />
                                    </button>
                                  </div>
                              </div>
                              {/* <div className="font-extralight"><b className="font-bold text-indigo-400">discription:</b> {product.description.slice(0,85)} */}
                              {/* </div> */}
                            </div>
                          {/* </a>
                        </Link> */}
                      </div>
                    </div>
                  ))}
                </InfiniteScroll>
              </div>
            </div>

              {/* Update Modal */}
              <Transition appear show={editOpen} as={Fragment}>
                <Dialog
                  as="div"
                  className="relative z-50"
                  static={true}
                  onClose={closeeditModal}
                >
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0"
                  enterTo="opacity-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100"
                  leaveTo="opacity-0"
                >
                  <div className="fixed inset-0 bg-black bg-opacity-75" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                  <div className="flex min-h-full items-center justify-center p-4 text-center">
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0 scale-95"
                      enterTo="opacity-100 scale-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100 scale-100"
                      leaveTo="opacity-0 scale-95"
                    >
                      <Dialog.Panel className="w-[620px] bg-white rounded-xl xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0 py-4 text-left align-middle shadow-xl transition-all">
                        <div className="flex justify-end items-center mx-4">
                        <XIcon
                          onClick={closeeditModal}
                          className="w-5 h-5 cursor-pointer"
                        />
                        </div>
                        <Dialog.Title
                          as="h3"
                          className="text-lg font-medium leading-6 text-gray-900 px-8"
                        >
                          Edit Category
                        </Dialog.Title>
                      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
                        <div className="bg-white px-12 py-5 rounded-xl">
                          <div>
                            <input
                              className="placeholder:text-md hover:shadow-lg bg-gray-100 placeholder:rounded-full border-none w-full pl-2 rounded-full py-2 "      
                              value={Editc_name}
                              onChange={(e)=>setEditc_name(e.target.value)}
                              name="skills"
                              type="text"
                              placeHolder="Edit"
                            />
                            {/* <em>press enter to add new Skill</em> */}
                          </div>
                          <div className="flex gap-4 justify-end">
                            <Link href="">
                              <button className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                                type="submit" 
                                onClick={()=>UpdateCategory(EditId)} 
                                >
                                    Update Skill
                              </button>
                            </Link>
                          </div>
                        </div>
                      </div>
                      </Dialog.Panel>
                    </Transition.Child>
                    
                  </div>
                </div>
              </Dialog>
              </Transition>
            {/* <div className="mt-8 text-center">
              <Button className="border-indigo-400 border text-indigo-400 rounded-full">Show More </Button>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Category;