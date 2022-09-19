import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { ChevronRightIcon } from "@heroicons/react/solid";
import ProfileAvatar from "../../public/images/profile-avatar.png";
import Spinner from "../common/Spinner";
import { BLOG_POST_USER_API_KEY } from "/pages/config";

function BlogShow() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);
  const router = useRouter();
  const { id } = router.query;

  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }

  useEffect(() => {
    setLoading(true);
    const getBlogs = async () => {
      const res = await axios(BLOG_POST_USER_API_KEY + "/" + id, {
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
      } catch (error) {}
      setLoading(false);
      return result;
    };
    getBlogs();
  }, [id]);

  if (loading)
    return (
      <div className="mt-8">
        <Spinner />
      </div>
    );

  return (
    <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
      <div className="blogs bg-white rounded-xl my-8 ">
        <div className="image">
          <div className="">
            <Link href="/">
              <a>
                {list.data.photos_link && (
                  <img
                    className="object-cover rounded-t-lg h-[400px]"
                    src={list.data.photos_link[0]}
                    width={1000}
                    height={400}
                    alt=""
                  />
                )}
              </a>
            </Link>
          </div>
        </div>
        <div className=" details p-10">
          <div className="heading text-2xl font-bold">{list.data.title}</div>
          <div className="caption text-lg mt-4">{list.data.description}</div>
        </div>
      </div>
      <div className="comment-section mt-18">
        <div className="comments-heading text-4xl font-bold">Comments</div>
        <div className="bg-white rounded-xl my-8 p-4">
          <div className="comments">
            <div className="">
              <div className="flex justify-between">
                <Link href="/">
                  <a className="flex gap-4">
                    <Image src={ProfileAvatar} width={35} height={35} alt="" />
                    <div className="">
                      <div className="User-Name text-lg font-bold">
                        User Name
                      </div>
                    </div>
                  </a>
                </Link>
                <div className="flex gap-2">
                  <Link href="">
                    <a>
                      <PencilIcon className="h-5 w-5" />
                    </a>
                  </Link>
                  <Link href="">
                    <a>
                      <TrashIcon className="h-5 w-5" />
                    </a>
                  </Link>
                </div>
              </div>
              <div className="comment pl-14 text-sm">
                If youre like me, you are probably tired of and confused by
                reading and listening to different opinions about the metaverse
                these days. From Facebook changing their name to Meta to Disneys
                CEO saying that Disney+ will be their own metaverse as well as
                Microsoft paying 70 billion dollars for Activision as part of
                their metaverse strategy, the list of big tech and media
                companies investing billions of dollars in the metaverse
                category continues to grow exponentially. So what is the
                metaverse? Today,
              </div>
            </div>
          </div>
        </div>
        <div className="input-comment">
          <div className="relative flex items-center gap-3">
            <Link href="/">
              <a className="">
                <Image src={ProfileAvatar} width={35} height={35} alt="" />
              </a>
            </Link>
            <input
              type="text"
              placeholder="Add New Comment....."
              className="w-full rounded-full"
            />
            <div className="absolute top-0 right-0">
              <div className="flex gap-2">
                <button className="bg-indigo-400 p-2 flex rounded-r-full text-white">
                  <ChevronRightIcon className="h-[25px] w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BlogShow;
