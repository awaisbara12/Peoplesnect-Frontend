import React from "react";
import Head from "next/head";
import ProfileCard from "../news-feed/profilecard/ProfileCard";
import MobileNav from "../news-feed/navbar/mobile-navbar/MobileNav";
import NewsFeedSidebar from "../news-feed/newsfeed/sidebar/NewsFeedSidebar";
import BlogShow from "./BlogShow";
import AddNewBlog from "./AddNewBlog";
import BlogsBottomBar from "../news-feed/navbar/BlogsBottomBar";
import BlogsSearch from "../news-feed/search/BlogsSearch";
import BlogsNav from "../news-feed/navbar/mobile-navbar/BlogsNav";
import TopNavbar from "../news-feed/navbar/TopNavbar";
import EventsCard from "../news-feed/eventcard/EventsCard";
import FooterNewsFeed from "../news-feed/newsfeed/newsfeedfooter/FooterNewsFeed";
import SugestedUser from "../news-feed/sugesteduser/SugestedUser";
import ShowAllBlogs from "./ShowAllBlogs";
import Footer from "../footer/Footer";

const BlogShowFeed = () => {
  return (
    <div>
      <Head>
        <title>Blogs Show - Peoples Nect</title>
        <meta name="description" content="Connect peoples proffasoinaly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pb-20 md:pb-10 lg:pb-10">
        <div className="xl:max-w-[1340px] container mx-auto">
          <div className="sticky top-0 z-50">
            <TopNavbar />
            <BlogsNav />
          </div>
          <div className="flex xl:px-0 lg:px-4 md:px-8 sm:px-0 gap-[65px] lg:gap-6 md:gap-4 justify-between mt-12 md:mt-0">
            <div className="">
              <ShowAllBlogs />
            </div>
            <div className="w-72 hidden md:block lg:block">
              <ProfileCard />
              <div className="sticky top-20">
                <EventsCard />
                <SugestedUser />
                <Footer />
              </div>
            </div>
          </div>
        </div>
      </div>
      <BlogsBottomBar />
    </div>
  );
};

export default BlogShowFeed;
