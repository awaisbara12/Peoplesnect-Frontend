import Image from "next/image";
import React from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import productImage1 from "../../../public/images/71zny7BTRlL._AC_SX522_.jpg";
import productImage2 from "../../../public/images/intro-1645809394.jpg";
import productImage3 from "../../../public/images/airpodsprom.webp";
import productImage4 from "../../../public/images/Apple-AirPods-Pro-12.webp";
import productImage5 from "../../../public/images/266-hero.jpg";

const MarketplaceShow = () => {
  return (
    <div className="w-[720px] mx-auto">
      <div className="">
        <AliceCarousel>
          <Image
            src={productImage2}
            width={720}
            height={300}
            className="object-cover rounded-xl"
          />
          <Image
            src={productImage1}
            width={720}
            height={300}
            className="object-cover rounded-xl"
          />
          <Image
            src={productImage3}
            width={720}
            height={300}
            className="object-cover rounded-xl"
          />
          <Image
            src={productImage4}
            width={720}
            height={300}
            className="object-cover rounded-xl"
          />
          <Image
            src={productImage5}
            width={720}
            height={300}
            className="object-cover rounded-xl"
          />
        </AliceCarousel>
      </div>

      <div className="-mt-20 mr-3 flex justify-end">
        <div className="bg-blue-500 rounded-xl w-44 text-center py-3 text-white font-bold">
          Contect With Seller
        </div>
      </div>
      <div className="bg-white mt-10 p-5 rounded-xl">
        <div className="font-bold text-lg">Product Details</div>
        <div className="m-3 border rounded-xl">
          <div class="overflow-x-auto relative">
            <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead class="text-xs text-gray-900 uppercase dark:text-gray-400">
                <tr>
                  <th scope="col" class="py-3 px-6">
                    Product name
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Color
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Category
                  </th>
                  <th scope="col" class="py-3 px-6">
                    Price
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr class="bg-white dark:bg-gray-800">
                  <th
                    scope="row"
                    class="py-4 px-6 font-medium text-gray-900 whitespace-nowrap rounded-bl-xl dark:text-white"
                  >
                    Apple earpods Pro"
                  </th>
                  <td class="py-4 px-6">Sliver</td>
                  <td class="py-4 px-6">Earpods</td>
                  <td class="py-4 px-6 rounded-br-xl">$299</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="mt-5">
          <div className="font-semibold">Feature:</div>
          <div className="m-3 border rounded-xl p-2">
            <div className="my-1 font-semibold">Designed by Apple,</div>
            <div className="my-1 font-semibold">richer bass tones,</div>
            <div className="my-1 font-semibold">
              Greater protection from sweat and water,
            </div>
            <div className="my-1 font-semibold">
              Control music and video playback,
            </div>
            <div className="my-1 font-semibold">Answer and end calls,</div>
          </div>
        </div>
        <div className="mt-5">
          <div className="font-semibold">Overview:</div>
          <div className="m-3 border rounded-xl p-2">
            Unlike traditional, circular earbuds, the design of the EarPods is
            defined by the geometry of the ear. Which makes them more
            comfortable for more people than any other earbud-style headphones.
          </div>
        </div>
      </div>
    </div>
  );
};

export default MarketplaceShow;
