/* eslint-disable react-hooks/rules-of-hooks */
import React, { useEffect, useState } from "react";
import Axios from "axios";
import Image from "next/image";
import { getCookie } from "cookies-next";
import Swal from "sweetalert2";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import SideBar from "../../../components/SideBar";

import styles from "../../../styles/Password.module.css";
import passwordIcon from "../../../assets/icons/lock.png";

const password = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    //
    try {
      const response = await Axios.patch(
        `${process.env.NEXT_PUBLIC_DOI_BACKEND_API}/user/password/${getCookie(
          "id"
        )}`,
        {
          oldPassword,
          newPassword,
          confirmPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      // console.log(response.data);
      Swal.fire({
        title: `${response.data.msg}`,
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
        position: "top-start",
        background: "#6379F4",
        color: "#ffffff",
        width: "18rem",
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer)
          window.location.reload();
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
      <Header />
      <main className={styles["main"]}>
        <SideBar />
        <section className={styles["right-side-content"]}>
          <span className={styles["title"]}>
            <h3>Change Password</h3>
            <p className={styles["description"]}>
              You must enter your current password and then type your new
              password twice.
            </p>
          </span>
          <form onSubmit={handleUpdatePassword}>
            <ul className={styles["list"]}>
              <li className={styles["content-list"]}>
                <label className={styles["label-password"]}>
                  <Image
                    src={passwordIcon}
                    alt="password"
                    className={styles["password-icon"]}
                  />
                </label>
                <input
                  type="password"
                  placeholder="Current Password"
                  className={styles["password"]}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
              </li>
              <li className={styles["content-list"]}>
                <label className={styles["label-password"]}>
                  <Image
                    src={passwordIcon}
                    alt="password"
                    className={styles["password-icon"]}
                  />
                </label>
                <input
                  type="password"
                  placeholder="New Password"
                  className={styles["password"]}
                  onChange={(e) => setnewPassword(e.target.value)}
                  required
                />
              </li>
              <li className={styles["content-list"]}>
                <label className={styles["label-password"]}>
                  <Image
                    src={passwordIcon}
                    alt="password"
                    className={styles["password-icon"]}
                  />
                </label>
                <input
                  type="password"
                  placeholder="Repeat New Password"
                  className={styles["password"]}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
              </li>
              <li className={styles["content-list"]}>
                <button className={styles["btn-manage"]}>Confirm</button>
              </li>
            </ul>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default password;
