import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDisclosure } from "@chakra-ui/react";

import { LogoutModal } from "../components/Overlay";

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
  const route = useRouter();
  const [sideBar, setSample] = useState([
    gridIconBlue,
    arrowUpIconBlue,
    plusIconBlue,
    userIconBlue,
    logOutIconBlue,
  ]);

  const { isOpen, onOpen, onClose } = useDisclosure();

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
              src={sideBar[0] ? gridIconBlue : gridIcon}
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
              src={sideBar[1] ? arrowUpIconBlue : arrowUpIcon}
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
              src={sideBar[2] ? plusIconBlue : plusIcon}
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
              src={sideBar[3] ? userIconBlue : userIcon}
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
            onClick={onOpen}
          >
            <Image
              src={sideBar[4] ? logOutIconBlue : logOutIcon}
              alt="Log Out"
              className={styles["btn-icon"]}
            />
            <p className={logoutStyle}>Logout</p>
          </li>
        </ul>
        {/* Logout Modal */}
        <LogoutModal
          initBtn="Logout"
          body="Are you sure want to logout ?"
          isOpen={isOpen}
          onClose={onClose}
        />
      </aside>
    </>
  );
};

export default SideBar;
