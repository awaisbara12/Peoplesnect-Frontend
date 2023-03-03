import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { GROUP_API, CURENT_USER_LOGIN_API } from "../../../../pages/config";

const GroupSettings = () => {
  const [name,setname] = useState();
  const [des,setdes] = useState();
  const [dp,setdp] = useState([]);
  const [dppreview,setdppreview] = useState();
  const [coverphoto,setcoverphoto] = useState([]);
  const [coverpreview,setcoverpreview] = useState();
  const [type,settype] = useState();
  const [canpost,setcanpost] = useState();
  const [deletegroup,setdeletegroup] = useState(false);
  const [currentUser, setCurrentUser] = useState();
  const [group, setgroup] = useState();
  
  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
  // Bareer Key
  if (typeof window !== "undefined") { var authKey = window.localStorage.getItem("keyStore");}
  //for dp
  const handledp = (e) => {
    setdp(e.target.files[0]);
    if (e.target.files.length !== 0) {
      setdppreview(window.URL.createObjectURL(e.target.files[0]));
    }
  };
  //for cover photo
  const handlecover = (e) => {
    setcoverphoto(e.target.files[0]);
    if (e.target.files.length !== 0) {
      setcoverpreview(window.URL.createObjectURL(e.target.files[0]));
    }
  };
  // for Delete toggler
  const toggler =(e)=>{ 
    if(deletegroup) {setdeletegroup(false);} 
    else{
      var a = confirm("Are You Sure?");
      if(a)
      { setdeletegroup(true);
        DeleteGroup();
      }
    }
  }
  // Update Group
  const UpdateGroup =()=>{
    const dataForm = new FormData();
    dataForm.append("groups[title]", name);
    dataForm.append("groups[description]", des);
    dataForm.append("groups[group_type]", type);
    dataForm.append("groups[can_post]", canpost);
    if(dp){dataForm.append("groups[display_image]", dp);}
    if(coverphoto){dataForm.append("groups[cover_image]", coverphoto);}
      const res = fetch(GROUP_API +"/"+myArray[1], {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
      body: dataForm,
      })
      .then((resp) => resp.json())
      .then((result) => {
        GetGroupDetails();
        alert("Your Setting has been updated!")
       
      })
  }
  // Get Group
  const GetGroupDetails =()=>{
    fetch(GROUP_API +"/"+myArray[1] , {
    method: "GET",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
      setgroup(result.data);
      setname(result.data.title);
      setdes(result.data.description);
      settype(result.data.group_type);
      setcanpost(result.data.can_post);
      setdp('');
      setcoverphoto('');
    })
  }
  // Delete Group
  const DeleteGroup =()=>{
    const res = fetch(GROUP_API +"/"+myArray[1], {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
      })
      .then((resp) => resp.json())
      .then((result) => {
        
        window.location.href = '/group-page';
        alert("Your Group Deleted successfully!")
      })

      if(deletegroup) {setdeletegroup(false)}
  }
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
          setCurrentUser(result.data);
        }
      })
      .catch((err) => console.log(err)); 
  }

  useEffect(() => {
    GetGroupDetails();
    Current_User();
  },[])
  return (
    <div>
      <div className="mt-8">
      <div className="w-[600px] xl:w-[980px] lg:w-[710px] md:w-[780px] px-5 md:px-0 lg:px-0 xl:px-0">
          <div className="">
            <div className="heading text-lg font-bold">Group Settings</div>
            {/* Name & description */}
            <div className="border items-center bg-white mt-4 p-10 rounded-xl">
              <div className="flex items-center justify-center gap-7">
                <div className="text-lg font-medium">Group Name:</div>
                <input
                  className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-96 xs:w-auto placeholder:pl-2 rounded-full placeholder:py-2"
                  placeholder="Write Group Name"
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
                    placeholder="Write Group Description Here....."
                    type="textarea"
                    name="search"
                    rows={5}
                    cols={10}
                    value={des}
                    onChange={(e)=>setdes(e.target.value)}
                  />
                </div>
              </div>
            </div>
            {/* Profile & Cover */}
            <div className=" border bg-white mt-4 px-4 py-6 rounded-xl">
              <div className="heading text-lg font-bold">Disply or Cover</div>
              <div className="flex items-center justify-center gap-10 mt-5">
                <div className="text-lg font-medium">Select Display Photo:</div>
                <input className="" 
                  type="file" 
                  name="search" 
                  onChange={handledp}
                />
              </div>
              <div className="flex items-center justify-center gap-10 mt-5">
                <div className="text-lg font-medium">Select Cover Photo:</div>
                <input 
                className="" 
                type="file" 
                name="search"
                onChange={handlecover} 
                />
              </div>
            </div>
            {/* Radio Button */}
            <div className=" border bg-white mt-4 px-4 py-6 rounded-xl">
              <div className="heading text-lg font-bold">Group Type</div>
              <div className="border hover:bg-gray-100 mt-4 p-4 bg-gray-50 hover:shadow-lg rounded-xl">
                <div className="flex items-center justify-between ">
                  <div className="">Group Type</div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <input
                        
                        id="default-radio-1"
                        type="radio"
                        value="public_group"
                        checked={type==="public_group"}
                        onChange={(e)=>settype(e.target.value)}
                        name="default-radio1"
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
                        id="default-radio-2"
                        type="radio"
                        name="default-radio1"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-indigo-400 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        value="private_group"
                        checked={type==="private_group"}
                        onChange={(e)=>settype(e.target.value)}
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
              </div>
              <div className="heading mt-4 text-lg font-bold">
                Post Authorization
              </div>
              <div className="border hover:bg-gray-100 mt-4 p-4 bg-gray-50 hover:shadow-lg rounded-xl">
                <div className="flex items-center justify-between ">
                  <div className="">Who Can post</div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <input
                        id="default-radio-1"
                        type="radio"
                        name="default-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-indigo-400 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        value="all_member"
                        checked={canpost==="all_member"}
                        onChange={(e)=>setcanpost(e.target.value)}                        
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
                        id="default-radio-2"
                        type="radio"
                        name="default-radio"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-indigo-400 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        value="admin"
                        checked={canpost==="admin"}
                        onChange={(e)=>setcanpost(e.target.value)}
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
            </div>
            <div className="flex justify-end mt-5">
            <button 
              className="border-2 border-indigo-400 bg-indigo-400 p-2 rounded-full text-white font-bold"
              onClick={()=>UpdateGroup()}>
              Update Setting
            </button>
            </div>
            {/* Delete */}
            {currentUser && currentUser.id == group.owner.id ? (
               <div className=" border bg-white mt-4 px-4 py-6 rounded-xl">
               <div className="heading text-lg font-bold">
                 Permanent Delete Your Group
               </div>
               <div className="border hover:bg-gray-100 mt-4 p-4 bg-gray-50 hover:shadow-lg rounded-xl">
                 <div className="flex items-center justify-between ">
                   <div className="">Delete Your Group</div>
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
            ):("")}
          </div>
        </div>
      </div>
    </div>
  );
  sd;
};

export default GroupSettings;
