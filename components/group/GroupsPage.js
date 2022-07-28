import React from "react";
import Link from "next/link";
import Image from "next/image";
import postimage from "../../public/images/752126.jpg";

const GroupsPage = () => {
  return (
    <div className="mt-8">
      <div className="px-10 w-[620px] xl:w-full">
        <div className="blogs bg-white rounded-xl">
          <div className="image">
            <Link href="/">
              <a>
                <Image
                  src={postimage}
                  className="object-cover rounded-xl"
                  width={700}
                  height={250}
                  alt=""
                />
              </a>
            </Link>
          </div>
          <div className=" details p-5">
            <div className="heading text-2xl text-blue-500 font-bold">
              Group Name
            </div>
            <div className="caption text-lg font-extralight">
              Group Discraption in Details
            </div>
            <div className="font-extralight">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
              enim ad minim veniam, quis nostrud exercitation ullamco laboris
              nisi ut aliquip ex ea commodo consequat
              <a href="" className="ml-4 font-bold text-blue-500">
                Read More...
              </a>
            </div>
            <div className="mt-4">Group Type : <a href="" className="text-blue-500 font-bold">  Private</a></div>
            <div className="button text-center mt-4">
              <a href="">
                <div className="bg-blue-500 border border-blue-500 text-white font-bold px-3 py-2 rounded-full hover:bg-transparent hover:text-blue-500">
                  Join Group
                </div>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupsPage;
