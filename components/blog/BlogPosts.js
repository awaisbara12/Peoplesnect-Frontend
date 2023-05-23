import React, { useEffect, useState } from "react";
import axios from "axios";
import { BLOG_POST_USER_API_KEY } from "../../pages/config";
import Spinner from "../common/Spinner";
import Link from "next/link";
import NewPost from "./NewPost";

const BlogPosts = () => {
  const [loading, setLoading] = useState(true);
  const [getBlog, setGetBlog] = useState(null);

  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }

  useEffect(() => {
    setLoading(true);
    const getBlogPosts = async () => {
      const res = await fetch(BLOG_POST_USER_API_KEY, {
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
      const result = await res.json();

      try {
        if (result) {
          setGetBlog(result);
        }
      } catch (error) {
        console.log(error);
      }
    };
    setLoading(false);
    getBlogPosts();
  }, []);

  if (loading)
    return (
      <div className="mt-8">
        <Spinner />
      </div>
    );

  return (
    <div className="mt-7">
      <div className="mb-6">
        <NewPost />
      </div>
      {/* {getBlog &&
        getBlog.data.map((item) => (
          <article
            key={item.id}
            className="w-[620px]rounded-xl bg-white p-[22px] mb-4"
          >
            <img
              src={item.photos_link}
              className="aspect-video object-cover rounded-2xl"
              alt=""
            />
            <Link href={`/blog/${item.title}`}>
              <h1 className="pt-2 font-semibold text-lg cursor-pointer">
                {item.title}
              </h1>
            </Link>
          </article>
        ))} */}
    </div>
  );
};

export default BlogPosts;
