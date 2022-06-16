import React, { Fragment } from "react";
import Image from "next/image";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { PhotographIcon } from "@heroicons/react/solid";
import ProfileAvatar from "../../../../public/images/profile-avatar.png";

const PostComments = () => {
  return (
    <Fragment>
      <div className="relative w-full mt-[14px]">
        <input
          type="text"
          className="w-full h-12 placeholder-slate-400 bg-zinc-100 rounded-full border-0 pl-14"
          placeholder="Your comment"
        />
        <div className="absolute top-[6.5px] left-2">
          <Image src={ProfileAvatar} width={34} height={34} />
        </div>
        <div className="flex gap-[14px] absolute top-[12.5px] right-3">
          <EmojiHappyIcon className="w-5 h-5" />
          <PhotographIcon className="w-5 h-5" />
        </div>
      </div>
    </Fragment>
  );
};

export default PostComments;
