import React, { Fragment, useEffect, useState, setState } from "react";
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
  XIcon,
  ChevronLeftIcon,
  TrashIcon,
  PencilAltIcon,
  PhotographIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import { CalendarIcon, ChevronRightIcon } from "@heroicons/react/solid";
import { Dialog, Popover, Transition } from "@headlessui/react";
import Link from "next/link";
import ProfileAvatar from "../../../../public/images/profile-avatar.png";
import PagePhoto from "../../../../public/images/752126.jpg";
import PostComments from "../../../profile/comments/PostComments";
import FilterComments from "../../../profile/comments/FilterComments";
import ReplyComments from "../../../profile/comments/ReplyComments";
import axios from "axios";
import {
  BOOKMARK_NEWSFEED_API_KEY,
  REACTION_NEWSFEED_API_KEY,
  NEWSFEED_COMMENT_POST_KEY,
  REPORT_API,
  POST_NEWSFEED_API_KEY,
  SEARCH_MULTIPLE,
} from "../../../../pages/config";
import App from "../newspost/App";
import ShareModal from "./ShareModal";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import HashtagMentionInput from "../newspost/HashtagMentionInput";
import TimezoneSelect, { allTimezones } from "react-timezone-select";
import Spinner from "../../../common/Spinner";
import ShowAlert from "../../../Alerts/Alertss";

const cardDropdown = [
  {
    name: "Share",
    href: "#",
    icon: ShareIcon,
  },
  {
    name: "Delete",
    href: "#",
    icon: TrashIcon,
  },
  {
    name: "Edit",
    href: "#",
    icon: PencilAltIcon,
  },
];
const cardDropdown1 = [
  {
    name: "Share",
    href: "#",
    icon: ShareIcon,
  },
  {
    name: "Report",
    href: "#",
    icon: DocumentReportIcon,
  }
];
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

const NewsFeedSingle = (singleItem) => {
  const [items, setItems] = useState(singleItem.items);
  const [comments, setComments] = useState([]);
  const [comments_count, setComments_count] = useState([]);
  const [is_deleted, setIs_deleted] = useState(0);
  const [loading, setLoading] = useState(true);
  const [nextPage, setNextPage] = useState('');
  const [CurrentUser, setCurrentUser] = useState(singleItem.user);
  const [postText, setPostText] = useState("");
  let [isOpen, setIsOpen] = useState(false);
  const [imagess, setimagess] = useState([]);
  const [picLength, setpicLength] = useState();
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
  const [EditText, setEditText] = useState(singleItem.items.body);  // get text for editing
  const [tags, settags] = useState([]);
  const [picshow, setpicshow] = useState(0);
  const [mentioned, setMentioned] = useState([]);
  const [hashtaged, setHashtaged] = useState([]);
  let [hastags, sethastags] = useState();
  const [spinner, setSpinner] = useState(false);
  const [admins, setadmins] = useState();

  const [timezone, settimezone] = useState();
  const [eventlink, seteventlink] = useState();
  const [seats, setseats] = useState();
  const [address, setaddress] = useState();
  const [venue, setvenue] = useState();
  const [openalert, setopenalert] = useState(false); // For Alert Show
  const [alertbody, setalertbody] = useState(); // For Alert Body


  let [speakerMention, setspeakerMention] = useState([]);
  let [speakerText, setspeakerText] = useState("d");
  const [speakertags, setspeakertags] = useState([]);
  // Bareer key
  if (typeof window !== "undefined") { 
    var authKey = window.localStorage.getItem("keyStore");
  }
  // copy link to clipboard
  const copylink = (postid) => {
    const links = window.location.href        // get Full Link
    const links1 = window.location.pathname   // get link after localhost
    const copylink = links.split(links1)    // get link domain like(localhost..etc)
    navigator.clipboard.writeText(copylink[0] + "/events-design/event-view?" + postid);
    // alert("Link Copied to your Clipboard");
    setopenalert(true);
    setalertbody("Link Copied to your Clipboard");
  }
  // Add Heart
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
  // Create Bookmark
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
        }
      })
      .catch((err) => console.log(err));
  }
  // delete Bookmark
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
      }
    } catch (error) {
      console.log(error);
    }
  }
  // delete heart
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

  const Current_User = async () => {
    var c = window.localStorage.getItem("currentuser");
    var Details =JSON.parse(c);
    // await fetch(CURENT_USER_LOGIN_API, {
    //   method: "GET",
    //   headers: {
    //     Accept: "application/json",
    //     Authorization: `${authKey}`,
    //   },
    // })
    //   .then((resp) => resp.json())
    //   .then((result) => {
    //     if (result) {
          setCurrentUser(Details);
    //     }
    //   })
    //   .catch((err) => console.log(err));

   

  }

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
          // alert("Your report send to Admin");
          setopenalert(true);
          setalertbody("Your report send to Admin");
        }
      })
      .catch((err) => console.log(err));
  }

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
        document.getElementById(`newsfeed-${uid}`).classList.add("hidden");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const optionConfirm = (name, item) => {
    if (name == "Report") {
      var a = confirm(name);
      if (a) {
        createReport(item.id);
      }
    } else if (name == "Share") {
      const links = window.location.href        // get Full Link
      const links1 = window.location.pathname   // get link after localhost
      const copylink = links.split(links1)    // get link domain like(localhost..etc)
      navigator.clipboard.writeText(copylink[0] + "/events-design/event-view?" + item.id);
      // alert("Link Copied to your Clipboard");
      setopenalert(true);
      setalertbody("Link Copied to your Clipboard");
    }else  if (name == "Delete") {
      var a = confirm("Are you sure!");
      if (a) {
        DeleteNewsFeed(item.id);
      }
    }

    if (name == "Edit") {
      if (item && item.event) {
        EditFeed(item.id);
        setEditPic(item.event.cover_photo_url);
        setS_time(item.event.start_time)
        setE_time(item.event.end_time)
        setS_date(item.event.start_date)
        setE_date(item.event.end_date)
        setevent_type(item.event.event_type)
        seteventname(item.event.name)
        setspeakerText(item.event.speaker)
        settimezone(item.event.event_timezone)
        seteventlink(item.event.event_link)
        setseats(item.event.total_seats)
        setaddress(item.event.address)
        setvenue(item.event.venue)
        // console.log(item.event)
      }
      else if (item && item.attachments_link) {
        EditFeed(item.id);
        setEditPic(item.attachments_link);
      }
      else if (item) {
        EditFeed(item.id);
      }
      console.log(item.id);

    }
  };

  const EditFeed = (uid) => {
    setEditOn(uid);
    setUP_pic();
  };
  console.log(EditOn);
  console.log(UP_pic);

  const handleImage = (e) => {
    // var type = e.target.files[0].type
    // var s = type.split("/")
    // if (s[0] == 'image') {
    //   setU_pic(e.target.files[0]);
    //   if (e.target.files.length !== 0) {
    //     setUP_pic(window.URL.createObjectURL(e.target.files[0]));
    //   }
    // } else { alert("Please Select Image") }

   
      setU_pic(e.target.files);
      var pres = [];
      for (var i = 0; i < e.target.files.length; i++) {
        pres[i] = window.URL.createObjectURL(e.target.files[i]);
      }
      setUP_pic(pres)

      if((U_pic && U_pic.length>0 || UP_pic && UP_pic.length>0) && type!="event"){
        const mergedata = [...U_pic, ...e.target.files]
        setU_pic(mergedata);
        var pres = [];
        for (var i = 0; i < e.target.files.length; i++) {
          pres[i] = window.URL.createObjectURL(e.target.files[i]);
        }
        const mergedata1 = [...UP_pic, ...pres];
        setUP_pic(mergedata1);
      }
      else{
        setU_pic(e.target.files);
        var pres = [];
        for (var i = 0; i < e.target.files.length; i++) {
          pres[i] = window.URL.createObjectURL(e.target.files[i]);
        }
        setUP_pic(pres)
      }
   

  };

  const handleImages = (e) => {
    var type = e.target.files[0].type
    var s = type.split("/")
    if (s[0] == 'image') {
      setU_pic(e.target.files[0]);
      if (e.target.files.length !== 0) {
        setUP_pic(window.URL.createObjectURL(e.target.files[0]));
      }
    } else { 
      // alert("Please Select Image") 
      setopenalert(true);
      setalertbody("Please Select Image");
    }

   
  };
  //Edited vedio
  const handleVideo = (e) => {
    var type = e.target.files[0].type
    var s = type.split("/")
    if (s[0] == 'video') {
      setUP_pic('');
      setU_pic(e.target.files[0]);
      if (e.target.files.length !== 0) {
        setUP_pic(URL.createObjectURL(e.target.files[0]));
        //  console.log("Check",URL.createObjectURL(U_pic))
      }
    } else { 
      // alert("Please Select video") 
      setopenalert(true);
      setalertbody("Please Select video");
    }

  };
  //  remover preview
  const handleCoverReomve = (e) => {
    setUP_pic(window.URL.revokeObjectURL(e.target.files));
  };

  const handleCoverReomves = (index) => {
    // setpostImagePreview(window.URL.revokeObjectURL(e.target.files));
    // setPreviewEventCoverImage(window.URL.revokeObjectURL(e.target.files));
    // setVideoPreview(window.URL.revokeObjectURL(e.target.files));
    
    if (index !== -1) {
      const updatedArray = [...UP_pic];
      updatedArray.splice(index, 1);
      setUP_pic(updatedArray);

      if(U_pic && U_pic.length>0){
        const updatedArray1 = [...U_pic];
        updatedArray1.splice(index, 1);
        setU_pic(updatedArray1);
      }
    }
  };
  // Update feed
  function UpdateFeed(id, feedType) {
    setEditOn('');
    if (feedType != "video_feed") { setUP_pic(''); }
    const dataForm = new FormData();
    dataForm.append("news_feeds[body]", EditText.replace(/\[\@(.*?)\]\((.*?)\)/g, "@$1"));
    if (tags.length > 0) {
      for (let i = 0; i < tags.length; i++) {
        dataForm.append("tags[]", tags[i]);
      }
    }
    if (feedType === "event_feed") {
      if (speakertags.length > 0) {
        for (let i = 0; i < speakertags.length; i++) {
          dataForm.append("speakertags[]", speakertags[i]);
        }
      }
      dataForm.append("events[name]", eventame);
      dataForm.append("events[event_type]", event_type);
      if (U_pic) { dataForm.append("events[cover_photo]", U_pic); }
      dataForm.append("events[start_date]", S_date);
      dataForm.append("events[end_date]", E_date);
      dataForm.append("events[start_time]", S_time);
      dataForm.append("events[end_time]", E_time);
      dataForm.append("events[speaker]", speakerText.replace(/\[\@(.*?)\]\((.*?)\)/g, "@$1"));
      dataForm.append("events[event_timezone]", timezone);
      dataForm.append("events[event_link]", eventlink);
      dataForm.append("events[address]", address);
      dataForm.append("events[venue]", venue);
      dataForm.append("events[total_seats]", seats);
    }
    else {
      if (U_pic && feedType!="video_feed") {
        for (let i = 0; i < U_pic.length; i++) {
          dataForm.append("news_feeds[feed_attachments][]", U_pic[i]);
        }
      }else if(U_pic && feedType=="video_feed"){
        dataForm.append("news_feeds[feed_attachments][]", U_pic);
      }
    }
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
          setEditText(result.data.body)
        }
      })
      .catch((err) => console.log(err));
    setSpinner(false)
  }

  useEffect(() => {
    setLoading(true);
    Current_User();
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
    setLoading(false);
  }, []);

  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive((current) => !current);
  };

  // const GetAdmins =async(id,user_id)=>{
  //   await fetch(GROUP_API +"/get_group_admin?group_id="+id , {
  //   method: "GET",
  //   headers: {
  //     Accept: "application/json",
  //     Authorization: `${authKey}`,
  //   },
  //   })
  //   .then((resp) => resp.json())
  //   .then((result) => {
  //     // setadmins(result.data);
  //     isadmin(result.data, user_id)
  //     console.log("group",result.data)
  //   })
  // }


  // function isadmin(admin , user_id)
  // {
  //   for(var i=0; i < admin.length; i++){
  //    if (admin[i].group_member.id == user_id)
  //    {
  //     return true;
  //    }
  //   }
  //   return false;
  // }
  function closeModal() {
    setIsOpen(false);
  }

  // function openModal2() {
  //   setIsOpen(true);
  // }

  function openModal(i,j,items) {
    setpicshow(j);
    setimagess(items.attachments_link);
    setpicLength(items.attachments_link.length);
    setIsOpen(true);
  }

  function picsShow(i){
    if (i=="-"){
      if(picshow>0){setpicshow(picshow-1);}
      else{setpicshow(picLength-1);}
    }
    else if (i=="+"){
      if(picshow+1<picLength){setpicshow(picshow+1);}
      else{setpicshow(0);}
    }
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
          setspeakerMention(awa);
         
          // console.log("frie",awa);
        }
      })
      .catch((err) => console.log(err));
  };


  return (
    <>
      <div className="w-full xl:w-[980px] lg:w-[730px] md:w-[780px] pb-4 mt-[14px] bg-white rounded-xl"
      id={`newsfeed-${items.id}`}
      key={items.id}>
        {openalert?(
          <ShowAlert openalert={openalert} setopenalert={setopenalert} body={alertbody}/>
        ):("")}
        <div className="flex gap-2 justify-between items-center px-[22px] py-[14px]">
          <div className="flex gap-2 items-center">

            {items && items.page ? (
              items.page.display_photo_url ? (
                <Link href={{ pathname: "/page-design/suggested-pages", query: items.page.id, }}>
                  <a>
                    <img
                      src={items.page.display_photo_url}
                      className="object-cover rounded-full h-[42px] w-[42px]"
                      width={45}
                      height={45}
                      alt=""
                    />
                  </a>
                </Link>
              ) : (
                <Link href={{ pathname: "/page-design/suggested-pages", query: items.page.id, }}>
                  <a>
                    <Image
                      src={PagePhoto}
                      className="object-cover rounded-full h-[42px] w-[42px]"
                      width={45}
                      height={45}
                      alt=""
                    />
                  </a>
                </Link>
              )
            ) : (
              items && items.user && items.user.display_photo_url ? (
                CurrentUser && CurrentUser.id == items.user.id ? (
                  <Link href="/profile">
                    <a>
                      <img
                        src={items.user.display_photo_url}
                        className="object-cover rounded-full h-[42px] w-[42px]"
                        width={45}
                        height={45}
                        alt=""
                      />
                    </a>
                  </Link>
                ) : (
                  <Link href={{ pathname: "/User-Profile", query: items.user.id, }}>
                    <a>
                      <img
                        src={items.user.display_photo_url}
                        className="object-cover rounded-full h-[42px] w-[42px]"
                        width={45}
                        height={45}
                        alt=""
                      />
                    </a>
                  </Link>
                )

              ) : (
                CurrentUser && CurrentUser.id == items.user.id ? (
                  <Link href="/profile">
                    <a>
                      <Image
                        src={ProfileAvatar}
                        width={45}
                        height={45}
                        alt=""
                      />
                    </a>
                  </Link>
                ) : (
                  <Link href={{ pathname: "/User-Profile", query: items.user.id, }}>
                    <a>
                      <Image
                        src={ProfileAvatar}
                        width={45}
                        height={45}
                        alt=""
                      />
                    </a>
                  </Link>
                )
              )
            )}

            <div>
              {items.page ? (
                <>
                  <Link href={{ pathname: "/page-design/suggested-pages", query: items.page.id, }}>
                    <a>
                      <h4 className="flex gap-[6px] items-center font-medium text-gray-900 capitalize">
                        {/* {items.user.first_name} {items.user.last_name} */}
                        {/* <ChevronRightIcon
                    width={24}
                    height={24}
                    className="text-indigo-400"
                  /> */}

                        <div className="capitalize">{items.page.name}</div>
                      </h4>
                      <div className="font-light text-gray-900 opacity-[0.8] italic">  Page Post</div>
                    </a>
                  </Link>
                </>

              ) : (
                items.group ? (
                  <>
                    <h4 className="flex gap-[6px] items-center font-medium text-gray-900 capitalize">
                      {CurrentUser && CurrentUser.id == items.user.id ? (
                        <Link href="/profile">
                          <a>
                            {items.user.first_name} {items.user.last_name}
                          </a>
                        </Link>
                      ) : (
                        <Link href={{ pathname: "/User-Profile", query: items.user.id, }}>
                          <a>
                            {items.user.first_name} {items.user.last_name}
                          </a>
                        </Link>
                      )}
                      <ChevronRightIcon
                        width={24}
                        height={24}
                        className="text-indigo-400"
                      />
                      <Link href={{ pathname: "/group-page/joind-group", query: items.group.id, }}>
                        <a>
                          <div className="capitalize">{items.group.title}</div>
                        </a>
                      </Link>
                    </h4>
                    <div className="font-light text-gray-900 opacity-[0.8] italic">Group Post</div>
                    {/* {items && items.group && items.user && items.group.owner.id==items.user.id?"Super Admin":GetAdmins(items.group.id, items.user.id)?"Admin":"Member"} */}
                  </>
                ) : (
                  <>
                    {CurrentUser && CurrentUser.id == items.user.id ? (
                      <Link href="/profile">
                        <a>
                          <h4 className="flex gap-[6px] items-center font-medium text-gray-900 capitalize">
                            {items.user.first_name} {items.user.last_name}
                            <BadgeCheckIcon
                              width={14}
                              height={14}
                              className="text-indigo-400"
                            />
                          </h4>
                        </a>
                      </Link>
                    ) : (
                      <Link href={{ pathname: "/User-Profile", query: items.user.id, }}>
                        <a>
                          <h4 className="flex gap-[6px] items-center font-medium text-gray-900 capitalize">
                            {items.user.first_name} {items.user.last_name}
                            <BadgeCheckIcon
                              width={14}
                              height={14}
                              className="text-indigo-400"
                            />
                          </h4>
                        </a>
                      </Link>
                    )}

                    <div className="font-light text-gray-900 opacity-[0.8]">
                      {items.user.city ? items.user.city + ", " : ""}{items.user.state ? items.user.state + ", " : ""} {items.user.country}
                    </div>
                  </>
                )
              )}

            </div>
          </div>
          <div className="flex">
            <div className="font-light text-gray-900 opacity-[0.8]">
              {items.created_at}
              </div>
            <div className="">
              <div className="">
                <Popover className="relative">
                  {({ open }) => (
                    <>
                      <Popover.Button
                        className={` ${open ? "" : "text-opacity-90 focus-visible:outline-none"
                          }`}
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
                          <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                            <div className="relative bg-white py-2">
                            {CurrentUser && CurrentUser.id == items.user.id?(
                              cardDropdown.map((card) => (
                                <a
                                  key={card.name}
                                  onClick={() => optionConfirm(card.name, items)}
                                  href={card.id}
                                  className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                >
                                  <div className="flex items-center h-10 w-10 shrink-0  justify-center text-white sm:h-12 sm:w-12 pl-2">
                                    <card.icon className="h-6 w-6 text-gray-900" />
                                  </div>
                                  <div>
                                    <p className="text-sm font-medium text-gray-900">
                                      {card.name}
                                    </p>
                                  </div>
                                </a>
                              ))):(
                                cardDropdown1.map((card) => (
                                  <a
                                    key={card.name}
                                    onClick={() => optionConfirm(card.name, items)}
                                    href={card.id}
                                    className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                  >
                                    <div className="flex items-center h-10 w-10 shrink-0  justify-center text-white sm:h-12 sm:w-12 pl-2">
                                      <card.icon className="h-6 w-6 text-gray-900" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">
                                        {card.name}
                                      </p>
                                    </div>
                                  </a>))
                              )}
                            </div>
                          </div>
                        </Popover.Panel>
                      </Transition>
                    </>
                  )}
                </Popover>
              </div>
            </div>
          </div>
        </div>
        <div className="px-[22px] py-[14px]">
          {/* <Link 
            href={{
            pathname: "/events-design/event-view",
            query: items.id,
          }} > 
          <a> */}
          {/* <App state={items.body}/> */}

          {/*items.tags && items.tags.length > 0 || (items.hashtags && items.hashtags.length > 0) ?
            <App state={items.body} website={items.tags} hashtags={items.hashtags} />
            : <ReadMore>
              {items.body ? items.body : ""}
        </ReadMore>*/}
          {/* </a>
          
          </Link> */}
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
          ) : (// <p>{items.body ? items.body : ""}</p>
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
          /*<Link
              href={{
                pathname: "/events-design/event-view",
                query: items.id,
              }} >
              <a>
                <div className="rounded-xl bg-white border border-gray-100 my-2">
                  {items.event.cover_photo_url ? (
                    <LazyLoadImage
                        effect="blur"
                      src={items.event.cover_photo_url}
                      className="object-cover rounded-t-xl h-auto w-[952px]"
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                  <div className="py-3 px-3">
                    <div className="flex justify-between items-center">
                      <div>
                       
                        <div className="text-red-400 text-sm">
                          <span>{items.event.start_time}</span>
                          <span>-{items.event.end_time}</span>&nbsp;
                          <span>{items.event.start_date}</span>&nbsp;
                        </div>
                        
                        <div className="font-semibold text-lg">
                          {items.event.name}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <CalendarIcon
                            width={16}
                            height={16}
                            className="text-gray-900"
                          />
                          <span className="text-gray-900 text-sm">
                            {items.event.event_type}
                          </span>
                        </div>
                        {items.event.event_type === "online" ? ('') : (
                          <>
                            
                            {items.event.address ? (
                              <div className="flex items-center gap-2">
                                <CalendarIcon
                                  width={16}
                                  height={16}
                                  className="text-gray-900"
                                />
                                <span className="text-gray-900 text-sm">
                                  {items.event.address}
                                </span>
                              </div>
                            ) : ('')}

                            
                            {items.event.venue ? (
                              <div className="flex items-center gap-2">
                                <CalendarIcon
                                  width={16}
                                  height={16}
                                  className="text-gray-900"
                                />
                                <span className="text-gray-900 text-sm">
                                  {items.event.venue}
                                </span>
                              </div>
                            ) : ('')}

                          </>
                        )}
                        
                        <div className="text-gray-900 flex gap-2">
                          <CalendarIcon
                            width={16}
                            height={16}
                            className="text-gray-900"
                          />
                          <span>{items.event.event_link}</span>
                        </div>
                       
                        <div className="text-gray-900">
                          {items.event.tags && items.event.tags.length > 0 ?
                            <App state={items.event.speaker} website={items.event.tags} />
                            : items.event.body ? items.event.body : ""}
                        </div>
                      </div>
                      <Link
                        href={{
                          pathname: "/events-design/event-view",
                          query: items.id,
                        }}
                      >
                        <a className="text-sm text-gray-600 cursor-pointer flex items-center border border-gray-100 rounded-full py-1 px-3">
                          View Event
                        </a>
                      </Link>
                    </div>
                  </div>
                </div>
              </a>
            </Link>*/

          (<div className="rounded-xl bg-white border border-gray-100 my-2">
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
                              onChange={handleImages}
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
            {/* Event show and edit-2 */}
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
                                checked={event_type == "in person"}
                                type="radio"
                                name="event-radio"
                                id="online"
                                value="in person"
                                onChange={(e) => setevent_type(e.target.value)}
                              />
                              <label htmlFor="in-person">In Person</label>
                            </fieldset>
                          </div>
                        </div>
                        {/* Selct Zone */}
                        <>
                          <label htmlFor="startdate" className="text-neutral-900 text-sm">
                            Time Zone <span className="text-red-500">*</span>
                          </label>
                          {/* <input
                          placeholder="Event Name"
                          className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400`}
                          value={timezone}
                          onChange={(e)=>settimezone(e.target.value)}
                        /> */}
                          <TimezoneSelect
                            value={timezone}
                            onChange={settimezone}
                            timezones={{
                              ...allTimezones,
                              "America/Lima": "Pittsburgh",
                            }}
                          />
                        </>
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
                            <label htmlFor="endDate" className="text-neutral-900 text-sm">
                              End Date <span className="text-red-500">*</span>
                            </label>
                            <input
                              type="date"
                              name="endDate"
                              value={E_date}
                              onChange={(e) => setE_date(e.target.value)}
                              placeholder="dd-mm-yyyy"
                              className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400`}
                              id="startTime"
                            />
                          </>
                        </div>

                        {event_type == "online" ? (
                          ''
                        ) : (
                          <>
                            <>
                              <label htmlFor="startdate" className="text-neutral-900 text-sm">
                                Adress<span className="text-red-500">*</span>
                              </label>
                              <input
                                placeholder="Event Adress"
                                className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400`}
                                value={address}
                                onChange={(e) => setaddress(e.target.value)}
                              />
                            </>
                            <>
                              <label htmlFor="startdate" className="text-neutral-900 text-sm">
                                Venue <span className="text-red-500">*</span>
                              </label>
                              <input
                                placeholder="Event Venue"
                                className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400`}
                                value={venue}
                                onChange={(e) => setvenue(e.target.value)}
                              />
                            </>
                          </>
                        )}

                        {/* External Event Link */}
                        <>
                          <label htmlFor="startdate" className="text-neutral-900 text-sm">
                            External Event Link <span className="text-red-500">*</span>
                          </label>
                          <input
                            placeholder="Event Event Link"
                            className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400`}
                            value={eventlink}
                            onChange={(e) => seteventlink(e.target.value)}
                          />

                        </>
                        {/* total Seat */}
                        <>
                          <label htmlFor="startdate" className="text-neutral-900 text-sm">
                            Total Seat <span className="text-red-500">*</span>
                          </label>
                          <input
                            placeholder="Enter Seat"
                            className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400`}
                            value={seats}
                            onChange={(e) => setseats(e.target.value)}
                          />

                        </>
                        {/* Speaker */}
                        <>
                          <label htmlFor="startdate" className="text-neutral-900 text-sm">
                            Speaker <span className="text-red-500">*</span>
                          </label>
                          {/* <input
                          placeholder="Event Name"
                          className={`w-full border-gray-100 border py-2 px-3 mt-2 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400`}
                          value={eventame}
                          onChange={(e)=>seteventname(e.target.value)}
                        /> */}
                          <HashtagMentionInput postText={speakerText} setPostText={setspeakerText} mentioned={speakerMention} tags={speakertags} settags={setspeakertags} hastags={hastags} />



                        </>
                      </div >
                    ) : (
                      <div className="py-3 px-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <span>{items.event.start_time}</span>
                            <span>-{items.event.end_time}</span>&nbsp;
                            <span>{items.event.start_date}</span>&nbsp;
                            {/* Event Name/title */}
                            <div className="font-semibold text-lg">
                              {items.event.name}
                            </div>
                            {/* Event type online/offline/in_persone */}
                            <div className="flex items-center gap-2">
                              <CalendarIcon
                                width={16}
                                height={16}
                                className="text-gray-900"
                              />
                              <span className="text-gray-900 text-sm">
                                {items.event.event_type === "online" ? (
                                  items.event.event_type
                                ) : ('In Person')}
                              </span>
                            </div>
                            {/* Venue and adress */}
                            {items.event.event_type === "online" ? ('') : (
                              <>
                                {/* Adress */}
                                {items.event.address ? (
                                  <div className="flex items-center gap-2">
                                    <CalendarIcon
                                      width={16}
                                      height={16}
                                      className="text-gray-900"
                                    />
                                    <span className="text-gray-900 text-sm">
                                      {items.event.address}
                                    </span>
                                  </div>
                                ) : ('')}

                                {/* Venue */}
                                {items.event.venue ? (
                                  <div className="flex items-center gap-2">
                                    <CalendarIcon
                                      width={16}
                                      height={16}
                                      className="text-gray-900"
                                    />
                                    <span className="text-gray-900 text-sm">
                                      {items.event.venue}
                                    </span>
                                  </div>
                                ) : ('')}

                              </>
                            )}
                            {/*  Event link */}
                            <div className="flex items-center gap-2">
                              <CalendarIcon
                                width={16}
                                height={16}
                                className="text-gray-900"
                              />
                              <span className="text-gray-900 text-sm">
                                {items.event.event_link}
                              </span>
                            </div>
                            {/* Speaker  */}
                            {items.event.tags && items.event.tags.length > 0 ?
                              <App state={items.event.speaker} website={items.event.tags} />
                              : items.event.body ? items.event.body : ""
                            }
                            {/* Remaining Seats */}
                            <div className="text-gray-900 flex gap-2">
                              <CalendarIcon
                                width={16}
                                height={16}
                                className="text-gray-900"
                              />
                              <span>{items.event.total_seats - items.event.booked_seat}</span>
                            </div>
                          </div>
                          <Link
                            href={{
                              pathname: "/events-design/event-view",
                              query: items.id,
                            }}
                          >
                            <a className="text-sm text-gray-600 cursor-pointer flex items-center border border-gray-100 rounded-full py-1 px-3">
                              View Event
                            </a>
                          </Link>
                        </div>




                      </div>)}
                  </div>
                  {/* <div className="text-gray-900"></div> */}
                </div>
              </div>
            </div>
          </div>)
          ) : (
            items.feed_type && items.feed_type === "video_feed" ? (
             
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
            
            ) : (
              items.attachments_link && items.feed_type === "image_feed" ? (
                /*<AliceCarousel>
                   {
                    items.attachments_link.map((i,j)=>(
                      <div className="mt-[14px]" key={i}>
                        <LazyLoadImage
                          effect="blur"
                          src={i}
                          key={i}
                          width={952}
                          height={400}
                          layout="responsive"
                          className="object-cover rounded-lg mx-auto h-auto"
                          onClick={()=>openModal(i,j,items)}
                        />
                      </div>
                    ))
                   }
                    
                  
                  </AliceCarousel>*/
                  EditOn == items.id ? (
                    <>
                      {UP_pic && UP_pic .length> 0 ? (
                        ''
                      ) : (
                        <>
                          
                          
                       
                          {
                            EditPic && EditPic.length>0? (
                              <div className="flex flex-wrap relative gap-4 border rounded-lg p-3" >
                                {EditPic.map((i,j) => (
                                  <div key={i}>
                                    <img
                                      src={i}
                                      key={i}
                                      className="object-cover rounded-xl w-32 h-32 ml-2"
                                    />
                                  </div>
                                ))}
          
                              </div>):('')
                          
                          }
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
                    <div className="mt-[14px]">
                      <AliceCarousel>
                      {items.attachments_link && items.attachments_link.map((i,j)=>(
                        <img
                          src={i}
                          width={952}
                          height={240}
                          key={i}
                          layout="responsive"
                          className="aspect-video object-cover rounded-lg mx-auto h-[390px]"
                          onClick={()=>openModal(i,j,items)}
                          alt=""
                        />
                      ))}
                      
                      </AliceCarousel>
                    </div>)
                
              ) : (
                items.feed_type && items.feed_type === "share" ? (
                  <div className="border p-4 m-2">
                    <div className="flex gap-2 items-center">
      
                      {items && items.share.page ? (
                        items.share.page.display_photo_url ? (
                          <Link href={{ pathname: "/page-design/suggested-pages", query: items.share.page.id, }}>
                            <a>
                              <img
                                src={items.share.page.display_photo_url}
                                className="object-cover rounded-full h-[42px] w-[42px]"
                                width={45}
                                height={45}
                                alt=""
                              />
                            </a>
                          </Link>
                        ) : (
                          <Link href={{ pathname: "/page-design/suggested-pages", query: items.share.page.id, }}>
                            <a>
                              <Image
                                src={PagePhoto}
                                className="object-cover rounded-full h-[42px] w-[42px]"
                                width={45}
                                height={45}
                                alt=""
                              />
                            </a>
                          </Link>
                        )
                      ) : (
                        items && items.share.user && items.share.user.display_photo_url ? (
                          CurrentUser && CurrentUser.id == items.share.user.id ? (
                            <Link href="/profile">
                              <a>
                                <img
                                  src={items.share.user.display_photo_url}
                                  className="object-cover rounded-full h-[42px] w-[42px]"
                                  width={45}
                                  height={45}
                                  alt=""
                                />
                              </a>
                            </Link>
                          ) : (
                            <Link href={{ pathname: "/User-Profile", query: items.share.user.id, }}>
                              <a>
                                <img
                                  src={items.share.user.display_photo_url}
                                  className="object-cover rounded-full h-[42px] w-[42px]"
                                  width={45}
                                  height={45}
                                  alt=""
                                />
                              </a>
                            </Link>
                          )
                        ) : (
                          CurrentUser && CurrentUser.id == items.share.user.id ? (
                            <Link href="/profile">
                              <a>
                                <Image
                                  src={ProfileAvatar}
                                  width={45}
                                  height={45}
                                  alt=""
                                />
                              </a>
                            </Link>
                          ) : (
                            <Link href={{ pathname: "/User-Profile", query: items.share.user.id, }}>
                              <a>
                                <Image
                                  src={ProfileAvatar}
                                  width={45}
                                  height={45}
                                  alt=""
                                />
                              </a>
                            </Link>
                          )
      
                        )
                      )}
      
                      <div>
                        {items.share.page ? (
                          <>
                            <Link href={{ pathname: "/page-design/suggested-pages", query: items.share.page.id, }}>
                              <a>
                                <h4 className="flex gap-[6px] items-center font-medium text-gray-900 capitalize">
      
                                  <div className="capitalize">{items.share.page.name}</div>
                                </h4>
                                <div className="font-light text-gray-900 opacity-[0.8] italic">  Page Post</div>
                              </a>
                            </Link>
                          </>
      
                        ) : (
                          items.share.group ? (
                            <>
                              <h4 className="flex gap-[6px] items-center font-medium text-gray-900 capitalize">
                                {CurrentUser && CurrentUser.id == items.share.user.id ? (
                                  <Link href="/profile">
                                    <a>
                                      {items.share.user.first_name} {items.share.user.last_name}
                                    </a>
                                  </Link>
                                ) : (
                                  <Link href={{ pathname: "/User-Profile", query: items.share.user.id, }}>
                                    <a>
                                      {items.share.user.first_name} {items.share.user.last_name}
                                    </a>
                                  </Link>
                                )}
                                <ChevronRightIcon
                                  width={24}
                                  height={24}
                                  className="text-indigo-400"
                                />
                                <Link href={{ pathname: "/group-page/joind-group", query: items.share.group.id, }}>
                                  <a>
                                    <div className="capitalize">{items.share.group.title}</div>
                                  </a>
                                </Link>
                              </h4>
                              <div className="font-light text-gray-900 opacity-[0.8] italic">Group Post</div>
      
                            </>
                          ) : (
                            <>
                              {CurrentUser && CurrentUser.id == items.user.id ? (
                                <Link href="/profile">
                                  <a>
                                    <h4 className="flex gap-[6px] items-center font-medium text-gray-900 capitalize">
                                      {items.share.user.first_name} {items.share.user.last_name}
                                      <BadgeCheckIcon
                                        width={14}
                                        height={14}
                                        className="text-indigo-400"
                                      />
                                    </h4>
                                    <div className="font-light text-gray-900 opacity-[0.8]">
                                      {items.share.user.city ? items.share.user.city + ", " : ""}{items.share.user.state ? items.share.user.state + ", " : ""} {items.share.user.country}
                                    </div>
                                  </a>
                                </Link>
                              ) : (
                                <Link href={{ pathname: "/User-Profile", query: items.share.user.id, }}>
                                  <a>
                                    <h4 className="flex gap-[6px] items-center font-medium text-gray-900 capitalize">
                                      {items.share.user.first_name} {items.share.user.last_name}
                                      <BadgeCheckIcon
                                        width={14}
                                        height={14}
                                        className="text-indigo-400"
                                      />
                                    </h4>
                                    <div className="font-light text-gray-900 opacity-[0.8]">
                                      {items.share.user.city ? items.share.user.city + ", " : ""}{items.share.user.state ? items.share.user.state + ", " : ""} {items.share.user.country}
                                    </div>
                                  </a>
                                </Link>
                              )}
      
                            </>
                          )
                        )}
                        <div className="font-light text-gray-900 opacity-[0.8]">
                          {items.share.created_at}
                        </div>
                      </div>
                    </div>
                    <div className="p-2 pb-2">
                      {items.share.tags && items.share.tags.length > 0 || (items.share.hashtags && items.share.hashtags.length > 0) ?
                        <App state={items.share.body} website={items.share.tags} hashtags={items.share.hashtags} />
                        : <ReadMore>
                          {items.share.body ? items.share.body : ""}
                        </ReadMore>}
                    </div>
                    <div className="mt-[14px] mx-auto">
                      {items.share.event && items.share.event ? (
                        <Link
                          href={{
                            pathname: "/events-design/event-view",
                            query: items.id,
                          }} >
                          <a>
                            <div className="rounded-xl bg-white border border-gray-100 my-2">
                              {items.share.event.cover_photo_url ? (
                                <img
                                  src={items.share.event.cover_photo_url}
                                  className="object-cover rounded-t-xl h-auto w-[952px]"
                                  alt=""
                                />
                              ) : (
                                ""
                              )}
                              <div className="py-3 px-3">
                                <div className="flex justify-between items-center">
                                  <div>
                                    {/* Date & Time */}
                                    <div className="text-red-400 text-sm">
                                      <span>{items.share.event.start_time}</span>
                                      <span>-{items.share.event.end_time}</span>&nbsp;
                                      <span>{items.share.event.start_date}</span>&nbsp;
                                    </div>
                                    {/* Name */}
                                    <div className="font-semibold text-lg">
                                      {items.share.event.name}
                                    </div>
                                    {/* Event-type */}
                                    <div className="flex items-center gap-2">
                                      <CalendarIcon
                                        width={16}
                                        height={16}
                                        className="text-gray-900"
                                      />
                                      <span className="text-gray-900 text-sm">
                                        {items.share.event.event_type}
                                      </span>
                                    </div>
                                    {items.share.event.event_type === "online" ? ('') : (
                                      <>
                                        {/* Adress */}
                                        {items.share.event.address ? (
                                          <div className="flex items-center gap-2">
                                            <CalendarIcon
                                              width={16}
                                              height={16}
                                              className="text-gray-900"
                                            />
                                            <span className="text-gray-900 text-sm">
                                              {items.share.event.address}
                                            </span>
                                          </div>
                                        ) : ('')}
      
                                        {/* Venue */}
                                        {items.share.event.venue ? (
                                          <div className="flex items-center gap-2">
                                            <CalendarIcon
                                              width={16}
                                              height={16}
                                              className="text-gray-900"
                                            />
                                            <span className="text-gray-900 text-sm">
                                              {items.share.event.venue}
                                            </span>
                                          </div>
                                        ) : ('')}
      
                                      </>
                                    )}
                                    {/* Link */}
                                    <div className="text-gray-900 flex gap-2">
                                      <CalendarIcon
                                        width={16}
                                        height={16}
                                        className="text-gray-900"
                                      />
                                      <span>{items.share.event.event_link}</span>
                                    </div>
                                    {/* Speaker */}
                                    <div className="text-gray-900">
                                      {items.share.event.tags && items.share.event.tags.length > 0 ?
                                        <App state={items.share.event.speaker} website={items.share.event.tags} />
                                        : items.share.event.body ? items.share.event.body : ""}
                                    </div>
                                  </div>
                                  <Link
                                    href={{
                                      pathname: "/events-design/event-view",
                                      query: items.id,
                                    }}
                                  >
                                    <a className="text-sm text-gray-600 cursor-pointer flex items-center border border-gray-100 rounded-full py-1 px-3">
                                      View Event
                                    </a>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </a>
                        </Link>
                      ) : (
                        ""
                      )}
                      {items.share.feed_type && items.share.feed_type === "video_feed" ? (
                        <Link
                          href={{
                            pathname: "/events-design/event-view",
                            query: items.id,
                          }} >
                          <a>
                            <video controls className="aspect-video w-full rounded-xl my-4">
                              <source src={items.share.attachments_link} type="video/mp4" />
                            </video>
                          </a>
                        </Link>
                      ) : (
                        ""
                      )}
                      {items.share.attachments_link && items.share.feed_type === "image_feed" ? (
                        // <Link
                        //   href={{
                        //     pathname: "/events-design/event-view",
                        //     query: items.id,
                        //   }} >
                        //   <a>
                        //     <div className="mt-[14px]">
                        //       <LazyLoadImage
                        // effect="blur"
                        //         src={items.share.attachments_link}
                        //         width={952}
                        //         height={240}
                        //         layout="responsive"
                        //         className="object-cover rounded-lg mx-auto h-auto"
                        //         alt=""
                        //       />
                        //     </div>
                        //   </a>
                        // </Link>
                        <AliceCarousel>
                          {
                            items.share.attachments_link.map((i,j)=>(
                              <div className="mt-[14px]" key={i}>
                                  <img
                                    src={i}
                                    key={i}
                                    width={952}
                                    height={400}
                                    layout="responsive"
                                    className="center object-cover rounded-lg mx-auto h-auto"
                                    alt=""
                                    onClick={()=>openModal(i,j,items.share)}
                                  />
                              </div>
                            ))
                          }
                        </AliceCarousel>
                      ) : (
                        ""
                      )}
                    </div>
                </div>) : ("")
              )
            )
          )}

          {UP_pic && UP_pic .length> 0 && items.attachments_link && items.feed_type === "image_feed" ? (
            <>
              <div className={`relative`}>
              {UP_pic.map((i,j) => (
                <div className="relative" key={i}>
                  <img
                    src={i}
                    key={i}
                    className="object-cover rounded-xl w-[300px] h-[300px]"
                  />
                  <div className="absolute top-0 hover:shadow-4xl right-0 w-7 h-7 flex justify-center items-center bg-indigo-400 rounded-l-full">
                    <TrashIcon className="h-4 w-4 text-white" onClick={ ()=>handleCoverReomves(j)} />
                    {/* <div>
                    <p className="text-sm font-medium text-gray-900">
                      Delete
                    </p>
                  </div> */}
                  </div>
                </div>
              ))}
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
          ) : ("")}

          {/* Update Button */}
          <div className="relative">
              {EditOn == items.id && (items.feed_type == "share" || items.feed_type == "basic" || items.feed_type == "event_feed") ? (
                <button className={`w-[100px] h-8 rounded-full flex gap-1 items-center justify-center bg-indigo-400 text-white cursor-pointer`}
                  onClick={() => UpdateFeed(items.id, items.feed_type)}>
                  Update {spinner && true ? <Spinner /> : ""}
                </button>
              ) : ('')}
            </div>

          

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

              <ShareModal items={items && items.feed_type == "share" ? (items.share) : (items)} currentuser={CurrentUser && CurrentUser} list={singleItem.list} setList={singleItem.setList}/>
            </div>
          </div>

          
          <Transition appear show={isOpen} as={Fragment}>
            <Dialog
              as="div"
              className="relative z-50 cursor-zoom-out"
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
                <div className="fixed inset-0 bg-black bg-opacity-90" />
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
                    <Dialog.Panel className=" text-left align-middle transition-all">
                      <div className="flex justify-end items-center mx-4">
                        {/* <XIcon
                          onClick={closeModal}
                          className="w-5 text-white h-5 cursor-zoom-out"
                        /> */}
                      </div>
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                      </Dialog.Title>
                      <div className="">
                        
                        <div className="flex w-auto h-[500px]">
                            {picLength && picLength >1?(
                              <div className="my-auto z-50"><button className="bg-indigo-400 border-4 border-white p-2 -mr-12 rounded-full" onClick={()=>picsShow("-")}><ChevronLeftIcon className="h-5 w-5 text-white" /></button></div>
                            ):("")}
                          
                            <img
                              src={imagess[picshow]}
                              className="object-contain cursor-zoom-in bg-white rounded-4xl w-[1010px] h-[500px]"
                            />
                            {picLength && picLength >1?(
                              <div className="my-auto z-50"><button className="bg-indigo-400 p-2 border-4 border-white -ml-12 rounded-full" onClick={()=>picsShow("+")}><ChevronRightIcon className="h-5 w-5 text-white" /></button></div>
                            ):("")}
                        </div>
                      </div>
                    </Dialog.Panel>
                  </Transition.Child>
                </div>
              </div>
            </Dialog>
          </Transition>

          <Fragment>
            {CurrentUser && items && items.page && items.page.can_comment != "all_member" && (CurrentUser.id != items.page.user_id) ? ('') : (
              <PostComments news_feed_id={items.id} setComments={setComments} setComments_count={setComments_count} setIs_deleted={setIs_deleted} dp={CurrentUser.display_photo_url} />
            )}
            <FilterComments news_feed_id={items.id} comments={comments.data} setComments_count={setComments_count} setComments={setComments} next_page={nextPage} setNextPage={setNextPage} />
            {!loading && <ReplyComments news_feed_id={items.id} comments={comments.data} comments_count={comments_count} setComments_count={setComments_count} setComments={setComments} setIs_deleted={setIs_deleted} items={items} user={CurrentUser} />}
          </Fragment>
        </div>

      </div>
    </>
  );
};

export default NewsFeedSingle;
