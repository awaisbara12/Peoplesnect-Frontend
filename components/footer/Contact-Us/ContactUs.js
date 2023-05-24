import Image from 'next/image';
import React, { Component, useEffect, useState } from 'react';
import ContactUsCover from "../../../public/images/contactUs.jpg";
import { Select, Option } from "@material-tailwind/react";
import Subject from "./Subject.js"
import { currentBlockContainsLink } from 'draft-js/lib/RichTextEditorUtil';
import { CATEGORY_API, CONTACT_US_API, CURENT_USER_LOGIN_API } from "../../../pages/config";
import { Field } from 'formik';


const ContactUs = () => {
  // Bareer Key
  if (typeof window !== "undefined") { var authKey = window.localStorage.getItem("keyStore"); }

  const [currentuser, setcurrentuser] = useState();   // current user
  const [first_name, setfirst_name] = useState();     // first name
  const [last_name, setlast_name] = useState();       // last name
  const [email, setemail] = useState();               // email
  const [body, setbody] = useState();                 // Body



  const contact_US = async () => {
    // first_name=Awais&last_name=Bara&company=BrainArcs&phone=123&email=abc@gmail.com&message=say hello
    await fetch(CATEGORY_API+"/reach_us?first_name="+first_name+"&last_name="+last_name+"&email="+email+"&message="+body, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
         setbody("");
        }
      })
      .catch((err) => console.log(err));
  }




  useEffect(() => {
    Current_User();
  }, [])
  const Current_User = async () => {
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
          setcurrentuser(result.data)
          fieldValue(result.data);
          console.log(result.data);
        }
      })
      .catch((err) => console.log(err));
  }
  const fieldValue = (i) => {
    setfirst_name(i.first_name);
    setlast_name(i.last_name);
    setemail(i.email);
  }
  return (
    <div className="mt-8 w-[620px] xl:w-[980px] lg:w-[710px] md:w-[780px] px-5 md:px-0 lg:px-0 xl:px-0">
      <div className='bg-white rounded-xl'>
        <div className="relative">
          <Image
            src={ContactUsCover}
            className="object-cover rounded-t-xl"
            width={980}
            height={340}
            alt=""
          />
          <div className="absolute left-14 bottom-1/2">
            <div className="text-4xl font-bold text-white">c</div>
          </div>
        </div>
        <div className="p-8">
          <div className="text-center text-2xl font-bold">Lets Chat With PeoplesNect</div>
          <div className='grid grid-cols-2 gap-4 mt-12'>
            {/* first Name */}
            <div className='flex flex-col gap-1'>
              <label className='text-md font-semibold'>First Name:</label>
              <input
                className='placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full rounded-xl p-2'
                placeholder='First Name'
                type='text'
                value={first_name}
                onChange={(e) => setfirst_name(e.target.value)}
              />
            </div>
            {/* Last Name */}
            <div className='flex flex-col gap-1'>
              <label className='text-md font-semibold'>Last Name:</label>
              <input
                className='placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full rounded-xl p-2'
                placeholder='Last Name'
                type='text'
                value={last_name}
                onChange={(e) => setlast_name(e.target.value)}
              />
            </div>
            {/* Email */}
            <div className='flex flex-col gap-1'>
              <label className='text-md font-semibold'>Email:</label>
              <input
                className='placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full rounded-xl p-2'
                placeholder='Enter Your Email'
                type='email'
                value={email}
                onChange={(e) => setemail(e.target.value)}
              />
            </div>
            {/* Subject */}
            {/* <div>
              <div className='flex flex-col gap-1'>
                <label className='text-md font-semibold'>Select Your Subject:</label>
                <Select placeholder="Select Version" className='placeholder:text-md flex justify-end  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full rounded-xl p-2'>
                  <Option className='hover:text-gray-400'>NewFeed</Option>
                  <Option className='hover:text-gray-400'>Profile</Option>
                  <Option className='hover:text-gray-400'>Message</Option>
                  <Option className='hover:text-gray-400'>Jobs</Option>
                  <Option className='hover:text-gray-400'>Group</Option>
                </Select>
              </div>
            </div> */}

            {/* Body */}
            <div className='col-span-2'>
              <textarea
                className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full rounded-xl"
                placeholder="Write Your Message"
                type="textarea"
                name="search"
                value={body}
                onChange={(e) => setbody(e.target.value)}
                rows={5}
                cols={10}
              />
            </div>
          </div>
          {first_name && last_name && email && body ? (
            <div className='text-center mt-8'>
              <button onClick={()=>contact_US()} className="bg-indigo-400 text-white px-3 py-2 rounded-full font-medium">
                Submit
              </button>
            </div>
          ) : (
            <div className='text-center mt-8'>
              <button className="bg-indigo-100 text-white px-3 py-2 rounded-full font-medium">
                Submit
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ContactUs;