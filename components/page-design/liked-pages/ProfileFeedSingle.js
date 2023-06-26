import React, { Fragment, useEffect, useState, setState, useId } from "react";
import Image from "next/image";
import {
  BadgeCheckIcon,
  PlusIcon,
  GlobeIcon,
  HeartIcon,
  ChatAltIcon,
  DownloadIcon,
  BookmarkIcon,
  DotsHorizontalIcon,
  ShareIcon,
  DocumentReportIcon,
  XCircleIcon,
  PencilAltIcon,
  TrashIcon,
  PhotographIcon,
  VideoCameraIcon,
  PencilIcon,
} from "@heroicons/react/outline";
import { CalendarIcon } from "@heroicons/react/solid";
import { Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import ProfileAvatar from "../../../public/images/profile-avatar.png";
import PostImage from "../../../public/images/post-image.png";
import axios from "axios";
import {
  BOOKMARK_NEWSFEED_API_KEY,
  REACTION_NEWSFEED_API_KEY,
  NEWSFEED_COMMENT_POST_KEY,
  POST_NEWSFEED_API_KEY,
  GET_USER_BOOKMARKS,
  Show_USER_NEWS_FEEDS,
  SEARCH_MULTIPLE,
  HASHTAGS_API,
  REPORT_API
} from "../../../pages/config";
// import FilterComments from "./comments/FilterComments";
// import ReplyComments from "./comments/ReplyComments";
// import PostComments from "./comments/PostComments";
import { useRouter } from "next/router";
import Spinner from "../../common/Spinner";
import HashtagMentionInput from "../../news-feed/newsfeed/newspost/HashtagMentionInput";
import App from "../../news-feed/newsfeed/newspost/App";
import PostComments from "../../profile/comments/PostComments";
import FilterComments from "../../profile/comments/FilterComments";
import ReplyComments from "../../profile/comments/ReplyComments";
import ShareModal from "../../news-feed/newsfeed/feedcard/ShareModal";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 300) + (text.length > 300 ? ("......") : ('')) : text}
      {text.length > 300 ? (
        <span onClick={toggleReadMore} className="text-indigo-400 cursor-pointer ml-2 font-bold">
          {isReadMore ? "Read more" : "Show less"}
        </span>
      ) : ('')}
    </p>
  );
};

const cardDropdown = [
  {
    name: "Edit",
    href: "#",
    icon: PencilAltIcon,
  },
  {
    name: "Delete",
    href: "#",
    icon: TrashIcon,
  },

];

const ProfileFeedSingle = (singleItems) => {
  const [items, setItems] = useState(singleItems.lists);
  const [comments, setComments] = useState([]);
  const [comments_count, setComments_count] = useState([]);
  const [is_deleted, setIs_deleted] = useState(0);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState('');
  const [EditOn, setEditOn] = useState();     // for on/off edit moode
  const [EditPic, setEditPic] = useState();   // get orignal post pic/vedio
  const [UP_pic, setUP_pic] = useState();     // Upload Preview image
  const [U_pic, setU_pic] = useState();       // Upload image
  const [S_time, setS_time] = useState();       // Event Start time
  const [E_time, setE_time] = useState();       // Event End time
  const [E_date, setE_date] = useState();       // Event End date
  const [S_date, setS_date] = useState();       // Event start date
  const [eventame, seteventname] = useState();       // Event name
  const [event_type, setevent_type] = useState();       // Event type
  const [EditText, setEditText] = useState(singleItems.lists.body);  // get text for editing
  const [bookmarks, setBookmarks] = useState(singleItems.bookmarks);
  const [spinner, setSpinner] = useState(false);
  const [admins, setadmins] = useState(singleItems.admin);

  const [tags, settags] = useState([]);
  const [mentioned, setMentioned] = useState([]);
  const [hashtaged, setHashtaged] = useState([]);
  let [hastags, sethastags] = useState();

  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");

  // Bareer Key
  if (typeof window !== "undefined") { var authKey = window.localStorage.getItem("keyStore"); }
  // Copy Link
  const copylink = (postid) => {
    const links = window.location.href        // get Full Link
    const links1 = window.location.pathname   // get link after localhost
    const copylink1 = links.split(links1)
    navigator.clipboard.writeText(copylink1[0] + "/events-design/event-view?" + postid);    // get link domain like(localhost..etc)
    alert("Link Copied to your Clipboard");
  }
  // Get NewsFeed for the updation Lists
  const getNewsFeed = async () => {
    const res = await axios(`${Show_USER_NEWS_FEEDS}?page_id=${myArray[1]}`, {
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
        singleItems.setList(result.data.data);
        console.log(singleItems.lists)
      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    return result;
  };
  // delete user newsfeed's post
  const DeleteNewsFeed = async (uid) => {
    const res = await axios(POST_NEWSFEED_API_KEY + "/" + uid, {
      method: "DELETE",
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
        getNewsFeed();
        alert("Record Deleted Succefully");

      }
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
    return result;
  };

  function createReport(feedId) {
    const dataForm = new FormData();
    dataForm.append("reportable_id", feedId);
    dataForm.append("reportable_type", "NewsFeed");
    fetch(REPORT_API, {
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
          // console.log("Hello");
          alert("Your report send to Admin");
        }
      })
      .catch((err) => console.log(err));
  }

  // update user newsfeed's post
  const EditFeed = (uid) => {
    setEditOn(uid);
  };
  // Confirmation Edit Or Delete
  const optionConfirm = (uid, name, item) => {
    if (name == "Delete") { DeleteNewsFeed(uid); }
    if (name == "Edit") {
      if (item && item.event) {
        EditFeed(uid);
        setEditPic(item.event.cover_photo_url);
        setS_time(item.event.start_time)
        setE_time(item.event.end_time)
        setS_date(item.event.start_date)
        setE_date(item.event.end_date)
        setevent_type(item.event.event_type)
        seteventname(item.event.name)
      }
      else if (item && item.attachments_link) {
        EditFeed(uid);
        setEditPic(item.attachments_link);
      }
      else if (item) {
        EditFeed(uid);
      }
    }
    if (name == "Report") {
      var a = confirm(name);
      if (a) {
        createReport(item.id);
      }
    }

  };
  //Edited image
  const handleImage = (e) => {
    setU_pic(e.target.files[0]);
    if (e.target.files.length !== 0) {
      setUP_pic(window.URL.createObjectURL(e.target.files[0]));
    }
  };
  //Edited vedio
  const handleVideo = (e) => {
    setUP_pic('');
    setU_pic(e.target.files[0]);
    if (e.target.files.length !== 0) {
      setUP_pic(URL.createObjectURL(e.target.files[0]));
      //  console.log("Check",URL.createObjectURL(U_pic))
    }
  };
  //  remover preview
  const handleCoverReomve = (e) => {
    setUP_pic(window.URL.revokeObjectURL(e.target.files));
  };
  // Update feed
  function UpdateFeed(id, feedType) {
    setEditOn('');
    if (feedType != "video_feed") { setUP_pic(''); }
    const dataForm = new FormData();
    if (tags.length > 0) {
      for (let i = 0; i < tags.length; i++) {
        dataForm.append("tags[]", tags[i]);
      }
    }
    dataForm.append("news_feeds[body]", EditText.replace(/\[\@(.*?)\]\((.*?)\)/g, "@$1"));
    // dataForm.append("news_feeds[feed_type]", feedType);
    if (feedType === "event_feed") {
      dataForm.append("events[name]", eventame);
      dataForm.append("events[event_type]", event_type);
      if (U_pic) { dataForm.append("events[cover_photo]", U_pic); }
      // dataForm.append("events[event_timezone]", selectedTimezone.label);
      dataForm.append("events[start_date]", S_date);
      dataForm.append("events[end_date]", E_date);
      dataForm.append("events[start_time]", S_time);
      dataForm.append("events[end_time]", E_time);

    }
    else {
      if (U_pic) { dataForm.append("news_feeds[feed_attachments][]", U_pic); }
    }
    // setLoading(true);
    fetch(POST_NEWSFEED_API_KEY + "/" + id, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
      body: dataForm,
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          setItems(result.data);
          //getNewsFeed();
        }
      })
      .catch((err) => console.log(err));
    setSpinner(false)
  }
  // Forn All admins
  function isadmin(admin, user_id) {
    if (admin && admin.length > 0) {
      for (var i = 0; i < admin.length; i++) {
        if (admin[i].user.id == user_id) { return true; }
      }
    }
    return false;
  }

  function addHeart(feedId) {
    const dataForm = new FormData();
    dataForm.append("reactionable_id", feedId);
    dataForm.append("reaction_type", "heart");
    dataForm.append("reactionable_type", "NewsFeed");
    fetch(REACTION_NEWSFEED_API_KEY, {
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
          setItems(result.data);
        }
      })
      .catch((err) => console.log(err));
  }

  const UserBookmarks = async () => {    //current User

    await fetch(GET_USER_BOOKMARKS, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          singleItems.setBookmarks(result.data);
          singleItems.setBookmarks(result.data);
        }
      })
      .catch((err) => console.log(err));
  }

  function createBookmark(feedId) {
    const dataForm = new FormData();
    dataForm.append("bookmarkable_id", feedId);
    dataForm.append("bookmarkable_type", "NewsFeed");
    fetch(BOOKMARK_NEWSFEED_API_KEY, {
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
          setItems(result.data);
          UserBookmarks();
        }
      })
      .catch((err) => console.log(err));
  }

  async function deteleBookmark(bookmarkId) {
    const res = await axios(BOOKMARK_NEWSFEED_API_KEY + "/" + bookmarkId, {
      method: "DELETE",
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
      if (result) {
        setItems(result.data.data);
        UserBookmarks();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function deteleHeart(heartId) {
    const res = await axios(REACTION_NEWSFEED_API_KEY + "/" + heartId, {
      method: "DELETE",
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
      if (result) {
        setItems(result.data.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    setLoading(true);
    const getFeedComments = async () => {
      const res = await axios(
        NEWSFEED_COMMENT_POST_KEY + "/" + items.id + "/comments",
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
          setNextPage(result.data.pages.next_page)
          setComments(result.data);
          setIs_deleted(false);
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
      return result;
    };
    getFeedComments();
    mentioneds();
    HashTags();
  }, []);



  const HashTags = async () => {
    await fetch(HASHTAGS_API, {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          let awa = [];
          for (let i = 0; i < result.data.length; i++) {
            awa[i] = {
              display: result.data[i].name,
              id: result.data[i].id,
            }
          }
          sethastags(awa);
        }
      })
      .catch((err) => console.log(err));
  }
  let a = '';
  const mentioneds = () => {
    if (typeof window !== "undefined") {
      var authKey = window.localStorage.getItem("keyStore");
    }
    // const [mention,setmention] = useState([]);
    fetch(SEARCH_MULTIPLE + "/gettags?query=" + 'friends', {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          let awa = [];

          for (let i = 0; i < result.data.length; i++) {
            awa[i] = {
              display: '@' + result.data[i].first_name + " " + result.data[i].last_name,
              link: 'Friends-Profile?' + result.data[i].id,
              avatar: result.data[i].display_photo_url,
              id: result.data[i].id,
              type: 'User'
            }
          }
          a = awa;
          // setspeakerMention(awa);
          mentionpages();
          // console.log("frie",awa);
        }
      })
      .catch((err) => console.log(err));
  };
  const mentionpages = () => {
    if (typeof window !== "undefined") {
      var authKey = window.localStorage.getItem("keyStore");
    }
    // const [mention,setmention] = useState([]);
    fetch(SEARCH_MULTIPLE + "/gettags?query=" + 'pages', {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          let awa = [];

          for (let i = 0; i < result.data.length; i++) {
            awa[i] = {
              display: '@' + result.data[i].name,
              link: 'Liked-Pages?' + result.data[i].id,
              avatar: result.data[i].display_photo_url,
              id: result.data[i].id,
              type: 'Page'
            }
          }
          let dbc = [...a, ...awa]
          setMentioned(dbc);
          // setspeakerMention(dbc);
          //  console.log("ment",mentioned);
        }
      })
      .catch((err) => console.log(err));
  };












  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive((current) => !current);
  };

  return (
    <>
      {items.user ? (
        <div className="w-full xl:w-[980px] lg:w-[730px] md:w-[780px] pb-4 mt-[14px] bg-white rounded-xl">
          <div className="flex gap-2 justify-between items-center px-[22px] py-[14px]">
            <div className="flex gap-2">
              {singleItems.group && singleItems.group.display_photo_url ?
                (
                  <img
                    src={singleItems.group.display_photo_url}
                    className="object-cover rounded-full z-40 h-[42px] w-[42px]"
                    alt=""
                  />
                ) : (
                  <Image
                    src={ProfileAvatar}
                    width={45}
                    height={45}
                    alt=""
                  />
                )}

              <div>
                <h4 className="flex gap-[6px] items-center font-medium text-gray-900 capitalize">
                  {singleItems.group.name}
                  <BadgeCheckIcon
                    width={14}
                    height={14}
                    className="text-indigo-400"
                  />
                </h4>
                <div className="font-light text-gray-900 opacity-[0.8]">
                  {/* {items.user.recent_job} */}
                </div>
              </div>
            </div>
            <div className="">
              <div className="">
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={` ${open ? "" : "text-opacity-90 focus-visible:outline-none"
                          }`}
                      // onClick={()=>setEditOn('')}
                      >
                        <div className="hover:bg-indigo-100 focus:bg-indigo-100 rounded-full h-8 w-8 flex items-center justify-center">
                          <DotsHorizontalIcon className="w-5 h-5" />
                        </div>
                      </Popover.Button>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-200"
                        enterFrom="opacity-0 translate-y-1"
                        enterTo="opacity-100 translate-y-0"
                        leave="transition ease-in duration-150"
                        leaveFrom="opacity-100 translate-y-0"
                        leaveTo="opacity-0 translate-y-1"
                      >
                        <Popover.Panel className="absolute left-1/2 z-10 mt-3 w-72 max-w-sm -translate-x-full transform px-4 sm:px-0 lg:max-w-3xl">
                          {items.user && singleItems.currentUser.id == items.user.id || isadmin(admins, singleItems.currentUser.id) || singleItems.group.owner && singleItems.group.owner.id == singleItems.currentUser.id ? (
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                              <div className="relative bg-white py-1">
                                {singleItems.currentUser.id == items.user.id ? (
                                  <button
                                    key="Edit"
                                    onClick={() => optionConfirm(items.id, "Edit", items)}
                                    className="flex items-center w-full rounded-lg hover:bg-gray-50 h-6"
                                  >
                                    <div className="flex items-center gap-3 justify-center text-white pl-2">
                                      <PencilIcon className="h-4 w-4 text-gray-900" />
                                      <div>
                                        <p className="text-sm font-medium text-gray-900">
                                          Edit
                                        </p>
                                      </div>
                                    </div>
                                  </button>
                                ) : ('')}

                                {singleItems.currentUser.id == items.user.id || isadmin(admins, singleItems.currentUser.id) || singleItems.group.owner.id == singleItems.currentUser.id ? (
                                  <button
                                    key="Delete"
                                    onClick={() => optionConfirm(items.id, "Delete", items)}
                                    className="flex items-center w-full rounded-lg hover:bg-gray-50 h-6"
                                  >
                                    <div className="flex items-center gap-3 justify-center text-white pl-2">
                                      <TrashIcon className="h-4 w-4 text-gray-900" />
                                      <div>
                                        <p className="text-sm font-medium text-gray-900">
                                          Delete
                                        </p>
                                      </div>
                                    </div>
                                  </button>
                                ) : ('')}

                                <button
                                  key="Report"
                                  onClick={() => optionConfirm(items.id, "Report", items)}
                                  className="flex items-center w-full rounded-lg hover:bg-gray-50 h-6"
                                >
                                  <div className="flex items-center gap-3 justify-center text-white pl-2">
                                    <DocumentReportIcon className="h-4 w-4 text-gray-900" />
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">
                                        Report
                                      </p>
                                    </div>
                                  </div>
                                </button>

                              </div>
                            </div>
                          ) : (
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                              <div className="relative bg-white py-1">
                                <button
                                  key="Report"
                                  onClick={() => optionConfirm(items.id, "Report", items)}
                                  className="flex items-center w-full rounded-lg hover:bg-gray-50 h-6"
                                >
                                  <div className="flex items-center gap-3 justify-center text-white pl-2">
                                    <DocumentReportIcon className="h-4 w-4 text-gray-900" />
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">
                                        Report
                                      </p>
                                    </div>
                                  </div>
                                </button>
                              </div>
                            </div>
                          )}
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </div>
            </div>
          </div>
          {/* <div className="border-1 border-gray-100"></div> */}


          <div className="px-[22px] py-[14px]">
            {EditOn == items.id ? (
              //   <textarea
              //   type="text"
              //   name="post-text"
              //   value={EditText}
              //   onChange={(e) => setEditText(e.target.value)}
              //   className="w-full pt-0 resize-none border-0 px-0 text-base overflow-y-hidden outline-none focus:outline focus:ring-0"
              //   placeholder="Start a post?"
              // />
              <HashtagMentionInput postText={EditText} setPostText={setEditText} mentioned={mentioned} tags={tags} settags={settags} hastags={hastags} />

            ) : (
              // <p>{items.body ? items.body : ""}</p>
              items.tags && items.tags.length > 0 || (items.hashtags && items.hashtags.length > 0) ?
                (
                  <App state={items.body} website={items.tags} hashtags={items.hashtags} />
                )
                :
                (
                  <ReadMore>
                    {items.body ? items.body : ""}
                  </ReadMore>
                )
            )}

            {items.event && items.event ? (
              <div className="rounded-xl bg-white border border-gray-100 my-2">
                {items.event.cover_photo_url ? (
                  EditOn == items.id ? (
                    <>
                      {UP_pic ? (
                        <div className={`relative`}>
                          <img src={UP_pic} className="aspect-video object-cover rounded-xl mb-4" alt="" />
                          <div onClick={handleCoverReomve} className="bg-indigo-100 absolute top-4 right-4 z-50 w-8 h-8 cursor-pointer flex justify-center items-center rounded-full" >
                            <TrashIcon className="w-5 h-5 text-indigo-600" />
                          </div>
                        </div>
                      ) : (
                        <>
                          <img
                            src={EditPic}
                            className="aspect-video object-cover rounded-t-xl h-[390px] w-[952px]"
                            alt=""
                          />
                          <div className="flex">
                            <div className="relative flex gap-1 md:gap-2 items-center justify-center">
                              <div className="relative flex items-center justify-center">
                                <PhotographIcon
                                  width={22}
                                  height={22}
                                  className="text-indigo-400"
                                />
                                <input
                                  type="file"
                                  name="image"
                                  id="image"
                                  className="opacity-0 absolute w-6 h-6 -z-0"
                                  onChange={handleImage}
                                  title={""}
                                  multiple
                                />
                              </div>
                              <div className="font-extralight">Photo Upload</div>
                            </div>
                            {/* <button className={`w-[100px] h-8 rounded-full flex gap-1 items-center justify-center bg-indigo-400 text-white cursor-pointer`}
                            onClick={()=>UpdateFeed(items.id,items.feed_type )}>
                            Update {spinner && true ? <Spinner /> : ""}
                        </button> */}
                          </div>

                        </>
                      )}
                    </>
                  ) : (
                    <img
                      src={items.event.cover_photo_url}
                      className="aspect-video object-cover rounded-t-xl h-[390px] w-[952px]"
                      alt=""
                    />
                  )
                ) : (
                  ""
                )}
                <div className="py-3 px-3">
                  <div className="flex justify-between items-center">
                    <div>
                      <div className="text-red-400 text-sm">
                        {EditOn == items.id ? (
                          <div className="">
                            {/* Event Name */}
                            <>
                              <label htmlFor="startdate" className="text-neutral-900 text-sm">
                                Event Name <span className="text-red-500">*</span>
                              </label>
                              <input
                                placeholder="Event Name"
                                className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400`}
                                value={eventame}
                                onChange={(e) => seteventname(e.target.value)}
                              />

                            </>
                            {/*  Radio button */}
                            <div>
                              <div className="flex items-center gap-4">
                                <fieldset className="flex items-center gap-2 pt-3">
                                  <input
                                    checked={event_type == "online"}
                                    type="radio"
                                    name="event-radio"
                                    id="online"
                                    value="online"
                                    onChange={(e) => setevent_type(e.target.value)}
                                  />
                                  <label htmlFor="online">Online</label>
                                </fieldset>
                                <fieldset className="flex items-center gap-2 pt-3">
                                  <input
                                    checked={event_type == "in_person"}
                                    type="radio"
                                    name="event-radio"
                                    id="online"
                                    value="in_person"
                                    onChange={(e) => setevent_type(e.target.value)}
                                  />
                                  <label htmlFor="in-person">In Person</label>
                                </fieldset>
                              </div>
                            </div>
                            {/* Time */}
                            <div className="flex justify-end ">
                              <>
                                <label htmlFor="startTime" className="text-neutral-900 text-sm">
                                  Start Time <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="time"
                                  name="startTime"
                                  value={S_time}
                                  onChange={(e) => setS_time(e.target.value)}
                                  placeholder="Event Name"
                                  className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400`}
                                  id="startTime"
                                  required="required"
                                />
                              </>
                              <>
                                <label htmlFor="startTime" className="text-neutral-900 text-sm">
                                  End Time <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="time"
                                  name="startTime"
                                  value={E_time}
                                  onChange={(e) => setE_time(e.target.value)}
                                  placeholder="Event Name"
                                  className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400`}
                                  id="startTime"
                                  required="required"
                                />
                              </>
                            </div>
                            {/* Date */}
                            <div className="flex justify-end ">
                              <>
                                <label htmlFor="startdate" className="text-neutral-900 text-sm">
                                  Start Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="date"
                                  name="startdate"
                                  // value={S_date}
                                  defaultValue={S_date}
                                  onChange={(e) => setS_date(e.target.value)}
                                  placeholder="dd-mm-yyyy"
                                  className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400`}
                                  id="startTime"
                                />
                              </>
                              <>
                                <label htmlFor="startTime" className="text-neutral-900 text-sm">
                                  End Date <span className="text-red-500">*</span>
                                </label>
                                <input
                                  type="date"
                                  name="startTime"
                                  value={E_date}
                                  onChange={(e) => setE_date(e.target.value)}
                                  placeholder="Event Name"
                                  className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400`}
                                  id="startTime"
                                />
                              </>
                            </div>
                          </div >
                        ) : (
                          <>
                            <span>{items.event.start_time}</span>
                            <span>-{items.event.end_time}</span>&nbsp;
                            <span>{items.event.start_date}</span>&nbsp;

                            <div className="flex items-center gap-2">
                              <CalendarIcon
                                width={16}
                                height={16}
                                className="text-gray-900"
                              />
                              <span className="text-gray-900 text-sm">
                                {items.event.event_type === "in_person" ? (
                                  'In Person'
                                ) : (items.event.event_type)}
                              </span>
                            </div>

                            <div className="font-semibold text-lg">
                              {items.event.name}
                            </div>

                            <Link href="/events-design/event-view">
                              <a className="text-sm text-gray-600 cursor-pointer flex items-center border border-gray-100 rounded-full py-1 px-3">
                                View Event
                              </a>
                            </Link>

                          </>)}
                      </div>
                      {/* <div className="text-gray-900"></div> */}
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              ""
            )}



            {items.feed_type && items.feed_type === "video_feed" ? (
              EditOn == items.id ? (
                <>
                  {UP_pic ? ("") :
                    (
                      <>
                        <video controls className="aspect-video w-full rounded-xl my-4">
                          <source src={EditPic} type="video/mp4" />
                        </video>
                        <div className="flex gap-5">
                          <div className="relative flex gap-1 md:gap-2 items-center justify-center">
                            <div className="relative flex items-center justify-center">
                              <VideoCameraIcon
                                width={22}
                                height={22}
                                className="text-indigo-400"
                              />

                              <input
                                type={`file`}
                                name="video"
                                id="video"
                                onChange={handleVideo}
                                title={""}
                                className="opacity-0 absolute w-6 h-6 -z-0"
                              />
                            </div>
                            <div className="font-extralight">Video Upload</div>
                          </div>
                          <button className={`w-[100px] h-8 rounded-full flex gap-1 items-center justify-center bg-indigo-400 text-white cursor-pointer`}
                            onClick={() => UpdateFeed(items.id, items.feed_type)}>
                            Update {spinner && true ? <Spinner /> : ""}
                          </button>
                        </div>
                      </>
                    )}
                </>
              ) : (
                <>
                  <video controls className="aspect-video w-full rounded-xl my-4">
                    <source src={UP_pic ? UP_pic : items.attachments_link} type="video/mp4" />
                  </video>
                </>)
            ) : ("")}
            {EditOn && UP_pic && items.feed_type && items.feed_type === "video_feed" ? (
              <>
                <div className="relative">
                  <video autoPlay="autoplay" controls className="aspect-video rounded-xl mb-4">
                    <source src={UP_pic} type="video/mp4" />
                  </video>
                  <div onClick={handleCoverReomve} className="bg-indigo-100 absolute top-4 right-4 z-50 w-8 h-8 cursor-pointer flex justify-center items-center rounded-full">
                    <TrashIcon className="w-5 h-5 text-indigo-600" />
                  </div>
                </div>
                <div className="flex gap-5">
                  <div className="relative flex gap-1 md:gap-2 items-center justify-center">
                    <div className="relative flex items-center justify-center">
                      <VideoCameraIcon
                        width={22}
                        height={22}
                        className="text-indigo-400"
                      />
                      <input
                        type={`file`}
                        name="video"
                        id="video"
                        onChange={handleVideo}
                        title={""}
                        className="opacity-0 absolute w-6 h-6 -z-0"
                      />
                    </div>
                    <div className="font-extralight">Video Upload</div>
                  </div>
                  <button className={`w-[100px] h-8 rounded-full flex gap-1 items-center justify-center bg-indigo-400 text-white cursor-pointer`}
                    onClick={() => UpdateFeed(items.id, items.feed_type)}>
                    Update {spinner && true ? <Spinner /> : ""}
                  </button>
                </div>
              </>
            ) : (
              ""
            )}


            {items.attachments_link && items.feed_type === "image_feed" ? (
              EditOn == items.id ? (
                <>
                  {UP_pic ? (
                    ''
                  ) : (
                    <>
                      <img
                        src={EditPic}
                        className="aspect-video object-cover rounded-t-xl h-[390px] w-[952px]"
                        alt=""
                      />
                      <div className="flex">
                        <div className="relative flex gap-1 md:gap-2 items-center justify-center">
                          <div className="relative flex items-center justify-center">
                            <PhotographIcon
                              width={22}
                              height={22}
                              className="text-indigo-400"
                            />
                            <input
                              type="file"
                              name="image"
                              id="image"
                              className="opacity-0 absolute w-6 h-6 -z-0"
                              onChange={handleImage}
                              title={""}
                              multiple
                            />
                          </div>
                          <div className="font-extralight">Photo Upload</div>
                        </div>
                        <button className={`w-[100px] h-8 rounded-full flex gap-1 items-center justify-center bg-indigo-400 text-white cursor-pointer`}
                          onClick={() => UpdateFeed(items.id, items.feed_type)}>
                          Update {spinner && true ? <Spinner /> : ""}
                        </button>
                      </div>
                    </>
                  )}
                </>
              ) : (
                // <div className="mt-[14px]">
                //   <img
                //     src={items.attachments_link}
                //     width={952}
                //     height={240}
                //     layout="responsive"
                //     className="aspect-video object-cover rounded-lg mx-auto h-[390px]"
                //     alt=""
                //   />
                // </div>

                <AliceCarousel>
                   {
                    items.attachments_link.map((i)=>(
                      <div className="mt-[14px]" key={i}>
                        <Link
                          href={{
                            pathname: "/events-design/event-view",
                            query: items.id,
                          }} >
                        <a>
                          <img
                            src={i}
                            key={i}
                            width={952}
                            height="auto"
                            layout="responsive"
                            className="object-cover rounded-lg mx-auto h-auto"
                            alt=""
                          />
                        </a>
                        </Link>
                      </div>
                    ))
                   }
                </AliceCarousel>
                )


            ) : (
              ""
            )}
            {UP_pic && items.attachments_link && items.feed_type === "image_feed" ? (
              <>
                <div className={`relative`}>
                  <img src={UP_pic} className="aspect-video object-cover rounded-xl mb-4" alt="" />
                  <div onClick={handleCoverReomve} className="bg-indigo-100 absolute top-4 right-4 z-50 w-8 h-8 cursor-pointer flex justify-center items-center rounded-full" >
                    <TrashIcon className="w-5 h-5 text-indigo-600" />
                  </div>
                </div>
                <div className="flex gap-10">
                  <div className="relative flex gap-1 md:gap-2 items-center justify-center">
                    <div className="relative flex items-center justify-center">
                      <PhotographIcon
                        width={22}
                        height={22}
                        className="text-indigo-400"
                      />
                      <input
                        type="file"
                        name="image"
                        id="image"
                        className="opacity-0 absolute w-6 h-6 -z-0"
                        onChange={handleImage}
                        title={""}
                        multiple
                      />
                    </div>
                    <div className="font-extralight">Photo Upload</div>
                  </div>
                  <button className={`w-[100px] h-8 rounded-full flex gap-1 items-center justify-center bg-indigo-400 text-white cursor-pointer`}
                    onClick={() => UpdateFeed(items.id, items.feed_type)}>
                    Update {spinner && true ? <Spinner /> : ""}
                  </button>
                </div>
              </>
            ) : ('')}


            {/* Update Button */}
            {EditOn == items.id && (items.feed_type == "basic" || items.feed_type == "event_feed") ? (
              <button className={`w-[100px] h-8 rounded-full flex gap-1 items-center justify-center bg-indigo-400 text-white cursor-pointer`}
                onClick={() => UpdateFeed(items.id, items.feed_type)}>
                Update {spinner && true ? <Spinner /> : ""}
              </button>
            ) : ('')}


            <div className="flex justify-between mt-[14px]">
              <div className="flex gap-6">
                <div className="flex gap-2 items-center">
                  {items.is_heart && items.is_heart == true ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="Red"
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => deteleHeart(items.heart_id)}
                      >
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                      </svg>
                      <span className="font-light text-gray-900">
                        {items.reactions_count}
                      </span>
                    </>
                  ) : (
                    <>
                      <HeartIcon
                        width={24}
                        height={24}
                        className="text-gray-600 cursor-pointer"
                        onClick={() => addHeart(items.id)}
                      />
                      <span className="font-light text-gray-600 cursor-pointer">
                        {items.reactions_count}
                      </span>
                    </>
                  )}
                </div>
                <div className="flex gap-2 items-center">
                  <ChatAltIcon
                    width={24}
                    height={24}
                    className="text-gray-600 cursor-pointer"
                  />
                  <span className="font-light text-gray-600 cursor-pointer">{comments_count >= 0 && is_deleted == true ? (comments_count) : (items.comments_count == 0 ? (0) : (items.comments_count))}</span>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="flex gap-2 items-center">
                  {items.is_bookmark && items.is_bookmark == true ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        className="w-6 h-6 text-indigo-400 cursor-pointer"
                        onClick={() => deteleBookmark(items.bookmark_id)}
                      >
                        <path
                          fillRule="evenodd"
                          d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
                          clipRule="evenodd"
                        />
                      </svg>
                      <span className="font-light text-indigo-400">
                        {items.bookmarks_count}
                      </span>
                    </>
                  ) : (
                    <>
                      <BookmarkIcon
                        width={24}
                        height={24}
                        className="text-indigo-400 cursor-pointer"
                        onClick={() => createBookmark(items.id)}
                      />
                      <span className="font-light text-indigo-400">
                        {items.bookmarks_count}
                      </span>
                    </>
                  )}
                </div>
                <ShareModal items={items && items.feed_type == "share" ? (items.share) : (items)} currentuser={singleItems.currentUser} />
              </div>
            </div>
            <Fragment>
              {singleItems.currentUser && items.user && singleItems.group.can_comment == "all_member" ? (

                <PostComments news_feed_id={items.id} currentUser={singleItems.currentUser} setComments={setComments} setComments_count={setComments_count} setIs_deleted={setIs_deleted} dp={singleItems.currentUser.display_photo_url} />
              ) : (
                items.user && singleItems.currentUser && singleItems.group ? (
                  (admins && isadmin(admins, singleItems.currentUser.id)) || singleItems.group.owner.id == singleItems.currentUser.id ? (
                    <PostComments news_feed_id={items.id} currentUser={singleItems.currentUser.id} setComments={setComments} setComments_count={setComments_count} setIs_deleted={setIs_deleted} dp={singleItems.currentUser.display_photo_url} />
                  ) : ("")
                ) : ("")
              )}
              <FilterComments news_feed_id={items.id} comments={comments.data} setComments_count={setComments_count} setComments={setComments} next_page={nextPage} setNextPage={setNextPage} />
              {!loading && <ReplyComments admins={admins} currentUser={singleItems.currentUser.id} group={singleItems.group} news_feed_id={items.id} comments={comments.data} comments_count={comments_count} setComments_count={setComments_count} setComments={setComments} setIs_deleted={setIs_deleted} items={items} />}
            </Fragment>
          </div>

        </div>
      ) : ("")}
    </>
  );
};


export default ProfileFeedSingle;
