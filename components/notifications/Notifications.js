import React,{useEffect,useState}from "react";
import Link from "next/link";
import Image from "next/image";
import ProfileAvatar from "../../public/images/profile-avatar.png";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/solid";
import { CURENT_USER_LOGIN_API, GET_NOTIFICATIONS, InviteFriends, PAGE_REQUEST_API } from "../../pages/config.js";
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
import InfiniteScroll from 'react-infinite-scroll-component';
import { ClipLoader } from "react-spinners";

const Notifications = () => {
  const [notify, setnotify] = useState([]);
  const [currentUser, setCurrentUser] = useState();
  const [reqbyadmin, setreqbyadmin] = useState(false);
  const [loading, setLoading] = useState(true);
  const [lastpage, setlastpage] = useState(0);
  const [currentpage, setcurrentpage] = useState(1);
  // const [notify, setpro] = useState();

  //  GET_NOTIFICATIONS
  // Bareer Key
  if (typeof window !== "undefined") { var authKey = window.localStorage.getItem("keyStore");  }
  
  const allNotifications=async()=>{    
    await fetch(GET_NOTIFICATIONS+"?page=" + currentpage, {
      method: "GET",
       headers: {
        Accept: "application/json", 
         Authorization: `${authKey}`,
       },
    })
       .then((resp) => resp.json())
      .then((result) => {
        if (result) {
          const mergedata = [...notify, ...result.data];
          console.log("notification",result.data)
          setnotify(mergedata);
          setcurrentpage(result.pages.next_page)
          setlastpage(result.pages.total_pages)
          // setnotify(result.data);  
          // console.log(result.data);
        }
      })
      .catch((err) => console.log(err)); 
  }

  function joingroups(id, status) {
    const dataForm = new FormData();
    dataForm.append("invite_friends[status]", status);
    // dataForm.append("news_feeds[feed_type]", feedType);
    fetch(InviteFriends+"/"+id, {
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
          allNotifications();
        }
      })
      .catch((err) => console.log(err));
  }
  const ActionButton =(status,Id)=>{
    fetch(PAGE_REQUEST_API +"/"+Id+"?member_requests[status]="+status , {
    method: "PUT",
    headers: {
      Accept: "application/json",
      Authorization: `${authKey}`,
    },
    })
    .then((resp) => resp.json())
    .then((result) => {
      allNotifications();
      alert("Request has been "+status);
    })
  }
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

  const fetchMoreData = () => {
    allNotifications();
  }

  useEffect(()=>{
    Current_User();
    allNotifications();
  },[])

  return (
    <div>
      <div className="mt-8">
      <div className="w-[620px] xl:w-[980px] lg:w-[730px] md:w-[780px] px-5 md:px-0 lg:px-0">
          <div className="bg-white rounded-xl">
            <div className="flex justify-between items-center border-b-1 p-4">
              <div className="heading">Notifications</div>
              {/* <div className="searech-bar">
                <Menu as="div" className="relative inline-block text-left">
                  <div>
                    <Menu.Button className="inline-flex justify-center w-full rounded text-indigo-400 border-indigo-400 border px-3 py-2">
                      Filter
                      <ChevronDownIcon
                        className="-mr-1 ml-2 h-5 w-5"
                        aria-hidden="true"
                      />
                    </Menu.Button>
                  </div>

                  <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                  >
                    <Menu.Items className="origin-top-right absolute right-0 bg-white border w-40 mt-1">
                      <div className="">
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? " bg-indigo-400 text-white "
                                  : "bg-white",
                                "block p-2 text-xs"
                              )}
                            >
                              Unread
                            </a>
                          )}
                        </Menu.Item>

                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? " bg-indigo-400 text-white "
                                  : "",
                                "block p-2 text-xs"
                              )}
                            >
                              Likes
                            </a>
                          )}
                        </Menu.Item>
                        <Menu.Item>
                          {({ active }) => (
                            <a
                              href="#"
                              className={classNames(
                                active
                                  ? "bg-indigo-400 text-white"
                                  : "",
                                "block p-2 text-xs"
                              )}
                            >
                              Comments
                            </a>
                          )}
                        </Menu.Item>
                      </div>
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div> */}
            </div>
            <InfiniteScroll
              dataLength={notify.length}
              next={fetchMoreData}
              hasMore={currentpage != null}
              loader={<div className="flex justify-center"><ClipLoader className="my-8" color="#818CF8" size={40} /> </div>}
            >
            {notify && notify?(
               notify.map((i)=>(
                <div className="like-on-article border-b-1" key={i.id}>
                <div className="request-profile flex  px-4 py-3 justify-between items-center">
                  <div className="flex items-center gap-3">
                  <Link href={{
                          pathname:"/Friends-Profile",
                          query: i.invite_friend ? (i.invite_friend.sender.id):(i.sender?(i.sender.id):(i.tag && i.tag.newsfeed?(i.tag.newsfeed.user.id):(i.tag && i.tag.replycomment?(i.tag.replycomment.user.id):(i.tag && i.tag.comment?(i.tag.comment.user.id):(i.group_member? (i.group_member.group_member.id):(i.member_request && currentUser && i.member_request.status == "pending"? (i.member_request.sender_details.id == currentUser.id ?(i.member_request.group_details.owner.id):(i.member_request.sender_details.id)):i.member_request && currentUser && i.member_request.status == "accepted"? (i.member_request.group_details.owner.id == currentUser.id?(i.member_request.sender_details.id):(i.member_request.group_details.owner.id)):i.applied_job ?(i.applied_job.user.id):('')))))))
                        }}>
                      <a>
                        {i.sender && i.sender.display_photo_url?(
                          <img
                            src={i.sender.display_photo_url}
                            className="object-cover rounded-full z-40 h-[35px] w-[35px]"
                            alt=""
                          />
                          ):(
                            i.invite_friend && i.invite_friend.sender?(
                              <img
                              src={i.invite_friend.sender.display_photo_url}
                              className="object-cover rounded-full z-40 h-[35px] w-[35px]"
                              alt=""
                            />
                            ):(
                              i.tag && i.tag.newsfeed && i.tag.newsfeed.user?(
                                <img
                                src={ i.tag.newsfeed.user.display_photo_url}
                                className="object-cover rounded-full z-40 h-[35px] w-[35px]"
                                alt=""
                              />
                              ):(
                                i.tag && i.tag.comment && i.tag.comment.user?(
                                <img
                                src={ i.tag.comment.user.display_photo_url}
                                className="object-cover rounded-full z-40 h-[35px] w-[35px]"
                                alt=""
                              />
                              ):(
                                i.tag && i.tag.replycomment && i.tag.replycomment.user?(
                                <img
                                src={ i.tag.replycomment.user.display_photo_url}
                                className="object-cover rounded-full z-40 h-[35px] w-[35px]"
                                alt=""
                              />
                              ):(
                                i.group_member && i.group_member.group_details && i.group_member.group_member.display_photo_url ?(
                                  <img
                                  src={ i.group_member.group_member.display_photo_url}
                                  className="object-cover rounded-full z-40 h-[35px] w-[35px]"
                                  alt=""
                                />
                              ):(
                                i.member_request && currentUser && i.member_request.sender_details.id == currentUser.id && i.member_request.group_details.owner.display_photo_url ?(
                                  <img
                                  src={ i.member_request.group_details.owner.display_photo_url}
                                  className="object-cover rounded-full z-40 h-[35px] w-[35px]"
                                  alt=""
                                />
                              ):(
                                i.member_request && currentUser && i.member_request.group_details.owner.id == currentUser.id && i.member_request.sender_details.display_photo_url ?(
                                  <img
                                  src={ i.member_request.sender_details.display_photo_url}
                                  className="object-cover rounded-full z-40 h-[35px] w-[35px]"
                                  alt=""
                                />
                              ):(
                                i.applied_job && i.applied_job.user.display_photo_url ?(
                                  <img
                                  src={ i.applied_job.user.display_photo_url}
                                  className="object-cover rounded-full z-40 h-[35px] w-[35px]"
                                  alt=""
                                />
                              )
                              :(
                                <Image
                                src={ProfileAvatar}
                                width={35}
                                height={35}
                                alt=""
                              />
                              )))))))
                             
                            )
                           
                          )
                        }
                        
                        {/* <Image
                          src={ProfileAvatar}
                          width={35}
                          height={35}
                          alt=""
                        /> */}
                      </a>
                    </Link>
                    <div className="">
                    <Link href={{
                          pathname: "/Friends-Profile",
                          query: i.invite_friend ? (i.invite_friend.sender.id):(i.sender?(i.sender.id):(i.tag && i.tag.user?(i.tag.user.id):(i.group_member? (i.group_member.group_member.id):(i.member_request && currentUser && i.member_request.status == "pending"? (i.member_request.sender_details.id == currentUser.id ?(i.member_request.group_details.owner.id):(i.member_request.sender_details.id)):i.member_request && currentUser && i.member_request.status == "accepted"? (i.member_request.group_details.owner.id == currentUser.id?(i.member_request.sender_details.id):(i.member_request.group_details.owner.id)):i.applied_job ?(i.applied_job.user.id):('')))))
                        }}>
                        <a>
                        <div className="username text-sm font-bold">
                          {i.sender?(
                            i.sender.first_name+' '+i.sender.last_name
                          ):(
                            i.follower?(
                              i.sender.first_name+' '+i.sender.last_name
                            ):
                            (i.invite_friend && i.invite_friend.sender?(
                              i.invite_friend.sender.first_name+' '+i.invite_friend.sender.last_name
                            ):(i.tag && i.tag.newsfeed?(i.tag.newsfeed.user.first_name+' '+i.tag.newsfeed.user.last_name):
                            (i.tag && i.tag.comment?(i.tag.comment.user.first_name+' '+i.tag.comment.user.last_name):
                            (i.tag && i.tag.replycomment?(i.tag.replycomment.user.first_name+' '+i.tag.replycomment.user.last_name):
                            ( i.group_member && i.group_member.group_details.title ?(i.group_member.group_member.first_name+' '+i.group_member.group_member.last_name):
                            ( i.member_request  && currentUser && i.member_request.group_details.owner.id == currentUser.id ?(i.member_request.sender_details.first_name+' '+i.member_request.sender_details.last_name):
                            ( i.member_request  && currentUser && i.member_request.sender_details.id == currentUser.id  ?(i.member_request.group_details.owner.first_name+' '+i.member_request.group_details.owner.last_name):
                            ( i.applied_job && i.applied_job.user  ?(i.applied_job.user.first_name+' '+i.applied_job.user.last_name):('')))))))))
                          )}
                          
                        </div>
                      </a>
                      </Link>
                        <div className="userfield text-xs">
                          {/* <a href="" className="font-bold text-indigo-400">
                            User Name
                          </a>{" "} */}
                          
                          {/* Likes your{" "} */}
                          {/* <a className="font-bold text-indigo-400" href="">
                            Article
                          </a> */}
                          {i.invite_friend && i.invite_friend.group && i.invite_friend.status == "pending"?(
                            <div className="flex justify-end gap-4">
                            <div className="py-2 font-bold">
                            <Link href={{pathname: "group-page/suggest-group", query: i.invite_friend.group.id,}}>
                              <a>
                              {i.body}
                              </a>
                              </Link>
                            </div>
                            <button className="border-indigo-400 border text-indigo-400 px-3 py-2 rounded-full font-medium"
                            onClick={ () =>joingroups(i.invite_friend.id, "accepted")}>
                              Accept
                            </button>
                            <button className="border-indigo-400 border text-indigo-400 px-3 py-2 rounded-full font-medium"
                            onClick={ () =>joingroups(i.invite_friend.id, "cancelled")}>
                              Ignore
                            </button>
                          </div>
                          ):(i.invite_friend && i.invite_friend.group && i.invite_friend.group.group_type == "private_group" && i.invite_friend.status == "accepted"?(
                            <div className="flex justify-end gap-4">
                              <Link href={{pathname: "group-page/suggest-group", query: i.invite_friend.group.id,}}>
                                <a>
                                  <div className="py-2">
                                    {i.body}
                                  </div>
                                  <div className="border-indigo-400 border text-indigo-400 px-3 py-2 rounded-full font-medium">
                                    Your Request is send to {i.invite_friend.group.title}
                                  </div>
                                </a>
                              </Link>
                            </div>
                          ):(i.invite_friend && i.invite_friend.group && i.invite_friend.group.group_type == "public_group" && i.invite_friend.status == "accepted"?(
                            <div className="flex justify-end gap-4">
                              <Link href={{pathname: "group-page/joind-group", query: i.invite_friend.group.id,}}>
                              <a>
                            <div className="py-2 font-bold">
                              {i.body }
                            </div>
                            <div className="border-indigo-400 border text-indigo-400 px-3 py-2 rounded-full font-medium">
                             You joined group {i.invite_friend.group.title}
                            </div>
                            </a>
                              </Link>
                          </div>
                          ):(i.invite_friend && i.invite_friend.group && i.invite_friend.status == "cancelled"?(
                            <div className="flex justify-end gap-4">
                            
                            <Link href={{pathname: "group-page/suggest-group", query: i.invite_friend.group.id,}}>
                              <a>
                              <div className="py-2 font-bold">
                              {i.body }
                            </div>
                            <div className="border-indigo-400 border text-indigo-400 px-3 py-2 rounded-full font-medium">
                             You cancelled joined request for group {i.invite_friend.group.title}
                            </div>
                            </a>
                              </Link>
                          </div>):(
                            i.invite_friend && i.invite_friend.page && i.invite_friend.status == "pending"?(
                              <div className="flex justify-end gap-4">
                              <div className="py-2 font-bold">
                              <Link href={{pathname: "page-design/suggested-pages", query: i.invite_friend.page.id,}}>
                                <a>
                                {i.body}
                                </a>
                                </Link>
                              </div>
                              <button className="border-indigo-400 border text-indigo-400 px-3 py-2 rounded-full font-medium"
                              onClick={ () =>joingroups(i.invite_friend.id, "accepted")}>
                                Accept
                              </button>
                              <button className="border-indigo-400 border text-indigo-400 px-3 py-2 rounded-full font-medium"
                              onClick={ () =>joingroups(i.invite_friend.id, "cancelled")}>
                                Ignore
                              </button>
                            </div>
                            
                            ):(i.invite_friend && i.invite_friend.page && i.invite_friend.status == "accepted"?(
                              <div className="flex justify-end gap-4">
                                <Link href={{pathname: "page-design/liked-pages", query: i.invite_friend.page.id,}}>
                                <a>
                              <div className="py-2 font-bold">
                                {i.body }
                              </div>
                              <div className="border-indigo-400 border text-indigo-400 px-3 py-2 rounded-full font-medium">
                                You Liked page {i.invite_friend.page.name}
                              </div>
                              </a>
                                </Link>
                            </div>
                            ):(i.invite_friend && i.invite_friend.page && i.invite_friend.status == "cancelled"?(
                              <div className="flex justify-end gap-4">
                              <Link href={{pathname: "page-design/suggested-pages", query: i.invite_friend.page.id,}}>
                                <a>
                                  <div className="py-2 font-bold">
                                    {i.body }
                                  </div>
                                  <div className="border-indigo-400 border text-indigo-400 px-3 py-2 rounded-full font-medium">
                                    You cancelled Liked request for page {i.invite_friend.page.title}
                                  </div>
                                </a>
                              </Link>
                            </div>) :( i.tag && i.tag.newsfeed?(
                              <div className="flex justify-end gap-4">
                                <Link href={{pathname: "/events-design/event-view", query:  i.tag.newsfeed.id,}}>
                                  <a>
                                    <div className="py-2 font-bold">
                                      {i.body }
                                    </div>
                                  </a>
                                </Link>
                             </div>):( i.tag && i.tag.comment && i.tag.comment.news_feed?(
                              <div className="flex justify-end gap-4">
                                <Link href={{pathname: "/events-design/event-view", query:  i.tag.comment.news_feed.id,}}>
                                  <a>
                                    <div className="py-2 font-bold">
                                      {i.body }
                                    </div>
                                  </a>
                                </Link>
                             </div>):( i.tag && i.tag.comment && i.tag.comment.blog?(
                              <div className="flex justify-end gap-4">
                                <Link href={{pathname: "/blog/show", query:  i.tag.comment.blog.id,}}>
                                  <a>
                                    <div className="py-2 font-bold">
                                      {i.body }
                                    </div>
                                  </a>
                                </Link>
                             </div>)
                             :( i.tag && i.tag.replycomment && i.tag.replycomment.comment.news_feed?(
                              <div className="flex justify-end gap-4">
                                <Link href={{pathname: "/events-design/event-view", query:  i.tag.replycomment.comment.news_feed.id,}}>
                                  <a>
                                    <div className="py-2 font-bold">
                                      {i.body }
                                    </div>
                                  </a>
                                </Link>
                             </div>):( i.tag && i.tag.replycomment && i.tag.replycomment.comment.blog?(
                              <div className="flex justify-end gap-4">
                                <Link href={{pathname: "/blog/show", query:  i.tag.replycomment.comment.blog.id,}}>
                                  <a>
                                    <div className="py-2 font-bold">
                                      {i.body }
                                    </div>
                                  </a>
                                </Link>
                             </div>):
                             (i.group_member ?(
                              <div className="flex justify-end gap-4">
                              <Link href={{pathname: "/group-page/joind-group", query:  i.group_member.group_details.id,}}>
                                <a>
                                  <div className="py-2 font-bold">
                                    {i.body }
                                  </div>
                                </a>
                              </Link>
                              </div>
                             ):(
                              i.member_request && i.member_request.group_details && i.member_request.status == "pending"?(
                                <div className="flex justify-end gap-4">
                                  <div className="py-2 font-bold">
                                  <Link href={{pathname: "/group-page/joind-group", query:  i.member_request.group_details.id}}>
                                    <a>
                                      {i.body}
                                    </a>
                                  </Link>
                                  </div>
                                  <button className="border-indigo-400 border text-indigo-400 px-3 py-2 rounded-full font-medium"
                                    onClick={ () =>ActionButton("accepted" ,i.member_request.id )}>
                                      Accept
                                  </button>
                                  <button className="border-indigo-400 border text-indigo-400 px-3 py-2 rounded-full font-medium"
                                    onClick={ () =>ActionButton("cancelled" ,i.member_request.id )}>
                                      Ignore
                                  </button>
                              </div>
                              ):( i.member_request && i.member_request.group_details && i.member_request.status != "pending" ?(
                                <div className="flex justify-end gap-4">
                                  <div className="py-2 font-bold">
                                  <Link href={{pathname: "/group-page/joind-group", query: i.member_request.group_details.id}}>
                                    <a>
                                      {i.body}
                                    </a>
                                  </Link>
                                  </div>
                              </div>):( i.applied_job ?(
                                <div className="flex justify-end gap-4">
                                  <div className="py-2 font-bold">
                                  <Link href={{pathname: "/jobs/posted-jobs/job-applicants", query:  i.applied_job.jobs.id}}>
                                    <a>
                                      {i.body}
                                    </a>
                                  </Link>
                                  </div>
                              </div>):(i.body))))))))
                            ))))))))}
                        </div>
                      
                    </div>
                  </div>
                  <div className="time font-light text-xs">{i.date} {i.time}</div>
                </div>
                </div>
                
               ))
               
            ):('')

            }
            </InfiniteScroll>
            
            {/* <div className="Comment-on-post border-b-1">
              <div className="request-profile flex  px-4 py-3 justify-between items-center">
                <div className="flex items-center gap-3">
                  <Link href="/news-feed">
                    <a>
                      <Image
                        src={ProfileAvatar}
                        width={35}
                        height={35}
                        alt=""
                      />
                    </a>
                  </Link>
                  <div className="">
                    <a href="">
                      <div className="username text-sm font-bold">
                        User Name
                      </div>
                    </a>
                    <a href="">
                      <div className="userfield text-xs">
                        <a href="" className="font-bold text-indigo-400">
                          User Name
                        </a>{" "}
                        Commented on ur{" "}
                        <a className="font-bold " href="">
                          Post
                        </a>
                      </div>
                    </a>
                  </div>
                </div>
                <div className="time font-light text-xs">12:11pm</div>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
