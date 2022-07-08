import React, { useRef, useState } from "react";
import { BlogSchema } from "../auth/schemas/BlogScheema";
import { Editor } from "@tinymce/tinymce-react";
import { useFormik } from "formik";
import { useRouter } from "next/router";
import { NEXT_PUBLIC_BLOG_POST_API } from "../../pages/config";

const NewPost = () => {
  const [blogImage, setBlogImage] = useState([]);
  const [BlogImagePreview, setBlogImagePreview] = useState();
  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }
  const editorRef = useRef(null);
  const log = () => {
    if (editorRef.current) {
      console.log(editorRef.current.getContent());
    }
  };

  const handleImagePost = (e) => {
    setBlogImage(e.target.files[0]);
    if (e.target.files.length !== 0) {
      setBlogImagePreview(window.URL.createObjectURL(e.target.files[0]));
    }
  };

  const { values, errors, touched, handleBlur, handleChange, resetForm } =
    useFormik({
      initialValues: {
        title: "",
        description: "",
      },
      validationSchema: BlogSchema,
    });

  const onSubmit = () => {
    resetForm();
  };

  function blogPost(e) {
    e.preventDefault();
    const dataForm = new FormData();
    dataForm.append("blogs[title]", values.title);
    dataForm.append("blogs[description]", values.description);
    dataForm.append("blogs[photos][]", blogImage);

    fetch(NEXT_PUBLIC_BLOG_POST_API, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
      body: dataForm,
    })
      .then((resp) => resp.json())
      .then((result) => {
        console.log(result);
      })
      .catch((err) => console.log(err));
    onSubmit();
    setBlogImage("");
  }

  return (
    <div>
      <div className="bg-white w-[590px] rounded-xl mt-7 p-5">
        <form onSubmit={blogPost}>
          <div className="form-group">
            <input
              type="text"
              name="title"
              value={values.title}
              onChange={handleChange}
              onBlur={handleBlur}
              placeholder="Article title here"
              className={`w-full border-gray-100 font-semibold placeholder:text-gray-900 border py-2 px-3 rounded-md focus: outline-none focus:border-indigo-400 focus:drop-shadow-indigo-400
                ${errors.title && touched.title ? "border-red-600" : ""}`}
            />
            {errors.title && touched.title ? (
              <div className="text-red-600 pt-2 pl-1">{errors.title}</div>
            ) : null}
          </div>
          <div className="form-group mt-4">
            <div className="relative bg-zinc-100 text-center rounded-sm p-5">
              Upload Cover Photo
              <input
                type="file"
                accept="image/*"
                onChange={handleImagePost}
                className="w-[590px] opacity-0 absolute z-50 top-0 left-0"
              />
            </div>
          </div>
          <div className="form-group mt-4">
            <Editor
              onInit={(evt, editor) => (editorRef.current = editor)}
              value={values.description}
              name="description"
              onChange={handleChange}
              onBlur={handleBlur}
              initialValue={values.description}
              init={{
                height: 300,
                menubar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                ],
                toolbar:
                  "undo redo | formatselect | " +
                  "bold italic backcolor | alignleft aligncenter " +
                  "alignright alignjustify | bullist numlist outdent indent | " +
                  "removeformat | help",
                content_style:
                  "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
            {errors.description && touched.description ? (
              <div className="text-red-600 pt-2 pl-1">{errors.description}</div>
            ) : null}
          </div>
          <div className="flex justify-end">
            <button
              type="submit"
              className="rounded-lg bg-indigo-400 py-2 px-4 mt-4 text-white font-semibold "
            >
              Publish
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
