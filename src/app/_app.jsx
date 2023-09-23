/**
 * @author : Goya Gim
 */

const MyApp = (Component, pageProps) => {
  MyApp.getInitialProps = async (appContext) => {
    const { router } = appContext;
    const locale = router.locale; // 'ko' or 'en'
    const appProps = await App.getInitialProps(appContext);

    global.__localeId__ = locale;

    return { ...appProps };
  };
  return <Component {...pageProps} />;
};
export default WrapperProps.withRedux(MyApp);
