import React from 'react';
import AdminNavbar from '../../news-feed/navbar/AdminNavbar';
import AdminSideBAr from '../../news-feed/Admin-Sidebar/AdminSideBar';
import Head from 'next/head';
import AddSkils from './AddSkils';

const AddSkilsFeed = () => {
  return (
    <div>
      <Head>
        <title>Admin - Peoples Nect</title>
        <meta name="description" content="Connect peoples proffasoinaly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="pb-20 md:pb-10 lg:pb-10">
        <div className="xl:max-w-[1340px] container mx-auto">
          <div className="sticky top-0 z-50">
            <AdminNavbar />
          </div>
          <div className="flex px-2 xl:px-0 lg:px-4 md:px-4 gap-[65px] md:gap-8 lg:gap-6 justify-between mt-12 md:mt-0">
            <div className="h-full bg-zinc-100">
              <AddSkils />
            </div>
            <div className="w-72 hidden md:block lg:block">
              <div className="sticky top-20 z-0">
                <AdminSideBAr />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddSkilsFeed;