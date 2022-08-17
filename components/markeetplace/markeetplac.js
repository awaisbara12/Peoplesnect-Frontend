import React, { Fragment } from "react";
import Head from "next/head";
import MarkeetplaceLayout from "./layout";
import HomeProducts from "./products/LatestProducts";
import MobileNavbar from "./navbar/MobileNavbar";
import MarkeetplaceCategories from "./categoriesSlider/Categories";

const MarkeetplaceFeed = () => {
  return (
    <Fragment>
      <Head>
        <title>Markeetplace - Peoples Nect</title>
        <meta name="description" content="Connect peoples proffasoinaly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="bg-gray-100 w-full h-auto pb-44 text-gray-900">
        <MarkeetplaceLayout>
          <MobileNavbar />
          <div className="mt-11 text-lg font-normal hidden">
            <MarkeetplaceCategories />
          </div>
          <div className="mt-11">
            <HomeProducts />
          </div>
        </MarkeetplaceLayout>
      </div>
    </Fragment>
  );
};

export default MarkeetplaceFeed;
