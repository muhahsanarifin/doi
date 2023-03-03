import React, { useState } from "react";
import Image from "next/image";
import { getCookie } from "cookies-next";
import usersAction from "../../../redux/actions/user";
import { useDispatch } from "react-redux";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import SideBar from "../../../components/SideBar";
import TitleBar from "../../../components/TitleBar";
import { HideShowPassword } from "../../../components/Toggle";
import userIconBlue from "../../../assets/icons/user-blue.png";
import {
  ChangePasswordMsg,
  Loader,
  ErrorMsg,
} from "../../../components/Feedback";

import styles from "../../../styles/Password.module.css";
import passwordIcon from "../../../assets/icons/lock.png";
import passwordIconBlue from "../../../assets/icons/lock-blue.png";
import passwordIconRed from "../../../assets/icons/lock-red.png";
import { ChangePasswordButton } from "../../../components/Button";
import successIcon from "../../../assets/icons/success.png";

const Password = () => {
  const dispatch = useDispatch();
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [failedMsg, setFailedMsg] = useState("");
  const [loading, setLoading] = useState(false);

  const body = {
    oldPassword: oldPassword,
    newPassword: newPassword,
    confirmPassword: confirmPassword,
  };

  const handleUpdatePassword = () => {
    dispatch(
      usersAction.updatePasswordUserThunk(
        getCookie("id"),
        body,
        getCookie("token"),
        resPendingUpdatePassword,
        resFulfilledUpdatePassword,
        resRejectedUpdatePassword,
        resFinallyUpdatePassword
      )
    );
  };

  const resPendingUpdatePassword = () => {
    setLoading(true);
  };

  const resFulfilledUpdatePassword = (response) => {
    setTimeout(() => {
      setSuccessMsg(response?.msg);
    }, 1000);

    setTimeout(() => {
      window.location.replace("/user/profile");
    }, 1500);
  };

  const resRejectedUpdatePassword = (error) => {
    setFailedMsg(error.response.data?.msg);
  };

  const resFinallyUpdatePassword = () => {
    setLoading(false);
    setTimeout(() => {
      setFailedMsg(false);
    }, 1500);
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
            {!successMsg ? (
              <p className={styles["description"]}>
                You must enter your current password and then type your new
                password twice.
              </p>
            ) : null}
          </span>
          <span className={styles["form"]}>
            {!successMsg ? (
              <ul className={styles["list"]}>
                <li className={styles["content-list"]}>
                  <span
                    className={
                      styles[
                        failedMsg
                          ? "form__password-content__active__failed"
                          : !oldPassword
                          ? "form__password-content"
                          : "form__password-content__active"
                      ]
                    }
                  >
                    <label className={styles["label-password"]}>
                      <Image
                        src={
                          failedMsg
                            ? passwordIconRed
                            : !oldPassword
                            ? passwordIcon
                            : passwordIconBlue
                        }
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
                        failedMsg
                          ? "form__password-content__second__active__failed"
                          : !newPassword
                          ? "form__password-content__second"
                          : "form__password-content__second__active"
                      ]
                    }
                  >
                    <label className={styles["label-password"]}>
                      <Image
                        src={
                          failedMsg
                            ? passwordIconRed
                            : !newPassword
                            ? passwordIcon
                            : passwordIconBlue
                        }
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
                        failedMsg
                          ? "form__password-content__third__active__failed"
                          : !confirmPassword
                          ? "form__password-content__third"
                          : "form__password-content__third__active"
                      ]
                    }
                  >
                    <label className={styles["label-password"]}>
                      <Image
                        src={
                          failedMsg
                            ? passwordIconRed
                            : !confirmPassword
                            ? passwordIcon
                            : passwordIconBlue
                        }
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
                <span className={styles["error-msg-section"]}>
                  {failedMsg ? <ErrorMsg failedMsg={failedMsg} /> : null}
                </span>

                <ChangePasswordButton
                  currentPassword={oldPassword}
                  newPassword={newPassword}
                  repeatPassword={confirmPassword}
                  onClick={handleUpdatePassword}
                  init={loading ? <Loader onColor={"#5464c7"} /> : "Confirm"}
                />
              </ul>
            ) : (
              <ChangePasswordMsg icon={successIcon} msg={successMsg} />
            )}
          </span>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Password;
