import React from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";
import Swal from "sweetalert2";

import gridIcon from "../assets/icons/grid.png";
import arrowUpIcon from "../assets/icons/arrow-up.png";
import plusIcon from "../assets/icons/plus.png";
import userIcon from "../assets/icons/user.png";
import logOut from "../assets/icons/log-out.png";

import styles from "../styles/SideBar.module.css";

const SideBar = () => {
  const route = useRouter();

  const handleLogout = async () => {
    try {
      const response = await Axios.post(
        `${process.env.NEXT_PUBLIC_DOI_BACKEND_API}/auth/logout`,
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      deleteCookie("id");
      deleteCookie("token");
      deleteCookie("pin");
      deleteCookie("firstname");
      deleteCookie("lastname");
      deleteCookie("email");
      deleteCookie("image");
      deleteCookie("noTelp");
      deleteCookie("balance");
      Swal.fire({
        title: `${response.data.msg}`,
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
        position: "top-start",
        background: "#6379F4",
        color: "#FFFFFF",
        width: "18rem",
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer)
          route.push("/auth/login");
      });
    } catch (error) {
      console.log(error.msg);
    }
  };
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
          <li className={styles["btn-list"]} onClick={handleLogout}>
            <Image src={logOut} alt={``} className={styles["btn-icon"]} />
            <p>Logout</p>
          </li>
        </ul>
      </aside>
    </>
  );
};

export default SideBar;
