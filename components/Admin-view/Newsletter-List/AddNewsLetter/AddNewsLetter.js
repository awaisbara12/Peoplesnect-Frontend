import { Select, Option } from "@material-tailwind/react";
import React, { useEffect, useState }  from 'react';
import { CONTACT_US_API } from "../../../../pages/config";
import { TagsInput } from "react-tag-input-component";
import { useRouter } from "next/router";

const AddNewsLetter = () => {
  const [subject, setsubject] = useState();
  const [email, setemail] = useState([]);
  const [email_type, setemail_type] = useState('all_user');
  const [body, setbody] = useState();

  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");

  // Bareer Key
  if (typeof window !== "undefined") {var authKey = window.localStorage.getItem("keyStore");}
  const changeHandler = (e) => {
    setemail_type(e)
  };

  console.log(email);
  const Add_NewsLetter = async (commit) => {
    const dataForm = new FormData();
    // commit
    dataForm.append("news_letter_email[subject]",subject);
    dataForm.append("news_letter_email[email_type]",email_type);
    dataForm.append("news_letter_email[custom_emails]",email);
    dataForm.append("news_letter_email[body]",body);
    dataForm.append("commit",commit);

    await fetch(CONTACT_US_API, {
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
          router.push("/Admin/Newsletter-list");
        }
      })
      .catch((err) => console.log(err));
  }

  function getEditablenewsletter() {
    fetch(CONTACT_US_API+"/"+myArray[1], {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          console.log(result.data)
          setsubject(result.data.subject)
          let a=result.data.custom_emails;
          if(a){
            setemail(a.split(','));
          }
          setbody(result.data.body);
          setemail_type(result.data.email_type);
        }
      })
      .catch((err) => console.log(err));
  }
  // get all category
  function getCategory() {
    
    if(myArray && myArray[1])
    {
      getEditablenewsletter();
    }
      
  }

  const Update_NewsLetter = async (commit) => {
    const dataForm = new FormData();
    // commit
    dataForm.append("news_letter_email[subject]",subject);
    dataForm.append("news_letter_email[email_type]",email_type);
    dataForm.append("news_letter_email[custom_emails]",email);
    dataForm.append("news_letter_email[body]",body);
    dataForm.append("commit",commit);

    await fetch(CONTACT_US_API+"/"+myArray[1], {
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
          router.push("/Admin/Newsletter-list");
        }
      })
      .catch((err) => console.log(err));
  }

  useEffect(() => {
    getCategory();
  },[myArray[1]])

  return (
    <div className="mt-8">
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
        <div className="mt-8">
          <div className="">
            <div className="text-center">
              <div className="heading text-4xl font-semibold text-indigo-400">Add NewsLetter</div>
            </div>
            <div className="border items-center bg-white mt-4 p-10 rounded-xl">
              <div className="grid grid-cols-5 items-center">
                <div className="text-lg font-medium">Subject:</div>
                <div className='col-span-3'>
                  <input
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full xs:w-auto placeholder:pl-2 rounded-full placeholder:py-2"
                    placeholder="Type Subject Here"
                    type="text"
                    name="search"
                    value={subject}
                    onChange={(e)=>setsubject(e.target.value)}
                  />
                </div>
              </div>
              <div className='grid grid-cols-5 items-center mt-5'>
                <label className='text-md font-semibold'>Select Your Subject:</label>
                <div className="col-span-3">
                  <Select value={email_type} onChange={changeHandler} placeholder="Select Version" className='placeholder:text-md flex justify-end  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full rounded-xl p-2'>
                    <Option className='hover:text-gray-400' value="all_user">All</Option>
                    <Option className='hover:text-gray-400' value="user" >User</Option>
                    <Option className='hover:text-gray-400' value="job_admin">Job Admins</Option>
                    <Option className='hover:text-gray-400' value="marketplace_admin">Marketplace Admins</Option>
                    <Option className='hover:text-gray-400' value="job_marketplace_admin">Job_Marketplace Admins</Option>
                  </Select>
                </div>
              </div>
              {/* Add Custum Emails */}
                <div className="grid grid-cols-5 items-center mt-5">
                  <div className="text-lg font-medium">Select Mailing List:</div>
                  <div className='col-span-3'>
                    <div>                                   
                      <TagsInput
                        value={email}
                        onChange={setemail}
                        name="email"
                        placeHolder="Add emails"
                      />
                      <em>press enter to add new email</em>
                    </div>
                  </div>
                </div>

              <div className="grid grid-cols-5 mt-5">
                <div className="text-lg font-medium">Message:</div>
                <div className="col-span-3">
                  <textarea
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full rounded-xl"
                    placeholder="Write Subject Of the NewsLetter....."
                    type="textarea"
                    name="search"
                    rows={5}
                    cols={10}
                    value={body}
                    onChange={(e)=>setbody(e.target.value)}
                  />
                </div>
              </div>
              <div className='flex justify-end gap-4 mt-12'>
                {myArray && myArray[1]?(
                  <div>
                    <button className='px-4 py-2 border rounded-full border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white' onClick={()=>Update_NewsLetter("Send Newsletter")}>Send NewsLetter</button>
                    <button className='px-4 py-2 border rounded-full hover:border-indigo-400 hover:bg-transparent hover:text-indigo-400 bg-indigo-400 text-white' onClick={()=>Update_NewsLetter("Save as Draft")}>Save As Draft</button>
                  </div>
                ):(
                  <div>
                    <button className='px-4 py-2 border rounded-full border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white' onClick={()=>Add_NewsLetter("Send Newsletter")}>Send NewsLetter</button>
                    <button className='px-4 py-2 border rounded-full hover:border-indigo-400 hover:bg-transparent hover:text-indigo-400 bg-indigo-400 text-white' onClick={()=>Add_NewsLetter("Save as Draft")}>Save As Draft</button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AddNewsLetter;