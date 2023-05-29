import React from "react";
import Link from "next/link";
import Image from "next/image";
import Post from "../../../public/images/product3.png";
import { ChevronRightIcon } from "@heroicons/react/outline";
const TabRecentProfile = (props) => {
  return (
    <>
      <div className="bg-white rounded-xl p-5">
        <div className="font-extrabold mb-5">Recent Activity</div>
        <div className="p-2">
        {props.recentactivity && props.recentactivity.map((i) =>(
          <div className="border-b-1 py-5" key={i.id}>
              <div className="flex justify-between gap-3">
                <div className="flex flex-col gap-2">
                  { i.reaction &&  i.reaction.reactionable_id && i.recent_activeable_type=="Reaction" &&  i.reaction.reactionable_type && i.reaction.reactionable_type=="NewsFeed"?(
                    <Link href={{pathname: "/events-design/event-view", query: i.reaction.reactionable_id}}>
                      <a >
                        <div className="">You add Reaction </div>
                      </a>
                    </Link>
                  ):(
                    i.reaction && i.reaction.comment && i.reaction.comment.news_feed &&i.recent_activeable_type=="Reaction" &&  i.reaction.reactionable_type && i.reaction.reactionable_type=="Comment"?(
                        <Link href={{pathname: "/events-design/event-view", query: i.reaction.comment.news_feed.id}}>
                          <a >
                            <div className="">You add Reaction </div>
                          </a>
                        </Link>
                      ):(
                        i.reaction && i.reaction.replycomment && i.reaction.replycomment.comment && i.reaction.replycomment.comment.news_feed &&i.recent_activeable_type=="Reaction" &&  i.reaction.reactionable_type && i.reaction.reactionable_type=="ReplyComment"?(
                          <Link href={{pathname: "/events-design/event-view", query: i.reaction.replycomment.comment.news_feed.id}}>
                            <a >
                              <div className="">You add Reaction </div>
                            </a>
                          </Link>
                        ):(
                          i.reply_comment && i.reply_comment.comment && i.reply_comment.comment.news_feed && i.recent_activeable_type=="ReplyComment"?(
                            <Link href={{pathname: "/events-design/event-view", query: i.reply_comment.comment.news_feed.id}}>
                              <a >
                              <div className="">You Reply Comment</div>
                              </a>
                            </Link>
                          ):(
                            i.comment && i.comment.news_feed &&  i.recent_activeable_type=="Comment"?(
                              <Link href={{pathname: "/events-design/event-view", query: i.comment.news_feed.id}}>
                                <a >
                                <div className="">You add Comment</div>
                                </a>
                              </Link>
                            ):(
                              i.news_feed && i.recent_activeable_type=="NewsFeed"?(
                                <Link href={{pathname: "/events-design/event-view", query: i.news_feed.id}}>
                                  <a >
                                  <div className="">You share a Post</div>
                                  </a>
                                </Link>
                              ):("")
                            )
                          )
                        )
                      )
                  )}
                  
                  

                  
                  
                  
                </div>
                {/* {i.comment && i.comment.news_feed} */}
                {/* <div className="time font-light text-xs">{i.created_at}</div> */}
              </div>
          </div>
         ))}
          {/* <Link href="">
            <a>
              <div className="flex justify-center font-bold items-center mt-10">
                Show All Activity
                <ChevronRightIcon className="h-5 w-5" />
              </div>
            </a>
          </Link> */}
        </div>
      </div>
    </>
  );
};

export default TabRecentProfile;
