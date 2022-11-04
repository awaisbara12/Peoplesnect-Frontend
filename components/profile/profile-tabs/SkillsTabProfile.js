import { useState, useEffect, React, Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { Dialog } from "@headlessui/react";
import Link from "next/link";
import { ChevronRightIcon, PencilAltIcon, XIcon } from "@heroicons/react/outline";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { TagsInput } from "react-tag-input-component";

const SkillsTabProfile = (props) => {
  const [selected, setSelected] = useState();
  let [isOpen, setIsOpen] = useState(false);
  const [skill, setuserskill] = useState();
  function closeModal() {
    setIsOpen(false);
    
  }

  function openModal() {
    setIsOpen(true);
  }
  useEffect(()=>{
    setuserskill(props.uskill)
  })
   //console.log("skills",skill);
  return (
    <div className="bg-white rounded-xl p-10">
      <div className="flex items-center justify-between mb-5">
        <div className="font-extrabold ">Skills</div>
        <div className="flex ml-auto gap-2">
          <a>
            <PlusCircleIcon 
            onClick={openModal}
            className="h-5 w-5 hover:text-indigo-400" />
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
                      Skills
                    </Dialog.Title>
                  <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
                    <div className="bg-white px-12 py-5 rounded-xl">
                    <div>
                        <TagsInput
                          value={selected}
                          onChange={setSelected}
                          name="skills"
                          placeHolder="Add Skills"
                        />
                        <em>press enter to add new Skill</em>
                      </div>
                      <div className="flex gap-4 justify-end">
                        <Link href="">
                          <button
                                type="submit"
                                className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                              >
                                Save Skilss
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
      </div>
      <div className="font-bold uppercase px-2">
        <div className="flex flex-col">
          { skill?(
            skill.map((s) => (
              <div className="border-b-1 py-5">
                <div className="flex justify-between items-center">
                  <div className="">{s.title}</div>
                  <a className="hover:text-indigo-400">
                    <PencilAltIcon onClick={openModal}
                      className="h-5 w-5 underline" />
                  </a>
                </div>
              </div>
            ))
          ):("")} 
        </div>
        <div className="flex justify-center items-center mt-10">
          Show All Skills
          <ChevronRightIcon className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
};

export default SkillsTabProfile;
