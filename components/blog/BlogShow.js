import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { PencilIcon, TrashIcon } from "@heroicons/react/outline";
import { ChevronRightIcon } from "@heroicons/react/solid";
import ProfileAvatar from "../../public/images/profile-avatar.png";
import Spinner from "../common/Spinner";
// import { BLOG_POST_USER_API_KEY } from "/pages/config";
import { COMMENT_API_KEY, BLOG_POST_USER_API_KEY, CURENT_USER_LOGIN_API } from "../../pages/config";

function BlogShow() {
  const [loading, setLoading] = useState(true);
  const [list, setList] = useState([]);               // all Data about this blog
  const [showComment, setshowComment] = useState([]); // all Comment of this blog
  const [comments, setcomments] = useState();         // Comment Body
  const [editcomments, seteditcomments] = useState();         // Comment Body
  const [commentEditOn, setcommentEditOn] = useState(false); // show & remove comment Input
  const [commentEditId, setcommentEditId] = useState();// CommentId where want to show Comment's input
  const [currentUser, setCurrentUser] = useState();
  setCurrentUser
  console.log("yess",showComment)  
  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("/");
  // Bareer Key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore");}
  
  function CommentEditOn(body, commentId){
    if(commentEditOn){setcommentEditOn(false);setcomments('');}
    else{setcommentEditOn(true);seteditcomments(body);setcommentEditId(commentId)}
  }
  //Edit Comment
  function EditComment(commentId){
    if(editcomments){
      const dataForm = new FormData();
      dataForm.append("comments[body]", editcomments);
      const res = fetch(COMMENT_API_KEY +"/"+ commentId, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
      body: dataForm,
      })
      .then((resp) => resp.json())
      .then((result) => {
        getBlogs();
        alert("edit")
      })
      setLoading(false);
      setcommentEditOn('');
      seteditcomments('');
    }
  }
  // Delete Comment
  const DeleteComment = async (commentId) => {
    var a = confirm("Are You Sure ?")
    if(a){
      const res = await axios(COMMENT_API_KEY +"/"+ commentId, {
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
          getBlogs();
        }
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
      return result;
    }
   
  };
  // Post Comment 
  function PostComment(e) {
    if(comments){
      e.preventDefault();
      const dataForm = new FormData();
      dataForm.append("comments[body]", comments);
      dataForm.append("comments[commentable_id]", list.data.id);
      dataForm.append("comments[commentable_type]", "Blog");
      fetch(COMMENT_API_KEY, {
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
            setcomments('');
            getBlogs();
          }
        })
        .catch((err) => console.log(err));
    }
    
  }
  // get all data of this blog
  const getBlogs = async () => {
    const res = await axios(BLOG_POST_USER_API_KEY + "/" + myArray[2], {
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
        setList(result.data);
        setshowComment(result.data.data.comments);
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
          
          setCurrentUser(result.data.id);
        }
      })
      .catch((err) => console.log(err)); 
  }
  useEffect(() => {
    setLoading(true);
    getBlogs();
    Current_User();
  }, []);

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
        <div className=" details p-10">
          <div className="heading text-2xl font-bold">{list.data.title}</div>
          <div className="caption text-lg mt-4">{list.data.description}</div>
        </div>
      </div>
        {/*comment Section  */}
      <div className="comment-section mt-18">
        <div className="comments-heading text-4xl font-bold my-8">Comments</div>
        {/* Post Comments */}
        <div className="input-comment">
          <div className="relative flex items-center gap-3">
            <Link href="/">
              <a className="">
                <Image src={ProfileAvatar} width={35} height={35} alt="" />
              </a>
            </Link>
            <input
              type="text"
              placeholder="Add New Comment....."
              className="w-full rounded-full"
              value={comments}
              onChange={(e)=>setcomments(e.target.value)}
            />
            <div className="absolute top-0 right-0">
              <div className="flex gap-2">
                <button className="bg-indigo-400 p-2 flex rounded-r-full text-white" onClick={PostComment}>
                  <ChevronRightIcon className="h-[25px] w-6" />
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Show Comment */}
        {showComment?(
          <>
            {showComment.map(i=>(
            <div className="bg-white rounded-xl my-8 p-4" key={i.id}>
            <div className="comments">
              <div className="">
                <div className="flex justify-between">
                  <Link href="/">
                    <a className="flex gap-4">
                    {i.user.display_photo_url?(
                      <img src={i.user.display_photo_url} className="object-cover rounded-full z-40 h-[40px] w-[40px]"/>
                    ):(
                      <Image src={ProfileAvatar} width={35} height={35} alt="" />
                    )}
                      
                      <div className="">
                        <div className="User-Name text-lg font-bold capitalize">
                          {i.user.first_name} {i.user.last_name}
                        </div>
                        <div className="User-Name -mt-1 mb-1 text-sm">
                          {i.user.email} 
                        </div>
                      </div>
                    </a>
                  </Link>
                  <div className="flex gap-2">
                    {currentUser==i.user.id?(
                      <PencilIcon className="h-5 w-5" onClick={()=>CommentEditOn(i.body,i.id)} />
                    ):('')}
                    {currentUser==i.user.id?(
                      <TrashIcon className="h-5 w-5" onClick={()=>DeleteComment(i.id)}/>
                    ):('')}
                    
                  </div>
                </div>
                <>
                  {commentEditOn && commentEditId==i.id?(
                    <div className="comment pl-14 text-sm">
                      <textarea
                      placeholder="Add New Comment....."
                      className="w-full h-auto border"
                      value={editcomments}
                      onChange={(e)=>seteditcomments(e.target.value)}
                       />
                       <button className="bg-indigo-400 text-white border-2  px-2 py-1 rounded-xl"
                        onClick={()=>EditComment(commentEditId)}>
                        Update
                      </button>
                      <button className="bg-indigo-400 text-white border-2  px-2 py-1 rounded-xl"
                        onClick={()=>CommentEditOn("","")}>
                        Cancel
                      </button>
                    </div>
                    ):( 
                    <div className="comment pl-14 text-sm">
                      {i.body}
                    </div>
                  )}
                </>
                 
               
              </div>
            </div>
            </div>
            ))}
          </>
        ):('')}
      </div>
    </div>
  );
}

export default BlogShow;
