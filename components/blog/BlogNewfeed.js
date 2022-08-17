import React from "react";
import Head from "next/head";
import NewsPost from "./NewPost";
import ProfileCard from "../news-feed/profilecard/ProfileCard";
import EventsCard from "../news-feed/eventcard/EventsCard";
import MobileNav from "../news-feed/navbar/mobile-navbar/MobileNav";
import NewsFeedSidebar from "../news-feed/newsfeed/sidebar/NewsFeedSidebar";
import BlogsSearch from "../news-feed/search/BlogsSearch";
import BlogsNav from "../news-feed/navbar/mobile-navbar/BlogsNav";
import AddNewBlog from "./AddNewBlog";
import BlogsBottomBar from "../news-feed/navbar/BlogsBottomBar";

const BlogLayout = () => {
  return (
    <div>
      <Head>
        <title>Blog New - Peoples Nect</title>
        <meta name="description" content="Connect peoples proffasoinaly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pb-10">
        <div className="xl:max-w-[1340px] container mx-auto">
          <>
            <BlogsNav />
          </>
          <div className="flex xl:px-0 lg:px-4 md:px-8 sm:px-0 gap-[65px] lg:gap-6 md:gap-4 justify-between">
            <div className="hidden md:block lg:block">
              <NewsFeedSidebar />
            </div>
            <div className="h-full bg-zinc-100 md:bg-transparent lg:bg-transparent xl:bg-transparent px-4 md:px-0 lg-px-0 xl:px-0">
              <NewsPost />
            </div>
            <div className="w-72 hidden md:block lg:block">
              <BlogsSearch />
              <ProfileCard />
              <AddNewBlog />
            </div>
          </div>
        </div>
      </div>
      <BlogsBottomBar />
    </div>
  );
};

export default BlogLayout;
