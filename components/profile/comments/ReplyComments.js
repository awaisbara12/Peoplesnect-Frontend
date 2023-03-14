import React, { Fragment, useEffect, useState } from "react";
import Image from "next/image";
import InputEmoji from "react-input-emoji";
import Link from "next/link";
import {
  HeartIcon,
  ChatIcon,
  DotsHorizontalIcon,
  PencilIcon,
  EmojiHappyIcon,
  TrashIcon,
  PhotographIcon,
  PaperAirplaneIcon,
} from "@heroicons/react/outline";
import ProfileAvatar from "../../../public/images/profile-avatar-2.png";
import { Popover, Transition } from "@headlessui/react";
import { COMMENT_API_KEY, COMMENT_REPLY, CURENT_USER_LOGIN_API, HASHTAGS_API, NEWSFEED_COMMENT_POST_KEY, REACTION_NEWSFEED_API_KEY, SEARCH_MULTIPLE } from "../../../pages/config";
import axios from "axios";
import App from "../Comment-Input/App";
import HashtagMentionInput from "../Comment-Input/HashtagMentionInput";
import Picker from 'emoji-picker-react';

const ReadMore = ({ children }) => {
  const text = children;
  const [isReadMore, setIsReadMore] = useState(true);
  const toggleReadMore = () => {
    setIsReadMore(!isReadMore);
  };
  return (
    <p className="text">
      {isReadMore ? text.slice(0, 300) + (text.length > 300?("......"):('')) : text}
      {text.length > 300?(
        <span onClick={toggleReadMore} className="text-indigo-400 cursor-pointer ml-2 font-bold">
          {isReadMore ? "Read more" : "Show less"}
        </span>
      ):('')}
    </p>
  );
};

const ReplyComments = (props) => {
  const [reply_on, setReplyOn] = useState(false);              // For show or hide Reply's Input
  const [edit_on, setEditOn] = useState(false);                // For show or hide Comment's Edit Input
  const [reply_edit_on, setReplyEditOn] = useState(false);     // For show or hide Reply's Edit Input
  const [CommentReply, setCommentReply] = useState();          // for Reply Body
  const [edit_reply, setEditReply] = useState();               // for Edit Reply Body
  const [replyShow, setreplyShow] = useState(2);               // set length of Replies 
  const [showBut, setshowBut] = useState('Load All Replies');  // Show Label of all replies
  const [editCommentId, setCommentId] = useState("");
  const [is_heart, setIsHeart] = useState(false);
  const [postText, setPostText] = useState(""); 
  const [currentUser, setCurrentUser] = useState();
  const [postImage, setPostImage] = useState([]);
  const [C_postImagePreview, setC_postImagePreview] = useState([]);
  const [mediaType, setmediaType] = useState();


  const [chosenEmoji, setChosenEmoji] = useState(false);
  const [tags, settags] = useState([]);
  const [mentioned, setMentioned] = useState([]);
  const [hashtaged, setHashtaged] = useState([]);
  let [hastags, sethastags] = useState();
  //Bareer Key
  if (typeof window !== "undefined") { var authKey = window.localStorage.getItem("keyStore");}
  
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
          
          setCurrentUser(result.data.id);
          // console.log("user",result.data.id)
        }
      })
      .catch((err) => console.log(err)); 
  }
    // Edit Comment Input Field Show
  function editComment(commentId,body) {
    setEditOn(true);
    clearPic();
    setCommentId(commentId);
    setPostText(body);
  }
      // Edit Comment Input Field hide
  function cancelEdit(commentId) {
    setEditOn(false);
    setCommentId(commentId);
    clearPic();

  }
      // Delete Comment
  async function deteleComment(commentId) {
    const res = await axios(COMMENT_API_KEY + "/" + commentId, {
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
        if(document.getElementById(`comment-${commentId}`)){
          document.getElementById(`comment-${commentId}`).classList.add("hidden");
          
          async function getFeedComments (){
            const res = await axios(
              NEWSFEED_COMMENT_POST_KEY + "/" + props.news_feed_id + "/comments",
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
                props.setComments(result.data);
                props.setIs_deleted(1);
                if (!result.data.data[0]){
                  props.setComments_count(0);
                }
                else
                {
                  props.setComments_count(result.data.data[0].news_feed.comments_count);
                }
              }
            } catch (error) {
              console.log(error);
            }
            
            return result;
          };
          getFeedComments();
        }
      }
    } catch (error) {
      console.log(error);
    }
    clearPic();
  }
    // Update Comment
  function updateComment(commentId,commentBody) {
   const dataForm = new FormData();
    if(postText){dataForm.append("comments[body]", postText);}
    else{ dataForm.append("comments[body]", commentBody);}
   
    if (postImage.length > 0) {
      for (let i = 0; i < postImage.length; i++) {
        dataForm.append("comments[comment_attachments][]", postImage[i]);
      }
    }
    
    fetch(COMMENT_API_KEY+"/"+commentId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
      body: dataForm,
    })
    .then((resp) => resp.json())
    .then((result) => {
      getFeedComments();
      if (result) {
        setCommentId(commentId);
        let ItemsCopy = {data: []}
        let x = props.comments.map((entry) => {
          if(entry.id == commentId)
          {
            entry.body = result.data.body
          }
          ItemsCopy["data"].push(entry)
        })
        props.setComments(ItemsCopy);
       
      }
    })
    .catch((err) => console.log(err));
    setPostText("");
    setC_postImagePreview('');
    setPostImage('');
    setEditOn(false)
  }
   //For Update Props's Comment Array
   const getFeedComments = async () => {
    const res = await axios(
      NEWSFEED_COMMENT_POST_KEY + "/" + props.items.id + "/comments",
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
        props.setComments(result.data);
      }
    } catch (error) {
      console.log(error);
    }
    return result;
  };

  // console.log("propsderer", props.comments);
  function addHeart(type,commentId) {
    const dataForm = new FormData();
    dataForm.append("reactionable_id", commentId);
    dataForm.append("reaction_type", "heart");
    if (type == "Comment"){
      dataForm.append("reactionable_type", "Comment");
    }
    if (type == "ReplyComment"){
      dataForm.append("reactionable_type", "ReplyComment");
    }
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
          getFeedComments();
        }
      })
      .catch((err) => console.log(err));
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
        getFeedComments();
      }
    } catch (error) {
      console.log(error);
    }
  }
        // Replies Functions
    // For remove & Show Reply's Input
  function comentReplies(commentId) {
    if (reply_on){setReplyOn(false);}
    else{setReplyOn(true);}
    setCommentId(commentId);
    setC_postImagePreview('');
    setPostImage('');
  }
    // For remove & Show Edit's Reply Input
  function replyEdit(commentId, body) {
    if (reply_edit_on){setReplyEditOn(false);}
    else{setReplyEditOn(true);}
    setCommentId(commentId);
    setEditReply(body)
  }
    // Show 2 or All Replies
  function showAllReplies(i){
    if(replyShow==2){setreplyShow(i); setshowBut('Less Load')}
    else{setreplyShow(2);setshowBut('Load All Replies')}
  }
    //Delete Reply
  async function deleteReply(ReplyId) {
    const res = await axios(`${COMMENT_REPLY}/${ReplyId}`, {
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
        // console.log("Replies",result.data);
        setReplyOn(false);
        setReplyEditOn(false);
        setEditReply('');
        getFeedComments();
      }
    } catch (error) {
      console.log(error);
    }
    clearPic();
  }
    //Update Reply
  async function updateReply(ReplyId,ReplyBody) {
    const dataForm = new FormData();
    if(edit_reply){ dataForm.append("reply_comments[body]", edit_reply);}
    else{ dataForm.append("reply_comments[body]", ReplyBody);}
    if (postImage.length > 0) {
      for (let i = 0; i < postImage.length; i++) {
        dataForm.append("reply_comments[reply_comment_attachments][]", postImage[i]);
      }
    }
    await fetch(`${COMMENT_REPLY}/${ReplyId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
      body:dataForm,
    }).then((resp) => resp.json())
    .then((result) => {
      if (result) {
        // console.log("Replies",result.data);

        getFeedComments();
        setReplyOn(false);
        setReplyEditOn(false);
        setEditReply('');
      }
    })
    clearPic();
  }
    //Post Reply
  async function POSTReplies(commentId) {
    const dataForm = new FormData();
    if (tags.length > 0) {
      for (let i = 0; i < tags.length; i++) {
        dataForm.append("tags[]", tags[i]);
      }
    }
    dataForm.append("reply_comments[body]", CommentReply.replace(/\[\@(.*?)\]\((.*?)\)/g, "@$1"));
    dataForm.append("reply_comments[comment_id]", commentId);
    if (postImage.length > 0) {
      for (let i = 0; i < postImage.length; i++) {
        dataForm.append("reply_comments[reply_comment_attachments][]", postImage[i]);
      }
    }
    fetch(COMMENT_REPLY, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
      body:dataForm,
    }).then((resp) => resp.json())
    .then((result) => {
        setReplyOn(false);       // close reply input
        setReplyEditOn(false);   // close reply edit input
        setCommentReply('');     // clear body of editReply input
        getFeedComments();
       if (result) {
        
       }
    })
    clearPic();
  }
  const handleImagePost = (e) => {
    setPostImage(e.target.files);
    if (e.target.files.length !== 0) {
      setC_postImagePreview(window.URL.createObjectURL(e.target.files[0]));
    }
  };
  const clearPic =()=>{
    setC_postImagePreview('');
    setPostImage('');
  }
  useEffect(()=>{
    Current_User(); 
    mentioneds();
    HashTags();
  },[])
  const onEmojiClick = (event) => {
    setChosenEmoji(false);
    setPostText(postText+" "+event.emoji+" ");
  };
  const onEmojiClickReply = (event) => {
    setChosenEmoji(false);
    setCommentReply(CommentReply+" "+event.emoji+" ");
  };
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
            // setspeakerMention(a);
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
  return (
    <Fragment>
      <div>
        {/* Show Comments */}
        {props.comments &&
          props.comments.map((comment) => (
            <div
              className="w-full bg-zinc-100 mt-[14px] p-[16px] rounded-xl"
              id={`comment-${comment.id}`}
              key={comment.id}
            >
              <div className="flex justify-between">
                <div className="flex items-start  gap-[10px]">
                  {comment.user.display_photo_url?(
                    <img
                      src={comment.user.display_photo_url}
                      className="object-cover rounded-full z-40 h-[38px] w-[38px]"
                      alt=""
                    />
                  ):(
                    <Image src={ProfileAvatar}  className="object-cover rounded-full " 
                    width={38} height={38} alt="" />
                  )}
                  
                  <div>
                    <span className="text-slate-900 flex gap-[6px] items-center capitalize">
                      {comment.user.first_name} {comment.user.last_name}
                      <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                      <div className="text-gray-400">{comment.created_at} | {comment.time}</div>
                    </span>
                    <div className="text-gray-900 text-sm">
                    {comment.user && comment.user.city?comment.user.city+", ":""}{comment.user && comment.user.state?comment.user.state+", ":""}{comment.user && comment.user.country?comment.user.country+", ":""}
                    </div>
                  </div>
                </div>
              {/*  Comment Pooper */}
                <div className="">
                  <Popover className="relative">
                    {({ open }) => (
                      <>
                        <Popover.Button
                          className={` ${
                            open
                              ? ""
                              : "text-opacity-90 focus-visible:outline-none"
                          }`}
                        >
                          <div className="hover:bg-indigo-100 focus:bg-indigo-100 rounded-full h-8 w-8 flex items-center justify-center">
                            <DotsHorizontalIcon className="w-5 h-5" />
                          </div>
                        </Popover.Button>
                        {currentUser==comment.user.id ||currentUser==props.items.user.id?(
                          <Transition
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel className="absolute left-7 z-10 top-6 w-36 max-w-sm -translate-x-full transform px-4 sm:px-0 lg:max-w-3xl">
                            <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                              <div className="relative bg-white py-1">
                                {currentUser==comment.user.id?(
                                   <button
                                   key="Edit"
                                   onClick={() => editComment(comment.id,comment.body)}
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
                                ):('')}
                                
                                {currentUser==comment.user.id ||currentUser==props.items.user.id?(
                                  <button
                                  key="Delete"
                                  onClick={() => deteleComment(comment.id)}
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
                                ):('')}
                              </div>
                            </div>
                          </Popover.Panel>
                          </Transition>
                        ):('')}
                        
                      </>
                    )}
                  </Popover>
                </div>
              </div>
              {/* Comment Edit on */}
              {edit_on && editCommentId == comment.id ? (
                <>
                  <div className="relative -ml-5">
                  {chosenEmoji ? (
                      <Picker onEmojiClick={onEmojiClick}className="w-[50px] h-[50px]" />
                    ) : ('')}
                    <div className="flex items-center">
                    {/* <InputEmoji
                      value={comment.body}
                      className="ml-0"
                      type="text"
                      onChange={setPostText}
                      react-emoji="w-{80%}"
                      placeholder={comment.body}
                    /> */}
                    
                     <div className="w-[97%]">
                      <HashtagMentionInput postText={postText} setPostText={setPostText} mentioned={mentioned}  tags={tags} settags={settags} hastags={hastags}/>
                    </div>
                    <div className="flex">  
                      <div>
                        {chosenEmoji ? ('') : (
                          <EmojiHappyIcon
                            width={28}
                            height={28}
                            className="text-gray-500"
                            onClick={()=>setChosenEmoji(true)}
                          />
                        )}
                      </div>
                      <div className="relative flex items-center justify-center">
                        <PhotographIcon
                          width={28}
                          height={28}
                          className="text-gray-500"
                        />
                        <input
                          type="file"
                          name="image"
                          id="image"
                          className="opacity-0 absolute w-6 h-6 -z-0"
                          onChange={handleImagePost}
                          title={""}
                          multiple
                        />
                      </div>
                    </div>
                    </div>

                      {C_postImagePreview?(
                       
                      <div className="relative w-1/4 mt-2">
                        <img
                          src={C_postImagePreview}
                          className="ml-5 rounded-xl my-4 max-h-[150px] max-w-[230px] object-cover"
                          alt=""
                        />
                         <div
                         onClick={clearPic}
                         className="bg-indigo-100 absolute top-4 right-0 z-10 w-8 h-8 cursor-pointer flex justify-center items-center rounded-full"
                          >
                         <TrashIcon className="w-5 h-5 text-indigo-600" />
                         </div>
                       </div>
                      ):(
                        <div className="relative w-1/4 mt-2">
                          {comment.attachments_link?(
                             <img
                             src={comment.attachments_link[0]}
                             className="ml-5 rounded-xl my-4 max-h-[150px] max-w-[230px] object-cover"
                             alt=""
                           />
                          ):('')}
                        </div>
                      )}
                      
                  </div>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => cancelEdit(comment.id)}
                      className="bg-transparent border-2 border-indigo-400 text-indigo-400 px-2 py-1 rounded-xl"
                    >
                      Cancel
                    </button>
                    <button onClick={() => updateComment(comment.id, comment.body)} className="bg-indigo-400 text-white border-2  px-2 py-1 rounded-xl">
                      Update
                    </button>
                  </div>
                </>
              ) : (
                <>
                 {/* <p className="text-gray-900 mt-[6px]">{comment.body}</p> */}
                { comment.tags && comment.tags.length > 0 || (comment.hashtags && comment.hashtags.length > 0)?
                (
                  <App state={comment.body} website={comment.tags} hashtags={comment.hashtags}/>
                )
                :
                (  
                  <ReadMore>
                  {comment.body? comment.body : ""}
                  </ReadMore>
                )
                  }
                  
                  {comment.attachments_link ? (
                    <img
                      src={comment.attachments_link[0]}
                      className="rounded-xl my-4 max-h-[150px] max-w-[230px] object-cover"
                      alt=""
                    />
                  ) : (
                    ""
                  )}
                 
                </>
              )}
              <div className="flex items-center gap-[14px] mt-[10px]">
                {/* <HeartIcon className="w-5 h-5 cursor-pointer" onClick={() => likeComment(comment.id)}/> */}
                <div className="flex gap-2 items-center">
                  {comment.is_heart && comment.is_heart == true ? (
                    <>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 24 24"
                        fill="Red"
                        className="w-6 h-6 cursor-pointer"
                        onClick={() => deteleHeart(comment.heart_id)}
                      >
                        <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                      </svg>
                      <span className="font-light text-gray-900">
                        {comment.reactions_count}
                      </span>
                    </>
                  ) : (
                    <>
                      <HeartIcon
                        width={24}
                        height={24}
                        className="text-gray-600 cursor-pointer"
                        onClick={() => addHeart("Comment",comment.id)}
                      />
                      <span className="font-light text-gray-600 cursor-pointer">
                        {comment.reactions_count}
                      </span>
                    </>
                  )}
                </div>
                <div className="w-[0.5px] h-4 bg-gray-900"></div>
                <div className="flex gap-[4px]">
                  <ChatIcon className="w-5 h-5" onClick={() => comentReplies(comment.id)}/>
                  <span className="font-light">
                    {comment.reply_comments.length}
                  </span>
                  {comment.reply_comments.length>2?(
                    <div className="w-25 h-5 ml-5 cursor-pointer  text-indigo-400"
                      onClick={()=>showAllReplies(comment.reply_comments.length)}>
                      {showBut}
                    </div>
                  ):('')}
                </div>  
              </div>

              {/* hide or Show Reply Input */}
                  {reply_on && editCommentId==comment.id?(
                    <>
              {/* Reply On Commet Input Bar */}
                      <div className="relative -ml-5">
                        <div className="flex items-center">
                          {/* <InputEmoji
                          value={CommentReply}
                            className="ml-0"
                            type="text"
                            onChange={setCommentReply}
                            react-emoji="w-{80%}"
                            placeholder="Reply Here"
                          /> */}
                           {chosenEmoji ? (
                              <Picker onEmojiClick={onEmojiClickReply}className="w-[50px] h-[50px]" />
                            ) : ('')}
                           <div className="w-[97%]">
                              <HashtagMentionInput postText={CommentReply} setPostText={setCommentReply} mentioned={mentioned}  tags={tags} settags={settags} hastags={hastags}/>
                            </div>
                          <div className="flex">
                          <div>
                            {chosenEmoji ? ('') : (
                              <EmojiHappyIcon
                                width={28}
                                height={28}
                                className="text-gray-500"
                                onClick={()=>setChosenEmoji(true)}
                              />
                            )}
                          </div>
                            <div className="relative flex items-center justify-center">
                              <PhotographIcon
                                width={28}
                                height={28}
                                className="text-gray-500"
                              />
                              <input
                                type="file"
                                name="image"
                                id="image"
                                className="opacity-0 absolute w-6 h-6 -z-0"
                                onChange={handleImagePost}
                                title={""}
                                multiple
                              />
                            </div>
                          </div>
                          <PaperAirplaneIcon className="h-7 w-7 rotate-90 text-gray-500" onClick={() => POSTReplies(comment.id)} />
                          {/* <button onClick={() => POSTReplies(comment.id)} className="bg-indigo-400 text-white border-2  px-2 py-1 rounded-xl">
                            Send
                          </button> */}
                        </div>
                      </div>
                      {/* show or remove preview of image In Comment'sReply */}
                      {C_postImagePreview?(
                          <div className="relative w-1/4 mt-2">
                            <img
                              src={C_postImagePreview}
                              className="ml-5 rounded-xl my-4 max-h-[150px] max-w-[230px] object-cover"
                              alt=""
                            />
                              <div className="bg-indigo-100 absolute top-4 right-0 z-10 w-8 h-8 cursor-pointer flex justify-center items-center rounded-full"
                              onClick={clearPic}>
                                <TrashIcon className="w-5 h-5 text-indigo-600" />
                              </div>
                            </div>
                          ):('')}
                    </>
                  ):('')}


              {/* Show Reply */}


                {comment.reply_comments?(
                    comment.reply_comments.slice(0, replyShow).map(i=>(
                     <div className="bg-white mt-[8px] py-[16px] mx-6 px-6 rounded-xl" id={`comment-${i.id}`} key={i.id}>
                      <div className="flex justify-between">
                        <div className="flex items-start  gap-[10px]">
                          {i.user.display_photo_url?(
                            <img
                              src={i.user.display_photo_url} 
                              className="object-cover rounded-full z-40 h-[38px] w-[38px]"
                              alt=""
                            />
                          ):(
                            <Image src={ProfileAvatar}  className="object-cover rounded-full " 
                            width={38} height={38} alt="" />
                          )}
                          
                          <div>
                            <span className="text-slate-900 flex gap-[6px] items-center capitalize">
                              {i.user.first_name} {i.user.last_name}
                              <div className="w-1 h-1 rounded-full bg-slate-400"></div>
                              <div className="text-gray-400">{i.created_at} | {i.time}</div>
                            </span>
                            <div className="text-gray-900 text-sm ">
                              {i.user.city}, {i.user.country}
                            </div>
                          </div>
                        </div>
                        {/* Reply poper */}
                        <div className="">
                          <Popover className="relative">
                            {({ open }) => (
                              <>
                                <Popover.Button
                                  className={` ${
                                    open
                                      ? ""
                                      : "text-opacity-90 focus-visible:outline-none"
                                  }`}
                                >
                                  <div className="hover:bg-indigo-100 focus:bg-indigo-100 rounded-full h-8 w-8 flex items-center justify-center">
                                    <DotsHorizontalIcon className="w-5 h-5" />
                                  </div>
                                </Popover.Button>
                                {currentUser==i.user.id ||currentUser==props.items.user.id || currentUser==comment.user.id?(
                                   <Transition
                                   as={Fragment}
                                   enter="transition ease-out duration-200"
                                   enterFrom="opacity-0 translate-y-1"
                                   enterTo="opacity-100 translate-y-0"
                                   leave="transition ease-in duration-150"
                                   leaveFrom="opacity-100 translate-y-0"
                                   leaveTo="opacity-0 translate-y-1"
                                 >
                                   <Popover.Panel className="absolute left-7 z-10 top-6 w-36 max-w-sm -translate-x-full transform px-4 sm:px-0 lg:max-w-3xl">
                                     <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                                       <div className="relative bg-white py-1">
                                         {currentUser==i.user.id?(
                                           <button
                                             key="Edit"
                                             onClick={() => replyEdit(i.id, i.body)}
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
                                         ):('')}
                                         
                                         {currentUser==i.user.id ||currentUser==props.items.user.id || currentUser==comment.user.id?(
                                             <button
                                             key="Delete"
                                             onClick={() => deleteReply(i.id)}
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
                                         ):('')}
                                        
                                       </div>
                                     </div>
                                   </Popover.Panel>
                                 </Transition>
                                ):('')}
                               
                              </>
                            )}
                          </Popover>
                        </div>
                      </div>


                      {/* Edit Reply Input */}

                      
                      {reply_edit_on && editCommentId==i.id?(
                        <>
                          {/* Edit Reply Input Bar */}
                          <div className="relative -ml-5">
                            <div className="flex items-center">
                              {/* <InputEmoji
                                value={i.body}
                                className="ml-0"
                                type="text"
                                onChange={setEditReply}
                                react-emoji="w-{80%}"
                                placeholder={i.body}
                              /> */}
                              {chosenEmoji ? (
                              <Picker onEmojiClick={onEmojiClickReply}className="w-[50px] h-[50px]" />
                                ) : ('')}
                              <div className="w-[97%]">
                                  <HashtagMentionInput postText={edit_reply} setPostText={setEditReply} mentioned={mentioned}  tags={tags} settags={settags} hastags={hastags}/>
                                </div>
                              <div className="flex">
                                {chosenEmoji ? ('') : (
                                  <EmojiHappyIcon
                                    width={28}
                                    height={28}
                                    className="text-gray-500"
                                    onClick={()=>setChosenEmoji(true)}
                                  />
                                )}
                                <div className="relative flex items-center justify-center">
                                  <PhotographIcon
                                    width={28}
                                    height={28}
                                    className="text-gray-500"
                                  />
                                  <input
                                    type="file"
                                    name="image"
                                    id="image"
                                    className="opacity-0 absolute w-6 h-6 -z-0"
                                    onChange={handleImagePost}
                                    title={""}
                                    multiple
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* Preview of Image in Edit Reply */}
                          {C_postImagePreview?(
                            <div className="relative w-1/4 mt-2">
                              <img
                                src={C_postImagePreview}
                                className="ml-5 rounded-xl my-4 max-h-[150px] max-w-[230px] object-cover"
                                alt=""
                              />
                                <div className="bg-indigo-100 absolute top-4 right-0 z-10 w-8 h-8 cursor-pointer flex justify-center items-center rounded-full"
                                onClick={clearPic} >
                                  <TrashIcon className="w-5 h-5 text-indigo-600" />
                                </div>
                            </div>
                          ):( 
                            <div className="relative w-1/4 mt-2">
                              {i.attachments_link?(
                                  <img
                                  src={i.attachments_link}
                                  className="ml-5 rounded-xl my-4 max-h-[150px] max-w-[230px] object-cover"
                                  alt=""
                                />
                              ):('')}
                            </div>
                            )}
                          {/* Edit Reply Button */}
                          <div className="flex gap-2 mt-2">
                            <button className="bg-transparent border-2 border-indigo-400 text-indigo-400 px-2 py-1 rounded-xl"
                             onClick={() => replyEdit(i.id)}>
                              Cancel
                            </button>
                            <button onClick={() => updateReply(i.id,i.body)} className="bg-indigo-400 text-white border-2  px-2 py-1 rounded-xl">
                              Update
                            </button>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* <p className="text-gray-900 mt-[2px] text-sm">{i.body}</p> */}
                          { i.tags && i.tags.length > 0 || (i.hashtags && i.hashtags.length > 0)?
                            (
                              <App state={i.body} website={i.tags} hashtags={i.hashtags}/>
                            )
                            :
                            (  
                              <ReadMore>
                              {i.body? i.body : ""}
                              </ReadMore>
                            )
                          }
                          {i.attachments_link ? (
                            <img
                              src={i.attachments_link[0]}
                              className=" rounded-xl my-4 max-h-[150px] max-w-[230px] object-cover"
                              alt=""
                            />
                          ) : (
                            ""
                          )}
                          <div className="flex items-center gap-[14px] mt-[10px]">
                            {/* <HeartIcon className="w-5 h-5 cursor-pointer" onClick={() => likeComment(comment.id)}/> */}
                            <div className="flex gap-2 items-center">
                              {i.is_heart && i.is_heart == true ? (
                                <>
                                  <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="Red"
                                    className="w-6 h-6 cursor-pointer"
                                    onClick={() => deteleHeart(i.heart_id)}
                                  >
                                    <path d="M11.645 20.91l-.007-.003-.022-.012a15.247 15.247 0 01-.383-.218 25.18 25.18 0 01-4.244-3.17C4.688 15.36 2.25 12.174 2.25 8.25 2.25 5.322 4.714 3 7.688 3A5.5 5.5 0 0112 5.052 5.5 5.5 0 0116.313 3c2.973 0 5.437 2.322 5.437 5.25 0 3.925-2.438 7.111-4.739 9.256a25.175 25.175 0 01-4.244 3.17 15.247 15.247 0 01-.383.219l-.022.012-.007.004-.003.001a.752.752 0 01-.704 0l-.003-.001z" />
                                  </svg>
                                  <span className="font-light text-gray-900">
                                    {i.reactions_count}
                                  </span>
                                </>
                              ) : (
                                <>
                                  <HeartIcon
                                    width={24}
                                    height={24}
                                    className="text-gray-600 cursor-pointer"
                                    onClick={() => addHeart("ReplyComment",i.id)}
                                  />
                                  <span className="font-light text-gray-600 cursor-pointer">
                                    {i.reactions_count}
                                  </span>
                                </>
                              )}
                            </div>
                          </div>
                        </>
                        
                      )}
                    </div>
                    ))
                ):('')}
            </div>
          ))}
      </div>
    </Fragment>
  );
};

export default ReplyComments;
