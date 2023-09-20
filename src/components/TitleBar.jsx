import React, { useEffect } from "react";
import Head from "next/head";

const TitleBar = ({ title }) => {
  return (
    <>
      <Head>
        <title>{`DOI | ${title}`}</title>
        <meta property={`og:${title}`} content={`${title} page`} key={title} />
      </Head>
    </>
  );
};

export default TitleBar;
