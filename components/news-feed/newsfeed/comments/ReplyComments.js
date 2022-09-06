import React, { Fragment, useState } from "react";
import Image from "next/image";
import InputEmoji from "react-input-emoji";
import Link from "next/link";
import {
  HeartIcon,
  ChatIcon,
  DotsHorizontalIcon,
  PencilIcon,
  DocumentReportIcon,
  XCircleIcon,
  TrashIcon,
  PhotographIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import ProfileAvatar from "../../../../public/images/profile-avatar-2.png";
import { Popover, Transition } from "@headlessui/react";
import { COMMENT_API_KEY } from "../../../../pages/config";
import axios from "axios";

const ReplyComments = (props) => {
  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }

  const [edit_on, setEditOn] = useState(false);
  const [editCommentId, setCommentId] = useState("");

  const handleImagePost = (e) => {
    // setPostImage(e.target.files);
    // if (e.target.files.length !== 0) {
    //   setpostImagePreview(window.URL.createObjectURL(e.target.files[0]));
    // }
  };

  async function deteleComment(commentId) {
    const res = await axios(COMMENT_API_KEY + "/" + commentId, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        Authorization: authKey,
      },
      credentials: "same-origin",
    });
    const result = await res;

    try {
      if (result) {
        document.getElementById(`comment-${commentId}`).remove();
      }
    } catch (error) {
      console.log(error);
    }
  }

  function editComment(commentId) {
    setEditOn(true);
    setCommentId(commentId);
  }

  function cancelEdit(commentId) {
    setEditOn(false);
    setCommentId(commentId);
  }

  return (
    <Fragment>
      <div>
        {props.comments &&
          props.comments.map((comment) => (
            <div
              className="w-full bg-zinc-100 mt-[14px] p-[16px] rounded-xl"
              id={`comment-${comment.id}`}
              key={comment.id}
            >
              <div className="flex justify-between">
                <div className="flex items-start  gap-[10px] mb-5">
                  <Image src={ProfileAvatar} width={38} height={38} alt="" />
                  <div>
                    <span className="text-slate-900 flex gap-[6px] items-center">
                      {comment.user.first_name} {comment.user.last_name}
                      <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                      <div className="text-gray-400">{comment.created_at}</div>
                    </span>
                    <div className="text-gray-900 text-sm">
                      {comment.user.recent_job}
                    </div>
                  </div>
                </div>
                <div className="">
                  <Popover className="relative">
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={` ${
                            open
                              ? ""
                              : "text-opacity-90 focus-visible:outline-none"
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
                          <Popover.Panel className="absolute left-7 z-10 top-6 w-36 max-w-sm -translate-x-full transform px-4 sm:px-0 lg:max-w-3xl">
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                              <div className="relative bg-white py-1">
                                <button
                                  key="Edit"
                                  onClick={() => editComment(comment.id)}
                                  className="flex items-center w-full rounded-lg hover:bg-gray-50 h-6"
                                >
                                  <div className="flex items-center gap-3 justify-center text-white pl-2">
                                    <PencilIcon className="h-4 w-4 text-gray-900" />
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">
                                        Edit
                                      </p>
                                    </div>
                                  </div>
                                </button>
                                <button
                                  key="Delete"
                                  onClick={() => deteleComment(comment.id)}
                                  className="flex items-center w-full rounded-lg hover:bg-gray-50 h-6"
                                >
                                  <div className="flex items-center gap-3 justify-center text-white pl-2">
                                    <TrashIcon className="h-4 w-4 text-gray-900" />
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">
                                        Delete
                                      </p>
                                    </div>
                                  </div>
                                </button>
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                </div>
              </div>

              {edit_on && editCommentId == comment.id ? (
                <>
                  <div className="relative -ml-5">
                    <InputEmoji
                      value={comment.body}
                      className=""
                      type="text"
                      react-emoji="w-{80%}"
                      placeholder="Edit Your comment"
                    />
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => cancelEdit(comment.id)}
                      className="bg-transparent border-2 border-indigo-400 text-indigo-400 px-2 py-1 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button className="bg-indigo-400 text-white border-2  px-2 py-1 rounded-xl">
                      Save
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {comment.attachments_link ? (
                    <img
                      src={comment.attachments_link[0]}
                      className="aspect-video object-cover rounded-xl mb-4"
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                  <p className="text-gray-900 mt-[6px]">{comment.body}</p>
                </>
              )}

              <div className="flex items-center gap-[14px] mt-[10px]">
                <HeartIcon className="w-5 h-5" />
                <div className="w-[0.5px] h-4 bg-gray-900"></div>
                <ChatIcon className="w-5 h-5" />
              </div>
            </div>
          ))}
      </div>
    </Fragment>
  );
};

export default ReplyComments;
