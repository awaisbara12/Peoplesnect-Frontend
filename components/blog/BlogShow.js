import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { BadgeCheckIcon, BookmarkIcon, ChatAltIcon, DotsHorizontalIcon, HeartIcon, PencilAltIcon, PencilIcon, PhotographIcon, ShareIcon, TrashIcon } from "@heroicons/react/outline";
import { ChevronRightIcon } from "@heroicons/react/solid";
import ProfileAvatar from "../../public/images/profile-avatar.png";
import Spinner from "../common/Spinner";
import { COMMENT_API_KEY, BLOG_POST_USER_API_KEY, CURENT_USER_LOGIN_API, REACTION_NEWSFEED_API_KEY, BOOKMARK_NEWSFEED_API_KEY, NEWSFEED_COMMENT_POST_KEY, SEARCH_MULTIPLE, HASHTAGS_API } from "../../pages/config";
import PostComments from "./comments/PostComments";
import FilterComments from "./comments/FilterComments";
import ReplyComments from "./comments/ReplyComments";
import { Popover, Transition } from "@headlessui/react";
import { Editor } from "@tinymce/tinymce-react";
import HashtagMentionInput from "./blog-description-input/HashtagMentionInput";
import App from "./blog-description-input/App";

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

function BlogShow() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);               // all Data about this blog
  const [showComment, setshowComment] = useState([]); // all Comment of this blog
  const [comments, setcomments] = useState();         // Comment Body
  const [editcomments, seteditcomments] = useState();         // Comment Body
  const [commentEditOn, setcommentEditOn] = useState(false); // show & remove comment Input
  const [commentEditId, setcommentEditId] = useState();// CommentId where want to show Comment's input
  const [currentUser, setCurrentUser] = useState();
  const [comments_count, setComments_count] = useState();
  const [is_deleted, setIs_deleted] = useState(0);

  const [items, setItems] = useState();
  const [EditOn, setEditOn] = useState(false);     // for on/off edit moode
  const [UP_pic, setUP_pic] = useState();     // Upload Preview image
  const [U_pic, setU_pic] = useState();       // Upload image
  const [spinner, setSpinner] = useState(false);
  const [title, setTitle] = useState();      // Blog Title
  const [blogContent, setBlogContent] = useState(""); // Blog Description
  const [blog_type, setblog_type] = useState("");

  
  const [tags, settags] = useState([]);
  const [mentioned, setMentioned] = useState([]);
  const [hashtaged, setHashtaged] = useState([]);
  let [hastags, sethastags] = useState();
  

  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
  // Bareer Key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore");}
  // get all data of this blog
  const getBlogs = async () => {
      const res = await axios(BLOG_POST_USER_API_KEY + "/" + myArray[1], {
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
          setItems(result.data.data);
          setList(result.data);
          setcomments(result.data.data.comments);
          setComments_count(result.data.data.comments.length)
          setIs_deleted(false);
        }
      } catch (error) {}
      setLoading(false);
      return result;
  };
  // Current User
  const Current_User=async()=>{   
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

 
  //  Opition Edit/delete confirmation
  const optionConfirm=(name,item)=>{
    if (name=="Delete")
    {
      var a = confirm("Are you Sure ?");
      if (a==true)DeleteBlogs();
      }
    if (name=="Edit")
    { 
      setEditOn(true);
      setTitle(list.data.title);
      setBlogContent(list.data.description);
      setblog_type(list.data.blog_type)
    }
    
  };
  //  Delete Blog
  const DeleteBlogs = async () => {
    const res = await axios(BLOG_POST_USER_API_KEY + "/" + myArray[1], {
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
        router.push("/blog");
      }
    } catch (error) {}
    setLoading(false);
    return result;
  };
  // Update Blog
  function Updateblog() {
    const dataForm = new FormData();
    if (tags.length > 0) {
      for (let i = 0; i < tags.length; i++) {
        dataForm.append("tags[]", tags[i]);
      }
    }
    dataForm.append("blogs[title]", title);
    dataForm.append("blogs[description]", blogContent.replace(/\[\@(.*?)\]\((.*?)\)/g, "@$1"));
    if(U_pic){dataForm.append("blogs[photos][]", U_pic);}
    dataForm.append("blogs[blog_type]", blog_type);

    setSpinner(true);
    fetch(BLOG_POST_USER_API_KEY+ "/" + myArray[1], {
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
          setSpinner(false);
          setEditOn(false);
          setUP_pic('');
          setU_pic('');
          setTitle('');
          setBlogContent('');
          setblog_type('');
          getBlogs();
        }
      })
      .catch((err) => console.log(err));
  }
  //Edited image
  const handleImage = (e) => {
    setU_pic(e.target.files[0]);
    if (e.target.files.length !== 0) {
      setUP_pic(window.URL.createObjectURL(e.target.files[0]));
    }
  };
  //  remover Image preview
  const handleCoverReomve = (e) => {
    setUP_pic(window.URL.revokeObjectURL(e.target.files));
  };
  


   // CopyLink
   const copylink=(postid)=>{    
    const links=window.location.href        // get Full Link
    // const links1=window.location.pathname   // get link after 
    // const copylink1 = links.split(links1)    // get link domain like(localhost..etc)
    navigator.clipboard.writeText(links);
    alert("Link Copied to your Clipboard");
  }
  function addHeart(feedId) {
    const dataForm = new FormData();
    dataForm.append("reactionable_id",myArray[1]);
    dataForm.append("reaction_type", "heart");
    dataForm.append("reactionable_type", "Blog");
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

  function createBookmark(feedId) {
    const dataForm = new FormData();
    dataForm.append("bookmarkable_id",feedId );
    dataForm.append("bookmarkable_type", "Blog");
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
          getBlogs();
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
        // setItems(result.data.data);
        getBlogs();
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
    getBlogs();
    Current_User();
    mentioneds();
    HashTags();
  }, [myArray[1]]);

  const HashTags=async()=>{
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
          let awa =[];
          for(let i =0; i<result.data.length ; i++)
          {
            awa[i] ={
              display: result.data[i].name  ,
              id: result.data[i].id,
            }
          }
          sethastags(awa);
        }
      })
      .catch((err) => console.log(err));
  }
  let a ='';
  const mentioneds = () => {
    if (typeof window !== "undefined") {
      var authKey = window.localStorage.getItem("keyStore");
    }
    // const [mention,setmention] = useState([]);
    fetch(SEARCH_MULTIPLE+"/gettags?query="+'friends', {
        method: "GET",
          headers: {
          Accept: "application/json", 
            Authorization: `${authKey}`,
          },
      })
          .then((resp) => resp.json())
        .then((result) => {
          if (result) {
            let awa =[];
  
            for(let i =0; i<result.data.length ; i++)
            {
                awa[i] ={
                  display: '@'+result.data[i].first_name+" "+result.data[i].last_name ,
                  link: 'Friends-Profile?'+result.data[i].id,
                  avatar: result.data[i].display_photo_url,
                  id: result.data[i].id,
                  type : 'User'
                }
            }
            a=awa;
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
    fetch(SEARCH_MULTIPLE+"/gettags?query="+'pages', {
        method: "GET",
          headers: {
          Accept: "application/json", 
            Authorization: `${authKey}`,
          },
      })
          .then((resp) => resp.json())
        .then((result) => {
          if (result) {
            let awa =[];
  
            for(let i = 0; i<result.data.length ; i++)
            {
                awa[i] ={
                  display: '@'+result.data[i].name ,
                  link: 'Liked-Pages?'+result.data[i].id,
                  avatar: result.data[i].display_photo_url,
                  id: result.data[i].id,
                  type : 'Page'
                }
            }
            let dbc = [...a,...awa]
            setMentioned(dbc);
            // setspeakerMention(dbc);
          //  console.log("ment",mentioned);
          }
        })
        .catch((err) => console.log(err));
  };

  if (loading)
  return (
    <div className="mt-8">
      <Spinner />
    </div>
  );

  return (
    <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
        {/* Blog Show */}
      <div className="blogs bg-white rounded-xl my-8 ">
        <div className="image">
          {/*  Edit Title */}
          {currentUser && list && list.data && currentUser.id==list.data.user.id && EditOn?(
            <div className="">
              <input
                type="text"
                name="title"
                value={title}
                onChange={(e)=>setTitle(e.target.value)}
                placeholder="Article title here"
                required="required"
                className={`w-full border-gray-100 font-semibold placeholder:text-gray-900 border py-2 px-3 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400
                `}
              />
              <br></br>
            </div>
          ):('')}
          {/* Edit Pic */}
          {currentUser && list && list.data && currentUser.id==list.data.user.id && EditOn?
          (
            <>
              <div className="">
                {UP_pic?(
                  <div className={`relative`}>
                  <img src={UP_pic} className="aspect-video object-cover rounded-xl mb-4" alt=""/>
                  <div onClick={handleCoverReomve} className="absolute bg-indigo-100 absolute top-4 right-4 z-50 w-8 h-8 cursor-pointer flex justify-center items-center rounded-full" >
                    <TrashIcon className="w-5 h-5 text-indigo-600" />
                  </div>
                </div>
                ):(
                <>
                  <div className="relative">
                    {list && list.data.photos_link && (
                      <img
                        className="object-cover rounded-t-lg h-[400px]"
                        src={list.data.photos_link[0]}
                        width={1000}
                        height={400}
                        alt=""
                      />
                    )}
                  </div>
                  <div className="">
                    <div className="relative flex gap-1 md:gap-2 items-center justify-center p-4">
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
                  </div>
                </>
                )}
              </div>
            </>
          )
          :
          ( //  Show Blog-Pic
            <div className="relative flex">
              <div className="">
                {list && list.data.photos_link && (
                  <img
                    className="object-cover rounded-t-lg h-[400px]"
                    src={list.data.photos_link[0]}
                    width={1000}
                    height={400}
                    alt=""
                  />
                )}
              </div>
              {currentUser && list && list.data && currentUser.id==list.data.user.id?(
              <div  className="bg-indigo-100 absolute top-4 right-4 z-50 w-8 h-8 cursor-pointer flex justify-center items-center rounded-full">
                <div className="">
                  <Popover className="relative">
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={` ${
                            open ? "" : "text-opacity-90 focus-visible:outline-none"
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
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                              <div className="relative bg-white py-2">
                                {cardDropdown.map((card) => (
                                  <a
                                    key={card.name}
                                    onClick={()=>optionConfirm(card.name,list.data)}
                                    href={card.id}
                                    className="-m-3 flex items-center rounded-lg p-2 transition duration-150 ease-in-out hover:bg-gray-50 focus:outline-none focus-visible:ring focus-visible:ring-orange-500 focus-visible:ring-opacity-50"
                                  >
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center text-white sm:h-12 sm:w-12 pl-2">
                                      <card.icon className="h-6 w-6 text-gray-900" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-gray-900">
                                        {card.name}
                                      </p>
                                    </div>
                                  </a>
                                ))}
                              </div>
                            </div>
                          </Popover.Panel>
                        </Transition>
                      </>
                    )}
                  </Popover>
                </div>
              </div>
              ):('')}
            </div>
          )}
        </div>




        {/*  Edit Description & Blog_type */}
        {currentUser && list && list.data && currentUser.id==list.data.user.id && EditOn?(
          <>
            <div className="form-group mt-4">
              
              {/* Description */}
              {/* <Editor
                id="fiexed-id"
                init={{
                  height: 300,
                  menubar: false,
                  plugins: ["link image code"],
                  toolbar:
                    "undo redo | formatselect | " +
                    "bold italic backcolor | alignleft aligncenter " +
                    "alignright alignjustify | bullist numlist outdent indent | " +
                    "removeformat | help",
                  content_style:
                    "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                  branding: false,
                  required: true,
                }}
                initialValue={blogContent}
                onChange={(e)=> setBlogContent(e.target.getContent({ format: "text" }))}
              /> */}
             <HashtagMentionInput postText={blogContent} setPostText={setBlogContent} mentioned={mentioned}  tags={tags} settags={settags} hastags={hastags}/>
          

              {/* Blog Type */}
              
                <div className="flex items-center gap-4 justify-end mr-4 p-4">
                  <div className="flex items-center">
                    <input
                      id="default-radio-1"
                      type="radio"
                      value="public_blog"
                      checked={blog_type=="public_blog"}
                      onChange={(e)=>setblog_type(e.target.value)}
                      name="default-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-indigo-400 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    /> 
                    <label
                      htmlFor="default-radio-1"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Public
                    </label>
                  </div>
                  <div className="flex items-center">
                    <input
                      checked={blog_type=="private_blog"}
                      id="default-radio-1"
                      type="radio"
                      value="private_blog"
                      onChange={(e)=>setblog_type(e.target.value)}
                      name="default-radio"
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-indigo-400 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      htmlFor="default-radio-2"
                      className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      Private
                    </label>
                  </div>
                </div>
                {/* Update Button */}
                <div className="flex justify-end mr-4 p-4">
                  {spinner?(
                    <>
                    <button className={`w-[100px] h-8 rounded-full flex gap-1 items-center justify-center bg-indigo-100 disabled: text-white cursor-pointer`}>
                        Update 
                      </button>
                    </>
                  ):(
                  <button className={`w-[100px] h-8 rounded-full flex gap-1 items-center justify-center bg-indigo-400 text-white cursor-pointer`}
                    onClick={()=>Updateblog()}>
                    Update 
                  </button>
                  )}
                </div>
              
          </div>
          </>
        ):(
          // Show Blog Title & Description
          <div className=" details p-10">
            <div className="heading text-2xl font-bold">{list.data.title}</div>
            {
                list && list.data && list.data.tags && list.data.tags.length > 0 || (list.data.hashtags && list.data.hashtags.length > 0)?
               (
                 <App state={list.data.description} website={list.data.tags} hashtags={list.data.hashtags}/>
               )
               :
               (  
                 <ReadMore>
                 {list.data.description? list.data.description : ""}
                 </ReadMore>
               )
            }
            {/* <div className="caption text-lg mt-4">{list.data.description}</div> */}
          </div>
        )}
        
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
       
        {/* For Like, Comment.. etc*/}
         <div className="flex justify-between mt-[14px] px-5 bg-white ">
          <div className="flex gap-6">
            <div className="flex gap-2 items-center">
              {items && items.is_heart && items.is_heart == true ? (
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
                    onClick={() => addHeart(list.id)}
                  />
                    {items && items.reactions_count?(
                      <span className="font-light text-gray-600 cursor-pointer">
                      {items.reactions_count}
                    </span>
                    ):('')}
                
                </>
              )}
            </div>
            <div className="flex gap-2 items-center">
              <ChatAltIcon
                width={24}
                height={24}
                className="text-gray-600 cursor-pointer"
              />
              {/* <span className="font-light text-gray-600 cursor-pointer">{items && items.comment_count>=0 && items.is_deleted==true?(items.comments_count):(<span>{ items && items.comments_count==0?(0):(<span>{items?(items.comments_count):('')}</span> )} </span>)}</span> */}
              <span className="font-light text-gray-600 cursor-pointer">{comments_count?(<span> {comments_count}</span>):("")}</span>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex gap-2 items-center">
              {items && items.is_bookmark && items.is_bookmark == true ? (
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
                  {items?(
                      <span className="font-light text-indigo-400">
                      {items.bookmarks_count}
                    </span>
                  ):('')}
                  
                </>
              )}
            </div>
            <div>
              <ShareIcon
                width={24}
                height={24}
                className="text-indigo-400 cursor-pointer"
                onClick={() => copylink(items.id)}
                // onClick={() =>alert("pending..")}
              />
            </div>
          </div>
         </div>
        {/* Comments Section  */}
         {items && currentUser?(
          <div className="comments px-5 bg-white pb-4 rounded-xl">
          <Fragment>
            <PostComments news_feed_id={items.id} setComments={setcomments} setComments_count={setComments_count} setIs_deleted={setIs_deleted} dp={currentUser.display_photo_url}/>
            <FilterComments news_feed_id={items.id} comments={comments} setComments_count={setComments_count} setComments={setcomments}  />
            {!loading && <ReplyComments news_feed_id={items.id} comments={comments} comments_count={comments_count} setComments_count={setComments_count} setComments={setcomments} setIs_deleted={setIs_deleted} items={items}/>}
          </Fragment>
          </div>
         ):('')}
      </div>
    </div>
  );
}

export default BlogShow;
