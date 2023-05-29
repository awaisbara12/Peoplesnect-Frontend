import React from "react";
import Head from "next/head";
import MobileNav from "../../news-feed/navbar/mobile-navbar/MobileNav";
import TopNavbar from "../../news-feed/navbar/TopNavbar";
import EventsCard from "../../news-feed/eventcard/EventsCard";
import Footer from "../Footer";
import MobileBottomBar from "../../news-feed/navbar/MobileBottomBar";
import AboutUs from "./AboutUs";
import Link from "next/link";
import NavbarLogo from "../../../public/images/logo.png";
import Image from "next/image";
const AboutUsFeed = () => {
  return (
    <div>
      <Head>
        <title>About Us - Peoples Nect</title>
        <meta name="description" content="Connect peoples proffasoinaly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="">
        <div className="xl:max-w-full container mx-auto">
          <div className="sticky top-0 z-50">
          <div className="navbar-brand p-3 bg-white shadow-xl rounded-b-xl">
              <Link href="/news-feed">
                <a>
                  <Image
                    src={NavbarLogo}
                    className="w-full"
                    placeholder="blur"
                    alt=""
                  />
                </a>
              </Link>
            </div>
          </div>
            <div className="">
              <AboutUs />
            </div>
        </div>
        <Footer />
      </div>
      <MobileBottomBar />
    </div>
  );
};
export default AboutUsFeed;