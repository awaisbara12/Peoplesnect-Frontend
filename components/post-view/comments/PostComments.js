import React, { useState, Fragment } from "react";
import dynamic from "next/dynamic";
import InputEmoji from "react-input-emoji";
const Picker = dynamic(() => import("emoji-picker-react"), { ssr: false });

import Image from "next/image";
import ProfileAvatar from "../../../public/images/profile-avatar.png";
import {
  PhotographIcon,
  EmojiHappyIcon,
  ChevronRightIcon,
  PaperAirplaneIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { useFormik } from "formik";
import { COMMENT_API_KEY, NEWSFEED_COMMENT_POST_KEY } from "../../../pages/config";
import axios from "axios";

const PostComments = (props) => {
  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }
  const [setLoading] = useState(false);
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState([]);
  const [postImagePreview, setpostImagePreview] = useState();
  const [comments, setComments] = useState([]);
 
  function handleOnEnter() {
    // console.log("enter", postText);
  }
  
  const handleImagePost = (e) => {
    setPostImage(e.target.files);
    if (e.target.files.length !== 0) {
      setpostImagePreview(window.URL.createObjectURL(e.target.files[0]));
    }

  };

  const { values } = useFormik({
    initialValues: {
      body: "",
      comment_attachments: [],
      news_feed_id: "",
    },
  });

  const onSubmit = () => {
    resetForm();
  };
 
  function postComment(e) {
    e.preventDefault();

    const dataForm = new FormData();
    dataForm.append("comments[body]", postText);
    dataForm.append("comments[commentable_id]", props.news_feed_id);
    dataForm.append("comments[commentable_type]", "NewsFeed");

    if (postImage.length > 0) {
      for (let i = 0; i < postImage.length; i++) {
        dataForm.append("comments[comment_attachments][]", postImage[i]);
       
      }
    }
    // setLoading(true);

    fetch(COMMENT_API_KEY, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
      body: dataForm,
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setComments(result.data);

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
                props.setComments_count(result.data.data[0].news_feed.comments_count)
                setComments(result.data);
                props.setIs_deleted(1);
              }
            } catch (error) {
              console.log(error);
            }
            
            return result;
          };
          getFeedComments();
        }
      })
      .catch((err) => console.log(err));
    setPostText("");
    setpostImagePreview("");
    setPostImage("");
  }

  const clearPic =()=>{
    setpostImagePreview('');
    setPostImage('');
  }
  return (
    <Fragment>
      <div className="relative w-full mt-[14px]">
        <div className="w-[433px] md:w-[640px] lg:md:w-[590px] xl:w-[840px] ml-9">
          <InputEmoji
            type="text"
            react-emoji="w-{100%}"
            value={postText}
            onChange={setPostText}
            onEnter={handleOnEnter}
            placeholder="Your comment"
          />
            {postImagePreview?(
              <div className="relative w-1/4 mt-2">
                <img
                src={postImagePreview}
                className="ml-5 rounded-xl my-4 max-h-[150px] max-w-[230px] object-cover"
                alt=""/>
                
                <div className="bg-indigo-100 absolute top-4 right-0 z-10 w-8 h-8 cursor-pointer flex justify-center items-center rounded-full"
                onClick={clearPic} >
                  <TrashIcon className="w-5 h-5 text-indigo-600" />
                </div>
              </div>
              ):('')}
        </div>
        <div className="absolute top-2 left-0">
          {props.dp?(
             <img
             src={props.dp}
             className="aspect-video object-cover rounded-full h-[42px] w-[42px]"
              
             width={34} 
             height={34} alt="" />
          ):(
             <Image 
             src={ProfileAvatar} 
             width={34} 
             height={34} alt="" />
          )}
         
        </div>
        <div className="flex items-center absolute top-3 right-0 ">
          <div className="">
            <div className="relative flex items-center justify-center">
              <PhotographIcon
                width={28}
                height={28}
                className="text-gray-500"
              />
              <input
                type="file"
                name="image"
                id="image"
                className="opacity-0 absolute w-6 h-6 -z-0"
                onChange={handleImagePost}
                title={""}
                multiple
              />
            </div>
          </div>

          <div className="flex gap-2 z-10">
            <button className="bg-transparent px-1 rounded-r-full text-gray-500 hover:text-indigo-400">
              <PaperAirplaneIcon
                className="h-7 w-7 rotate-90"
                onClick={postComment}
              />
            </button>
          </div>         
        </div>
      </div>
    </Fragment>
  );
};

export default PostComments;
