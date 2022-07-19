import React from "react";
import Link from "next/link";
import Image from "next/image";
import MainBanner from "../../../peoplesnect-frontend/public/images/main-banner.jpg";
import Second from "../../../peoplesnect-frontend/public/images/post-image.png";
import bg from "../../../peoplesnect-frontend/public/images/bg.webp";

const BlogsDesign = () => {
  return (
    <div className="w-[620px] lg:w-full md:w-full px-5 md:px-0 lg:px-0">
      <div className="flex gap-10 mt-8">
        <div className="w-1/2 md:w-80">
          <div className="blogs bg-white rounded-xl">
            <div className="image">
              <div className="">
                <Link href="/">
                  <a>
                    <Image
                      className="object-cover rounded-t-lg"
                      src={MainBanner}
                      width={400}
                      height={200}
                      alt=""
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div className="details p-4">
              <div className="heading text-2xl font-bold">Title Here</div>
              <div className="caption">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry'sLorem Ipsum is
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's.........
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
        <div className="w-1/2 md:w-80">
          <div className="blogs bg-white rounded-xl">
            <div className="image">
              <div className="">
                <Link href="/">
                  <a>
                    <Image
                      className="object-cover rounded-t-lg"
                      src={Second}
                      width={400}
                      height={200}
                      alt=""
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div className="details p-4">
              <div className="heading text-2xl font-bold">Title Here</div>
              <div className="caption">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry'sLorem Ipsum is
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's.........
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
      </div>
      <div className="flex gap-10 mt-8">
        <div className="w-1/2 md:w-80">
          <div className="blogs bg-white rounded-xl">
            <div className="image">
              <div className="">
                <Link href="/">
                  <a>
                    <Image
                      className="object-cover rounded-t-lg"
                      src={bg}
                      width={400}
                      height={200}
                      alt=""
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div className="details p-4">
              <div className="heading text-2xl font-bold">Title Here</div>
              <div className="caption">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry'sLorem Ipsum is
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's.........
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
        <div className="w-1/2 md:w-80">
          <div className="blogs bg-white rounded-xl">
            <div className="image">
              <div className="">
                <Link href="/">
                  <a>
                    <Image
                      className="object-cover rounded-t-lg"
                      src={Second}
                      width={400}
                      height={200}
                      alt=""
                    />
                  </a>
                </Link>
              </div>
            </div>
            <div className="details p-4">
              <div className="heading text-2xl font-bold">Title Here</div>
              <div className="caption">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry'sLorem Ipsum is
                simply dummy text of the printing and typesetting industry.
                Lorem Ipsum has been the industry's.........
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
