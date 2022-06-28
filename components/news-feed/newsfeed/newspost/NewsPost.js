import React, { useState, useEffect } from "react";
import Image from "next/image";
import ProfileAvatar from "../../../../public/images/profile-avatar.png";
import {
  PhotographIcon,
  VideoCameraIcon,
  CalendarIcon,
  EmojiHappyIcon,
  NewspaperIcon,
  GlobeAltIcon,
} from "@heroicons/react/outline";
import { XCircleIcon } from "@heroicons/react/solid";
import { POST_NEWSFEED_API_KEY } from "../../../../pages/config";
import { useDropzone } from "react-dropzone";

import { getCookie } from "cookies-next";
const authKey = getCookie("authKey");

const NewsPost = () => {
  const [postText, setPostText] = useState("");
  const [files, setFiles] = useState([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "image/*": [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        )
      );
    },
  });

  const thumbs = files.map((file) => (
    <div key={file.name}>
      <div className="mt-2">
        <img
          className="rounded-xl"
          src={file.preview}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
          }}
        />
      </div>
    </div>
  ));

  const newsPost = async () => {
    const data = {
      news_feeds: {
        body: postText,
        feed_attachments: files,
      },
    };
    const resp = await fetch(POST_NEWSFEED_API_KEY, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `${authKey}`,
      },
      body: JSON.stringify(data),
    });

    const result = await resp.json();

    try {
      console.log(result);
    } catch (err) {
      console.log(err);
    }
    setPostText("");
    setFiles([]);
  };

  return (
    <div className="mt-7">
      <div className="w-[600px] rounded-xl bg-white p-[22px]">
        <form>
          <div className="w-full flex justify-start gap-[22px]">
            <div className="w-[42px] h-[42px]">
              <Image
                src={ProfileAvatar}
                width={42}
                height={42}
                placeholder="empty"
                alt="profile-image"
              />
            </div>

            <textarea
              type="text"
              name="post-text"
              value={postText}
              onChange={(e) => setPostText(e.target.value)}
              className="w-full pt-0 resize-none border-0 px-0 text-base overflow-y-hidden outline-none focus:outline focus:ring-0"
              placeholder="Start a post?"
            />
          </div>

          <aside className="pt-0 mb-5">{thumbs}</aside>

          <div className="flex justify-between">
            <div className="flex items-center gap-6">
              <div
                {...getRootProps({ className: "dropzone" })}
                className="relative flex items-center justify-center "
              >
                <PhotographIcon
                  width={22}
                  height={22}
                  className="text-indigo-400 cursor-pointer"
                />
                <input
                  type="file"
                  multiple
                  name="image"
                  className="opacity-0 absolute w-6 h-6 cursor-pointer -z-0"
                />
              </div>

              <VideoCameraIcon
                width={22}
                height={22}
                className="text-indigo-400 cursor-pointer"
              />

              <CalendarIcon
                width={22}
                height={22}
                className="text-indigo-400 cursor-pointer"
              />

              <EmojiHappyIcon
                width={22}
                height={22}
                className="text-indigo-400 cursor-pointer"
              />

              <NewspaperIcon
                width={22}
                height={22}
                className="text-indigo-400 cursor-pointer"
              />
            </div>
            <div
              onClick={() => newsPost()}
              className="w-[100px] h-8 rounded-full flex gap-1 items-center justify-center bg-indigo-400 text-white cursor-pointer"
            >
              <GlobeAltIcon width={16} height={16} /> Public
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsPost;
