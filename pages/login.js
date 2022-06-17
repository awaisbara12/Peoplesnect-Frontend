import React, { Fragment } from "react";
import Head from "next/head";
import SignIn from "../components/auth/signin/SignIn";

const login = () => {
  return (
    <Fragment>
      <Head>
        <title>Login  - Peoples Nect</title>
        <meta name="description" content="Connect peoples proffasoinaly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <SignIn />
    </Fragment>
  );
};

export default login;
