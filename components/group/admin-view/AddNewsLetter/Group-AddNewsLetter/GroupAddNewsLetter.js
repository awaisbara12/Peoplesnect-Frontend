import React, { useEffect, useState, Fragment } from 'react';
import { useRouter } from "next/router";
import {Transition } from "@headlessui/react";
import { GROUP_API, MESSAGES_API } from "../../../../../pages/config";
import { Dialog } from "@headlessui/react";
import { PhotographIcon, TrashIcon, XIcon } from "@heroicons/react/outline";
import InviteFriendsGroup from "../../InviteFriendsGroup/InviteFriendsGroup";
import ShowAlert from '../../../../Alerts/Alertss';
import dynamic from 'next/dynamic';
const DynamicEditor = dynamic(() => import('../../MyEditor'), {
  ssr: false, // This ensures it's not rendered on the server
});

const GroupAddNewsLetter = () => {
  const [subject, setsubject] = useState();
  const [isCheck, setIsCheck] = useState([]);
  let [isOpen, setIsOpen] = useState(false);
  const [text, setText] = useState("");                          // SMS BODY
  const [attachment_type, setattachment_type] = useState("");    // TYPE [:- IMAGE/VEDIO/Doc]
  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");
  const [postImage, setPostImage] = useState([]);                // UPLOAD [:- IMAGE/VEDIO/Doc]
  const [postImagePreview, setpostImagePreview] = useState();    // PREVIEW [:- IMAGE/VEDIO/Doc]
  const [group, setgroup] = useState();
  const [editorHtml, setEditorHtml] = useState('');
  const [openalert, setopenalert] = useState(false); // For Alert Show
  const [alertbody, setalertbody] = useState(); // For Alert Body

  // Bareer Key
  if (typeof window !== "undefined") { var authKey = window.localStorage.getItem("keyStore"); }

  function closeModal() {
    setIsOpen(false);
  }

  const handleImagePost = (e) => {
    if(e.target.files[0])
    {
      var type=e.target.files[0].type
      var s=type.split("/")
      setattachment_type(s[0])
      setPostImage(e.target.files[0]);
      
      if (e.target.files.length !== 0 && s[0]=="application"){
        setpostImagePreview(e.target.files[0].name)
      }
      else{
        setpostImagePreview(window.URL.createObjectURL(e.target.files[0]));
      }
    }
    
    
  };
  //  Clearing attachments
  const clearPic =()=>{
    setpostImagePreview('');
    setPostImage('');
    setattachment_type('')
  }

  function inviteModal() {
    if (isCheck.length > 0) {
      // SendInviteRequest();
      closeModal();
    }
    else {
      alert("Select Friend to Invite");
    }
  }
  function openModal() {
    setIsOpen(true);
  }
  function closeinviteModal() {
    setIsCheck([]);
    setIsOpen(false);
  }
  const GetGroup = () => {
    const res = fetch(GROUP_API + "/" + myArray[1], {
      method: "GET",
      headers: {
        Accept: "application/json",
        Authorization: `${authKey}`,
      },
    })
      .then((resp) => resp.json())
      .then((result) => {
        setgroup(result.data);
      })
  }

  const SendMessage=async()=>{
    if ((editorHtml) && myArray[1])
    {
      const dataForm = new FormData();
      if(postImagePreview){
        dataForm.append("attachment_type", attachment_type);
        dataForm.append("attachment", postImage);
      }
      dataForm.append("body", editorHtml);
      dataForm.append("subject", subject);
      dataForm.append("member",isCheck); 
      dataForm.append("group_id",myArray[1]); 
      setEditorHtml('');
      setsubject('');
      clearPic();     
      await fetch(MESSAGES_API, {
        method: "POST",
        headers: {
          Accept: "application/json", 
          Authorization: `${authKey}`,
        },body: dataForm,
      })
        .then((resp) => resp.json())
        .then((result) => {
            if (result && result.data) {
              // alert("NewsLetter Send")
              setopenalert(true);
              setalertbody(result.data);
              setTimeout(() => {
                window.location.href = '/AddNewsLetter?'+myArray[1];
              }, 2000);
            }
           
        })
        .catch((err) => console.log(err)); 
    }
  }

  const createMessageChanel=async(id,CableApp)=> {
    CableApp.subscriptions.create(
      {
        channel: 'MessageChannel',
        current_user:  id,
        recipient_id:  myArray[1]
      },
      {
        connected: () => {
          console.log('Chat-connected');
        },
        disconnected: () => {
          console.log('Chat-disconnected');

        },
        received: data => { 
          if(myDivRef.current){
            if (myDivRef.current.id == myArray[1]){
              
              downfunction();
              console.log("Chat-received");
            }
          }
        },
      }
    );
  }
  // console.log(isCheck);
  useEffect(() => {
    GetGroup();
    
  }, [myArray[1]])

  return (
    <div className="mt-8">
       {openalert?(
        <ShowAlert openalert={openalert} setopenalert={setopenalert} body={alertbody}/>
      ):("")}
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
                    onChange={(e) => setsubject(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="">
                  <Transition appear show={isOpen} as={Fragment}>
                    <Dialog
                      as="div"
                      className="relative z-50"
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
                        <div className="fixed inset-0 bg-black bg-opacity-75" />
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
                            <Dialog.Panel className="w-[620px] relative bg-white rounded-xl xl:w-[580px] lg:w-[730px] md:w-[680px] px-5 md:px-0 lg:px-0 py-4 text-left align-middle shadow-xl transition-all h-[700px] overflow-y-scroll">
                              <Dialog.Title>
                                <div className="sticky top-10 flex justify-between items-center mx-4">
                                  <div
                                    className="text-lg font-medium leading-6 text-gray-900 px-8"
                                  >
                                    Select Group Members
                                  </div>
                                  <XIcon
                                    onClick={closeinviteModal}
                                    className="w-5 h-5 cursor-pointer"
                                  />
                                </div>
                              </Dialog.Title>
                              <div className="p-8">
                                <InviteFriendsGroup group={group} isCheck={isCheck} setIsCheck={setIsCheck} />
                              </div>
                              <div className="sticky bottom-0 right-0">
                                <div className="p-2 rounded-xl">
                                  <div className="flex gap-4 justify-end">
                                    <button
                                      onClick={closeinviteModal}
                                      type="submit"
                                      className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                                    >
                                      close
                                    </button>
                                    <button
                                      onClick={inviteModal}
                                      type="submit"
                                      className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                                    >
                                      Select
                                    </button>
                                  </div>
                                </div>
                              </div>
                            </Dialog.Panel>
                          </Transition.Child>
                        </div>
                      </div>
                    </Dialog>
                  </Transition>
                </div>
              </div>
              <div className="">
                {/* <div className="text-lg font-medium">Message:</div>
                <div className="col-span-3">
                  <textarea
                    className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full rounded-xl"
                    placeholder="Write Subject Of the NewsLetter....."
                    type="textarea"
                    name="search"
                    rows={5}
                    cols={10}
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                </div> */}
                {/* <ReactQuill
                  value={editorHtml}
                  onChange={handleChange}
                  modules={modules}
                /> */}
                <DynamicEditor editorHtml={editorHtml} setEditorHtml={setEditorHtml}/>
              </div>
              {/* <div className="flex justify-end grid grid-cols-3 p-1 mt-4">
                <div className="flex gap-2 items-center justify-center">
                  <div className="relative flex gap-2 items-center justify-center">
                    <PhotographIcon
                      className={"h-10 w-10 opacity-40"}
                    />
                    
                    <input
                      type={"file"}
                      name="image"
                      id="image"
                      className="opacity-0 absolute w-6 h-6 -z-0"
                      onChange={handleImagePost}
                      title={""}
                      multiple
                    />
                  </div>
                </div>
                <div className="border items-center bg-white my-4 max-h-[230px] max-w-[280px] object-cover rounded-xl">
                  {postImagePreview && attachment_type=="image"?(
                      <div className="relative w-1/4 mt-2">
                        <img
                        src={postImagePreview}
                        className="ml-6 rounded-xl my-4 max-h-[150px] max-w-[230px] object-cover"
                        alt=""/>
                        <div className="bg-indigo-100 absolute top-4 right-0 z-10 w-8 h-8 cursor-pointer flex justify-center items-center rounded-full"
                        onClick={clearPic} >
                          <TrashIcon className="w-5 h-5 text-indigo-600" />
                        </div>
                      </div>
                    ):(
                      postImagePreview && attachment_type=="video"?(
                        <div className="relative w-1/4 mt-2">
                          <div className="relative w-1/4 mt-2">
                            <video autoPlay="autoplay" controls className="ml-5 rounded-xl my-4 max-h-[150px] max-w-[230px] object-cover">
                              <source src={postImagePreview} type="video/mp4" />
                            </video> 
                          </div>
                          <div className="bg-indigo-100 absolute top-4 right-0 z-10 w-8 h-8 cursor-pointer flex justify-center items-center rounded-full"
                          onClick={clearPic} >
                            <TrashIcon className="w-5 h-5 text-indigo-600" />
                          </div>
                        </div>

                      ):(
                        postImagePreview && attachment_type=="application"?(
                          <div className="relative w-1/4 mt-2">
                            <div>{postImagePreview}</div>
                          
                          <div className="bg-indigo-100 absolute top-4 right-0 z-10 w-8 h-8 cursor-pointer flex justify-center items-center rounded-full"
                          onClick={clearPic} >
                            <TrashIcon className="w-5 h-5 text-indigo-600" />
                          </div>
                        </div>
                        ):('')
                        // application
                      )
                    )}
                </div>
              </div> */}
              <div className='flex justify-end gap-4 mt-12'>
                <div className='col-span-3'>
                  <button
                    className='px-4 py-2 border rounded-full hover:border-indigo-400 hover:bg-transparent hover:text-indigo-400 bg-indigo-400 text-white'
                    onClick={openModal} 
                  >
                    Select Group Members
                    </button>
                </div>
                <div>
                  <button className='px-4 py-2 border rounded-full hover:border-indigo-400 hover:bg-transparent hover:text-indigo-400 bg-indigo-400 text-white' onClick={() => SendMessage()}>Send NewsLetter</button>
                </div>
              </div>
              <div>
                {/* <div className="mt-4 border p-2">
                  <h2>Editor Content:</h2>
                  <div dangerouslySetInnerHTML={{ __html: editorHtml }} />
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupAddNewsLetter;