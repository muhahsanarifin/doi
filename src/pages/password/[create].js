import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import authsAction from "../../redux/actions/auth";
import { useDispatch } from "react-redux";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { ResetPasswordButton } from "../../components/Button";
import { ErrorMsg } from "../../components/Feedback";
import { ChangePasswordMsg } from "../../components/Feedback";
import TitleBar from "../../components/TitleBar";

import styles from "../../styles/CreateNewPassword.module.css";
import phone from "../../assets/images/png-phone.png";
import phoneSecond from "../../assets/images/png-phone-2.png";
import passwordIcon from "../../assets/icons/lock.png";
import passwordIconBlue from "../../assets/icons/lock-blue.png";
import successIcon from "../../assets/icons/success.png";

const CreateNewPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  // const keyChangePassword = parseInt(router.query.create);
  // console.log(keyChangePassword);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [showSecond, setShowSecond] = useState(false);
  const [failedMsg, setFailedMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const body = {
    keysChangePassword: parseInt(router.query.create),
    newPassword: newPassword,
    confirmPassword: confirmPassword,
  };

  const handleCreateNewPassword = () => {
    dispatch(
      authsAction.resetPasswordThunk(
        body,
        resCreateNewPasswordPending,
        resCreateNewPasswordFulfilled,
        resCreateNewPasswordRejected,
        resCreateNewPasswordFinally
      )
    );
  };

  const resCreateNewPasswordPending = () => {}; // <- Devloper don't use resTBPending callback function temporary to make some condition when request Transfer API.

  const resCreateNewPasswordFulfilled = (response) => {
    setTimeout(() => {
      setSuccessMsg(response?.msg);
    }, 1000);

    setTimeout(() => {
      router.push("/auth/login");
    }, 1500);
  };
  const resCreateNewPasswordRejected = (error) => {
    setFailedMsg(error.response.data?.msg);
  };

  const resCreateNewPasswordFinally = () => {
    setTimeout(() => {
      setFailedMsg(false);
    }, 1500);
  };

  const showPassword = () => {
    setShow(!show);
  };
  const showPasswordSecond = () => {
    setShowSecond(!showSecond);
  };

  return (
    <>
      <TitleBar name={"Create New Password"} />
      <main className={styles["main"]}>
        <section className={styles["content"]}>
          <aside className={styles["left-content"]}>
            <h3 className={styles["init-logo"]}>Doi</h3>
            <span className={styles["left-content_image"]}>
              <Image
                src={phone}
                alt={`phone`}
                className={`${styles["image"]} ${styles["image-one"]}`}
              />
              <Image
                src={phoneSecond}
                alt={`phone`}
                className={`${styles["image"]} ${styles["image-second"]}`}
              />
            </span>
            <span className={styles["left-content__description"]}>
              <h4>App that Covering Banking Needs.</h4>
              <p>
                Doi is an application that focussing in banking needs for all
                users in the world. Always updated and always following world
                trends. 5000+ users registered in Doi everyday with worldwide
                users coverage.
              </p>
            </span>
          </aside>
          <div className={styles["right-content"]}>
            {!successMsg ? (
              <>
                <span className={styles["right-content__description"]}>
                  <h3>
                    Did You Forgot Your Password? Don’t Worry, You Can Reset
                    Your Password In a Minutes.
                  </h3>
                  <p>
                    Now you can create a new password for your FazzPay account.
                    Type your password twice so we can confirm your new
                    passsword.
                  </p>
                </span>
                <span className={styles["right-content__description-mobile"]}>
                  <h3>Reset Password</h3>
                  <p>Enter your new password.</p>
                </span>
              </>
            ) : null}
            <span className={styles["form"]}>
              {!successMsg ? (
                <>
                  <span
                    className={
                      styles[
                        !newPassword
                          ? "form__password-content"
                          : "form__password-content-active"
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
                      type={show ? "text" : "password"}
                      placeholder="Create new password"
                      className={styles["password"]}
                      onChange={(e) => setNewPassword(e.target.value)}
                      required
                    />
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
                  <span
                    className={
                      styles[
                        !confirmPassword
                          ? "form__password-content-second"
                          : "form__password-content-second-active"
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
                      type={showSecond ? "text" : "password"}
                      placeholder="Create new password"
                      className={styles["password"]}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <span
                      onClick={showPasswordSecond}
                      className={styles["show-password"]}
                    >
                      {show ? (
                        <ViewIcon color="#A9A9A9" />
                      ) : (
                        <ViewOffIcon color="#A9A9A9" />
                      )}
                    </span>
                  </span>
                  <span className={styles["error-msg-section"]}>
                    {failedMsg ? <ErrorMsg failedMsg={failedMsg} /> : null}
                  </span>
                  <ResetPasswordButton
                    onClick={handleCreateNewPassword}
                    disabled={newPassword && confirmPassword}
                    init={"Reset Password"}
                  />
                </>
              ) : (
                <ChangePasswordMsg icon={successIcon} msg={successMsg} />
              )}
            </span>
          </div>
        </section>
      </main>
    </>
  );
};

export default CreateNewPassword;
