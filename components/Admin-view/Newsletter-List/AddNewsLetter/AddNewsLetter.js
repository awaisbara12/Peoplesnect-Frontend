import { Select, Option } from "@material-tailwind/react";
import React, { useState }  from 'react';

const AddNewsLetter = () => {
  const [isVisible, setIsVisible] = useState(false);

  const changeHandler = (e) => {
    console.log(e)
    if (e === 'custom') {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };
  return (
    <div className="mt-8">
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
        <div className="mt-8">
          <div className="">
            <div className="text-center">
              <div className="heading text-4xl font-semibold text-indigo-400">Add NewsLetter</div>
            </div>
            <div className="border items-center bg-white mt-4 p-10 rounded-xl">
              <div className="grid grid-cols-5 items-center">
                <div className="text-lg font-medium">Subject:</div>
                <div className='col-span-3'>
                  <input
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full xs:w-auto placeholder:pl-2 rounded-full placeholder:py-2"
                    placeholder="Type Subject Here"
                    type="text"
                    name="search"
                  />
                </div>
              </div>
              <div className='grid grid-cols-5 items-center mt-5'>
                <label className='text-md font-semibold'>Select Your Subject:</label>
                <div className="col-span-3">
                  <Select onChange={changeHandler} placeholder="Select Version" className='placeholder:text-md flex justify-end  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full rounded-xl p-2'>
                    <Option className='hover:text-gray-400' value="all">All Users</Option>
                    <Option className='hover:text-gray-400' value="custom">Custom</Option>
                  </Select>
                </div>
              </div>
              {isVisible ? (
                <div className="grid grid-cols-5 items-center mt-5">
                  <div className="text-lg font-medium">Add Custom Email:</div>
                  <div className='col-span-3'>
                    <input
                      className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full xs:w-auto placeholder:pl-2 rounded-full placeholder:py-2"
                      placeholder="Type Email"
                      type="Email"
                      name="search"
                    />
                  </div>
                </div>
              ) :null }
              <div className="grid grid-cols-5 mt-5">
                <div className="text-lg font-medium">Subject:</div>
                <div className="col-span-3">
                  <textarea
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full rounded-xl"
                    placeholder="Write Subject Of the NewsLetter....."
                    type="textarea"
                    name="search"
                    rows={5}
                    cols={10}
                  />
                </div>
              </div>
              <div className='flex justify-end gap-4 mt-12'>
                <button className='px-4 py-2 border rounded-full border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white'>Send NewsLetter</button>
                <button className='px-4 py-2 border rounded-full hover:border-indigo-400 hover:bg-transparent hover:text-indigo-400 bg-indigo-400 text-white'>Save As Draft</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewsLetter;