import React from "react";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import authsAction from "../../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";

import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { ResetPasswordButton } from "../../components/Button";
import { ErrorMsg } from "../../components/Feedback";
import { ChangePasswordMsg, Loader } from "../../components/Feedback";
import TitleBar from "../../components/TitleBar";

import icon from "../../utils/icon";
import styles from "../../styles/createNewPassword.module.css";

const CreateNewPassword = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  // const keyChangePassword = parseInt(router.query.create);
  // console.log(keyChangePassword);
  const resetPassword = useSelector((state) => state?.auth?.resetPassword);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [showSecond, setShowSecond] = useState(false);

  const showPassword = () => {
    setShow(!show);
  };
  const showPasswordSecond = () => {
    setShowSecond(!showSecond);
  };

  const handleCreateNewPassword = () => {
    const body = {
      keysChangePassword: parseInt(router.query.create),
      newPassword: newPassword,
      confirmPassword: confirmPassword,
    };

    dispatch(
      authsAction.resetPasswordThunk({
        body,
      })
    );
  };

  return (
    <>
      <TitleBar title={"Create New Password"} />
      <main className={styles["main"]}>
        <section className={styles["content"]}>
          <aside className={styles["left-content"]}>
            <h3 className={styles["init-logo"]}>Doi</h3>
            <span className={styles["left-content_image"]}>
              <Image
                src={icon.phone}
                alt={`phone`}
                className={`${styles["image"]} ${styles["image-one"]}`}
                placeholder="blur"
              />
              <Image
                src={icon.phoneSecond}
                alt={`phone`}
                className={`${styles["image"]} ${styles["image-second"]}`}
                placeholder="blur"
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
            {resetPassword?.isFulfilled ? null : (
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
            )}
            <span className={styles["form"]}>
              {resetPassword?.isFulfilled ? (
                <ChangePasswordMsg
                  icon={icon.success}
                  msg={resetPassword?.data?.msg}
                />
              ) : (
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
                        src={!newPassword ? icon.lock : icon.lockBlue}
                        alt="password"
                        className={styles["password-icon"]}
                        placeholder="blur"
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
                        src={!confirmPassword ? icon.lock : icon.lockBlue}
                        alt="password"
                        className={styles["password-icon"]}
                        placeholder="blur"
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
                    {resetPassword?.isRejected ? (
                      <ErrorMsg
                        failedCreateNewPassword={resetPassword?.data?.msg}
                      />
                    ) : null}
                  </span>
                  <ResetPasswordButton
                    onClick={handleCreateNewPassword}
                    disabled={newPassword && confirmPassword}
                    init={
                      resetPassword?.isLoading ? (
                        <Loader onColor="#5464c7" />
                      ) : (
                        "Reset Password"
                      )
                    }
                  />
                </>
              )}
            </span>
          </div>
        </section>
      </main>
    </>
  );
};

export default CreateNewPassword;
