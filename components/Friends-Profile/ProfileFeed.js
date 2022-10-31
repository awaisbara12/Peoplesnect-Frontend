import React from "react";
import Image from "next/image";
import NewsPostProfile from "./NewsPostProfile";
import ProfileAvatar from "../../public/images/profile-girl.jpg";
import ProfileFeedSingle from "./ProfileFeedSingle";

const ProfileFeed = () => {
  return (
    <div className="mt-8">
      <div className="w-[750px] md:w-full xl:w-full">
        <ProfileFeedSingle />
      </div>
    </div>
  );
};

export default ProfileFeed;
