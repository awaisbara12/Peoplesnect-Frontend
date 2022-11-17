import React, { Fragment } from "react";
import NewsSearch from "../../news-feed/search/NewsSearch";
import ProfileFooter from "./ProfileFooter";
import SugestedUser from "./SugestedUser";
const ProfileSideBarFeed = () => {
  return (
    <div className="mt-8">
      <div className="">
        <SugestedUser />
        <ProfileFooter />
      </div>
    </div>
  );
};

export default ProfileSideBarFeed;
