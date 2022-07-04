import { Provider } from "react-redux";
import store from "../store/store";
import "../styles/globals.css";
import "image-upload-react/dist/index.css";

function App({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

export default App;
