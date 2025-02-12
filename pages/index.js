import React from "react";
import Head from "next/head";
import Signup from "../components/auth/signup/Signup";
import RootLayout from "../components/layout";

export default function Home() {
  return (
    <RootLayout>
      <Head>
        <title>Peoples Nect</title>
        <meta name="description" content="Connect peoples proffasoinaly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Signup />
    </RootLayout>
  );
}
