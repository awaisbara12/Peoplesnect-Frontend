import Image from "next/image";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import AliceCarousel1 from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import { CURENT_USER_LOGIN_API, MESSAGES_API, PRODUCT_API } from "../../../pages/config";
import { useRouter } from "next/router";
import Link from "next/link";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { useFormik } from "formik";
import { Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

const Productshow = [
  {
    name: "Name",
    color: "Color",
    Category: "Category",
    price: "price",
  },
];
const Productdetails = [
  {
    name: "EarPods Pro",
    color: "silver",
    Category: "Iphon EarPods",
    price: "28",
  },
];

const MarketplaceShow = () => {
  const [Product, setProduct] = useState();
  const [imagess, setimagess] = useState([]);
  const [CurrentUser, setCurrentUser] = useState();
  let [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
  // Bareer key
  if (typeof window !== "undefined") { var authKey = window.localStorage.getItem("keyStore"); }
  //  Get All product
  function product() {
    fetch(PRODUCT_API + "/" + myArray[1], {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setProduct(result.data)
          setimagess(result.data.product_pic)
        }
      })
      .catch((err) => console.log(err));
  }
  //  Create/ Send Messsage
  const SendMessage = async (r_id, image) => {
    const dataForm = new FormData();
    // dataForm.append("attachment_type", "image");
    dataForm.append("product_pic", image);
    dataForm.append("body", "Is this still available?");
    dataForm.append("recipient_id", r_id);
    await fetch(MESSAGES_API, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      }, body: dataForm,
    })
      .then((resp) => resp.json())
      .then((result) => {
        alert("Message sent successfully");

      })
      .catch((err) => console.log(err));
  }
  useEffect(() => {
    product();
  }, [myArray[1]])


  function closeModal() {
    setIsOpen(false);
  }

  function openModal(i) {
    // console.log(Product.product_pic)
    setimagess(i)
    setIsOpen(true);
  }
  return (
    <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
      {Product && Product.product_pic ? (
        <div className="bg-white rounded-xl">
          <AliceCarousel>
            {
              Product.product_pic.map((i) => (
                <img
                  src={i}
                  key={i}
                  className="md:object-cover object-contain cursor-zoom-in rounded-xl w-[1050px] h-[400px]"
                  onClick={()=>openModal(i)}
                />
              ))
            }
          </AliceCarousel>

          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-50 cursor-zoom-out"
              static={true}
              onClose={closeModal}
            >
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <div className="fixed inset-0 bg-black bg-opacity-90" />
              </Transition.Child>

              <div className="fixed inset-0 overflow-y-auto">
                <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0 scale-95"
                    enterTo="opacity-100 scale-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100 scale-100"
                    leaveTo="opacity-0 scale-95"
                  >
                    <Dialog.Panel className="w-[620px] rounded-xl xl:w-[980px] lg:w-[730px] md:w-[780px] text-left align-middle transition-all">
                      <div className="flex justify-end items-center mx-4">
                        {/* <XIcon
                          onClick={closeModal}
                          className="w-5 text-white h-5 cursor-zoom-out"
                        /> */}
                      </div>
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                      </Dialog.Title>
                      <div className="">
                        {/* <AliceCarousel>
                          {imagess &&
                           imagess.map((a) => (
                              <img
                                src={a}
                                key={a}
                                className="object-contain bg-white cursor-zoom-in rounded-4xl w-[1050px] h-[500px]"
                              />
                            ))
                          }
                        </AliceCarousel> */}
                        <img
                          src={imagess}
                          className="object-contain bg-white cursor-zoom-in rounded-4xl w-[1050px] h-[500px]"
                        />
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>

          {Product ? (
            <div className="flex items-center justify-between p-4 " >
              <div className="border-indigo-400 flex gap-1 text-xs italic font-light mt-4 p-2">
                <div className="font-bold">Posted At:</div>
                {Product.created_at}
              </div>
              {/* <Link href={{pathname: "/messaging-design", query:Product.user.id}}>
            <a> */}

              <div className="bg-indigo-400 rounded-xl w-44 text-center py-3 text-white font-bold" onClick={() => SendMessage(Product.user.id, Product.product_pic[0])}>
                Contect With Seller
              </div>
              {/* </a>
          </Link> */}
            </div>
          ) : ('')}
        </div>
      ) : ('')}
      {Product ? (
        <div className="bg-white mt-10 p-5 rounded-xl">
          <div className="font-bold text-lg">Product Details</div>

          <div className="m-3 border rounded-xl">
            <div className="overflow-x-auto relative">
              <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
                <thead className="text-xs text-gray-900 uppercase dark:text-gray-400">
                  <tr>
                    <th scope="col" className="py-3 px-6">
                      Title
                    </th>
                    {/* <th scope="col" className="py-3 px-6">
                        {Product.color}
                      </th> */}
                    <th scope="col" className="py-3 px-6">
                      Category
                    </th>
                    <th scope="col" className="py-3 px-6">
                      Price
                    </th>
                    {Product.country ? <th scope="col" className="py-3 px-6">
                      Location
                    </th> : ""}
                  </tr>
                </thead>
                <tr className="bg-white dark:bg-gray-800">
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap rounded-bl-xl dark:text-white">
                    {Product.name}
                  </th>
                  {/* <th scope="col" className="py-3 px-6">
                      {Product.color}
                    </th> */}
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap rounded-bl-xl dark:text-white">
                    {Product.category ? Product.category.name : ''}
                  </th>
                  <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap rounded-bl-xl dark:text-white">
                    ${Product.price}
                  </th>
                  {Product.country ? <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap rounded-bl-xl dark:text-white">
                    {Product.city ? Product.city + ", " : ""}{Product.state ? Product.state + ", " : ''}{Product.country},
                  </th> : ""}
                </tr>
              </table>
            </div>
          </div>

          {/* Feature */}
          {/* <div className="mt-5">
            <div className="font-semibold">Feature:</div>
            <div className="m-3 border rounded-xl p-2">
              <div className="my-1 font-semibold">{Product.feature}</div>
              <div className="my-1 font-semibold">richer bass tones,</div>
              <div className="my-1 font-semibold">
                Greater protection from sweat and water,
              </div>
              <div className="my-1 font-semibold">
                Control music and video playback,
              </div>
              <div className="my-1 font-semibold">Answer and end calls,</div>
            </div>
          </div> */}

          {/* Overview/description */}
          <div className="mt-5">
            <div className="font-semibold">Overview:</div>
            <div className="m-3 border rounded-xl break-words p-2">
              {Product.description}
            </div>
          </div>

          <div className="mt-5">
            <div className="font-semibold">Phone Number:</div>
            <div className="m-3 border rounded-xl p-2">
              {Product.contact}
            </div>
          </div>
        </div>
      ) : ('')}
    </div>
  );
};

export default MarketplaceShow;
