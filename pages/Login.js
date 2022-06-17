import React, { Fragment } from "react";
import Head from "next/head";
import Login from "../components/auth/login/Login";

const login = () => {
  return (
    <Fragment>
      <Head>
        <title>Login - Peoples Nect</title>
        <meta name="description" content="Connect peoples proffasoinaly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Login />
    </Fragment>
  );
};

export default login;
