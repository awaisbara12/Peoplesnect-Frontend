import { useRouter } from "next/router";
import { Provider } from "react-redux";
import MobileNav from "../components/news-feed/navbar/mobile-navbar/MobileNav";
import MobileBottomBar from "../components/news-feed/navbar/MobileBottomBar";
import TopNavbar from "../components/news-feed/navbar/TopNavbar";
import store from "../store/store";
import "../styles/globals.css";

function App({ Component, pageProps }) {

  const router = useRouter();
  const data = router.asPath;
  const screen = data.split("/");
  return (
    <Provider store={store}>
      {/* Mobile And Desktop TopBar/Header */}
      {screen && (screen[1]=="login" || screen[1]=="" || screen[1]=="About-us" || screen[1]=="Admin" || screen[1]=="onboarding")?(""):(
        <>
          <TopNavbar/>
          <MobileNav/>
        </>
      )}
      
      <Component {...pageProps} />
      
      {/* Mobile BottomBar/Footer */}
      {screen && (screen[1]=="login" || screen[1]=="" || screen[1]=="About-us" || screen[1]=="onboarding")?(""):(
        <MobileBottomBar/>
      )}
      
    </Provider>
  );
}

export default App;
