import React, { useEffect, useRef, useState } from "react";
import { BlogSchema } from "../auth/schemas/BlogScheema";
import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { CameraIcon, TrashIcon } from "@heroicons/react/outline";
import { BLOG_POST_USER_API_KEY, HASHTAGS_API, SEARCH_MULTIPLE } from "../../pages/config";
import Spinner from "../common/Spinner";
import HashtagMentionInput from "./blog-description-input/HashtagMentionInput";



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


const NewPost = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [blogImage, setBlogImage] = useState([]);
  const [blog_type, setblog_type] = useState();
  const [blogContent, setBlogContent] = useState("");
  const [title, setTitle] = useState();
  const [BlogImagePreview, setBlogImagePreview] = useState();



  const [tags, settags] = useState([]);
  const [mentioned, setMentioned] = useState([]);
  const [hashtaged, setHashtaged] = useState([]);
  let [hastags, sethastags] = useState();

  if (typeof window !== "undefined") { var authKey = window.localStorage.getItem("keyStore");}
  const handleEditorChange = (e) => {
    setBlogContent(e.target.getContent({ format: "text" }));
  };

  const handleImagePost = (e) => {
    setBlogImage(e.target.files[0]);
    if (e.target.files.length !== 0) {
      setBlogImagePreview(window.URL.createObjectURL(e.target.files[0]));
    }
  };

  const handleImageRemove = (e) => {
    setBlogImagePreview(window.URL.revokeObjectURL(e.target.files));
  };

  const { values, errors, touched, handleBlur, handleChange, resetForm } =
    useFormik({
      initialValues: {
        title: "",
        description: "",
      },
      validationSchema: BlogSchema,
    });

  function blogPost(e) {
    e.preventDefault();

    const dataForm = new FormData();
    if (tags.length > 0) {
      for (let i = 0; i < tags.length; i++) {
        dataForm.append("tags[]", tags[i]);
      }
    }
    dataForm.append("blogs[title]", title);
    dataForm.append("blogs[description]", blogContent.replace(/\[\@(.*?)\]\((.*?)\)/g, "@$1"));
    dataForm.append("blogs[photos][]", blogImage);
    dataForm.append("blogs[blog_type]", blog_type);
    setLoading(true);
    fetch(BLOG_POST_USER_API_KEY, {
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
          setLoading(false);
          // console.log("uploaded",result.data)
          router.push("/blog/show?"+result.data.id);
          setTitle("")
          setBlogImage("");
          setBlogImagePreview("");
          setBlogContent("");
          resetForm();
        }
      })
      .catch((err) => console.log(err));
    
  }



  useEffect(() => {
    mentioneds();
    HashTags();
  },[]);



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

  return (
    <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
      <div className="bg-white rounded-xl mt-7 p-5">
        <form onSubmit={blogPost}>
          <div className="form-group">
            <input
              type="text"
              name="title"
              value={title}
              onChange={(e)=>setTitle(e.target.value)}
              onBlur={handleBlur}
              placeholder="Article title here"
              required="required"
              className={`w-full border-gray-100 font-semibold placeholder:text-gray-900 border py-2 px-3 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400
                ${title==""? "border-red-600" : ""}`}
            />
            {title==""?(
              <div className="text-red-600 pt-2 pl-1">{errors.title}</div>
            ) : null}
          </div>
          <div className="form-group mt-4">
            <div
              className={`relative flex justify-center items-center bg-zinc-100 aspect-video text-center rounded-sm ${
                BlogImagePreview ? "hidden" : "visible"
              }`}
            >
              <div className="absolute">
                <div className="text-center">
                  <CameraIcon className="w-10 h-10 text-indigo-400 mx-auto" />{" "}
                  Upload Cover Photo
                </div>
              </div>
              <input
                type="file"
                accept="image/*"
                onChange={handleImagePost}
                className="aspect-video w-full opacity-0 absolute z-50 top-0 left-0"
                required="required"
              />
            </div>
            {BlogImagePreview ? (
              <div className={`relative`}>
                <img
                  src={BlogImagePreview}
                  className="aspect-video object-cover rounded-xl mb-4"
                  alt=""
                />

                <div
                  onClick={handleImageRemove}
                  className="bg-indigo-100 absolute top-4 right-4 z-50 w-8 h-8 cursor-pointer flex justify-center items-center rounded-full"
                >
                  <TrashIcon className="w-5 h-5 text-indigo-600" />
                </div>
              </div>
            ) : (
              ""
            )}
          </div>
          <div className="form-group mt-4">
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
              initialValue=""
              onChange={handleEditorChange}
            /> */}
            <HashtagMentionInput postText={blogContent} setPostText={setBlogContent} mentioned={mentioned}  tags={tags} settags={settags} hastags={hastags}/>
          
            {errors.description && touched.description ? (
              <div className="text-red-600 pt-2 pl-1">{errors.description}</div>
            ) : null}
          </div>
          <div className="flex items-center justify-between border bg-white mt-4 px-4 py-6 rounded-xl">
              <div className="">Blog Type</div>
              <div className="flex items-center gap-4">
                <div className="flex items-center">
                  <input
                    id="default-radio-1"
                    type="radio"
                    value="public_blog"
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
            </div>
          {title && BlogImagePreview && blogContent && blog_type && blogImage?(
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-lg w-32 h-10 bg-indigo-400 py-2 px-4 mt-4 text-white font-semibold "
            >
              {loading ? <Spinner /> : "Publish"}
            </button>
          </div>
          ):(
            ''
          )}
        </form>
      </div>
    </div>
  );
};

export default NewPost;
