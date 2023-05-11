import React, { Fragment, Component, useEffect, useState, setState } from 'react';
import {
  BadgeCheckIcon,
  PlusIcon,
  GlobeIcon,
  HeartIcon,
  ChatAltIcon,
  DownloadIcon,
  BookmarkIcon,
  DotsHorizontalIcon,
  ShareIcon,
  DocumentReportIcon,
  XCircleIcon,
  XIcon,
  CalendarIcon,
} from "@heroicons/react/outline";
import { Popover, Transition } from "@headlessui/react";
import { Dialog } from "@headlessui/react";
import HashtagMentionInput from "../newspost/HashtagMentionInput";
import Link from "next/link";


import PostImage from "../../../../public/images/post-image.png";

const ShareModal = (singleItem) => {
  const [postText, setPostText] = useState("");
  let [isOpen, setIsOpen] = useState(false);
  const [tags, settags] = useState([]);
  const [mentioned, setMentioned] = useState([]);
  const [hashtaged, setHashtaged] = useState([]);
  let [hastags, sethastags] = useState();
  function closeModal() {
    setIsOpen(false);
  }

  function openModal2() {
    setIsOpen(true);
  }
  return (
    <div>
      <div>
        <div>
          <ShareIcon
            width={24}
            height={24}
            className="text-indigo-400 cursor-pointer"
            // onClick={() => copylink(items.id)}
            onClick={openModal2}
          />

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
                        Share Post
                      </Dialog.Title>
                      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
                        <div className="bg-white px-12 py-5 rounded-xl">
                          <form className="w-full">
                            <HashtagMentionInput postText={postText} setPostText={setPostText} mentioned={mentioned} tags={tags} settags={settags} hastags={hastags} />
                            <div className="border rounded-xl p-5">
                              Psots Caption here
                              <img
                                src={PostImage}
                                width={952}
                                height={240}
                                layout="responsive"
                                className="aspect-video object-cover rounded-lg mx-auto h-[390px]"
                                alt=""
                              />
                              <div className="py-3 px-3">
                                <div className="flex justify-between items-center">
                                  <div>
                                    <div className="text-red-400 text-sm">
                                      <span>start-time</span>
                                      <span>-end-time</span>&nbsp;
                                      <span>jana kab hai</span>&nbsp;
                                    </div>
                                    <div className="font-semibold text-lg">
                                      konsa event hai
                                    </div>
                                    <div className="flex items-center gap-2">
                                      <CalendarIcon
                                        width={16}
                                        height={16}
                                        className="text-gray-900"
                                      />
                                      <span className="text-gray-900 text-sm">
                                        kesa event hai
                                      </span>
                                    </div>
                                    <div className="text-gray-900"></div>
                                  </div>
                                  <Link
                                    href={{
                                      pathname: "/events-design/event-view",
                                      query: "items.id",
                                    }}
                                  >
                                    <a className="text-sm text-gray-600 cursor-pointer flex items-center border border-gray-100 rounded-full py-1 px-3">
                                      View Event
                                    </a>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </form>
                          <div className="flex gap-4 justify-end">
                            <button
                              onClick={closeModal}
                              type="submit"
                              className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                            >
                              Cancel
                            </button>
                            <Link href="">
                              <button
                                type="submit"
                                className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                              >
                                Share
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
    </div>
  );
}

ShareModal.propTypes = {

};

export default ShareModal;