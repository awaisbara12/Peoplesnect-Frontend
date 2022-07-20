import React from "react";
import Head from "next/head";
import Link from "next/link";
import NewsSearch from "../news-feed/search/NewsSearch";
import ProfileCard from "../news-feed/profilecard/ProfileCard";
import EventsCard from "../news-feed/eventcard/EventsCard";
import MobileNav from "../news-feed/navbar/MobileNav";
import NewsFeedSidebar from "../news-feed/newsfeed/sidebar/NewsFeedSidebar";
import BlogPosts from "./BlogPosts";
import BlogsDesign from "./BlogsDesign";
import AddNewBlog from "./AddNewBlog";
import BlogsBottomBar from "../news-feed/navbar/BlogsBottomBar";

const BlogsFeed = () => {
  return (
    <div>
      <Head>
        <title>Blogs - Peoples Nect</title>
        <meta name="description" content="Connect peoples proffasoinaly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pb-20 md:pb-10 lg:pb-10">
        <div className="xl:max-w-[1340px] container mx-auto">
          <div className="">
            <MobileNav />
          </div>
          <div className="flex xl:px-0 lg:px-4 md:px-8 sm:px-0 gap-[65px] lg:gap-6 md:gap-4 justify-between">
            <div className="hidden md:block lg:block">
              <NewsFeedSidebar />
            </div>
            <div className="h-full bg-zinc-100 mx-auto">
              <BlogsDesign />
            </div>
            <div className="w-72 hidden md:block lg:block">
              <NewsSearch />
              <ProfileCard />
              <EventsCard />
              <AddNewBlog />
            </div>
          </div>
        </div>
      </div>
      <BlogsBottomBar/>
    </div>
  );
};

export default BlogsFeed;
