import React, { useRef, useState } from "react";
import { BlogSchema } from "../auth/schemas/BlogScheema";
import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { CameraIcon, TrashIcon } from "@heroicons/react/outline";
import { BLOG_POST_USER_API_KEY } from "../../pages/config";
import Spinner from "../common/Spinner";

const NewPost = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [blogImage, setBlogImage] = useState([]);
  const [blogContent, setBlogContent] = useState("");
  const [BlogImagePreview, setBlogImagePreview] = useState();
  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }

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
    dataForm.append("blogs[title]", values.title);
    dataForm.append("blogs[description]", blogContent);
    dataForm.append("blogs[photos][]", blogImage);
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
          router.push("/blog");
        }
      })
      .catch((err) => console.log(err));
    setBlogImage("");
    setBlogImagePreview("");
    setBlogContent("");
    resetForm();
  }

  return (
    <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
      <div className="bg-white rounded-xl mt-7 p-5">
        <form onSubmit={blogPost}>
          <div className="form-group">
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Article title here"
              required="required"
              className={`w-full border-gray-100 font-semibold placeholder:text-gray-900 border py-2 px-3 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400
                ${errors.title && touched.title ? "border-red-600" : ""}`}
            />
            {errors.title && touched.title ? (
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
            <Editor
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
            />
            {errors.description && touched.description ? (
              <div className="text-red-600 pt-2 pl-1">{errors.description}</div>
            ) : null}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-lg w-32 h-10 bg-indigo-400 py-2 px-4 mt-4 text-white font-semibold "
            >
              {loading ? <Spinner /> : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
