import Head from "next/head";
import { Provider } from "react-redux";
import { store } from "../store/store";
import Signup from "../components/auth/signup/Signup";
import RootLayout from "../components/layout";

export default function Home() {
  return (
    <Provider store={store}>
      <RootLayout>
        <Head>
          <title>Peoples Nect</title>
          <meta name="description" content="Connect peoples proffasoinaly" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Signup />
      </RootLayout>
    </Provider>
  );
}
