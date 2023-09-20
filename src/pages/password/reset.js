import React, { useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import authsAction from "../../redux/actions/auth";

import { ForgotPasswordButton } from "../../components/Button";
import { ErrorMsg } from "../../components/Feedback";
import * as Banner from "../../components/Banner";
import TitleBar from "../../components/TitleBar";
import { SuccessResetPasswordMsg, Loader } from "../../components/Feedback";

import icon from "../../utils/icon";
import styles from "../../styles/resetPassword.module.css";

const ResetPassword = () => {
  const { mail, mailBlue } = icon;
  const forgotPassword = useSelector((state) => state.auth?.forgotPassword);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");

  const body = {
    email: email,
    linkDirect: "https://doi.vercel.app/password/",
  };

  const handleResetPassword = () => {
    dispatch(authsAction.forgotPasswordThunk({ body, cbFinally }));
  };

  const cbFinally = () => {
    setTimeout(() => {
      dispatch(authsAction.cfpdThunk());
    }, 1000);
  };

  return (
    <>
      <TitleBar title={"Reset Password"} />
      <main className={styles["main"]}>
        <section className={styles["content"]}>
          <Banner.Auth />
          {forgotPassword?.isFulfilled ? (
            <div className={styles["right-content"]}>
              <SuccessResetPasswordMsg
                icon={icon.success}
                msg={forgotPassword?.data?.msg}
              />
            </div>
          ) : (
            <div className={styles["right-content"]}>
              <span className={styles["right-content__description"]}>
                <h3>
                  Did You Forgot Your Password? Don’t Worry, You Can Reset Your
                  Password In a Minutes.
                </h3>
                <p>
                  To reset your password, you must type your e-mail and we will
                  send a link to your email and you will be directed to the
                  reset password screens.
                </p>
              </span>
              <span className={styles["right-content__description-mobile"]}>
                <h3>Reset Password</h3>
                <p>
                  Enter your Doi e-mail so we can send you a password reset
                  link.
                </p>
              </span>
              <span className={styles["form"]}>
                <span
                  className={
                    styles[
                      !email
                        ? "form__email-content"
                        : "form__email-content-active"
                    ]
                  }
                >
                  <label className={styles["label-email"]}>
                    <Image
                      src={!email ? mail : mailBlue}
                      alt="email"
                      className={styles["email-icon"]}
                      placeholder="blur"
                    />
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your e-mail"
                    className={styles["email"]}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </span>
                <span className={styles["error-msg-section"]}>
                  {forgotPassword?.isRejected && (
                    <ErrorMsg failedMsg={forgotPassword?.err} />
                  )}
                </span>
                <ForgotPasswordButton
                  email={email}
                  onClick={handleResetPassword}
                  init={
                    forgotPassword?.isLoading ? (
                      <Loader onColor="#5464c7" />
                    ) : (
                      "Confirm"
                    )
                  }
                />
              </span>
            </div>
          )}
        </section>
      </main>
    </>
  );
};

export default ResetPassword;
