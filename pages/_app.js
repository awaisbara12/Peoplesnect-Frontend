import { useRouter } from "next/router";
import { Provider } from "react-redux";
import TopNavbar from "../components/news-feed/navbar/TopNavbar";
import store from "../store/store";
import "../styles/globals.css";

function App({ Component, pageProps }) {

  const router = useRouter();
  const data = router.asPath;
  const screen = data.split("/");
  return (
    <Provider store={store}>
      {screen && (screen[1]=="login" || screen[1]=="" || screen[1]=="About-us" || screen[1]=="Admin")?(""):(
      <TopNavbar/>
      )}
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
