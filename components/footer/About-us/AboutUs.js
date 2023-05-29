import React, { Component, useEffect, useState } from 'react';
import Image from 'next/image';
import NavbarLogo from "../../../public/images/logo-circle.png";
import Link from 'next/link';
const AboutUs = () => {
  return (
    <div className="bg-cover bg-no-repeat bg-bottom  opacity-100 bg-[url('../public/images/about-bg.jpg')] h-[100vh] bg-fixed w-full">
      <div className='bg-white p-3 h-[100vh] bg-opacity-75'>
        <div className='px-12 my-8'>
          {/* <div className='text-center'>
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
          </div> */}
          <div className='text-6xl  mt-12 font-bold'>
            About PeoplesNect
          </div>
          <div className=' mt-3 w-1/l text-xl pl-8'>
            Welcome to <span className='text-indigo-400 font-bold'>PeoplesNect</span>, the world's largest professional network with more than
            930 million members in more than 200 countries and territories worldwide.
          </div>
          <div className='text-6xl  mt-12 font-bold'>
            Vision
          </div>
          <div className=' mt-3 w-1/2 text-xl pl-8'>
            Create economic opportunity for every member of the global workforce.
          </div>
          <div className='text-6xl  mt-12 font-bold'>
            Mission
          </div>
          <div className=' mt-3 w-1/2 text-xl pl-8'>
            The mission of <span className='text-indigo-400 font-bold'>PeoplesNect</span> is simple: connect the world’s professionals to make them more productive and successful.
          </div>
          <div className='text-6xl  mt-12 font-bold'>
            Who are we?
          </div>
          <div className=' mt-3 w-1/2 text-xl pl-8'>
            <span className='text-indigo-400 font-bold'>PeoplesNect</span> began in co-founder <span className='text-indigo-400 font-bold'>BrainArcs</span> living room in 2002 and was officially launched on May 5, 2022.
          </div>
          <div className=' mt-3 w-1/2 text-xl pl-8'>
            oday, <span className='text-indigo-400 font-bold'>PeoplesNect</span> leads a diversified business with revenues from membership subscriptions, advertising sales and recruitment solutions under the leadership of Ryan Roslansky. In December 2016, Microsoft completed its acquisition of <span className='text-indigo-400 font-bold'>PeoplesNect</span>, bringing together the world’s leading professional cloud and the world’s leading professional network.
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;