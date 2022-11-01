import { useState, useEffect, React, Fragment } from "react";
import { PencilAltIcon, XIcon } from "@heroicons/react/outline";
import ProfileFeed from "../ProfileFeed";
import { Menu, Transition } from "@headlessui/react";
import { Dialog } from "@headlessui/react";
import Link from "next/link";


const TabProfile = (props) => {
  let [isOpen, setIsOpen] = useState(false);
  function closeModal() {
    setIsOpen(false);
    
  }

  function openModal() {
    setIsOpen(true);
  }
  return (
    <>
      <div className="bg-white rounded-xl p-10">
        <div className="flex items-center justify-between">
          <div className="font-extrabold">About</div>
          <a className="hover:text-indigo-400">
            <PencilAltIcon onClick={openModal}
              className="h-5 w-5 underline" />
          </a>
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-50"
              static={true}
              onClose={closeModal}
            >
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-black bg-opacity-75" />
            </Transition.Child>
            <div className="fixed inset-0 overflow-y-auto">
              <div className="flex min-h-full items-center justify-center p-4 text-center">
                <Transition.Child
                  as={Fragment}
                  enter="ease-out duration-300"
                  enterFrom="opacity-0 scale-95"
                  enterTo="opacity-100 scale-100"
                  leave="ease-in duration-200"
                  leaveFrom="opacity-100 scale-100"
                  leaveTo="opacity-0 scale-95"
                >
                  <Dialog.Panel className="w-[620px] bg-white rounded-xl xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0 py-4 text-left align-middle shadow-xl transition-all">
                  <div className="flex justify-end items-center mx-4">
                    <XIcon
                      onClick={closeModal}
                      className="w-5 h-5 cursor-pointer"
                    />
                    </div>
                    <Dialog.Title
                      as="h3"
                      className="text-lg font-medium leading-6 text-gray-900 px-8"
                    >
                      About
                    </Dialog.Title>
                    <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
                      <div className="bg-white px-12 py-5 rounded-xl">
                      <form className="w-full">
                          <div className="">
                            <div className="">
                              <div className="">
                                <textarea
                                  className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full rounded-xl"
                                  placeholder="Write Your Description Here....."
                                  type="textarea"
                                  name="search"
                                  rows={5}
                                  cols={10}
                                />
                              </div>
                            </div>
                          </div>
                      </form>
                      <div className="flex gap-4 justify-end">
                <Link href="">
                <button
                      type="submit"
                      className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                    >
                      Save Changes
                </button>
                </Link>
                      </div>
                      </div>
                    </div>
                  </Dialog.Panel>
                </Transition.Child>
                
              </div>
            </div>
          </Dialog>
        </Transition>
      </div>
       {props.about?(
       <div className="w-auto">
          <div className="my-4 leading-8 text-justify font-extralight">
            {props.about}
            <span className="text-indigo-400 cursor-pointer ml-2 font-bold">
              Read More
            </span>
          </div>
       </div>
       ):("")}
      </div>
      <ProfileFeed />
    </>
  );
};

export default TabProfile;
