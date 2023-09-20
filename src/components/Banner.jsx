import React from "react";
import Image from "next/image";

import icon from "../utils/icon.js";
import styles from "../styles/Banner.module.css";

// For Login, Register, Reset,
export const Auth = () => {
  return (
    <>
      <aside className={styles["left-content"]}>
        <h3 className={styles["init-logo"]}>Doi</h3>
        <span className={styles["left-content_image"]}>
          <Image
            src={icon.phone}
            alt={`phone`}
            className={`${styles["image"]} ${styles["image-one"]}`}
            placeholder="blur"
          />
          <Image
            src={icon.phoneSecond}
            alt={`phone`}
            className={`${styles["image"]} ${styles["image-second"]}`}
            placeholder="blur"
          />
        </span>
        <span className={styles["left-content__description"]}>
          <h4>App that Covering Banking Needs.</h4>
          <p>
            Doi is an application that focussing in banking needs for all users
            in the world. Always updated and always following world trends.
            5000+ users registered in Doi everyday with worldwide users
            coverage.
          </p>
        </span>
      </aside>
    </>
  );
};
