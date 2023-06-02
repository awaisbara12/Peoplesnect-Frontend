import React, { useEffect,useState } from "react";
import { UPDATE_PERSONAL_INFO,CURENT_USER_LOGIN_API } from "../../../pages/config";
import { Country, State, City }  from 'country-state-city';

const PersonalInfo = () => {
  const [userDetails, setUserDetails] = useState();
  const [first_name, setfirst_name] = useState();
  const [last_name, setlast_name] = useState();
  const [country, setcountry] = useState();           // coutry Code for Fetching State
  const [countryName, setcountryName] = useState();   // Country name for db save
  const [city, setcity] = useState();
  const [states, setstates] = useState();             // state Code for Fetching State
  const [stateName, setstateName] = useState();                 // state name for db save
  const [seleccountry, setseleccountry] = useState();
  
  // Bareer Key
  if (typeof window !== "undefined") { var authKey = window.localStorage.getItem("keyStore"); }
  //for update
  const UpdatePersonal=async()=>{
    await fetch(`${UPDATE_PERSONAL_INFO}?users[city]=${city}&users[country]=${countryName}&users[first_name]=${first_name}&users[last_name]=${last_name}&users[state]=${stateName}`, {
    method: "PUT",
     headers: {
      Accept: "application/json", 
       Authorization: `${authKey}`,
     },
  })
     .then((resp) => resp.json())
    .then((result) => {
      if (result) {
        setUserDetails(result.data.id); 
        alert("Your Information has been Updated! ") 
      }
    })
    .catch((err) => console.log(err));
  }
   // for current user
  const Current_User=async()=>{    
   
    await fetch(CURENT_USER_LOGIN_API, {
      method: "GET",
       headers: {
        Accept: "application/json", 
         Authorization: `${authKey}`,
       },
    })
       .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setUserDetails(result.data.id);  
          console.log("Current Userss",result.data)
          setfirst_name(result.data.first_name);
          setlast_name(result.data.last_name);
          setcountry(result.data.country);
          setcity(result.data.city);
          setstates(result.data.state)
        }
      })
      .catch((err) => console.log(err)); 
  }
  useEffect(()=>{
    Current_User();
  },[])
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
    <div>
      <div className="mt-8">
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
          <div className="">
            <div className="heading text-lg font-bold">
              Personal Information
            </div>
            <div className="border bg-white w-[740px] mx-auto mt-4 p-10 rounded-xl">
              <div className="grid grid-cols-3 mt-5">
                <div className="text-lg font-medium">Name:</div>
                <div className="flex gap-7">
                  <input
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-40 lg:w-54 xs:w-auto md:w-52 placeholder:pl-2 rounded-full placeholder:py-2"
                    placeholder="First Name"
                    value={first_name}
                    onChange={(e)=>setfirst_name(e.target.value)}
                    type="text"
                    name="search"
                  />
                  <input
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-40 lg:w-54 xs:w-auto md:w-52 placeholder:pl-2 rounded-full placeholder:py-2"
                    placeholder="Last Name"
                    value={last_name}
                    onChange={(e)=>setlast_name(e.target.value)}
                    type="text"
                    name="search"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 mt-5">
                <div className="text-lg font-medium">Location:</div>
                <div className="flex gap-7">
                  {/* For Country */}
                  <select onChange={countryhandler} className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-40 lg:w-54 xs:w-auto md:w-52 placeholder:pl-2 rounded-full placeholder:py-2">
                    <option value={country}>{country}</option>
                    {
                      Country.getAllCountries().map((item)=>(
                        <option value={[item.isoCode,item.name]} key={item.isoCode}>{item.name}</option>
                      ))  
                    }
                  </select>
                  {/* For State */}
                  <select onChange={statehandler} className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-40 lg:w-54 xs:w-auto md:min-w-[13rem] placeholder:pl-2 rounded-full placeholder:py-2">
                    <option value={states}>{states}</option>
                    {
                      State.getStatesOfCountry(country).map((item)=>(
                        <option value={[item.isoCode,item.name]} key={item.name}>{item.name}</option>
                      ))  
                    }
                  </select>
                </div>
              </div>
               {/* For Cities */}
              <div className="grid grid-cols-3 mt-5">
                <div className="text-lg font-medium"></div>
                <div className="flex gap-7">
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
                  
              
              {/* <div className="grid grid-cols-3 mt-5 ">
                <div className="text-lg font-medium">Current Position:</div>
                <div className="">
                  <input
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-[350px] lg:w-[450px] md:w-[450px] placeholder:pl-2 rounded-full placeholder:py-2"
                    placeholder="Current Position"
                    type="text"
                    name="search"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 mt-5 ">
                <div className="text-lg font-medium">Industry:</div>
                <div className="">
                  <input
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-[350px] lg:w-[450px] md:w-[450px] placeholder:pl-2 rounded-full placeholder:py-2"
                    placeholder="Current Industry"
                    type="text"
                    name="search"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 mt-5 ">
                <div className="text-lg font-medium">Last Degree:</div>
                <div className="">
                  <input
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-[350px] lg:w-[450px] md:w-[450px] placeholder:pl-2 rounded-full placeholder:py-2"
                    placeholder="Last Degree"
                    type="text"
                    name="search"
                  />
                </div>
              </div>
              <div className="grid grid-cols-3 mt-5 ">
                <div className="text-lg font-medium">Description:</div>
                <div className="">
                  <textarea
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-[350px] lg:w-[450px] md:w-[450px] rounded-xl"
                    placeholder="Write Your Description Here....."
                    type="textarea"
                    name="search"
                    rows={5}
                    cols={10}
                  />
                </div>
              </div> */}

              <div className="flex justify-end mt-10">
                {first_name && last_name && country && city && states?(
                  <button className="border-2 border-indigo-400 bg-indigo-400 p-2 rounded-full text-white font-bold"
                    onClick={UpdatePersonal}>
                    Save Changes
                  </button>
                ):(
                  <button className="border-2 border-indigo-100 bg-indigo-100 p-2 rounded-full text-white font-bold cursor-not-allowed">
                    Save Changes
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PersonalInfo;
