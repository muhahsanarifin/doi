import React from "react";

import styles from "../styles/Loader.module.css";

export const CircleLoader = () => {
  return (
    <>
      <div className={styles["loader-saction"]}>
        <span className={styles["loader-circle"]}></span>
      </div>
    </>
  );
};

export const PersonLoader = () => {
  return (
    <>
      <span className={styles["loader-person"]}></span>
    </>
  );
};
