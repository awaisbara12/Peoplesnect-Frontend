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
} from "@heroicons/react/outline";
import { useFormik } from "formik";
import { eventScheema } from "../../auth/schemas/CreateEventScheema";
import { COMMENT_API_KEY, NEWSFEED_COMMENT_POST_KEY } from "../../../pages/config";
import axios from "axios";

const PostComments = (feedId) => {
  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }
  const [setLoading] = useState(false);
  const [postText, setPostText] = useState("");
  const [postImage, setPostImage] = useState([]);
  const [postImagePreview, setpostImagePreview] = useState();
  const [comments, setComments] = useState([]);

  function handleOnEnter() {
    console.log("enter", postText);
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
  
  const getFeedComments = async () => {
    const res = await axios(
      NEWSFEED_COMMENT_POST_KEY + "/" + feedId.news_feed_id  + "/comments",
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
        
        feedId.setComments(result.data);
        feedId.setComments_count(result.data.data[0].news_feed.comments_count);
        feedId.setNextPage(result.data.pages.next_page)
       // setIs_deleted(false);
        //console.log("NewsFeed's Page", result.data.pages.next_page);
      }
    } catch (error) {
      console.log(error);
    }
   // setLoading(false);
    return result;
  };

   function postComment(e) {
    e.preventDefault();
    const dataForm = new FormData();
    dataForm.append("comments[body]", postText);
    dataForm.append("comments[commentable_id]", feedId.news_feed_id);
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
          getFeedComments();
          setComments(result.data);
          
        }
      })
      .catch((err) => console.log(err));
      setPostText("");
      setpostImagePreview("");
      setPostImage("");
  }
  return (
    <Fragment>
      <div className="relative w-full mt-[14px]">
      <div className="w-[440px] md:w-[640px] lg:w-[590px] xl:w-[840px] ml-9">
          <InputEmoji
            type="text"
            react-emoji="w-{100%}"
            value={postText}
            onChange={setPostText}
            onEnter={handleOnEnter}
            placeholder="Your comment"
          />
        </div>
        <div className="absolute top-2 left-0">
          <Image src={ProfileAvatar} width={34} height={34} alt="" />
        </div>
        <div className="flex items-center absolute top-3 right-0">
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

          <div className="flex gap-2 z-50">
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