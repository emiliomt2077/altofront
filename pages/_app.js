import "../styles/globals.css";
import Layout from "../components/Layout";
import Head from "next/head";
import { DataContext } from "../components/DataContext";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null);
  //const { user } = useContext(DataContext);

  return (
    <DataContext.Provider value={{ user, setUser }}>
      <Layout>
        <Head>
          <title>Alto turmeque</title>
          <meta name="description" content="Tienda de ropa infantil" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
        <Component {...pageProps} />
      </Layout>
    </DataContext.Provider>
  );
}

export default MyApp;
