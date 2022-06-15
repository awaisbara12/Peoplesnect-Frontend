import Head from "next/head";
import Signup from "../app/auth/signup/Signup";
import RootLayout from "../app/layout";
import NewsFeed from "./newsFeed";

export default function Home() {
  return (
    <RootLayout>
      <Head>
        <title>Peoples Nect</title>
        <meta name="description" content="Connect peoples proffasoinaly" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <NewsFeed />
    </RootLayout>
  );
}
