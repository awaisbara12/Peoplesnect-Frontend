import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import postimage from "../../public/images/266-hero.jpg";
import photos from "../../public/images/pagecover.jpg";
import photos1 from "../../public/images/brand.jpg";
import photos2 from "../../public/images/product1.png";
import photos3 from "../../public/images/groupcover.jpg";

import ProfileAvatar from "../../public/images/profile-girl.jpg";
import {
  BookmarkAltIcon,
  PhotographIcon,
  ChatAlt2Icon,
  CogIcon,
  LocationMarkerIcon,
  PencilIcon,
  PhoneIcon,
  UserIcon,
  XIcon,
  StarIcon,
} from "@heroicons/react/outline";
import { BookmarkIcon } from "@heroicons/react/solid";
import {
  Tabs,
  TabsHeader,
  TabsBody,
  Tab,
  TabPanel,
} from "@material-tailwind/react";
import TabsProfileCard from "./profile-tabs/TabsProfileCard";
import ProfileSideBarFeed from "./profile-sidebar/ProfileSideBarFeed";

const ProfileTopCard = () => {
  const [openTab, setOpenTab] = React.useState(1);
  return (
    <div className="mt-8">
      <div className="px-10 w-[720px] xl:w-full">
        <ProfileSideBarFeed />
      </div>
    </div>
  );
};

export default ProfileTopCard;
