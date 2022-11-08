import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Spinner from "../common/Spinner";
import Blog1 from "../../public/images/pagecover.jpg";
import { BLOG_POST_USER_API_KEY } from "/pages/config";

const SuggestedBlogs = () => {
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
    <div className="w-[600px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
      <div className="">
        <div>
          <div className="flex justify-between align-item-center mt-12">
          <div className="text-lg font-bold">Suggested Articles</div>
          <div className="add_new_button text-center">
            <Link href="/blog//Show-All-Blogs" className="">
            <a href="">
                <button
                  type="submit"
                  className="border-2 border-indigo-400 text-indigo-400 text-md cursor-pointer font-bold py-2 px-4 rounded-full"
                >
                  Show All
                </button>
              </a>
            </Link>
          </div>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-3 lg:grid-cols-2 md:grid-cols-2">
          <div
            className="w-full mt-8 blogs bg-white rounded-xl"
          >
            <div className="">
              <div className="image">
                <div className="">
                  <Link
                    href=""
                  >
                    <a>
                        <Image
                          className="object-cover rounded-t-lg h-56"
                          src={Blog1}
                          width={600}
                          min-height={400}
                        />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="details">
                <div className="heading text-lg p-4 font-bold">
                  Ibrar zahid
                </div>
                <div className="text-right">
                  <Link
                    href=""
                    className=""
                  >
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
          <div
            className="w-full mt-8 blogs bg-white rounded-xl"
          >
            <div className="">
              <div className="image">
                <div className="">
                  <Link
                    href=""
                  >
                    <a>
                        <Image
                          className="object-cover rounded-t-lg h-56"
                          src={Blog1}
                          width={600}
                          min-height={400}
                        />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="details">
                <div className="heading text-lg p-4 font-bold">
                  Ibrar zahid
                </div>
                <div className="text-right">
                  <Link
                    href=""
                    className=""
                  >
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
          <div
            className="w-full mt-8 blogs bg-white rounded-xl"
          >
            <div className="">
              <div className="image">
                <div className="">
                  <Link
                    href=""
                  >
                    <a>
                        <Image
                          className="object-cover rounded-t-lg h-56"
                          src={Blog1}
                          width={600}
                          min-height={400}
                        />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="details">
                <div className="heading text-lg p-4 font-bold">
                  Ibrar zahid
                </div>
                <div className="text-right">
                  <Link
                    href=""
                    className=""
                  >
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
        </div>
      </div>
    </div>
  );
};

export default SuggestedBlogs;