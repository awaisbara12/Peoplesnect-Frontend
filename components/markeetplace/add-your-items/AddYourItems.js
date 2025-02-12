import { CloudUploadIcon, TrashIcon } from "@heroicons/react/outline";
import { Alert } from "@material-tailwind/react";
import { update } from "draft-js/lib/DefaultDraftBlockRenderMap";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CATEGORY_API, PRODUCT_API } from "../../../pages/config";
import { Country, State, City } from 'country-state-city';
import ShowAlert from "../../Alerts/Alertss";

const AddYourItems = () => {
  const [selectCategory, setselectCategory] = useState();  // map on category's select
  const [category, setcategory] = useState();
  const [name, setname] = useState();
  const [color, setcolor] = useState();
  const [price, setprice] = useState();
  const [feature, setfeature] = useState("feature");
  const [contact, setcontact] = useState();
  const [des, setdes] = useState();
  const [productPic, setproductPic] = useState([]);              // Image uploading credential
  const [P_productPic, setP_productPic] = useState([]);         //  Image Preview
  const [U_P_productPic, setU_P_productPic] = useState([]);     // Upload Pic Preview
  const [country, setcountry] = useState();
  const [countryName, setcountryName] = useState();             // Country name for db save
  const [city, setcity] = useState();
  const [states, setstates] = useState();
  const [stateName, setstateName] = useState();                 // state name for db save
  
  const [openalert, setopenalert] = useState(false); // For Alert Show
  const [alertbody, setalertbody] = useState(); // For Alert Body
  
  
  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
  // console.log("P_productPic",P_productPic)
  //   Bareer key
  if (typeof window !== "undefined") { var authKey = window.localStorage.getItem("keyStore"); }
  // Upload image
  const handleImagePost = (e) => {
    if(productPic && productPic.length>0 || P_productPic && P_productPic.length>0){
      const mergedata = [...productPic, ...e.target.files]
      setproductPic(mergedata);
      var pres = [];
      for (var i = 0; i < e.target.files.length; i++) {
        pres[i] = window.URL.createObjectURL(e.target.files[i]);
      }
      const mergedata1 = [...P_productPic, ...pres]
      setP_productPic(mergedata1)
    }
    else{
      setproductPic(e.target.files);
      var pres = [];
      for (var i = 0; i < e.target.files.length; i++) {
        pres[i] = window.URL.createObjectURL(e.target.files[i]);
      }
      setP_productPic(pres)
    }
  };
  // Remove preview
  function handleCoverReomve (index) {
    // console.log(value)
    // const index = P_productPic.indexOf(value);
    if (index !== -1) {
      const updatedArray = [...P_productPic];
      updatedArray.splice(index, 1);
      setP_productPic(updatedArray);

      if(productPic && productPic.length>0){
        const updatedArray1 = [...productPic];
        updatedArray1.splice(index, 1);
        setproductPic(updatedArray1);
      }
      
    }
    
    // console.log(e.target)
    // var a=productPic
    // a.splice()
    // setproductPic(prevArray => prevArray.filter((value, currentIndex) => currentIndex !== index));
    // const a=window.URL.revokeObjectURL(P_productPic[index]);
    // console.log(a)
    // setproductPic([]);
    // setproductPic(prevArray => {
    //   if (!Array.isArray(prevArray)) {
    //     return prevArray; // If prevArray is not an array, return it unchanged
    //   }
    //   return prevArray.filter((_, currentIndex) => currentIndex !== index);
    // });
    // const s =P_productPic;
    // console.log("before", s)
    // s.splice(index,1); 
    // console.log("after", s)
    // setP_productPic(s);
    // console.log("index",index+" aray "+aray)
  };
  const handleReomveUploadedPreview = () => {
    // setP_productPic(window.URL.revokeObjectURL(e.target.files));
    // setproductPic([]);
    setU_P_productPic([]);
  }
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
    dataForm.append("products[country]", countryName);
    dataForm.append("products[state]", stateName);
    dataForm.append("products[city]", city);
    fetch(PRODUCT_API, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      }, body: dataForm,
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          router.push("/markeet-place/marketplace-show?" + result.data.id);
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
          console.log("resultttttt",result.data)
          setcategory(result.data.category.id);
          setname(result.data.name);
          setcountry(result.data.country);
          setstates(result.data.state);
          setcity(result.data.city);
          setprice(result.data.price);
          setfeature(result.data.feature);
          setcontact(result.data.contact);
          setdes(result.data.description);
          setU_P_productPic(result.data.product_pic);
          // setP_productPic(result.data.product_pic);
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
          if (myArray && myArray[1]) {
            getEditableProduct();
          }
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getCategory();
  }, [])
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
    if(countryName && stateName){
      dataForm.append("products[country]", countryName);
      dataForm.append("products[state]", stateName);
    }else if(country && states){
      dataForm.append("products[country]", country);
      dataForm.append("products[state]", states);  
    }
    dataForm.append("products[city]", city);
    if (productPic && productPic.length != 0) {
      for (let i = 0; i < productPic.length; i++) {
        dataForm.append(`products[product_pic][]`, productPic[i]);
      }
    }
    // if (P_productPic && P_productPic.length != 0) {
    //   for (let i = 0; i < P_productPic.length; i++) {
    //     var a =P_productPic[i].split("blob:");
    //     if (a.length==1){
    //       dataForm.append(`products[preview_pic][]`, P_productPic[i]);
    //     }
    //   }
    // }
    fetch(PRODUCT_API + "/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      }, body: dataForm,
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setopenalert(true);
          setalertbody('Update Successfully')
          setTimeout(()=>{
            router.push("/markeet-place/marketplace-show?" + id);
          },2000)
        }
      })
      .catch((err) => console.log(err));
  }

  // Country handler
  const countryhandler=(e)=>{
    var a;
    if( e && e.target && e.target.value){
      a=e.target.value.split(",")
      // console.log(a);
      setcountry(a[0]);
      setcountryName(a[1]);
    }
  }
  // State handler
  const statehandler=(e)=>{
    var a;
    if( e && e.target && e.target.value){
      a=e.target.value.split(",")
      // console.log(a);
      setstates(a[0]);
      setstateName(a[1]);
    }
  }
  return (
    <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
      {openalert?(
        <ShowAlert openalert={openalert} setopenalert={setopenalert} body={alertbody}/>
      ):("")}
      <div className="bg-white p-5 rounded-xl">
        <div className="my-5 font-bold">Add Details About your Product</div>
        <div className="md:w-10/12 w-full mx-auto">
          <div className="border p-5 rounded-xl">
            <div className="">
              <div className="flex justify-between items-center flex-wrap mb-4">
                <label htmlFor="" className="font-semibold">
                Select your Product Category:
                </label>
                <select className="w-full md:w-96 bg-gray-100 py-2 px-3 mt-2 border-none rounded-xl focus:drop-shadow-indigo-400"
                  value={category} onChange={(e) => setcategory(e.target.value)} >
                  <option></option>
                  {selectCategory &&
                    selectCategory.map((i) => (
                      <option value={i.id} key={i.id}>{i.name}</option>
                    ))}
                </select>
              </div>
              <div className="flex justify-between items-center my-4 flex-wrap">
                <label htmlFor="" className="font-semibold">
                  Product Name:
                </label>
                <input
                  type="text"
                  name="search"
                  placeholder="Add Name"
                  value={name}
                  onChange={(e) => setname(e.target.value)}
                  className="w-full md:w-96 bg-gray-100 py-2 px-3 mt-2 border-none rounded-xl focus:drop-shadow-indigo-400"
                />
              </div>
              <div className="grid grid-cols-4 mt-5">
                <div className="text-lg font-medium">Location:</div>
                <div className="col-span-4 md:col-span-3">
                  <div className="grid grid-cols-3 gap-3">
                    <select onChange={countryhandler} className="placeholder:text-md text-gray-500  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none  w-full placeholder:pl-2 rounded-xl placeholder:py-2">
                     {country?(
                        <option value={country}>{country}</option>
                     ):(
                         <option disabled selected hidden>Country Name</option>
                      )}
                      {
                        Country.getAllCountries().map((item) => (
                          <option value={[item.isoCode,item.name]} key={item.isoCode}>{item.name}</option>
                        ))
                      }
                    </select>
                    {/* For State */}
                    <select onChange={statehandler} className="placeholder:text-md text-gray-500  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2">
                      {states?(
                        <option value={states}>{states}</option>
                       ):(
                        <option disabled selected hidden>State Name</option>
                       )
                      }
                      
                      {
                        State.getStatesOfCountry(country).map((item) => (
                          <option value={[item.isoCode,item.name]} key={item.name}>{item.name}</option>
                        ))
                      }
                    </select>
                    {/*  for city */}
                    <select onChange={e => setcity(e.target.value)} className="placeholder:text-md text-gray-500  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full placeholder:pl-2 rounded-full placeholder:py-2">
                    {city?(<option value={city}>{city}</option>):(<option disabled selected hidden>City Name</option>)}
                      
                      {
                        City.getCitiesOfState(country, states).map((item) => (
                          <option value={item.name} key={item.name}>{item.name}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
              </div>

              {/* product Color */}
              {/* <div className="flex justify-between items-center my-4 flex-wrap">
                <label htmlFor="" className="font-semibold">
                  Product Color:
                </label>
                <input
                  type="text"
                  name="search"
                  placeholder="Add Color"
                  value={color}
                  onChange={(e)=>setcolor(e.target.value)}
                  className="w-full md:w-96 bg-gray-100 py-2 px-3 mt-2 border-none rounded-xl focus:drop-shadow-indigo-400"
                />
              </div> */}

              <div className="flex justify-between items-center my-4 flex-wrap">
                <label htmlFor="" className="font-semibold">
                  Price:
                </label>
                <input
                  type="Number"
                  name=""
                  placeholder="Add Price"
                  value={price}
                  onChange={(e) => setprice(e.target.value)}
                  className="w-full md:w-96 bg-gray-100 py-2 px-3 mt-2 border-none rounded-xl focus:drop-shadow-indigo-400"
                />
              </div>

              {/* Product feature */}
              {/* <div className="flex justify-between items-center my-4 flex-wrap">
                <label htmlFor="" className="font-semibold">
                  Product feature:
                </label>
                <input
                  type="text"
                  name="search"
                  placeholder="Add Features"
                  value={feature}
                  onChange={(e)=>setfeature(e.target.value)}
                  className="w-full md:w-96 bg-gray-100 py-2 px-3 mt-2 border-none rounded-xl focus:drop-shadow-indigo-400"
                />
              </div> */}

              <div className="flex justify-between items-center my-4 flex-wrap">
                <label htmlFor="" className="font-semibold">
                  Phone Number:
                </label>
                <input
                  type="Number"
                  name=""
                  placeholder="Add Your Phone Number"
                  value={contact}
                  onChange={(e) => setcontact(e.target.value)}
                  className="w-full md:w-96 bg-gray-100 py-2 px-3 mt-2 border-none rounded-xl focus:drop-shadow-indigo-400"
                />
              </div>
            </div>
            <div className="flex flex-wrap justify-between my-4">
              <label htmlFor="" className="font-semibold">
                Add Description:
              </label>
              <div className="">
                <textarea
                  value={des}
                  onChange={(e) => setdes(e.target.value)}
                  className="placeholder:text-md bg-gray-100 placeholder:rounded-full  border-none mt-4 md:mt-0 w-[500px] md:w-96 rounded-xl"
                  placeholder="Write Description About Your Product....."
                  type="textarea"
                  name="search"
                  rows={5}
                  cols={10}
                />
              </div>
            </div>
            {/* {P_productPic && P_productPic != 0 ? ('') : ( */}
            <div className="flex justify-center flex-wrap w-full">
              <div className=" flex justify-center flex-wrap gap-4">
                {/*  Add/Uploaded Product Preview */}
                {P_productPic && P_productPic.length>0? (
                  <div className="flex flex-wrap gap-4" >
                    {P_productPic.map((i,j) => (
                      <div className="relative" key={i}>
                        <img
                          src={i}
                          key={i}
                          className="object-cover rounded-xl w-32 h-32"
                        />
                        <div className="absolute top-0 hover:shadow-4xl right-0 w-7 h-7 flex justify-center items-center bg-indigo-400 rounded-l-full">
                          <TrashIcon className="h-4 w-4 text-white" onClick={ ()=>handleCoverReomve(j)} />
                          {/* <div>
                          <p className="text-sm font-medium text-gray-900">
                            Delete
                          </p>
                        </div> */}
                        </div>
                      </div>
                    ))}
                  </div>) : 
                (
                  U_P_productPic && U_P_productPic.length>0? (
                    <div className="flex flex-wrap relative gap-4 border rounded-lg p-3" >
                      {U_P_productPic.map((i,j) => (
                        <div key={i}>
                          <img
                            src={i}
                            key={i}
                            className="object-cover rounded-xl w-32 h-32 ml-2"
                          />
                        </div>
                      ))}
                      <div className="flex w-10 h-10 p-2 bg-indigo-400 rounded-l-full absolute top-0 right-0 items-center gap-3 justify-center text-white pl-2">
                            <TrashIcon className="h-7 w-7 text-white" onClick={ ()=>handleReomveUploadedPreview()} />
                            {/* <div>
                            <p className="text-sm font-medium text-gray-900">
                              Delete
                            </p>
                          </div> */}
                          </div>
                    </div>) : 
                  ('')
                )}
                {/* Add Product Input */}
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col justify-center items-center w-36 h-36 bg-gray-50 rounded-lg border-2 border-gray-300 border-dashed cursor-pointer dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
                >
                  <div className="flex flex-col justify-center items-center p-2 text-center">
                    <CloudUploadIcon className="w-7 h-7 text-gray-400" />
                    <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
                      <span className="font-semibold">Click to upload</span> <span className="text-xs">
                      multiples can be selected
                        </span>
                    </p>
                  </div>
                </label>
                <input id="dropzone-file" type="file" multiple onChange={handleImagePost} className="hidden" />
              </div>
            </div>



            <div className="flex justify-center mt-7 cursor-pointer">
              {myArray && myArray[1] && country && city && states && name && category && feature && des && contact && price && (U_P_productPic.length !== 0 || productPic.length !== 0 || P_productPic.length !== 0) ? (
                <div onClick={() => UpdateProduct(myArray[1])}
                  className="bg-indigo-400 text-white p-3 rounded-xl font-bold">
                  Update Product
                </div>
              ) :
                (
                  name && country && states && city && category && feature && des && contact && price && productPic.length !== 0 ? (
                    <div onClick={() => createProduct()}
                      className="bg-indigo-400 text-white p-3 rounded-xl font-bold">
                      Post Your Product
                    </div>
                  )
                    :
                    (
                      <div className="bg-indigo-100 cursor-not-allowed text-white p-3 rounded-xl font-bold">
                        Post Your Product
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
