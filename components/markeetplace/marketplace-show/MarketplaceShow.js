import Image from "next/image";
import React, { useEffect, useState } from "react";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import productImage1 from "../../../public/images/71zny7BTRlL._AC_SX522_.jpg";
import productImage2 from "../../../public/images/intro-1645809394.jpg";
import productImage3 from "../../../public/images/airpodsprom.webp";
import productImage4 from "../../../public/images/Apple-AirPods-Pro-12.webp";
import productImage5 from "../../../public/images/266-hero.jpg";
import { CURENT_USER_LOGIN_API, MESSAGES_API, PRODUCT_API } from "../../../pages/config";
import { useRouter } from "next/router";
import Link from "next/link";

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
  const [CurrentUser, setCurrentUser] = useState();
  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
  // Bareer key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }
  //  Get All product
  function product() {
    fetch(PRODUCT_API+"/"+myArray[1], {
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
        }
      })
      .catch((err) => console.log(err));
  }
  //  Create/ Send Messsage
  const SendMessage=async(r_id, image)=>{
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
        },body: dataForm,
      })
        .then((resp) => resp.json())
        .then((result) => {
            alert("Message sent successfully");
         
        })
        .catch((err) => console.log(err)); 
  }
  useEffect(() => {
    product();
  },[myArray[1]])

  return (
    <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
      {Product && Product.product_pic?(
      <div className="bg-white rounded-xl">
        <AliceCarousel>
        {
         Product.product_pic.map((i)=>(
            <img
              src={i}
              key={i}
              className="md:object-cover object-contain rounded-xl w-[1050px] h-[300px] hover:h-auto "
            />
          ))
        }
        </AliceCarousel>
       
      {Product?(
        <div className="mr-3 flex justify-end" >
          {/* <Link href={{pathname: "/messaging-design", query:Product.user.id}}>
            <a> */}
              <div className="bg-indigo-400 rounded-xl w-44 mb-4 text-center py-3 text-white font-bold" onClick={()=>SendMessage(Product.user.id,Product.product_pic[0] )}>
                Contect With Seller
              </div>
            {/* </a>
          </Link> */}
        </div>
      ):('')}
      </div>
      ):('')}
      {Product?(
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
                      {Product.country?<th scope="col" className="py-3 px-6">
                        Location
                      </th>:""}
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
                      {Product.category?Product.category.name:''}
                    </th>
                    <th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap rounded-bl-xl dark:text-white">
                      ${Product.price}
                    </th>
                    {Product.country?<th scope="row" className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap rounded-bl-xl dark:text-white">
                    {Product.city?Product.city+", ":""}{Product.state?Product.state+", ":''}{Product.country}, 
                    </th>:""}
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
      ):('')}
    </div>
  );
};

export default MarketplaceShow;
