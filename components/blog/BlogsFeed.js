import React from "react";
import Head from "next/head";
import ProfileCard from "../news-feed/profilecard/ProfileCard";
import BlogsDesign from "./BlogsDesign";
import AddNewBlog from "./AddNewBlog";
import BlogsBottomBar from "../news-feed/navbar/BlogsBottomBar";
import BlogsNav from "../news-feed/navbar/mobile-navbar/BlogsNav";
import EventsCard from "../news-feed/eventcard/EventsCard";
import TopNavbar from "../news-feed/navbar/TopNavbar";
import FooterNewsFeed from "../news-feed/newsfeed/newsfeedfooter/FooterNewsFeed";
import SuggestedBlogs from "./SuggestedBlogs";
import Footer from "../footer/Footer";

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
          <div className="sticky top-0 z-50">
            <TopNavbar />
            <BlogsNav />
          </div>
          <div className="flex xl:px-0 lg:px-4 md:px-8 sm:px-0 gap-[65px] lg:gap-6 md:gap-4 justify-between">
            <div className="h-full bg-zinc-100 mx-auto">
              <BlogsDesign />
              <SuggestedBlogs />
            </div>
            <div className="w-72 hidden md:block lg:block">
              <ProfileCard />
              <div className="sticky top-20">
              <EventsCard />
              <Footer />
              <AddNewBlog />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BlogsBottomBar/>
    </div>
  );
};

export default BlogsFeed;
