// on going fixing ◬
import Head from "next/head";
import React from "react";

const Layout = ({ children, title }) => {
  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <link rel="icon" type="image/x-icon" href="/favicon.ico"></link>
      </Head>
      {children}
    </>
  );
};

export default Layout;
