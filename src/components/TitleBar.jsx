import React, { useEffect } from "react";

const TitleBar = ({ name }) => {
  useEffect(() => {
    document.title = `DOI | ${name}`;
  }, [name]);
  return null;
};

export default TitleBar;
