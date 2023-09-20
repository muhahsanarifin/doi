import React, { useState } from "react";
import Image from "next/image";
import { getCookie } from "cookies-next";
import usersAction from "../../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";

import { PrivateRoute } from "../../../helpers/handleRoutes";

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
import { ChangePasswordButton } from "../../../components/Button";

import icon from "../../../utils/icon";
import styles from "../../../styles/updatePassword.module.css";

const Password = () => {
  const dispatch = useDispatch();

  const updatePasswordUser = useSelector(
    (state) => state.users?.updatePasswordUser
  );
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [showThird, setShowThird] = useState(false);

  const handleUpdatePassword = () => {
    const id = getCookie("id");
    const body = {
      oldPassword,
      newPassword,
      confirmPassword,
    };
    const accessToken = getCookie("token");
    dispatch(
      usersAction.updatePasswordUserThunk({
        id,
        body,
        accessToken,
        cbFulfilled,
        cbFinally,
      })
    );
  };

  const cbFulfilled = () => {
    setOldPassword("");
    setnewPassword("");
    setConfirmPassword("");
  };

  const cbFinally = () => {
    setTimeout(() => {
      dispatch(usersAction.cupudThunk());
    }, 1000);
  };

  return (
    <>
      <PrivateRoute>
        <TitleBar title={"Change Password"} />
        <Header />
        <main className={styles["main"]}>
          <SideBar
            focusStyle={styles["focus-style-side-password-button"]}
            titleStyle={styles["init-button-active"]}
            activeIcon={icon.userBlue}
            onTitle={"Profile"}
          />
          <section className={styles["right-side-content"]}>
            <span className={styles["title"]}>
              <h3>Change Password</h3>
              {!updatePasswordUser?.isFulfilled && (
                <p className={styles["description"]}>
                  You must enter your current password and then type your new
                  password twice.
                </p>
              )}
            </span>
            <span className={styles["form"]}>
              {updatePasswordUser?.isFulfilled ? (
                <ChangePasswordMsg
                  icon={icon.success}
                  msg={updatePasswordUser?.data?.msg}
                />
              ) : (
                <ul className={styles["list"]}>
                  <li className={styles["content-list"]}>
                    <span
                      className={
                        styles[
                          updatePasswordUser?.isRejected
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
                            updatePasswordUser?.isRejected
                              ? icon.lockRed
                              : !oldPassword
                              ? icon.lock
                              : icon.lockBlue
                          }
                          alt="password"
                          className={styles["password-icon"]}
                          placeholder="blur"
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
                          updatePasswordUser?.isRejected
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
                            updatePasswordUser?.isRejected
                              ? icon.lockRed
                              : !newPassword
                              ? icon.lock
                              : icon.lockBlue
                          }
                          alt="password"
                          className={styles["password-icon"]}
                          placeholder="blur"
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
                          updatePasswordUser?.isRejected
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
                            updatePasswordUser?.isRejected
                              ? icon.lockRed
                              : !confirmPassword
                              ? icon.lock
                              : icon.lockBlue
                          }
                          alt="password"
                          className={styles["password-icon"]}
                          placeholder="blur"
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
                    {updatePasswordUser?.isRejected && (
                      <ErrorMsg failedMsg={updatePasswordUser?.err} />
                    )}
                  </span>
                  <ChangePasswordButton
                    disabled={
                      !oldPassword ||
                      !newPassword ||
                      !confirmPassword ||
                      updatePasswordUser?.isLoading
                    }
                    onClick={handleUpdatePassword}
                    init={
                      updatePasswordUser?.isLoading ? (
                        <Loader onColor={"#5464c7"} />
                      ) : (
                        "Confirm"
                      )
                    }
                  />
                </ul>
              )}
            </span>
          </section>
        </main>
        <Footer />
      </PrivateRoute>
    </>
  );
};

export default Password;
