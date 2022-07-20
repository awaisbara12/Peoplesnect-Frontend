import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import MainBanner from "../../../peoplesnect-frontend/public/images/main-banner.jpg";
import Second from "../../../peoplesnect-frontend/public/images/post-image.png";
import bg from "../../../peoplesnect-frontend/public/images/bg.webp";
import Spinner from "../common/Spinner";
import { BLOG_POST_USER_API_KEY } from "/pages/config";

const BlogsDesign = () => {
  const [list, setList] = useState([]);
  const [loading, setLoading] = useState(true);
  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }

  useEffect(() => {
    setLoading(true);
    const getBlogs = async () => {
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
          console.log(result);
          setList(result.data);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
      return result;
    };
    getBlogs();
  }, []);

  if (loading)
    return (
      <div className="mt-8">
        <Spinner />
      </div>
    );
  return (
    <div className="w-[620px] lg:w-full md:w-full px-5 md:px-0 lg:px-0">
      <div className="columns-1 lg:columns-2 md:columns-2">
        {list &&
          list.data.map((item) => (
            <div className="w-full mt-8">
              <div className="blogs bg-white rounded-xl">
                <div className="image">
                  <div className="">
                    <Link href="/blog/blog-show">
                      <a>
                        {item.photos_link && (
                          <img
                            className="object-cover rounded-t-lg"
                            src={item.photos_link[0]}
                            width={600}
                            height={200}
                            alt=""
                          />
                        )}
                      </a>
                    </Link>
                  </div>
                </div>
                <div className="details p-4">
                  <div className="heading text-lg font-bold">{item.title}</div>
                  <div className="caption">
                    {item.description && item.description.substring(0, 100)}...
                  </div>
                </div>
                <div className="text-right">
                  <Link href="/blog/blog-show" className="">
                    <a>
                      <button
                        type="submit"
                        className=" bg-blue-500 text-sm text-white rounded-br-lg p-3 cursor-pointer"
                      >
                        Read More
                      </button>
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          ))}
      </div>

      <div className="add_new_button text-center mt-12">
        <Link href="" className="">
          <a>
            <button
              type="submit"
              className="border-2 border-blue-500 text-blue-500 text-md cursor-pointer font-bold py-2 px-4 rounded-full"
            >
              Show More
            </button>
          </a>
        </Link>
      </div>
    </div>
  );
};

export default BlogsDesign;
