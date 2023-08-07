import { Select, Option, Input } from "@material-tailwind/react";
import React, { useEffect, useState, Fragment } from 'react';
import { TagsInput } from "react-tag-input-component";
import { useRouter } from "next/router";
import { Menu, Transition } from "@headlessui/react";
import { CONTACT_US_API } from "../../../../pages/config";
import { Dialog } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";

const AddNewsLetter = () => {
  const [subject, setsubject] = useState();
  const [email, setemail] = useState([]);
  const [email_type, setemail_type] = useState('all_user');
  const [body, setbody] = useState();
  let [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const data = router.asPath;
  const myArray = data.split("?");

  // Bareer Key
  if (typeof window !== "undefined") { var authKey = window.localStorage.getItem("keyStore"); }
  const changeHandler = (e) => {
    setemail_type(e)
  };

  // console.log(email);
  const Add_NewsLetter = async (commit) => {
    const dataForm = new FormData();
    // commit
    dataForm.append("news_letter_email[subject]", subject);
    dataForm.append("news_letter_email[email_type]", email_type);
    dataForm.append("news_letter_email[custom_emails]", email);
    dataForm.append("news_letter_email[body]", body);
    dataForm.append("commit", commit);

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
    fetch(CONTACT_US_API + "/" + myArray[1], {
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
          let a = result.data.custom_emails;
          if (a) {
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

    if (myArray && myArray[1]) {
      getEditablenewsletter();
    }

  }

  const Update_NewsLetter = async (commit) => {
    const dataForm = new FormData();
    // commit
    dataForm.append("news_letter_email[subject]", subject);
    dataForm.append("news_letter_email[email_type]", email_type);
    dataForm.append("news_letter_email[custom_emails]", email);
    dataForm.append("news_letter_email[body]", body);
    dataForm.append("commit", commit);

    await fetch(CONTACT_US_API + "/" + myArray[1], {
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

  function closeModal() {
    setIsOpen(false);
  }

  function inviteModal() {
    if (isCheck.length > 0) {
      SendInviteRequest();
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
  useEffect(() => {
    getCategory();
  }, [myArray[1]])

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
                    onChange={(e) => setsubject(e.target.value)}
                  />
                </div>
              </div>
              <div className="mt-4">
                <div className="grid grid-cols-5 items-center">
                  <div className="text-lg font-medium">Select Friends:</div>
                  <div className='col-span-3'>
                    <input
                      className="placeholder:text-md  hover:shadow-lg  bg-gray-100 placeholder:rounded-full  border-none w-full xs:w-auto placeholder:pl-2 rounded-full placeholder:py-2"
                      placeholder="Select Group Members"
                      onClick={openModal}
                      type="text"
                      name="search"
                    />
                  </div>
                </div>
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
                                    Invite Friends
                                  </div>
                                  <XIcon
                                    onClick={closeinviteModal}
                                    className="w-5 h-5 cursor-pointer"
                                  />
                                </div>
                              </Dialog.Title>
                              <div className="p-8">
                                {/* <InviteFriendsGroup group={group} isCheck={isCheck} setIsCheck={setIsCheck} /> */}
                                <Input placeholder="Type Name" />
                              </div>
                              <div className="sticky bottom-0 right-0">
                                <div className="p-2 rounded-xl">
                                  <div className="flex gap-4 justify-end">
                                    <button
                                      onClick={closeinviteModal}
                                      type="submit"
                                      className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                                    >
                                      Close
                                    </button>
                                    <button
                                      onClick={inviteModal}
                                      type="submit"
                                      className="text-white px-4 py-2 rounded-xl mt-6 bg-indigo-400"
                                    >
                                      Invite
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
                    onChange={(e) => setbody(e.target.value)}
                  />
                </div>
              </div>
              <div className='flex justify-end gap-4 mt-12'>
                {myArray && myArray[1] ? (
                  <div>
                    <button className='px-4 py-2 border rounded-full border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white' onClick={() => Update_NewsLetter("Send Newsletter")}>Send NewsLetter</button>
                    <button className='px-4 py-2 border rounded-full hover:border-indigo-400 hover:bg-transparent hover:text-indigo-400 bg-indigo-400 text-white' onClick={() => Update_NewsLetter("Save as Draft")}>Save As Draft</button>
                  </div>
                ) : (
                  <div>
                    <button className='px-4 py-2 border rounded-full border-indigo-400 text-indigo-400 hover:bg-indigo-400 hover:text-white' onClick={() => Add_NewsLetter("Send Newsletter")}>Send NewsLetter</button>
                    <button className='px-4 py-2 border rounded-full hover:border-indigo-400 hover:bg-transparent hover:text-indigo-400 bg-indigo-400 text-white' onClick={() => Add_NewsLetter("Save as Draft")}>Save As Draft</button>
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