import React, { useState } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import authsAction from "../../redux/actions/auth";

import { ForgotPasswordButton } from "../../components/Button";
import { ErrorMsg } from "../../components/Feedback";

import styles from "../../styles/ResetPassword.module.css";
import phone from "../../assets/images/png-phone.png";
import phoneSecond from "../../assets/images/png-phone-2.png";
import emailIcon from "../../assets/icons/mail.png";
import TitleBar from "../../components/TitleBar";

const ResetPassword = () => {
  const dispatch = useDispatch();
  const [failedMsg, setFailedMsg] = useState("");
  const [email, setEmail] = useState("");

  const body = {
    email: email,
    linkDirect: "https://doi.vercel.app/password/",
  };

  const handleResetPassword = () => {
    dispatch(
      authsAction.forgotPasswordThunk(
        body,
        resResetPasswordPending,
        resResetPasswordFulfilled,
        resResetPasswordRejected,
        resResetPasswordFinally
      )
    );
  };

  const resResetPasswordPending = () => {}; // Developer does not use it temporarily.

  const resResetPasswordFulfilled = () => {
    window.location.reload();
  };

  const resResetPasswordRejected = (error) => {
    setFailedMsg(error.response.data?.msg);
  };

  const resResetPasswordFinally = () => {
    setTimeout(() => {
      setFailedMsg(false);
    }, 1500);
  };

  return (
    <>
      <TitleBar name={"Reset Password"} />
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
            <span className={styles["right-content__description"]}>
              <h3>
                Did You Forgot Your Password? Don’t Worry, You Can Reset Your
                Password In a Minutes.
              </h3>
              <p>
                To reset your password, you must type your e-mail and we will
                send a link to your email and you will be directed to the reset
                password screens.
              </p>
            </span>
            <span className={styles["right-content__description-mobile"]}>
              <h3>Reset Password</h3>
              <p>
                Enter your Doi e-mail so we can send you a password reset link.
              </p>
            </span>
            <span className={styles["form"]}>
              <span className={styles["form__email-content"]}>
                <label className={styles["label-email"]}>
                  <Image
                    src={emailIcon}
                    alt="email"
                    className={styles["email-icon"]}
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
                {failedMsg ? <ErrorMsg failedMsg={failedMsg} /> : null}
              </span>
              <ForgotPasswordButton
                email={email}
                onClick={handleResetPassword}
              />
            </span>
          </div>
        </section>
      </main>
    </>
  );
};

export default ResetPassword;
