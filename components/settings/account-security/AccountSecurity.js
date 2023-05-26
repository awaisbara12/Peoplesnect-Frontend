import { EyeIcon } from "@heroicons/react/outline";
import React,{useEffect,useState} from "react";
import {
  SET_PASSWORD_API
} from "../../../pages/config";
const AccountSecurity = () => {
  const [userDetails, setUserDetails] = useState();
  const [dbpass, setdbpass] = useState();
  const [password, setpassword] = useState();
  const [conpass, setconpass] = useState();
  const [type1, settype1] = useState("password");
  const [type2, settype2] = useState("password");
  const [type3, settype3] = useState("password");
   // Bareer Key
  if (typeof window !== "undefined"){var authKey = window.localStorage.getItem("keyStore"); }
  
  // for update Password
  const UpdatePassword=async()=>{     
    if (dbpass && password && conpass )
    {
      await fetch(`${SET_PASSWORD_API}?users[current_password]=${dbpass}&users[password]=${password}&users[password-confirmation]=${conpass}`, {
        method: "PUT",
        headers: {
          Accept: "application/json", 
          Authorization: `${authKey}`,
        },
      }).then((resp) => resp.json())
        .then((result) => {
          if (result) { setUserDetails(result.data);alert("Your Password has been reset"); }
        }).catch((err) => console.log(err)); 
    }else{alert("Please Enter Password");}
    
  }
  
  // for hide/show password to user
  const show=(a)=>{ 
    if(a =="type1")
    {
     if(type1== "password"){settype1("text")}
     else{settype1("password")}
    }
    else if(a =="type2")
    {
     if(type2== "password"){settype2("text")}
     else{settype2("password")}
    }
    else if(a =="type3")
    {
     if(type3== "password"){settype3("text")}
     else{settype3("password")}
    }
  }

  return (
    <div>
      <div className="mt-8">
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
          <div className="">
            <div className="heading text-lg font-bold">Account Security</div>
            <div>
            <div className="border bg-white mt-4 p-10 rounded-xl">
              <div className="flex justify-center gap-10 items-center mt-5 ">
                <div className="text-lg font-medium">Current Password:</div>
                <div className="relative ">
                  <input
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none md:w-96 w-auto placeholder:pl-2 rounded-full placeholder:py-2"
                    placeholder="Enter Current Your Password"
                    type={type1}
                    onChange={(e)=>setdbpass(e.target.value)}
                    name="search"
                  />
                <EyeIcon className="absolute right-4 top-2 h-5 w-5"  onClick={()=>show("type1")}/>
                </div>
              </div>
              <div className="flex justify-center gap-10 items-center mt-5 ">
                <div className="text-lg font-medium">Update Password:</div>
                <div className="relative">
                  <input
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none md:w-96 w-auto placeholder:pl-2 rounded-full placeholder:py-2"
                    placeholder="Enter New Password"
                    type={type2}
                    onChange={(e)=>setpassword(e.target.value)}
                    name="search"
                  />
                <EyeIcon className="absolute right-4 top-2 h-5 w-5" onClick={()=>show("type2")}/>
                </div>
              </div>
              <div className="flex justify-center gap-10 items-center mt-5 ">
                <div className="text-lg font-medium">Cofirm Password:</div>
                <div className="relative">
                  <input
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none md:w-96 w-auto placeholder:pl-2 rounded-full placeholder:py-2"
                    placeholder="Confirm Your Password"
                    type={type3}
                    onChange={(e)=>setconpass(e.target.value)}
                    name="search"
                  />
                <EyeIcon className="absolute right-4 top-2 h-5 w-5" onClick={()=>show("type3")} />
                </div>
              </div>
              {/* <div className="mt-5 flex justify-center">
                <div className="flex items-center justify-between w-[580px] border bg-white px-4 py-4 rounded-xl">
                  <div className="">Two Step Verification</div>
                  <div className="">
                    <label
                      htmlFor="default-toggle"
                      className="inline-flex relative items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        value=""
                        id="default-toggle"
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div> */}
              <div className="flex justify-end mt-8">
                <button className="border-2 border-indigo-400 bg-indigo-400 p-2 rounded-full text-white font-bold"
                 onClick={UpdatePassword}>
                  Save Changes
                </button>
              </div>
            </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountSecurity;
