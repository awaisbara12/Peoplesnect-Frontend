import React,{useEffect, useState} from "react";
import {
  CURENT_USER_LOGIN_API,
  UPDATE_CONTACT_INFO,

} from "../../../pages/config";
const ContectInfo = () => {
  const [userDetails, setUserDetails] = useState();
  const [email, setemail] = useState();
  const [phone, setphone] = useState();
  const [DOB, setDOB] = useState();
  const [seleccountry, setseleccountry] = useState();
  
  // Bareer Key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }
  
  //for update
  const UpdateContact=async()=>{
    await fetch(`${UPDATE_CONTACT_INFO}?users[phone_number]=${phone}&users[email]=${email}&users[DOB]=${DOB}`, {
    method: "PUT",
     headers: {
      Accept: "application/json", 
       Authorization: `${authKey}`,
     },
  })
     .then((resp) => resp.json())
    .then((result) => {
      if (result) {
        const currentuserSting = JSON.stringify(result.data);     // convert json into string
        localStorage.setItem("currentuser", currentuserSting);    // save currentuser in localstorage as string      
        // Current_User();
        // setUserDetails(result.data.id); 
        alert("Your Information has been Updated! ") 
      }
    })
    .catch((err) => console.log(err));
  }
  
  // for current user
  const Current_User=async()=>{    
    var c = window.localStorage.getItem("currentuser");
    var Details = JSON.parse(c);
    // await fetch(CURENT_USER_LOGIN_API, {
    //   method: "GET",
    //    headers: {
    //     Accept: "application/json", 
    //      Authorization: `${authKey}`,
    //    },
    // })
    //    .then((resp) => resp.json())
    //   .then((result) => {
    //     if (result) {
          setUserDetails(Details.id);  
          setemail(Details.email);
          setphone(Details.phone_number);
          setDOB(Details.DOB);
    //       //console.log("user",result.data)
    //     }
    //   })
    //   .catch((err) => console.log(err)); 
  }
 
 
  useEffect(()=>{
    Current_User();
  },[])


  return (
    <div>
      <div className="mt-8">
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
          <div className="">
            <div className="heading text-lg font-bold">Contact Information</div>
            <div className="border bg-white mt-4 p-10 rounded-xl">
              <div className="flex username items-center gap-14 text-lg font-medium justify-center">
                Email:
                <div className="">
                  <input
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-96 placeholder:pl-2 rounded-full placeholder:py-2"
                    placeholder="Email Adress"
                    value={email}
                    type="Email"
                    onChange={(e)=>setemail(e.target.value)}
                    name="search"
                  />
                </div>
              </div>
              <div className="mt-5 ">
                <div className="flex username items-center gap-8 text-lg font-medium justify-center">
                  Number:
                  <div className="">
                    <input
                      className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-96 placeholder:pl-2 rounded-full placeholder:py-2"
                      placeholder="Change Your Number"
                      type="text"
                      value={phone}
                      onChange={(e)=>setphone(e.target.value)}
                      name="search"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-5">
                <div className="flex username items-center gap-11 text-lg font-medium justify-center">
                  DOB:
                  <div className="">
                    <input
                      className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-96 placeholder:pl-2 rounded-full placeholder:py-2"
                      placeholder="Change Your Date Of Birth"
                      type="date"
                      value={DOB}
                      onChange={(e)=>setDOB(e.target.value)}
                      name="search"
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-5">
                <button className="border-2 border-indigo-400 bg-indigo-400 p-2 rounded-full text-white font-bold" 
                 onClick={UpdateContact}>
                  Changes Done
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContectInfo;
