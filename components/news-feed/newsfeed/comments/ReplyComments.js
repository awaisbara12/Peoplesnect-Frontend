import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon, ChatIcon,DotsHorizontalIcon,PencilIcon,DocumentReportIcon,XCircleIcon,TrashIcon } from "@heroicons/react/outline";
import ProfileAvatar from "../../../../public/images/profile-avatar-2.png";
import { Popover, Transition } from "@headlessui/react";

const cardDropdown = [
  {
    name: "EDIT",
    href: "#",
    icon: PencilIcon,
  },
  {
    name: "DELETE",
    href: "#",
    icon: TrashIcon,
  },
];

const ReplyComments = (comments) => {
  console.log(comments)
  return (
    <Fragment>
    <div>
      {comments.comments &&
        comments.comments.map((comment) => (
          <div className="w-full bg-zinc-100 mt-[14px] p-[16px] rounded-xl" key={comment.id}>
            <div class="flex justify-between">
              <div className="flex items-start  gap-[10px] mb-5">
                <Image src={ProfileAvatar} width={38} height={38} alt="" />
                <div>
                  <span className="text-slate-900 flex gap-[6px] items-center">
                    {comment.user.first_name} {comment.user.last_name}
                    <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                    <div className="text-gray-400">{comment.created_at}</div>
                  </span>
                  <div className="text-gray-900 text-sm">{comment.user.recent_job}</div>
                </div>
              </div>
              <div className="">
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={` ${
                          open ? "" : "text-opacity-90 focus-visible:outline-none"
                        }`}
                      >
                        <div className="hover:bg-indigo-100 focus:bg-indigo-100 rounded-full h-8 w-8 flex items-center justify-center">
                          <DotsHorizontalIcon className="w-5 h-5" />
                        </div>
                      </Popover.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute left-7 z-10 mt-3 w-36 max-w-sm -translate-x-full transform px-4 sm:px-0 lg:max-w-3xl">
                          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="relative bg-white py-1">
                              {cardDropdown.map((card) => (
                                <a
                                  key={card.name}
                                  href={card.id}
                                  className="-m-3 flex items-center rounded-lg p-1 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                >
                                  <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12 pl-2">
                                    <card.icon className="h-4 w-4 text-gray-900" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">
                                      {card.name}
                                    </p>
                                  </div>
                                </a>
                              ))}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </div>
            </div>
                {comment.attachments_link ? (
                  <img
                    src={comment.attachments_link[0]}
                    className="aspect-video object-cover rounded-xl mb-4"
                    alt=""
                  />
                ) : ("")}
                <p className="text-gray-900 mt-[6px]">
                  {comment.body}
                </p>
                <div className="flex items-center gap-[14px] mt-[10px]">
                  <HeartIcon className="w-5 h-5" />
                  <div className="w-[0.5px] h-4 bg-gray-900"></div>
                  <ChatIcon className="w-5 h-5" />
                </div>
              </div>
        ))
      }
    </div>
    </Fragment>
  );
};

export default ReplyComments;
