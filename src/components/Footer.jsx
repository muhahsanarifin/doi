import React from "react";

import styles from "../styles/Footer.module.css";

const Footer = () => {
  const getYear = (date) => {
    return date;
  };
  const currentYear = getYear(new Date().getFullYear());
  return (
    <>
      <footer className={styles["footer"]}>
        <span className={styles["footer__section_one"]}>
          <p>2022-{currentYear} Doi. All right reserved.</p>
        </span>
        <span className={styles["footer__section_two"]}>
          <p className={styles["footer__no-telp"]}>+62 5321 1234 9876</p>
          <p className={styles["footer__email"]}>contact@doi.com</p>
        </span>
      </footer>
    </>
  );
};

export default Footer;
