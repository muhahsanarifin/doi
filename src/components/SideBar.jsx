import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDisclosure } from "@chakra-ui/react";

import { LogoutModal } from "../components/Overlay";

import icon from "../utils/icon";
import styles from "../styles/SideBar.module.css";

const SideBar = ({ focusStyle, titleStyle, onTitle, activeIcon }) => {
  const route = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const sideBar = [
    {
      title: "Dashboard",
      link: "/dashboard",
      icon: icon.grid,
    },
    {
      title: "Transfer",
      link: "/transfer",
      icon: icon.arrowUp,
    },
    {
      title: "Top Up",
      link: "/topup",
      icon: icon.plus,
    },
    {
      title: "Profile",
      link: "/user/profile",
      icon: icon.user,
    },
  ];

  return (
    <>
      <aside className={styles["side-bar"]}>
        <ul
          className={`${styles["side-bar__content"]} ${styles["content__one"]}`}
        >
          {sideBar.map((bar, idx) => (
            <li
              className={`${styles["btn-list"]} ${
                bar.title === onTitle && focusStyle
              }`}
              onClick={() => route.push(bar.link)}
              key={idx}
            >
              <Image
                src={bar.title === onTitle ? activeIcon : bar.icon}
                alt={bar.title}
                className={styles["btn-icon"]}
                placeholder="blur"
              />
              <p className={bar.title === onTitle && titleStyle}>{bar.title}</p>
            </li>
          ))}
        </ul>
        <ul
          className={`${styles["side-bar__content"]} ${styles["content__two"]}`}
        >
          <li
            className={styles["btn-list"]}
            onClick={onOpen}
          >
            <Image
              src={icon.logOut}
              alt="Log Out"
              className={styles["btn-icon"]}
              placeholder="blur"
            />
            <p>Logout</p>
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
