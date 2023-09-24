import App from "next/app";
import { Provider } from "react-redux";
import store from "@/Redux/configStore";

/**
 * @author : Goya Gim
 */
function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

MyApp.getInitialProps = async (appContext) => {
  const appProps = await App.getInitialProps(appContext);

  return { ...appProps };
};
export default MyApp;
