import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from 'next/router'
import ProfileAvatar from "../../../peoplesnect-frontend/public/images/profile-avatar.png";
import Profileimg from "../../../peoplesnect-frontend/public/images/mira.png";
import Spinner from "../common/Spinner";
import { BLOG_POST_USER_API_KEY } from "/pages/config";

function BlogShow() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([])
  const router = useRouter()
  const { id } = router.query

  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");

  }

  useEffect(() => {
    setLoading(true)
    const getBlogs = async () => {
      const res = await axios(BLOG_POST_USER_API_KEY+'/'+id, {
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
          console.log(result)
          setList(result.data);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
      return result;
    };
    getBlogs();
  }, [])

  if (loading)
    return (
      <div className="mt-8">
        <Spinner />
      </div>
    );

  return (
    <div className="px-10 w-[620px] xl:w-full">
      <div className="blogs bg-white rounded-xl my-8 ">
        <div className="image">
          <div className="">
            <Link href="/">
              <a>
                {list.data.photos_link &&
                  <img
                    className="object-cover rounded-t-lg"
                    src={list.data.photos_link[0]}
                    width={900}
                    height={500}
                    alt=""
                  />
                }
              </a>
            </Link>
          </div>
        </div>
        <div className=" details p-10">
          <div className="heading text-6xl font-bold">{list.data.title}</div>
          <div className="caption text-xl mt-4">
            {list.data.description}
          </div>
        </div>
      </div>
      <div className="comment-section mt-18">
        <div className="comments-heading text-4xl font-bold">
          Comments
        </div>
        <div className="bg-white rounded-xl my-8 p-4">
          <div className="comments">
            <div className="">
              <div className="flex justify-between">
                <Link href="/">
                  <a className="flex gap-4">
                    <Image src={Profileimg} width={35} height={35} alt="" />
                    <div className="">
                      <div className="User-Name text-xl font-bold">
                        User Name
                      </div>
                      <div className="location text-xs font-bold">
                        User Location
                      </div>
                    </div>
                  </a>
                </Link>
                <div className="flex gap-2">
                  <Link href="">
                    <a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                        />
                      </svg>
                    </a>
                  </Link>
                  <Link href="">
                    <a>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-5 w-5"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth="2"
                      >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                      />
                      </svg>
                    </a>
                  </Link>
                </div>
              </div>
              <div className="comment pl-14 text-sm mt-2">
                If youre like me, you are probably tired of and confused by
                reading and listening to different opinions about the metaverse
                these days. From Facebook changing their name to Meta to
                Disneys CEO saying that Disney+ will be their own metaverse as
                well as Microsoft paying 70 billion dollars for Activision as
                part of their metaverse strategy, the list of big tech and media
                companies investing billions of dollars in the metaverse
                category continues to grow exponentially. So what is the
                metaverse? Today,
              </div>
            </div>
          </div>
        </div>
        <div className="input-comment">
          <div className="relative flex gap-3">
            <Link href="/">
              <a className="">
                <Image src={ProfileAvatar} width={35} height={35} alt="" />
              </a>
            </Link>
            <input type="text" placeholder="Add New Comment....." className="w-full rounded-full" />
            <div className="absolute top-3 right-3">
              <div className="flex gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
                </svg>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                <path
                  fillRule="evenodd"
                  d="M4 3a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V5a2 2 0 00-2-2H4zm12 12H4l4-8 3 6 2-4 3 6z"
                  clipRule="evenodd"
                />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogShow;
