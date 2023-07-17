import { Router, useRouter } from "next/router";
import React, { useState } from "react";
import { PAGES_API } from "../../../pages/config";
import ShowAlert from "../../Alerts/Alertss";

const NewPAge = () => {
  const [name,setname] = useState();
  const [des,setdes] = useState();
  const [dp,setdp] = useState([]);
  const [dppreview,setdppreview] = useState();
  const [coverphoto,setcoverphoto] = useState([]);
  const [coverpreview,setcoverpreview] = useState();
  const [cancomment,setcancomment] = useState();
  const [canmessage,setcanmessage] = useState();
  const [showbtn,setshowbtn] = useState(true);
  const [openalert, setopenalert] = useState(false); // For Alert Show
  const [alertbody, setalertbody] = useState(); // For Alert Body

  const router = useRouter();
  // Bareer Key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore"); }
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
   // Create Group
   const CreatePage =()=>{
    setshowbtn(false);
    const dataForm = new FormData();
    dataForm.append("pages[name]", name);
    dataForm.append("pages[description]", des);
    dataForm.append("pages[can_comment]", cancomment);
    dataForm.append("pages[can_message]", canmessage);
    dataForm.append("pages[display_photo]", dp);
     dataForm.append("pages[cover_photo]", coverphoto);
      const res = fetch(PAGES_API, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
      body: dataForm,
      })
      .then((resp) => resp.json())
      .then((result) => {
        setname('');
        setdes('');
        setdp([]);
        setdppreview('');
        setcoverphoto([]);
        setcoverpreview('');
        setcancomment('');
        setcanmessage('');
        // alert("Page Created!")
        setopenalert(true);
        setalertbody("Page Created Successfully!")
        
        router.push('/page-design/liked-pages?'+result.data.id);

      })
  }
  return (
    <div>
      {openalert?(
        <ShowAlert openalert={openalert} setopenalert={setopenalert} body={alertbody}/>
      ):("")}
      <div className="mt-8">
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
          <div className="">
            <div className="heading text-lg font-bold">Creat New Page</div>
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
                    rows={5}
                    cols={10}
                    value={des}
                    onChange={(e)=>setdes(e.target.value)}
                  />
                </div>
              </div>
            </div>
            <div className=" border bg-white mt-4 px-4 py-6 rounded-xl">
              <div className="heading mt-4 text-lg font-bold">
                Profile & Cover
              </div>
              <div className="flex items-center justify-center gap-10 mt-10">
                <div className="text-lg font-medium">Select Profile Photo:</div>
                <input className="" type="file" name="search" onChange={handledp}/>
              </div>
              <div className="flex items-center justify-center gap-10 mt-10">
                <div className="text-lg font-medium">Select Cover Photo:</div>
                <input className="" type="file" name="search" onChange={handlecover} />
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
                        id="default-radio-1"
                        type="radio"
                        value="all_member"
                        checked={cancomment==="all_member"}
                        onChange={(e)=>setcancomment(e.target.value)}
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
                        id="default-radio-2"
                        type="radio"
                        value="admin"
                        checked={cancomment==="admin"}
                        onChange={(e)=>setcancomment(e.target.value)}
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

              <div className="heading text-lg font-bold mt-4">
                Who Can Message
              </div>
              <div className="border hover:bg-gray-100 mt-4 p-4 bg-gray-50 hover:shadow-lg rounded-xl">
                <div className="flex items-center justify-between ">
                  <div className="">Who Can Message</div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center">
                      <input
                        id="default-radio-1"
                        type="radio"
                        value="everyone"
                        checked={canmessage==="everyone"}
                        onChange={(e)=>setcanmessage(e.target.value)}
                        name="default-radio[2]"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-indigo-400 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-radio-1"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        EveryOne
                      </label>
                    </div>
                    <div className="flex items-center">
                      <input
                        id="default-radio-2"
                        type="radio"
                        value="only_admin"
                        checked={canmessage==="only_admin"}
                        onChange={(e)=>setcanmessage(e.target.value)}
                        name="default-radio[2]"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-indigo-400 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                      />
                      <label
                        htmlFor="default-radio-2"
                        className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                      >
                        No One
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {name && des && dp.length!=0 && coverphoto.length!=0 && canmessage && cancomment && showbtn==true?(
          <div className="flex justify-end mt-5">
            <button onClick={()=>CreatePage()}
              className="border-2 border-indigo-400 bg-indigo-400 p-2 rounded-full text-white font-bold">
              Create New Page
            </button>
          </div>
          ):(
            <div className="flex justify-end mt-5">
              <button disabled={true} className="border-2 border-indigo-100 bg-indigo-100 p-2 rounded-full text-white font-bold">
                Create New Page
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
  sd;
};

export default NewPAge;
