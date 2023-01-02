import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { CURENT_USER_LOGIN_API, PAGES_API } from "../../../../pages/config";

const PageSettings = () => {
  const [page, setPage] = useState({});
  const [c_user, setc_user] = useState();
  const [name, setname] = useState();
  const [des, setdes] = useState();
  const [can_comment, setcan_comment] = useState();
  const [can_message, setcan_message] = useState();
  const [deletegroup,setdeletegroup] = useState(false);
  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
  // Bareer key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore");}
  // for Delete toggler
  const toggler =(e)=>{ 
    if(deletegroup) {setdeletegroup(false);} 
    else{
      var a = confirm("Are You Sure?");
      if(a)
      { setdeletegroup(true);
        DeletePage();
      }
    }
  }
  // Delete Page
  const DeletePage =()=>{
    const res = fetch(PAGES_API +"/"+myArray[1], {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
      })
      .then((resp) => resp.json())
      .then((result) => {
        
        window.location.href = '/page-design';
        alert("Your Page Deleted successfully!")
      })

      if(deletegroup) {setdeletegroup(false)}
  }
  // Update Page Details
  const UpdatePageDetail =()=>{
    const dataForm = new FormData();
    dataForm.append("pages[name]", name);
    dataForm.append("pages[description]", des);
    dataForm.append("pages[can_message]", can_message);
    dataForm.append("pages[can_comment]", can_comment);
    const res = fetch(PAGES_API +"/"+myArray[1], {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    body: dataForm,
    })
    .then((resp) => resp.json())
    .then((result) => {
      if(result.data){
        alert("Updated Details Successfully")
        setPage(result.data);
        setcan_comment(result.data.can_comment)
        setcan_message(result.data.can_message)
        setdes(result.data.description)
        setname(result.data.name)
      }
    })
  }
  // Get Page Details
  const PageDetail =()=>{
    const res = fetch(PAGES_API +"/"+myArray[1], {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
      if(result.data){
        setPage(result.data);
        setcan_comment(result.data.can_comment)
        setcan_message(result.data.can_message)
        setdes(result.data.description)
        setname(result.data.name)
      }
      console.log(result.data)
    })
  }
   // Current User
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
          setc_user(result.data);
        }
      })
      .catch((err) => console.log(err)); 
  }
  useEffect(() => {
    PageDetail();
    Current_User();
  },[])
  return (
    <div>
      <div className="mt-8">
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
          <div className="">
            <div className="heading text-lg font-bold">Page Settings</div>
            <div className="border items-center bg-white mt-4 p-10 rounded-xl">
              <div className="flex items-center justify-center gap-7">
                <div className="text-lg font-medium">Page Title:</div>
                <input
                  className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-96 xs:w-auto placeholder:pl-2 rounded-full placeholder:py-2"
                  placeholder="Change Page Name"
                  type="text"
                  name="search"
                  value={name}
                  onChange={(e)=>setname(e.target.value)}
                />
              </div>
              <div className="flex justify-center gap-7 mt-10 ">
                <div className="text-lg font-medium">Description:</div>
                <div className="">
                  <textarea
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-96 rounded-xl"
                    placeholder="Write Page Description Here....."
                    type="textarea"
                    name="search"
                    value={des}
                    onChange={(e)=>setdes(e.target.value)}
                    rows={5}
                    cols={10}
                  />
                </div>
              </div>
            </div>
            <div className=" border bg-white mt-4 px-4 py-6 rounded-xl">
              <div className="heading mt-4 text-lg font-bold">
                Comments Authorization
              </div>
              <div className="border hover:bg-gray-100 mt-4 p-4 bg-gray-50 hover:shadow-lg rounded-xl">
                <div className="flex items-center justify-between ">
                  <div className="">Who Can Comment</div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <input
                        checked={can_comment=="all_member"}
                        value="all_member"
                        onChange={(e)=>setcan_comment(e.target.value)}
                        id="default-radio-1"
                        type="radio"
                        name="default-radio[1]"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-indigo-400 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-radio-1"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        All Members
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        checked={can_comment=="admin"}
                        onChange={(e)=>setcan_comment(e.target.value)}
                        value="admin"
                        id="default-radio-2"
                        type="radio"
                        name="default-radio[1]"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-indigo-400 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-radio-2"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Only Admins
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              <div className="heading text-lg mt-5 font-bold">
                Message Configuration
              </div>
              <div className="border hover:bg-gray-100 mt-4 p-4 bg-gray-50 hover:shadow-lg rounded-xl">
                <div className="flex items-center justify-between ">
                  <div className="">Who Can Message</div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <input
                        checked={can_message=="everyone"}
                        onChange={(e)=>setcan_message(e.target.value)}
                        value="everyone"
                        id="default-radio-1"
                        type="radio"
                        name="default-radio[2]"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-indigo-400 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-radio-1"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        All Members
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                         checked={can_message=="only_admin"}
                         onChange={(e)=>setcan_message(e.target.value)}
                         value="only_admin"
                        id="default-radio-2"
                        type="radio"
                        name="default-radio[2]"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-indigo-400 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-radio-2"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        Only Admins
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex justify-end mt-8 mr-10">
                <button onClick={()=>UpdatePageDetail()} 
                  className="border-2 border-indigo-400 bg-indigo-400 p-2 rounded-full text-white font-bold">
                  Save Changes
                </button>
              </div>
            </div>
            {c_user && page && c_user.id==page.owner.id?(
            <div className=" border bg-white mt-4 px-4 py-6 rounded-xl">
              <div className="heading text-lg font-bold">
                Permanent Delete Your Page
              </div>
              <div className="border hover:bg-gray-100 mt-4 p-4 bg-gray-50 hover:shadow-lg rounded-xl">
                <div className="flex items-center justify-between ">
                  <div className="">Delete Your Page</div>
                  <div className="">
                    <label
                      htmlFor="default-toggle"
                      className="inline-flex relative items-center cursor-pointer"
                    >
                      <input
                        type="checkbox"
                        id="default-toggle"
                        className="sr-only peer"
                        checked={deletegroup===true}
                        onChange={toggler}
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
                    </label>
                  </div>
                </div>
              </div>
            </div>
            ):('')}
          </div>
        </div>
      </div>
    </div>
  );
  sd;
};

export default PageSettings;
