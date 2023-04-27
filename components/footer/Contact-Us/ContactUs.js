import Image from 'next/image';
import React, { Component } from 'react';
import ContactUsCover from "../../../public/images/contactUs.jpg";
import { Select, Option } from "@material-tailwind/react";
import Subject from "./Subject.js"


class ContactUs extends Component {
  render() {
    return (
      <div className="mt-8 w-[600px] xl:w-[980px] lg:w-[710px] md:w-[780px] px-5 md:px-0 lg:px-0 xl:px-0">
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
              <div className="text-4xl font-bold text-white">Contact With Us</div>
            </div>
          </div>
          <div className="p-8">
            <div className="text-center text-2xl font-bold">Lets Chat With PeoplesNect</div>
            <div className='grid grid-cols-2 gap-4 mt-12'>
              <div className='flex flex-col gap-1'>
                <label className='text-md font-semibold'>First Name:</label>
                <input
                  className='placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full rounded-xl p-2'
                  placeholder='First Name'
                  type='text'
                  onChange={""}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label className='text-md font-semibold'>Last Name:</label>
                <input
                  className='placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full rounded-xl p-2'
                  placeholder='Last Name'
                  type='text'
                  onChange={""}
                />
              </div>
              <div className='flex flex-col gap-1'>
                <label className='text-md font-semibold'>Email:</label>
                <input
                  className='placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full rounded-xl p-2'
                  placeholder='Enter Your Email'
                  type='email'
                  onChange={""}
                />
              </div>
              <div>
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
              </div>
              <div className='col-span-2'>
                <textarea
                  className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full rounded-xl"
                  placeholder="Write Your Message"
                  type="textarea"
                  name="search"
                  onChange={""}
                  rows={5}
                  cols={10}
                />
              </div>
            </div>
            <div className='text-center mt-8'>
              <button className="bg-indigo-400 text-white px-3 py-2 rounded-full font-medium">
                Send 
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ContactUs;