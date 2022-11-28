import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";

import gridIcon from "../assets/icons/grid.png";
import arrowUpIcon from "../assets/icons/arrow-up.png";
import plusIcon from "../assets/icons/plus.png";
import userIcon from "../assets/icons/user.png";
import logOut from "../assets/icons/log-out.png";

import styles from "../styles/SideBar.module.css";

const SideBar = ({onClick}) => {
  const route = useRouter();
  return (
    <>
      <aside className={styles["side-bar"]}>
        <ul
          className={`${styles["side-bar__content"]} ${styles["content__one"]}`}
        >
          <li
            className={styles["btn-list"]}
            onClick={() => route.push("/dashbord")}
          >
            <Image src={gridIcon} alt={``} className={styles["btn-icon"]} />
            <p>Dashboard</p>
          </li>
          <li
            className={styles["btn-list"]}
            onClick={() => route.push("/transfer")}
          >
            <Image src={arrowUpIcon} alt={``} className={styles["btn-icon"]} />
            <p>Transfer</p>
          </li>
          <li
            className={styles["btn-list"]}
            onClick={() => route.push("/topup")}
          >
            <Image src={plusIcon} alt={``} className={styles["btn-icon"]} />
            <p>Top Up</p>
          </li>
          <li
            className={styles["btn-list"]}
            onClick={() => route.push("/user/profile")}
          >
            <Image src={userIcon} alt={``} className={styles["btn-icon"]} />
            <p>Profile</p>
          </li>
        </ul>
        <ul
          className={`${styles["side-bar__content"]} ${styles["content__two"]}`}
        >
          <li className={styles["btn-list"]} onClick={onClick}>
            <Image src={logOut} alt={``} className={styles["btn-icon"]} />
            <p>Logout</p>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default SideBar;
