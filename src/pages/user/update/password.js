/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import Axios from "axios";
import Image from "next/image";
import { getCookie } from "cookies-next";
import Swal from "sweetalert2";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import SideBar from "../../../components/SideBar";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import styles from "../../../styles/Password.module.css";
import passwordIcon from "../../../assets/icons/lock.png";

const Password = () => {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);

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
      // console.log(error.message);
      Swal.fire({
        title: `${error.response.data.msg}`,
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
        position: "top-start",
        background: "#6379F4",
        color: "#ffffff",
        width: "18rem",
      });
    }
  };

  const showPassword = () => {
    setShow(!show);
  };
  const showPasswordSecond = () => {
    setShowSecond(!showSecond);
  };
  const showPasswordThird = () => {
    setShowThird(!showThird);
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
                  type={show ? "text" : "password"}
                  placeholder="Current Password"
                  className={styles["password"]}
                  onChange={(e) => setOldPassword(e.target.value)}
                  required
                />
                <span>
                  <span
                    onClick={showPassword}
                    className={styles["show-password"]}
                  >
                    {show ? (
                      <ViewIcon color="#A9A9A9" />
                    ) : (
                      <ViewOffIcon color="#A9A9A9" />
                    )}
                  </span>
                </span>
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
                  type={showSecond ? "text" : "password"}
                  placeholder="New Password"
                  className={styles["password"]}
                  onChange={(e) => setnewPassword(e.target.value)}
                  required
                />
                <span>
                  <span
                    onClick={showPasswordSecond}
                    className={styles["show-password"]}
                  >
                    {showSecond ? (
                      <ViewIcon color="#A9A9A9" />
                    ) : (
                      <ViewOffIcon color="#A9A9A9" />
                    )}
                  </span>
                </span>
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
                  type={showThird ? "text" : "password"}
                  placeholder="Repeat New Password"
                  className={styles["password"]}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  required
                />
                <span>
                  <span
                    onClick={showPasswordThird}
                    className={styles["show-password"]}
                  >
                    {showThird ? (
                      <ViewIcon color="#A9A9A9" />
                    ) : (
                      <ViewOffIcon color="#A9A9A9" />
                    )}
                  </span>
                </span>
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

export default Password;
