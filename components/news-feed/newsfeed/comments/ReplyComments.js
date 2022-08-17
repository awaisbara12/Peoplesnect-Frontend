import React, { Fragment } from "react";
import Image from "next/image";
import Link from "next/link";
import { HeartIcon, ChatIcon } from "@heroicons/react/outline";
import ProfileAvatar from "../../../../public/images/profile-avatar-2.png";

const ReplyComments = (comments) => {
  return (
    <Fragment>
    <div>
      {comments &&
        comments.comments.map((comment) => (
          <div className="w-full bg-zinc-100 mt-[14px] p-[16px] rounded-xl" key={comment.id}>
            <div className="flex items-start gap-[10px]">
              <Image src={ProfileAvatar} width={38} height={38} alt="" />
              <div>
                <Link href="/">
                  <span className="text-slate-900 flex gap-[6px] items-center">
                    {comment.user.first_name} {comment.user.last_name}
                    <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                    <div className="text-gray-400">{comment.created_at}</div>
                  </span>
                </Link>
                <div className="text-gray-900 text-sm">{comment.user.recent_job}</div>
                <p className="text-gray-900 mt-[6px]">
                  {comment.body}
                </p>
                <div className="flex items-center gap-[14px] mt-[10px]">
                  <HeartIcon className="w-5 h-5" />
                  <div className="w-[0.5px] h-4 bg-gray-900"></div>
                  <ChatIcon className="w-5 h-5" />
                </div>
              </div>
            </div>
          </div>
        ))
      }
    </div>
    </Fragment>
  );
};

export default ReplyComments;
