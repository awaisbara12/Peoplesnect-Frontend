import React from "react";
import Link from "next/link";
import Image from "next/image";
import MainBanner from "../../../peoplesnect-frontend/public/images/main-banner.jpg";
import ProfileAvatar from "../../../peoplesnect-frontend/public/images/profile-avatar.png";
import Profileimg from "../../../peoplesnect-frontend/public/images/mira.png";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { ChevronRightIcon } from "@heroicons/react/solid";

function BlogShow() {
  return (
    <div className="px-10 w-[620px] xl:w-full">
      <div className="blogs bg-white rounded-xl my-8 ">
        <div className="image">
          <div className="">
            <Link href="/">
              <a>
                <Image
                  className="object-cover rounded-lg"
                  src={MainBanner}
                  width={900}
                  height={500}
                  alt=""
                />
              </a>
            </Link>
          </div>
        </div>
        <div className=" details p-10">
          <div className="heading text-2xl font-bold">Title Here....</div>
          <div className="caption text-lg mt-4">
            Lorem Ipsum is simply dummy text of the printing and typesetting
            industry. Lorem Ipsum has been the industry'sLorem Ipsum is simply
            dummy text of the printing and typesetting industry. Lorem Ipsum has
            been the industry'Lorem Ipsum has been the industry'sLorem Ipsum is
            simply dummy text of the printing and typesetting industry Lorem
            Ipsum has been the industry'sLorem Ipsum is simply dummy text of the
            printing and typesetting industry Lorem Ipsum has been the
            industry'sLorem Ipsum is simply dummy text of the printing and
            typesetting industry Lorem Ipsum has been the industry'sLorem Ipsum
            is simply dummy text of the printing and typesetting industry
          </div>
        </div>
      </div>
      <div className="comment-section mt-18">
        <div className="comments-heading text-4xl font-bold">
          Comments Section...
        </div>
        <div className="bg-white rounded-xl my-8 p-4">
          <div className="comments">
            <div className="">
              <div className="flex justify-between">
                <Link href="/">
                  <a className="flex gap-4">
                    <Image src={Profileimg} width={35} height={35} alt="" />
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
                If you’re like me, you are probably tired of and confused by
                reading and listening to different opinions about the metaverse
                these days. From Facebook changing their name to Meta to
                Disney’s CEO saying that Disney+ will be their own metaverse as
                well as Microsoft paying 70 billion dollars for Activision as
                part of their metaverse strategy, the list of big tech and media
                companies investing billions of dollars in the "metaverse
                category" continues to grow exponentially. So what is the
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
                <button className="bg-blue-500 p-2 flex rounded-r-full text-white">
                  <ChevronRightIcon className="h-[23px] w-6" />
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
