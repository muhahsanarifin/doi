import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Auth from "../utils/api/auth";
import { getCookie, deleteCookie } from "cookies-next";

import gridIcon from "../assets/icons/grid.png";
import arrowUpIcon from "../assets/icons/arrow-up.png";
import plusIcon from "../assets/icons/plus.png";
import userIcon from "../assets/icons/user.png";
import logOutIcon from "../assets/icons/log-out.png";

import styles from "../styles/SideBar.module.css";

const SideBar = ({
  focusStyleDashbord,
  dashboardStyle,
  gridIconBlue,
  focusStyleTransfer,
  transferStyle,
  arrowUpIconBlue,
  focusStyleTopUp,
  topUpStyle,
  plusIconBlue,
  focusStyleProfile,
  profileStyle,
  userIconBlue,
  focusStyleLogOut,
  logoutStyle,
  logOutIconBlue,
}) => {
  const { logout } = Auth;
  const route = useRouter();
  const [sample, setSample] = useState([
    gridIconBlue,
    arrowUpIconBlue,
    plusIconBlue,
    userIconBlue,
    logOutIconBlue,
  ]);

  const handleLogout = async () => {
    try {
      const response = await logout(getCookie("token"));

      if (response.data.status === 200) {
        // Delete cookies
        const values = ["id", "token"];
        values.map((value) => deleteCookie(value));

        // Clear localstorage
        window.localStorage.clear();

        route.push("/auth/login");
      }
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  return (
    <>
      <aside className={styles["side-bar"]}>
        <ul
          className={`${styles["side-bar__content"]} ${styles["content__one"]}`}
        >
          <li
            className={`${styles["btn-list"]} ${focusStyleDashbord}`}
            onClick={() => route.push("/dashboard")}
          >
            <Image
              src={sample[0] ? gridIconBlue : gridIcon}
              alt="Dashboard"
              className={styles["btn-icon"]}
            />
            <p className={dashboardStyle}>Dashboard</p>
          </li>
          <li
            className={`${styles["btn-list"]} ${focusStyleTransfer}`}
            onClick={() => route.push("/transfer")}
          >
            <Image
              src={sample[1] ? arrowUpIconBlue : arrowUpIcon}
              alt="Transfer"
              className={styles["btn-icon"]}
            />
            <p className={transferStyle}>Transfer</p>
          </li>
          <li
            className={`${styles["btn-list"]} ${focusStyleTopUp}`}
            onClick={() => route.push("/topup")}
          >
            <Image
              src={sample[2] ? plusIconBlue : plusIcon}
              alt="Top Up"
              className={styles["btn-icon"]}
            />
            <p className={topUpStyle}>Top Up</p>
          </li>
          <li
            className={`${styles["btn-list"]} ${focusStyleProfile}`}
            onClick={() => route.push("/user/profile")}
          >
            <Image
              src={sample[3] ? userIconBlue : userIcon}
              alt="Profile"
              className={styles["btn-icon"]}
            />
            <p className={profileStyle}>Profile</p>
          </li>
        </ul>
        <ul
          className={`${styles["side-bar__content"]} ${styles["content__two"]}`}
        >
          <li
            className={`${styles["btn-list"]} ${focusStyleLogOut}`}
            onClick={handleLogout}
          >
            <Image
              src={sample[4] ? logOutIconBlue : logOutIcon}
              alt="Log Out"
              className={styles["btn-icon"]}
            />
            <p className={logoutStyle}>Logout</p>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default SideBar;
