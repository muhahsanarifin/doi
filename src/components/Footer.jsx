import React from "react";

import styles from "../styles/Footer.module.css";

const Footer = () => {
  return (
    <>
      <footer className={styles["footer"]}>
        <span className={styles["footer__section_one"]}>
          <p>2022 Doi. All right reserved.</p>
        </span>
        <span className={styles["footer__section_two"]}>
          <p>{`085298145421`}</p>
          <p>contact@doi.com</p>
        </span>
      </footer>
    </>
  );
};

export default Footer;
