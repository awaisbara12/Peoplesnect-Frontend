import { ChevronDownIcon } from "@heroicons/react/outline";
import React,{useState,useEffect} from "react";
import {
  ACCOUNT_PREFERENCE_SETTING,
  CURENT_USER_LOGIN_API
} from "../../../pages/config";
const AccountPreferences = () => {
  const [userDetails, setUserDetails] = useState();
  const [profile_type, setprofile_type] = useState();
  const [vedioautoplay, setvedioauto] = useState(false);
  const [language, setlanguage] = useState();
  
   // Bareer Key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }
  // for Vedio auto play
  const toggler =(e)=>{ vedioautoplay? setvedioauto(false) : setvedioauto(true)}
  // for Update Account-Prefrernce
  const UpdateAccountPreference=async()=>{
    await fetch(`${ACCOUNT_PREFERENCE_SETTING}?users[auto_play_videos]=${vedioautoplay}&users[profile_type]=${profile_type}&users[language]=${language}`, {
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
        Current_User();
        alert("Your Information has been Updated! ") 
      }
    })
    .catch((err) => console.log(err));
   
  }
  //For Current User
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
          setvedioauto(Details.auto_play_videos);
           setprofile_type(Details.profile_type);
           setlanguage(Details.language);
          //console.log("user",result.data)
      //   }
      // })
      // .catch((err) => console.log(err)); 
  }
  useEffect(()=>{
    Current_User();
  },[])
  
  return (
    <div>
      <div className="mt-8">
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
          <div className="">
            <div className="heading text-lg font-bold">Account Preference</div>
            <div className="flex items-center justify-between border bg-white mt-4 p-4 rounded-xl">
              <div className="">Language</div>
              <div className="border flex gap-1 rounded-full py-2 px-4">
                English
                <ChevronDownIcon className="h-5 w-5" />
              </div>
            </div>
            {/* <div className="flex items-center justify-between border bg-white mt-4 px-4 py-6 rounded-xl">
              <div className="">Autoplay Videos</div>
              <div className="">
                <label
                  htmlFor="default-toggle"
                  className="inline-flex relative items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={vedioautoplay===true}
                    onChange={toggler}
                    id="default-toggle"
                    
                    className="sr-only peer"
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div> */}
            <div className="flex items-center justify-between border bg-white mt-4 px-4 py-6 rounded-xl">
              <div className="">Account Privacy</div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <input
                    id="default-radio-1"
                    type="radio"
                    value="public_profile"
                    checked={profile_type==="public_profile"}
                    onChange={(e)=>setprofile_type(e.target.value)}
                    name="default-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-indigo-400 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  /> 
                  <label
                    htmlFor="default-radio-1"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Public
                  </label>
                </div>
                <div className="flex items-center">
                  <input
                    
                    id="default-radio-1"
                    type="radio"
                    value="private_profile"
                    checked={profile_type==="private_profile"}
                    onChange={(e)=>setprofile_type(e.target.value)}
                    name="default-radio"
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-indigo-400 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                  />
                  <label
                    htmlFor="default-radio-2"
                    className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    Private
                  </label>
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-5">
              <button className="border-2 border-indigo-400 bg-indigo-400 p-2 rounded-full text-white font-bold"
                onClick={UpdateAccountPreference}>
                Changes Done
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountPreferences;
