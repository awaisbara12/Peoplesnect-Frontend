import React, { Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import postimage from "../../../public/images/752126.jpg";
import postimage1 from "../../../public/images/post-image.png";

import { Menu, Transition } from "@headlessui/react";
import ProfileAvatar from "../../../public/images/profile-avatar.png";
import {
  BellIcon,
  BookmarkIcon,
  DotsHorizontalIcon,
  LogoutIcon,
  MailIcon,
  ViewGridAddIcon,
} from "@heroicons/react/outline";
import { Popover } from "@headlessui/react";

import { useState, useEffect } from "react";
import TimezoneSelect, { allTimezones } from "react-timezone-select";
import {
  PhotographIcon,
  VideoCameraIcon,
  CalendarIcon,
  NewspaperIcon,
  XIcon,
  CameraIcon,
  TrashIcon,
} from "@heroicons/react/outline";
import { useFormik } from "formik";
import { eventScheema } from "../../auth/schemas/CreateEventScheema";
import { Dialog } from "@headlessui/react";
import { GROUP_API, POST_NEWSFEED_API_KEY, CURENT_USER_LOGIN_API, InviteFriends, JOIN_GROUP_API, GROUP_MEMBER_Request } from "../../../pages/config";
import Spinner from "../../common/Spinner";

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
import {
  GlobeIcon,
  HeartIcon,
  ChatAltIcon,
  DocumentReportIcon,
} from "@heroicons/react/outline";
import PostComments from "./PostComments";
import FilterComments from "./FilterComments";
import { UserCircleIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";
import ProfileFeed from "./ProfileFeed";
import InviteFriendsGroup from "./InviteFriendsGroup/InviteFriendsGroup";
import axios from "axios";

// import Spinner from "../../../common/Spinner";

const cardDropdown = [
  {
    name: "Turn Off Notifications",
    href: "",
    icon: BellIcon,
  },
  {
    name: "Save",
    href: "#",
    icon: BookmarkIcon,
  },
  {
    name: "Report to admin",
    href: "#",
    icon: DocumentReportIcon,
  },
];

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 355) + (text.length > 355 ? ("......") : ('')) : text}
      {text.length > 355 ? (
        <span onClick={toggleReadMore} className="text-indigo-400 cursor-pointer ml-2 font-bold">
          {isReadMore ? "Read more" : "Show less"}
        </span>
      ) : ('')}
    </p>
  );
};

const JoindGroup = (setList, singleItem) => {
  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }
  const [loading, setLoading] = useState(false);
  const [postText, setPostText] = useState("");
  const [eventCoverImage, setEventCoverImage] = useState([]);
  const [previewEventCoverImage, setPreviewEventCoverImage] = useState();
  const [postImage, setPostImage] = useState([]);
  const [postImagePreview, setpostImagePreview] = useState();
  const [selectedTimezone, setSelectedTimezone] = useState({});
  const [isCheck, setIsCheck] = useState([]);
  const [feedType, setFeedType] = useState("basic");
  const [eventType, setEventType] = useState();
  const [videoSrc, setVideoSrc] = useState([]);
  const [videoPreview, setVideoPreview] = useState();
  const [currentUser, setCurrentUser] = useState();
  let [isOpen, setIsOpen] = useState(false);
  const [join, setjoin] = useState(false);
  const [memberrequest, setMemberRequest] = useState();
  const [spinner, setSpinner] = useState(false);

  const [group, setgroup] = useState();
  const [admins, setadmins] = useState();

  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
  // console.log(admins);
  // console.log(currentUser);
  // console.log(group);

  const handleImageSelect = (e) => {
    setEventCoverImage(e.target.files[0]);
    if (e.target.files.length !== 0) {
      setPreviewEventCoverImage(window.URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleImagePost = (e) => {
    setPostImage(e.target.files[0]);
    if (e.target.files.length !== 0) {
      setpostImagePreview(window.URL.createObjectURL(e.target.files[0]));
    }
    setFeedType("image_feed");
  };

  const handleCoverReomve = (e) => {
    setpostImagePreview(window.URL.revokeObjectURL(e.target.files));
    setPreviewEventCoverImage(window.URL.revokeObjectURL(e.target.files));
    setVideoPreview(window.URL.revokeObjectURL(e.target.files));
  };

  const handleVideo = (e) => {
    setFeedType("video_feed");
    setVideoSrc(e.target.files[0]);
    if (e.target.files.length !== 0) {
      setVideoPreview(URL.createObjectURL(e.target.files[0]));
    }
  };

  const onSubmit = () => {
    resetForm();
  };

  const {
    values,
    errors,
    touched,
    handleBlur,
    handleChange,
    resetForm,
  } = useFormik({
    initialValues: {
      eventOnline: "online",
      eventInPerson: "In person",
      eventName: "",
      timezone: "",
      startDate: "",
      endDate: "",
      startTime: "",
      endTime: "",
      address: "",
      venue: "",
      externalLink: "",
      description: "",
      speakers: "",
    },
    validationSchema: eventScheema,
  });

  function postNewsData(e) {
    e.preventDefault();

    setLoading(true);
    fetch(POST_NEWSFEED_API_KEY, {
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
          setList(result);
          setLoading(false);
        }
      })
      .catch((err) => console.log(err));
    setFeedType("basic");
    setPostText("");
    setpostImagePreview("");
    setEventCoverImage("");
    setVideoSrc("");
    setVideoPreview("");
    onSubmit();
  }

  // console.log("id in group",isCheck);

  function closeModal() {
    setIsOpen(false);
  }

  function closeinviteModal() {
    setIsCheck([]);
    setIsOpen(false);
  }

  const SendInviteRequest = async () => {
    const res = await axios(InviteFriends + "/invite_friend?group_id=" + myArray[1] + "&invite_list=" + isCheck, {
      method: "GET",
      headers: {
        Accept: "application/json",
        "Content-type": "application/json; charset=utf-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Credentials": true,
        Authorization: authKey,
      },
      credentials: "same-origin",
    });
    const result = await res;

    try {
      if (result.status == 200) {
        // setList(result.data.data);
        setIsCheck([]);
        setIsOpen(false);
      }
    } catch (error) {
      console.log(error);
    }
    return result;
  };

  function inviteModal() {
    if (isCheck.length > 0) {
      SendInviteRequest();
    }
    else {
      alert("Select Friend to Invite");
    }
  }

  function openModal() {
    setIsOpen(true);
  }

  const [items, setItems] = useState(singleItem.items);

  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }
  const Current_User = async () => {

    await fetch(CURENT_USER_LOGIN_API, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setCurrentUser(result.data);
        }
      })
      .catch((err) => console.log(err));
  }

  const LeaveGroup = () => {
    const res = fetch(GROUP_API + "/leave_group?id=" + myArray[1], {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        router.push("/group-page");
      })
  }
  const GetGroup = () => {
    const res = fetch(GROUP_API + "/" + myArray[1], {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        // console.log("Group Data=>", result.data)
        setgroup(result.data);
      })
  }

  function isadmin(admin, user_id) {
    // console.log("hrllo");
    for (var i = 0; i < admin.length; i++) {
      if (admin[i].group_member.id == user_id) {
        return true;
      }
    }
    return false;
  }

  const GetAdmins = () => {
    fetch(GROUP_API + "/get_group_admin?group_id=" + myArray[1], {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        setadmins(result.data);
      })
  };

  const GroupJoinFun = event => {
    setSpinner(true);
    event.currentTarget.disabled = true;
    const res = fetch(JOIN_GROUP_API + "?id=" + myArray[1], {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (group && group.group_type != "private_group") {
          setjoin(true);
        } else {
          // setjoin(true);
          // router.push('/group-page');
          GetMemberRequest();
        }

      })
  }

  const Ismember = () => {
    const res = fetch(GROUP_API + "/ismember?group_id=" + myArray[1], {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result.data) {
          setjoin(true);
        }
      })
  }

  const GetMemberRequest = async () => {

    await fetch(GROUP_MEMBER_Request + "?group_id=" + myArray[1], {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          if (result.data) {
            setMemberRequest(result.data);
            // console.log(result.data);
          }
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    Current_User();
    GetMemberRequest();
    Ismember();
    GetGroup();
    GetAdmins();
  }, [myArray[1]])

  return (
    <div className="mt-8 w-[620px] xl:w-[980px] lg:w-[710px] md:w-[780px] px-auto md:px-0 lg:px-0 xl:px-0">
      {/* Group Profile */}
      <div className="">
        <div className="blogs bg-white rounded-xl">
          <div className="image">

            {group ? (
              group.cover_image_url ? (
                <img
                  src={group.cover_image_url}
                  className="object-cover rounded-xl h-[350px] w-[1350px]"
                  alt=""
                />
              ) : (
                <Image
                  src={postimage}
                  className="object-cover rounded-xl"
                  width={1350}
                  height={450}
                  alt=""
                />
              )
            )
              : (<Image
                src={postimage}
                className="object-cover rounded-xl"
                width={1350}
                height={450}
                alt=""
              />
              )}

          </div>
          <div className="absolute  p-2 -mt-10 ml-14 rounded-full bg-white">
            <div className="relative">
              {group && group.display_image_url ? (
                <img
                  src={group.display_image_url}
                  className="object-cover rounded-full z-40 h-[100px] w-[100px]"
                  alt=""
                />
              ) : (
                <Image
                  src={postimage}
                  className="object-cover rounded-full z-40"
                  width={96}
                  height={96}
                  alt=""
                />
              )}
            </div>
          </div>
          <div className="p-5 mt-14">
            <div className=" flex justify-between items-center">
              <div className="heading text-2xl text-indigo-400 font-bold">
                {group ? (group.title) : ('')}
              </div>
              <div className="">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="">
                      <div className="hover:bg-indigo-100 focus:bg-indigo-100 rounded-full h-8 w-8 flex items-center justify-center">
                        <DotsHorizontalIcon
                          className="h-5 w-5"
                          aria-hidden="true"
                        />
                      </div>
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-200"
                    enterFrom="opacity-0 translate-y-1"
                    enterTo="opacity-100 translate-y-0"
                    leave="transition ease-in duration-150"
                    leaveFrom="opacity-100 translate-y-0"
                    leaveTo="opacity-0 translate-y-1"
                  >
                    <Menu.Items className="absolute left-1/2 z-10 mt-3 w-48 max-w-sm -translate-x-full transform px-4 sm:px-0 lg:max-w-3xl">
                      <div className="flex items-start flex-col gap-2 border-1 bg-white rounded-xl p-3">
                        {/* <Menu.Item className="flex gap-1">
                            <a href="">
                              <BellIcon className="w-5 h-5" />
                              Notifications
                            </a>
                          </Menu.Item> */}
                        {currentUser && join == true && group ? (!(admins && isadmin(admins, currentUser.id)) && currentUser.id != group.owner.id ? (
                          <div>
                            <Menu.Item className="flex gap-1 mt-2">
                              <a href="">
                                <MailIcon className="h-5 w-5" />
                                Report
                              </a>
                            </Menu.Item>
                            <Menu.Item className="flex gap-1 mt-2">

                              <a onClick={() => LeaveGroup()}>
                                <LogoutIcon className="h-5 w-5" />
                                Leave
                              </a>

                            </Menu.Item>
                          </div>
                        ) : (
                          ""
                        )) : ("")
                        }
                        {
                          currentUser && group ? (
                            (admins && isadmin(admins, currentUser.id)) || group.owner.id == currentUser.id ? (
                              <Menu.Item className="flex gap-1 mt-2">
                                <Link href={{ pathname: "/group-page/admin-view", query: myArray[1] }} onClick={() => alert("yes")}>
                                  <a className="flex">
                                    <UserCircleIcon className="h-5 w-5" />
                                    View As Admin
                                  </a>
                                </Link>
                              </Menu.Item>
                            ) : ("")
                          ) : ("")
                        }
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
              {currentUser && join == true && group ? (!(admins && isadmin(admins, currentUser.id)) && group.owner.id != currentUser.id ? (
                <Link href={{ pathname: "/group-page/joind-group/group-members", query: myArray[1] }}>
                  <a>
                    <div className="border border-indigo-400 py-2 px-3 text-indigo-400 rounded-full">
                      Group Details
                    </div>
                  </a>
                </Link>
              ) : ("")) : ("")}
            </div>
            <div className="Details mt-5">
              <div className="font-extralight">
                <ReadMore>
                  {group ? (group.description) : ('')}
                </ReadMore>
              </div>
            </div>
          </div>
          <div className="flex justify-end">
            <a>
              {memberrequest && memberrequest.status == "pending" ? (
                <button disabled={true} className=" bg-indigo-400 text-sm text-white rounded-br-lg p-3 cursor-pointer">
                  Request Send
                </button>
              ) : (
                currentUser && group && (join == true || currentUser.id == group.owner.id || (admins && isadmin(admins, currentUser.id))) ? (
                  <button
                    onClick={openModal}
                    type="submit"
                    className=" bg-indigo-400 text-sm text-white rounded-br-lg p-3 cursor-pointer"
                  >
                    Invite Friends
                  </button>
                ) : (
                  <button onClick={GroupJoinFun} className=" bg-indigo-400 text-sm text-white rounded-br-lg p-3 cursor-pointer">
                    Join Group {spinner && true ? <Spinner /> : ""}
                  </button>
                )
              )}

            </a>
            <div>
              <div className="">
                <Transition appear show={isOpen} as={Fragment}>
                  <Dialog
                    as="div"
                    className="relative z-50"
                    static={true}
                    onClose={closeModal}
                  >
                    <Transition.Child
                      as={Fragment}
                      enter="ease-out duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="ease-in duration-200"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div className="fixed inset-0 bg-black bg-opacity-75" />
                    </Transition.Child>

                    <div className="fixed inset-0 overflow-y-auto">
                      <div className="flex min-h-full items-center justify-center p-4 text-center">
                        <Transition.Child
                          as={Fragment}
                          enter="ease-out duration-300"
                          enterFrom="opacity-0 scale-95"
                          enterTo="opacity-100 scale-100"
                          leave="ease-in duration-200"
                          leaveFrom="opacity-100 scale-100"
                          leaveTo="opacity-0 scale-95"
                        >
                          <Dialog.Panel className="w-[620px] relative bg-white rounded-xl xl:w-[580px] lg:w-[730px] md:w-[680px] px-5 md:px-0 lg:px-0 py-4 text-left align-middle shadow-xl transition-all h-[700px] overflow-y-scroll">
                            <Dialog.Title>
                              <div className="sticky top-10 flex justify-between items-center mx-4">
                                <div
                                  className="text-lg font-medium leading-6 text-gray-900 px-8"
                                >
                                  Invite Friends
                                </div>
                                <XIcon
                                  onClick={closeinviteModal}
                                  className="w-5 h-5 cursor-pointer"
                                />
                              </div>
                            </Dialog.Title>
                            <div className="p-8">
                              <InviteFriendsGroup group={group} isCheck={isCheck} setIsCheck={setIsCheck} />
                            </div>
                            <div className="sticky bottom-0 right-0">
                              <div className="p-2 rounded-xl">
                                <div className="flex gap-4 justify-end">
                                  <button
                                    onClick={closeinviteModal}
                                    type="submit"
                                    className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                                  >
                                    Close
                                  </button>
                                  <button
                                    onClick={inviteModal}
                                    type="submit"
                                    className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                                  >
                                    Invite
                                  </button>
                                </div>
                              </div>
                            </div>
                          </Dialog.Panel>
                        </Transition.Child>
                      </div>
                    </div>
                  </Dialog>
                </Transition>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Don't Remove this Commented Section */}

      {/* {currentUser && group && (join == true || group.group_type != "private_group" || currentUser.id == group.owner.id || (admins && isadmin(admins, currentUser.id))) ? (
        <ProfileFeed currentUser={currentUser} group={group} admins={admins} />
      ) : ("")} */}

       {currentUser && group && (join == true|| currentUser.id == group.owner.id || (admins && isadmin(admins, currentUser.id))) ? (
        <ProfileFeed currentUser={currentUser} group={group} admins={admins} />
      ) : ("")}
      
    </div>
  );
};

export default JoindGroup;
