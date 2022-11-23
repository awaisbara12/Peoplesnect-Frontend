import React, { Fragment, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import InputEmoji from "react-input-emoji";
import { HeartIcon, ChatIcon, DotsHorizontalIcon, PencilIcon, TrashIcon } from "@heroicons/react/outline";
import ProfileAvatar from "../../../public/images/profile-avatar-2.png";
import { Popover, Transition } from "@headlessui/react";
import { COMMENT_API_KEY, NEWSFEED_COMMENT_POST_KEY } from "../../../pages/config";
import axios from "axios";

const ReplyComments = (props) => {
  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }

  const [edit_on, setEditOn] = useState(false);
  const [editCommentId, setCommentId] = useState("")
  const [postText, setPostText] = useState("");

   function deteleComment(commentId) {
    const res =  axios(COMMENT_API_KEY + "/" + commentId, {
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
    const result = res;

    try {
      if (result) {
        if(document.getElementById(`comment-${commentId}`)){
          document.getElementById(`comment-${commentId}`).classList.add("hidden");
          
          async function getFeedComments (){
            const res = await axios(
              NEWSFEED_COMMENT_POST_KEY + "/" + props.news_feed_id + "/comments",
              {
                method: "GET",
                headers: {
                  Accept: "application/json",
                  "Content-type": "application/json; charset=utf-8",
                  "Access-Control-Allow-Origin": "*",
                  "Access-Control-Allow-Credentials": true,
                  Authorization: authKey,
                },
                credentials: "same-origin",
              }
            );
            const result = await res;
            try {
              if (result.status == 200) {
                props.setComments(result.data);
                //feedId.setNextPage(result.data.pages.next_page)
                props.setIs_deleted(1);
                if (!result.data.data[0]){
                  props.setComments_count(0);
                }
                else
                {
                  props.setComments_count(result.data.data[0].news_feed.comments_count);
                }
              }
            } catch (error) {
              console.log(error);
            }
            
            return result;
          };
          getFeedComments();
        }
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

  function updateComment(commentId) {

    const dataForm = new FormData();
    dataForm.append("comments[body]", postText);

    fetch(COMMENT_API_KEY+"/"+commentId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
      body: dataForm,
    })
    .then((resp) => resp.json())
    .then((result) => {
      if (result) {
        setEditOn(false)
        setCommentId(commentId)
        let ItemsCopy = {data: []}
        let x = props.comments.map((entry) => {
          if(entry.id == commentId)
          {
            entry.body = result.data.body
          }
          ItemsCopy["data"].push(entry)
        })
        props.setComments(ItemsCopy);
      }
    })
    .catch((err) => console.log(err));
    setPostText("");
  }

  function likeComment(commentId){
    console.log(commentId)
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
                <div className="flex items-start  gap-[10px]">
                  {comment.user.display_photo_url?(
                    <img
                      src={comment.user.display_photo_url}
                      className="object-cover rounded-full z-40 h-[38px] w-[38px]"
                      alt=""
                    />
                  ):(
                    <Image src={ProfileAvatar} width={38} height={38} alt="" />
                  )}
                  
                  <div>
                    <span className="text-slate-900 flex gap-[6px] items-center">
                      {comment.user.first_name} {comment.user.last_name}
                      <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                      <div className="text-gray-400">{comment.created_at}</div>
                    </span>
                    <div className="text-gray-900 text-sm">
                      {comment.user.city}, {comment.user.country}
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
                      className="ml-0"
                      type="text"
                      onChange={setPostText}
                      react-emoji="w-{80%}"
                      placeholder={comment.body}
                    />
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => cancelEdit(comment.id)}
                      className="bg-transparent border-2 border-indigo-400 text-indigo-400 px-2 py-1 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button onClick={() => updateComment(comment.id)} className="bg-indigo-400 text-white border-2  px-2 py-1 rounded-xl">
                      Save
                    </button>
                  </div>
                </>
              ) : (
                <>
                  {comment.attachments_link ? (
                    <img
                      src={comment.attachments_link[0]}
                      className="aspect-video object-cover rounded-xl mb-4 h-[110px] w-[100px]"
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                  <p className="text-gray-900 mt-[6px]">{comment.body}</p>
                </>
              )}

              <div className="flex items-center gap-[14px] mt-[10px]">
                <HeartIcon className="w-5 h-5 cursor-pointer" onClick={() => likeComment(comment.id)}/>
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