import "@styles/globals.css";





function App({ Component, pageProps }) {
  
  const Layout = Component.Layout;


  return (
      <Layout>
        <Component {...pageProps} />
      </Layout>
  );
}


export default  App