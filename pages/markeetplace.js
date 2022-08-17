import React, { Fragment } from "react";
import Head from "next/head";
import MarkeetplaceLayout from "../components/markeetplace/layout";
import MarkeetplaceCategories from "../components/markeetplace/categoriesSlider/Categories";
import HomeProducts from "../components/markeetplace/products/LatestProducts";
import MobileNavbar from "../components/markeetplace/navbar/MobileNavbar";

const Markeetplace = () => {
  return (
    <Fragment>
      <Head>
        <title>Marketplace - Peoples Nect</title>
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

export default Markeetplace;
