import { useState, useEffect, React, Fragment } from "react";
import Link from "next/link";
import Image from "next/image";
import Post from "../../../public/images/product3.png";
import { ChevronRightIcon } from "@heroicons/react/outline";
import { BookmarkIcon } from "@heroicons/react/solid";
import { CalendarIcon } from "@heroicons/react/solid";
import {
  GET_USER_BOOKMARKS, BOOKMARK_NEWSFEED_API_KEY
} from "../../../pages/config";
import axios from "axios";

const TabSavedProfile = (props) => {
  const [bookmarks, setBookmarks] = useState(props.bookmarks);

  if (typeof window !== "undefined") {
    var authKey = window.localStorage.getItem("keyStore");
  }
   // Get NewsFeed for the updation Lists
   const UserBookmarks=async()=>{    //current User
  
    await fetch(GET_USER_BOOKMARKS, {
      method: "GET",
      headers: {
        Accept: "application/json", 
        Authorization: `${authKey}`,
      },
    })
    .then((resp) => resp.json())
    .then((result) => {
      if (result) {
        props.setBookmarks(result.data);
        props.setBookmarks(
          result.data
        );
        setBookmarks(result.data);
      }
    })
    .catch((err) => console.log(err)); 
  }
  
  // console.log("skc",bookmarks);
  // console.log("props",props.bookmarks);

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
        UserBookmarks();
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(()=>{
    UserBookmarks();
  },[])

  return (
    <>
      <div className="bg-white rounded-xl p-5">
        <div className="font-extrabold mb-5">Saved Items</div>
        <div className="p-2 border-b-1">
          <div className="grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2  gap-12">
          {/* {items.event && items.event ? (
            <div className="rounded-xl bg-white border border-gray-100 my-2">
              {items.event.cover_photo_url ? (
                <img
                  src={items.event.cover_photo_url}
                  className="aspect-video object-cover rounded-t-xl h-[390px] w-[952px]"
                  alt=""
                />
              ) : (
                ""
              )}
              <div className="py-3 px-3">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="text-red-400 text-sm">
                      <span>{items.event.start_time}</span>
                      <span>-{items.event.end_time}</span>&nbsp;
                      <span>{items.event.start_date}</span>&nbsp;
                    </div>
                    <div className="font-semibold text-lg">
                      {items.event.name}
                    </div>
                    <div className="flex items-center gap-2">
                      <CalendarIcon
                        width={16}
                        height={16}
                        className="text-gray-900"
                      />
                      <span className="text-gray-900 text-sm">
                        {items.event.event_type=== "in_person"?(
                          'In Person'
                        ):(items.event.event_type)}
                       
                      </span>
                    </div>
                    <div className="text-gray-900"></div>
                  </div>
                  <Link href="/events-design/event-view">
                    <a className="text-sm text-gray-600 cursor-pointer flex items-center border border-gray-100 rounded-full py-1 px-3">
                      View Event
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          ) : (
            ""
          )}
          {items.feed_type && items.feed_type === "video_feed" ? (
            <>
              <video controls className="aspect-video w-full rounded-xl my-4">
                <source src={items.attachments_link} type="video/mp4" />
              </video>
            </>
          ) : (
            ""
          )}
          {items.attachments_link && items.feed_type === "image_feed" ? (
            <div className="mt-[14px]">
              <img
                src={items.attachments_link}
                width={952}
                height={240}
                layout="responsive"
                className="aspect-video object-cover rounded-lg mx-auto h-[390px]"
                alt=""
              />
            </div>
          ) : (
            ""
          )} */}
          {props.bookmarks && props.bookmarks.map((items) =>(
            // <div className="py-5">
            //   <div className="flex flex-col justify-between gap-3">
            //     <div className="">
            //       <Link href="">
            //         <a href="">
            //           <Image
            //             src={Post}
            //             width={725}
            //             height={305}
            //             className="object-cover rounded-xl"
            //             alt=""
            //           />
            //         </a>
            //       </Link>
            //     </div>
            //     <div className="flex justify-between items-center">
            //       <div className="time font-light text-xs">12:11pm</div>
            //         <div className="flex gap-2 font-light text-sm">
            //           <div>Saved</div>
            //           <BookmarkIcon className="w-5 h-5 text-indigo-400" />
            //         </div>
            //     </div>
            //   </div>
            // </div>
            items.news_feed.attachments_link && items.news_feed.feed_type === "image_feed" ? (
              <div className="py-5" key={items.id}>
                <div className="flex flex-col justify-between gap-3">
                  <div className="">
                    <Link href="">
                      <a href="">
                        <img
                          src={items.news_feed.attachments_link}
                          layout="responsive"
                          className="object-cover rounded-xl h-[305px] w-[725px] border-black-100"
                          alt=""
                        />
                      </a>
                    </Link>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="time font-light text-xs">{items.news_feed.body}</div>
                      <div className="flex gap-2 font-light text-sm">
                        <div>Saved</div>
                        <BookmarkIcon 
                          className="w-5 h-5 text-indigo-400"
                          onClick={() => deteleBookmark(items.id)}
                         />
                      </div>
                  </div>
              </div>
            </div>
            ) 
            : (
              items.news_feed.feed_type && items.news_feed.feed_type === "video_feed" ? (
                <div className="py-5 " key={items.id} >
                  <div className="flex flex-col justify-between gap-3">
                    <div className="">
                      <Link href="">
                        <a href="">
                          <>
                            <video controls className="aspect-video rounded-xl h-[305px] w-[725px] border-black-100 border">
                              <source src={items.news_feed.attachments_link} type="video/mp4" />
                            </video>
                          </>
                        </a>
                      </Link>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="time font-light text-xs">{items.news_feed.body}</div>
                        <div className="flex gap-2 font-light text-sm">
                          <div>Saved</div>
                          <BookmarkIcon 
                            className="w-5 h-5 text-indigo-400"
                            onClick={() => deteleBookmark(items.id)}
                          />
                        </div>
                    </div>
                  </div>
                </div>
              ) : (
                items.news_feed.event && items.news_feed.event ? (
                  <div className="py-5" key={items.id}>
                    <div className="rounded-xl bg-white border border-gray-100">
                      {items.news_feed.event.cover_photo_url ? (
                        <img
                          src={items.news_feed.event.cover_photo_url}
                          className="aspect-video object-cover rounded-t-xl h-[210px] w-[725px]"
                          alt=""
                        />
                      ) : (
                        ""
                      )}
                      <div className="py-3 px-3">
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="text-red-400 text-sm">
                              <span>{items.news_feed.event.start_time}</span>
                              <span>-{items.news_feed.event.end_time}</span>&nbsp;
                              <span>{items.news_feed.event.start_date}</span>&nbsp;
                            </div>
                            <div className="font-semibold text-lg">
                              {items.news_feed.event.name}
                            </div>
                            <div className="flex items-center gap-2">
                              <CalendarIcon
                                width={16}
                                height={16}
                                className="text-gray-900"
                              />
                              <span className="text-gray-900 text-sm">
                                {items.news_feed.event.event_type=== "in_person"?(
                                  'In Person'
                                ):(items.news_feed.event.event_type)}
                              
                              </span>
                            </div>
                            <div className="text-gray-900"></div>
                          </div>
                          <Link href="/events-design/event-view">
                            <a className="text-sm text-gray-600 cursor-pointer flex items-center border border-gray-100 rounded-full py-1 px-3">
                              View Event
                            </a>
                          </Link>
                        </div>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-3">
                      <div className="time font-light text-xs">{items.news_feed.body}</div>
                        <div className="flex gap-2 font-light text-sm">
                          <div>Saved</div>
                          <BookmarkIcon 
                            className="w-5 h-5 text-indigo-400"
                            onClick={() => deteleBookmark(items.id)}
                          />
                        </div>
                    </div>
                  </div>
                ) : (
                  ""
                )
              )
            )
            )
          )}
          </div>
          </div>
          <Link href="">
            <a>
              <div className="flex justify-center font-bold items-center mt-10">
                Show All Saved Items
                <ChevronRightIcon className="h-5 w-5" />
              </div>
            </a>
          </Link>
        </div>
    </>
  );
};

export default TabSavedProfile;
