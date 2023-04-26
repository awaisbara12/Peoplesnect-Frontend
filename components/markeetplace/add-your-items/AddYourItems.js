import { CloudUploadIcon, TrashIcon } from "@heroicons/react/outline";
import { Alert } from "@material-tailwind/react";
import { update } from "draft-js/lib/DefaultDraftBlockRenderMap";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CATEGORY_API, PRODUCT_API } from "../../../pages/config";
import { Country, State, City }  from 'country-state-city';

const AddYourItems = () => {
  const [selectCategory, setselectCategory] = useState();  // map on category's select
  const [category, setcategory] = useState();
  const [name, setname] = useState();
  const [color, setcolor] = useState();
  const [price, setprice] = useState();
  const [feature, setfeature] = useState("feature");
  const [contact, setcontact] = useState();
  const [des, setdes] = useState();
  const [productPic, setproductPic] = useState([]);
  const [P_productPic, setP_productPic] = useState([]);
  const [country, setcountry] = useState();
  const [city, setcity] = useState();
  const [states, setstates] = useState();
  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
  //   Bareer key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }
  // Upload image
  const handleImagePost = (e) => {
    setproductPic(e.target.files);
    var pres=[];
    for (var i=0; i<e.target.files.length; i++)
    {
        pres[i] = window.URL.createObjectURL(e.target.files[i]);
    }
    setP_productPic(pres)
  };
  // Remove preview
  const handleCoverReomve = (e) => {
    setP_productPic(window.URL.revokeObjectURL(e.target.files));
    setproductPic([]);
  };
  // create/upload product
  function createProduct() {
    const dataForm = new FormData();
      for (let i = 0; i < productPic.length; i++) {
        dataForm.append(`products[product_pic][]`, productPic[i]);
      }
    dataForm.append("products[feature]", feature);
    dataForm.append("products[category_id]", category);
    dataForm.append("products[name]", name);
    dataForm.append("products[price]", price);
    setfeature('')
    dataForm.append("products[contact]", contact);
    dataForm.append("products[description]", des);
    dataForm.append("products[country]", country);
    dataForm.append("products[state]", states);
    dataForm.append("products[city]", city);
    fetch(PRODUCT_API, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },body:dataForm,
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          router.push("/markeet-place/marketplace-show?"+result.data.id);
          // setselectCategory('');
          // setcategory('');
          // setname('');
          // setcolor('');
          // setprice('');
          // setfeature('');
          // setcontact('');
          // setdes('');
          // setP_productPic('');
          // setproductPic([])
        }
      })
      .catch((err) => console.log(err));
  }
  // get data to edit
  function getEditableProduct() {
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
          console.log(result.data)
          setcategory(result.data.category.id);
          setname(result.data.name);
          setcountry(result.data.country);
          setstates(result.data.state);
          setcity(result.data.city);
          setprice(result.data.price);
          setfeature(result.data.feature);
          setcontact(result.data.contact);
          setdes(result.data.description);
          setP_productPic(result.data.product_pic);
        }
      })
      .catch((err) => console.log(err));
  }
  // get all category
  function getCategory() {
    fetch(CATEGORY_API, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setselectCategory(result.data)
          if(myArray && myArray[1])
          {
            getEditableProduct();
          }
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getCategory();
  },[])
// Update product
function UpdateProduct(id) {
  const dataForm = new FormData();
  
  dataForm.append("products[feature]", feature);
  dataForm.append("products[category_id]", category);
  dataForm.append("products[name]", name);
  setfeature('');
  dataForm.append("products[price]", price);
  dataForm.append("products[contact]", contact);
  dataForm.append("products[description]", des);
  dataForm.append("products[country]", country);
  dataForm.append("products[state]", states);
  dataForm.append("products[city]", city);
  if(productPic && productPic.length!=0){
    for (let i = 0; i < productPic.length; i++) {
      dataForm.append(`products[product_pic][]`, productPic[i]);
    }
  }
  fetch(PRODUCT_API+"/"+id, {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },body:dataForm,
  })
    .then((resp) => resp.json())
    .then((result) => {
      if (result) {
        alert('Update Successfully')
        // router.push("/markeet-place/my-listing");
      }
    })
    .catch((err) => console.log(err));
}
  return (
    <div className="">
      <div className="bg-white p-5 rounded-xl">
        <div className="my-5 font-bold">Add Details About Ur Product</div>
        <div className="w-10/12 mx-auto">
          <div className="border p-5 rounded-xl">
            <div className="">
              <div className="flex justify-between items-center mb-4">
                <label htmlFor="" className="font-semibold">
                  Type Your Product Category:
                </label>
                <select className="w-96 bg-gray-100 py-2 px-3 mt-2 border-none rounded-xl focus:drop-shadow-indigo-400"  
                   value={category} onChange={(e)=>setcategory(e.target.value)} >
                    <option></option>
                    {selectCategory &&
                      selectCategory.map((i)=>(
                        <option value={i.id} key={i.id}>{i.name}</option>
                      ))}
                </select>
              </div>
              <div className="flex justify-between items-center my-4">
                <label htmlFor="" className="font-semibold">
                  Product Name:
                </label>
                <input
                  type="text"
                  name="search"
                  placeholder="Add Name"
                  value={name}
                  onChange={(e)=>setname(e.target.value)}
                  className="w-96 bg-gray-100 py-2 px-3 mt-2 border-none rounded-xl focus:drop-shadow-indigo-400"
                />
              </div>

              <div className="grid grid-cols-4 mt-5">
                <div className="text-lg font-medium">Location:</div>
                {/* <div></div> */}
                <div className="flex gap-5">
                  <select onChange={e=>setcountry(e.target.value)} className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none  w-40 lg:w-54 xs:w-auto md:w-52 placeholder:pl-2 rounded-xl placeholder:py-2">
                    <option value={country}>{country}</option>
                    {
                      Country.getAllCountries().map((item)=>(
                        <option value={item.isoCode} key={item.isoCode}>{item.name}</option>
                      ))  
                    }
                  </select>
                  {/* For State */}
                  <select onChange={e=>setstates(e.target.value)} className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-40 lg:w-54 xs:w-auto md:min-w-[13rem] placeholder:pl-2 rounded-full placeholder:py-2">
                    <option value={states}>{states}</option>
                    {
                      State.getStatesOfCountry(country).map((item)=>(
                        <option value={item.isoCode} key={item.name}>{item.name}</option>
                      ))  
                    }
                  </select>
                  {/*  for city */}
                  <select onChange={e=>setcity(e.target.value)} className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-40 lg:w-54 xs:w-auto md:min-w-[13rem] placeholder:pl-2 rounded-full placeholder:py-2">
                    <option value={city}>{city}</option>
                    {
                      City.getCitiesOfState(country, states).map((item)=>(
                        <option value={item.name} key={item.name}>{item.name}</option>
                      ))  
                    }
                  </select>
                </div>
              </div>
              
              {/* product Color */}
              {/* <div className="flex justify-between items-center my-4">
                <label htmlFor="" className="font-semibold">
                  Product Color:
                </label>
                <input
                  type="text"
                  name="search"
                  placeholder="Add Color"
                  value={color}
                  onChange={(e)=>setcolor(e.target.value)}
                  className="w-96 bg-gray-100 py-2 px-3 mt-2 border-none rounded-xl focus:drop-shadow-indigo-400"
                />
              </div> */}

              <div className="flex justify-between items-center my-4">
                <label htmlFor="" className="font-semibold">
                  Price:
                </label>
                <input
                  type="Number"
                  name=""
                  placeholder="Add Price"
                  value={price}
                  onChange={(e)=>setprice(e.target.value)}
                  className="w-96 bg-gray-100 py-2 px-3 mt-2 border-none rounded-xl focus:drop-shadow-indigo-400"
                />
              </div>
              
              {/* Product feature */}
              {/* <div className="flex justify-between items-center my-4">
                <label htmlFor="" className="font-semibold">
                  Product feature:
                </label>
                <input
                  type="text"
                  name="search"
                  placeholder="Add Features"
                  value={feature}
                  onChange={(e)=>setfeature(e.target.value)}
                  className="w-96 bg-gray-100 py-2 px-3 mt-2 border-none rounded-xl focus:drop-shadow-indigo-400"
                />
              </div> */}

              <div className="flex justify-between items-center my-4">
                <label htmlFor="" className="font-semibold">
                  Phone Number:
                </label>
                <input
                  type="Number"
                  name=""
                  placeholder="Add Your Phone Number"
                  value={contact}
                  onChange={(e)=>setcontact(e.target.value)}
                  className="w-96 bg-gray-100 py-2 px-3 mt-2 border-none rounded-xl focus:drop-shadow-indigo-400"
                />
              </div>
            </div>
            <div className="flex justify-between my-4">
              <label htmlFor="" className="font-semibold">
                Add Description:
              </label>
              <div className="">
                <textarea
                  value={des}
                  onChange={(e)=>setdes(e.target.value)}
                  className="placeholder:text-md bg-gray-100 placeholder:rounded-full  border-none w-96 rounded-xl"
                  placeholder="Write Description About Your Product....."
                  type="textarea"
                  name="search"
                  rows={5}
                  cols={10}
                />
              </div>
            </div>
            {P_productPic && P_productPic!=0?(''):(
            <div className="flex justify-between w-full">
              <div className="font-semibold">Add Photos:</div>
              <label
                htmlFor="dropzone-file"
                className="flex flex-col justify-center items-center w-96 h-32 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
              >
                <div className="flex flex-col justify-center items-center pt-5 pb-6">
                  <CloudUploadIcon className="w-10 h-10 text-gray-400" />
                  <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                    <span className="font-semibold">Click to upload</span> your
                    items (multiples can be selected)
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    SVG, PNG, JPG
                  </p>
                </div>
              </label>
              <input id="dropzone-file" type="file" multiple onChange={handleImagePost} className="hidden" />
            </div>)}
            {P_productPic && P_productPic!=0?(
            <div className="flex justify-center ">
              {P_productPic.map((i)=>(
                <img
                  src={i}
                  key={i}
                  className="object-cover rounded-xl w-[100px] h-[100px] ml-2"
                />
              ))}
              <div className="flex items-center gap-3 justify-center text-white pl-2">
                <TrashIcon className="h-5 w-5 text-gray-900" onClick={()=>{setP_productPic([])}} />
                {/* <div>
                  <p className="text-sm font-medium text-gray-900">
                    Delete
                  </p>
                </div> */}
              </div>
            </div>):('')}
            <div className="flex justify-center mt-7">
              {myArray && myArray[1] && country && city && states && name && category && feature && des && contact && price && (productPic.length!==0 || P_productPic.length!==0)?(
                <div onClick={()=>UpdateProduct(myArray[1])}
                  className="bg-indigo-400 text-white p-3 rounded-xl font-bold">
                  Update Product
                </div>
              ):
              (
              name && country && states && city && category && feature && des && contact && price && productPic.length!==0?(
              <div onClick={()=>createProduct()}
                className="bg-indigo-400 text-white p-3 rounded-xl font-bold">
                Post Your Add
              </div>
              )
              :
              (
                <div className="bg-indigo-100 cursor-not-allowed text-white p-3 rounded-xl font-bold">
                  Disabled
                </div>
              ))}
            </div>

                 
                  

          </div>
        </div>
      </div>
    </div>
  );
};

export default AddYourItems;
