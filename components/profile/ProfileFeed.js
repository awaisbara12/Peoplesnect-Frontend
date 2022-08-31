import React from "react";
import Image from "next/image";
import NewsPostProfile from "./NewsPostProfile";
import ProfileAvatar from "../../public/images/profile-girl.jpg";
import ProfileFeedSingle from "./ProfileFeedSingle";

const ProfileFeed = () => {
  return (
    <div className="mt-8">
      <div className="px-10 w-[750px] xl:w-full">
        <NewsPostProfile />
        <ProfileFeedSingle />
      </div>
    </div>
  );
};

export default ProfileFeed;
