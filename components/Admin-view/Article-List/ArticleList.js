import React, { useState, useEffect } from 'react';
import Link from "next/link";
import Image from "next/image";
import { EyeIcon, SearchIcon } from '@heroicons/react/solid';
import Post from "../../../public/images/groupcover.jpg";
import { PencilAltIcon, TrashIcon } from '@heroicons/react/outline';
import { ADMIN_BLOG_API, CURENT_USER_LOGIN_API } from '../../../pages/config';
import InfiniteScroll from 'react-infinite-scroll-component';
import ClipLoader from 'react-spinners/ClipLoader';
import axios from "axios";
import Router from "next/router";

const ArticlesList =()=>{
  const [articles, setArticles] = useState([]);
  const [currentpage, setcurrentpage] = useState(1);
  const [currentpage1, setcurrentpage1] = useState(1);
  const [lastpage, setlastpage] = useState(0);
  const [search, setsearch] = useState(0);
  const [search1, setsearch1] = useState([]);


  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }

  const GetArticles = async()=>{      
    await fetch(ADMIN_BLOG_API+"?page=" + currentpage, {
      method: "GET",
      headers: {
        Accept: "application/json", 
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          const mergedata = [...articles, ...result.data]
          setArticles(mergedata);
          setcurrentpage(result.pages.next_page)
          setlastpage(result.pages.total_pages)
        }
      })
      .catch((err) => console.log(err)); 
  }

  const searcharticles = async()=>{      
    await fetch(ADMIN_BLOG_API+"?page=1", {
      method: "GET",
      headers: {
        Accept: "application/json", 
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setArticles(result.data);
          setcurrentpage(result.pages.next_page);
          setlastpage(result.pages.total_pages);
        }
      })
      .catch((err) => console.log(err)); 
  }

  async function detelearticle(articleId){
    var checks =confirm("Are you sure..?");
    if(checks){
      const res = await axios(ADMIN_BLOG_API + "/" + articleId, {
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
        document.getElementById(`article-${articleId}`).classList.add("hidden");
      }
    }
  }

  const fetchMoreData = async()=>{
    if(search == "0"){
      setcurrentpage1(1);
      await GetArticles();
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
      searcharticles();
    }else{
      await fetch(ADMIN_BLOG_API+"/article_search"+"?query="+event, {
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
              searcharticles();
            }else{
              setsearch(1);
              setArticles(result.data);
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
      searcharticles();
    }else{
      await fetch(ADMIN_BLOG_API+"/article_search"+"?query="+event+"&page="+currentpage1, {
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
              searcharticles();
            }else{
              setsearch(1);
              const mergedata = [...articles, ...result.data]
              setArticles(mergedata);
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
    GetArticles();
  }, []);

  return (
    <div className="mt-8">
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
        <div className="mt-8">
          <div className="">
            <div className="text-center">
              <div className="heading text-4xl font-semibold text-indigo-400">Articles List</div>
            </div>
            <div className="relative w-1/2 mx-auto mt-4">
              <input
                className="placeholder:text-md placeholder:text-indigo-500 pl-12  hover:shadow-lg bg-white placeholder:rounded-full  border-indigo-400 w-full rounded-full"
                placeholder="Search Articles"
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
                    dataLength={articles.length}
                    next={fetchMoreData}
                    hasMore={currentpage != null }
                    loader={<div className="flex justify-center"><ClipLoader className="my-8" color="#818CF8" size={40} /> </div>}
                    className="grid grid-cols-3 gap-6"
                  >
                    {articles && articles.map((article)=>(
                      <div 
                        className="hover:shadow-2xl shadow-lg bg-white rounded-xl"
                        id={`article-${article.id}`}
                        key={article.id}>
                        <div className="">
                          <Link href={{pathname: "/blog/show", query: article.id}}>
                            <a>
                            {article && article.photos_link?(
                                <img
                                  src={article.photos_link}
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
                                  <div className="font-bold text-indigo-400">{article.title}</div>
                                  <Link href="">
                                    <a>
                                      <div className="flex gap-1">
                                        <Link href={{pathname:"/Admin/article-list/Edit-Articles", query:article.id}}>
                                          <a
                                            className="text-sm flex gap-2 cursor-pointer"
                                          >
                                            <PencilAltIcon className="h-5 w-5 text-indigo-400" />
                                          </a>
                                        </Link>
                                        <Link href={{pathname: "/blog/show", query: article.id}}>
                                          <a>
                                            <EyeIcon className="h-5 w-5 text-indigo-400" />
                                          </a>
                                        </Link>
                                        <button
                                          key="Delete"
                                          onClick={() => detelearticle(article.id)}
                                        >
                                          <TrashIcon className="h-5 w-5 text-indigo-400" />
                                        </button>
                                      </div>
                                    </a>
                                  </Link>
                                </div>
                                <div className="font-extralight"><b className="font-bold text-indigo-400">discription:</b> {article.description}
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

export default ArticlesList;