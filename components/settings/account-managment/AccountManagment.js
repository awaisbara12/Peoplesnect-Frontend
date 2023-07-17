import React,{useEffect,useState} from "react";
import {
  CURENT_USER_LOGIN_API,
  ACCOUNT_DEACTIVATE
} from "../../../pages/config";
import { signout } from "../../auth/signout/SignOut";
import { router } from "next/router";
import ShowAlert from "../../Alerts/Alertss";
import ShowConfirm from "../../Alerts/Confirmation";

const AccountManagment = () => {
  const [defaultvalue, setdefaultvalue] = useState();
  const [userDetails, setUserDetails] = useState();
  const [temporary, settemporary] = useState();
  const [permanent, setpermanent] = useState();
  const [openconfirm, setopenconfirm] = useState(false); // For Confirm Show
  const [confirmbody, setconfirmbody] = useState(); // For Confirm Body
  const [openalert, setopenalert] = useState(false); // For Alert Show
  const [alertbody, setalertbody] = useState(); // For Alert Body
  // Bareer Key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }
    // confirmation 
  const Accountmang=()=>{
    if(defaultvalue){
      const a=confirm("Are you sure?")
    if (a===true){UpdateAccountPreference()}
    if (a===false){
      // console.log("confirm",a)
    }
    }else{
      setopenalert(true);
      setalertbody("Your Changes Are Not Updated!")
      // alert("your changes are not updated")
    }
      
  }
  //  for acc# deactivation
  const UpdateAccountPreference=async()=>{
    await fetch(`${ACCOUNT_DEACTIVATE}?value=${defaultvalue}`, {
    method: "PUT",
     headers: {
      Accept: "application/json", 
       Authorization: `${authKey}`,
     },
  })
     .then((resp) => resp.json())
    .then((result) => {
      if (result) {
          if (result.datas && result.datas.message)
          {
            router.push("/login");
          }else{
            if(result && result.data && result.data.is_deleted){
              signout(); 
            }else if (result && result.data){
              const currentuserSting = JSON.stringify(result.data);     // convert json into string
              localStorage.setItem("currentuser", currentuserSting);    // save currentuser in localstorage as string      
              setUserDetails(result.data);
              settemporary(result.data.is_deleted);
              setpermanent(false);
              alert("Your Account has been Activated!") 
            }
            
          }
      }
    })
    .catch((err) => console.log(err));
   
  }
  const Current_User=async()=>{    
    var c = window.localStorage.getItem("currentuser");
    var Details = JSON.parse(c);
    // console.log("Account",Details)
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
          setUserDetails(Details);
          settemporary(Details.is_deleted);
          setpermanent(false);
    //     }
    //   })
    //   .catch((err) => console.log(err)); 
  }
  const toggler =(e)=>{ 
    if(e=="temporary"){ 
    var a = confirm("Are You Sure you want to Deactivate your account?");
    // setopenconfirm(true)
    // console.log("")
    if(a)
    { settemporary(true);
      setdefaultvalue("temporary");
    }
    }else if(e=="permanent"){
      var a = confirm("Are You Sure you want to permanet delete your account?");
      if(a)
      { 
        settemporary(false);
        setpermanent(true);
        setdefaultvalue("permanent");
      } 
    }
    if(e=="1") {
      var a = confirm("Are You Sure you want to restore your account?");
      if(a)
      {
        settemporary(false);
        setdefaultvalue("restore");
      }
    }else if(e=="2"){
      var a = confirm("Are You Sure?");
      if(a)
      {
        setdefaultvalue("restore");
        setpermanent(false);
      }
    }
  }
  useEffect(()=>{
    Current_User();
  },[])

  return (
    <div>
      {openalert?(
        <ShowAlert openalert={openalert} setopenalert={setopenalert} body={alertbody}/>
      ):("")}
      
      <div className="mt-8">
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
          <div className="">
            <div className="heading text-lg font-bold">Account Management</div>
            <div className="flex items-center justify-between border bg-white mt-4 px-4 py-5 rounded-xl">
              <div className="">Deactivate Your Account</div>
              <div className="">
                <label
                  htmlFor="default-toggle"
                  className="inline-flex relative items-center cursor-pointer"
                >
                  <input
                    type="checkbox"
                    value="temporary"
                    id="default-toggle"
                    className="sr-only peer"
                    checked={temporary===true}
                    onChange={temporary==false ?((e)=>toggler(e.target.value)):((e)=>toggler("1"))}
                  />
                  <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
            <div className="flex items-center justify-between border bg-white mt-4 px-4 py-6 rounded-xl">
              <div className="">Delete Your Account</div>
              
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                
                <div className="">
                  <label
                    htmlFor="default-toggle2"
                    className="inline-flex relative items-center cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      value="permanent"
                      id="default-toggle2"
                      className="sr-only peer"
                      checked={permanent===true}
                      onChange={permanent==false ?((e)=>toggler(e.target.value)):((e)=>toggler("2"))}
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                  </label>
                </div>
                </div>
              </div>
              
            </div>
            <div className="flex justify-end mt-5">
              <button className="border-2 border-indigo-400 bg-indigo-400 p-2 rounded-full text-white font-bold"
              onClick={Accountmang}>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AccountManagment;
