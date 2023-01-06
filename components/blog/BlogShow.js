import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { BookmarkIcon, ChatAltIcon, HeartIcon, PencilIcon, ShareIcon, TrashIcon } from "@heroicons/react/outline";
import { ChevronRightIcon } from "@heroicons/react/solid";
import ProfileAvatar from "../../public/images/profile-avatar.png";
import Spinner from "../common/Spinner";
// import { BLOG_POST_USER_API_KEY } from "/pages/config";
import { COMMENT_API_KEY, BLOG_POST_USER_API_KEY, CURENT_USER_LOGIN_API, REACTION_NEWSFEED_API_KEY, BOOKMARK_NEWSFEED_API_KEY, NEWSFEED_COMMENT_POST_KEY } from "../../pages/config";
import PostComments from "./comments/PostComments";
import FilterComments from "./comments/FilterComments";
import ReplyComments from "./comments/ReplyComments";

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
  // console.log("yess",showComment)  
  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
  // Bareer Key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore");}
  
  // function CommentEditOn(body, commentId){
  //   if(commentEditOn){setcommentEditOn(false);setcomments('');}
  //   else{setcommentEditOn(true);seteditcomments(body);setcommentEditId(commentId)}
  // }
  // //Edit Comment
  // function EditComment(commentId){
  //   if(editcomments){
  //     const dataForm = new FormData();
  //     dataForm.append("comments[body]", editcomments);
  //     const res = fetch(COMMENT_API_KEY +"/"+ commentId, {
  //     method: "PUT",
  //     headers: {
  //       Accept: "application/json",
  //       Authorization: `${authKey}`,
  //     },
  //     body: dataForm,
  //     })
  //     .then((resp) => resp.json())
  //     .then((result) => {
  //       getBlogs();
  //       alert("edit")
  //     })
  //     setLoading(false);
  //     setcommentEditOn('');
  //     seteditcomments('');
  //   }
  // }
  // // Delete Comment
  // const DeleteComment = async (commentId) => {
  //   var a = confirm("Are You Sure ?")
  //   if(a){
  //     const res = await axios(COMMENT_API_KEY +"/"+ commentId, {
  //       method: "DELETE",
  //       headers: {
  //         Accept: "application/json",
  //         "Content-type": "application/json; charset=utf-8",
  //         "Access-Control-Allow-Origin": "*",
  //         "Access-Control-Allow-Credentials": true,
  //         Authorization: authKey,
  //       },
  //       credentials: "same-origin",
  //     });
  //     const result = await res;
  //     try {
  //       if (result.status == 200) {
  //         getBlogs();
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //     setLoading(false);
  //     return result;
  //   }
   
  // };
  // // Post Comment 
  // function PostComment(e) {
  //   if(comments){
  //     e.preventDefault();
  //     const dataForm = new FormData();
  //     dataForm.append("comments[body]", comments);
  //     dataForm.append("comments[commentable_id]", list.data.id);
  //     dataForm.append("comments[commentable_type]", "Blog");
  //     fetch(COMMENT_API_KEY, {
  //       method: "POST",
  //       headers: {
  //         Accept: "application/json",
  //         Authorization: `${authKey}`,
  //       },
  //       body: dataForm,
  //     })
  //       .then((resp) => resp.json())
  //       .then((result) => {
  //         if (result) {
  //           setcomments('');
  //           getBlogs();
  //         }
  //       })
  //       .catch((err) => console.log(err));
  //   }
    
  // }
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
        console.log("Blog",result.data)
        setItems(result.data.data);
        setList(result.data);
        setcomments(result.data.data.comments);
        setComments_count(result.data.data.comments.length)
        setIs_deleted(false);
        
        // setComments_count(result.data.data.comments.length);
      }
    } catch (error) {}
    setLoading(false);
    return result;
  };
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
  useEffect(() => {
    setLoading(true);
    getBlogs();
    Current_User();
  }, []);

   // CopyLink
   const copylink=(postid)=>{    
    const links=window.location.href        // get Full Link
    const links1=window.location.pathname   // get link after localhost
    const copylink1 = links.split(links1)    // get link domain like(localhost..etc)
    navigator.clipboard.writeText(copylink1[0]+"/events-design/event-view?"+postid);
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
          <div className="">
            <Link href="/">
              <a>
                {list.data.photos_link && (
                  <img
                    className="object-cover rounded-t-lg h-[400px]"
                    src={list.data.photos_link[0]}
                    width={1000}
                    height={400}
                    alt=""
                  />
                )}
              </a>
            </Link>
          </div>
        </div>
        {list.data?(
        <div className=" details p-10">
          <div className="heading text-2xl font-bold">{list.data.title}</div>
          <div className="caption text-lg mt-4">{list.data.description}</div>
        </div>
        ):('')}
        
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
                // onClick={() => copylink(items.id)}
                onClick={() =>alert("pending..")}
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
