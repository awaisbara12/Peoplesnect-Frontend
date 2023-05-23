import React from "react";
import Link from "next/link";
import Image from "next/image";
import Blog1 from "../../public/images/pagecover.jpg";

const ShowAllBlogs = () => {
  return (
    <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
      <div className="">
        <div>
          <div className="flex justify-between align-item-center mt-12">
            <div className="text-lg font-bold">Suggested Articles</div>
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

export default ShowAllBlogs;
