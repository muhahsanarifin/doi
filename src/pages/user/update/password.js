import React, { useState } from "react";
import Axios from "axios";
import Image from "next/image";
import { getCookie } from "cookies-next";
import Users from "../../../utils/api/user";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import SideBar from "../../../components/SideBar";
import TitleBar from "../../../components/TitleBar";
import { HideShowPassword } from "../../../components/Toggle";
import userIconBlue from "../../../assets/icons/user-blue.png";

import styles from "../../../styles/Password.module.css";
import passwordIcon from "../../../assets/icons/lock.png";
import passwordIconBlue from "../../../assets/icons/lock-blue.png";
import { ChangePasswordButton } from "../../../components/Button";

const Password = () => {
  const { updatePasswordUser } = Users;
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleUpdatePassword = async (e) => {
    e.preventDefault();
    try {
      const response = await updatePasswordUser(
        getCookie("id"),
        { oldPassword, newPassword, confirmPassword },
        getCookie("token")
      );
      if (response.data.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      setErrorMsg(error.response.data.msg);
    }
  };

  return (
    <>
      <TitleBar name={"Change Password"} />
      <Header />
      <main className={styles["main"]}>
        <SideBar
          focusStyleProfile={styles["focus-style-side-password-button"]}
          profileStyle={styles["init-button-active"]}
          userIconBlue={userIconBlue}
        />
        <section className={styles["right-side-content"]}>
          <span className={styles["title"]}>
            <h3>Change Password</h3>
            <p className={styles["description"]}>
              You must enter your current password and then type your new
              password twice.
            </p>
          </span>
          <form className={styles["form"]} onSubmit={handleUpdatePassword}>
            <ul className={styles["list"]}>
              <li className={styles["content-list"]}>
                <span
                  className={
                    styles[
                      !oldPassword
                        ? "form__password-content"
                        : "form__password-content__active"
                    ]
                  }
                >
                  <label className={styles["label-password"]}>
                    <Image
                      src={!oldPassword ? passwordIcon : passwordIconBlue}
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
                  <HideShowPassword
                    onClick={() => setShow(!show)}
                    onShow={show}
                    className={styles["show-password"]}
                  />
                </span>
              </li>
              <li className={styles["content-list"]}>
                <span
                  className={
                    styles[
                      !newPassword
                        ? "form__password-content__second"
                        : "form__password-content__second__active"
                    ]
                  }
                >
                  <label className={styles["label-password"]}>
                    <Image
                      src={!newPassword ? passwordIcon : passwordIconBlue}
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
                  <HideShowPassword
                    onClick={() => setShowSecond(!showSecond)}
                    onShow={showSecond}
                    className={styles["show-password"]}
                  />
                </span>
              </li>
              <li className={styles["content-list"]}>
                <span
                  className={
                    styles[
                      !confirmPassword
                        ? "form__password-content__third"
                        : "form__password-content__third__active"
                    ]
                  }
                >
                  <label className={styles["label-password"]}>
                    <Image
                      src={!confirmPassword ? passwordIcon : passwordIconBlue}
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
                  <HideShowPassword
                    onClick={() => setShowThird(!showThird)}
                    onShow={showThird}
                    className={styles["show-password"]}
                  />
                </span>
              </li>
              {errorMsg ? (
                <span className={styles["error-msg"]}>
                  <p>{errorMsg}</p>
                </span>
              ) : null}
              <ChangePasswordButton
                currentPassword={oldPassword}
                newPassword={newPassword}
                repeatPassword={confirmPassword}
              />
            </ul>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Password;
