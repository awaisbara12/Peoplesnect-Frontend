import Head from "next/head";
import Signup from "../app/auth/signup/Signup";
import ProfileCard from "../app/news-dashboard/profilecard/page";
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
<<<<<<< HEAD
      <NewsFeed />
=======
      <ProfileCard />
>>>>>>> c727d6515b4e7d905638c415420731d1c8bb0003
    </RootLayout>
  );
}
