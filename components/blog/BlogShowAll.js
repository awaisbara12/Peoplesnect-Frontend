import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Spinner from "../common/Spinner";
import Blog1 from "../../public/images/pagecover.jpg";
import { BLOG_POST_USER_API_KEY } from "/pages/config";
import { useRouter } from "next/router";

const SuggestedBlogs = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);

  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
  //  Bareer key
  if (typeof window !== "undefined") { var authKey = window.localStorage.getItem("keyStore"); }
  const checkCalling = () => {
    if (myArray && myArray[1] == "suggested") suggestedBlog();
    else if (myArray && myArray[1] == "my") MyBlogs();
    else router.push("/blog");
  }
  // Get My All Blogs
  const MyBlogs = async () => {
    const res = await axios(BLOG_POST_USER_API_KEY, {
      method: "GET",
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

    try {
      if (result.status == 200) {
        setList(result.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    return result;
  };
  // Get All Suggested Blog
  const suggestedBlog = async () => {
    const res = await axios(BLOG_POST_USER_API_KEY + "/suggested_blogs", {
      method: "GET",
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

    try {
      if (result.status == 200) {
        setList(result.data);
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    return result;
  };
  useEffect(() => {
    setLoading(true);
    checkCalling();
    // MyBlogs();
  }, []);

  if (loading)
    return (
      <div className="mt-8">
        <Spinner />
      </div>
    );
  return (
    <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
      <div className="">
        <div>
          <div className="flex justify-between align-item-center mt-12">
            {myArray && myArray[1] == "suggested" ? (
              <>
                <div className="text-lg font-bold">Suggested Articles</div>
                {/* <div className="add_new_button text-center">
                  <button
                    type="submit"
                    className="border-2 border-indigo-400 text-indigo-400 text-md cursor-pointer font-bold py-2 px-4 rounded-full"
                  >
                    {list ? list.data.length : ''}
                  </button>
                </div> */}
              </>
            ) : ('')}

            {myArray && myArray[1] == "my" ? (
              <>
                <div className="text-lg font-bold">My Articles</div>
                {/* <div className="add_new_button text-center">
                  <button
                    type="submit"
                    className="border-2 border-indigo-400 text-indigo-400 text-md cursor-pointer font-bold py-2 px-4 rounded-full"
                  >
                    {list ? list.data.length : ''}
                  </button>
                </div> */}
              </>
            ) : ('')}

          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2">
          {list &&
            list.data.map((item) => (
              <div
                className="w-full mt-8 blogs bg-white rounded-xl"
                key={item.id}
              >
                <div className="">
                  <div className="image">
                    <div className="">
                      <Link href={{ pathname: "/blog/show", query: item.id, }}>
                        <a>
                          {item.photos_link ? (
                            <img
                              className="object-cover rounded-t-lg h-56"
                              src={item.photos_link[0]}
                              width={600}
                              min-height={400}
                            />
                          ) : (
                            ""
                          )}
                        </a>
                      </Link>
                    </div>
                  </div>
                  <div className="details">
                    <div className="heading text-lg p-4 font-bold">
                      {item.title}
                    </div>
                    <div className="text-right">
                      <Link href={{ pathname: "/blog/show", query: item.id, }}>
                        <a>
                          <button
                            type="submit"
                            className=" bg-indigo-400 text-sm text-white rounded-br-lg p-3 cursor-pointer"
                          >
                            Read More
                          </button>
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default SuggestedBlogs;
