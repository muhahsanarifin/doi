/* eslint-disable react-hooks/rules-of-hooks */
import React, { useState } from "react";
import Axios from "axios";
import Image from "next/image";

import { ForgotPasswordButton } from "../../components/Button";
import Swal from "sweetalert2";


import styles from "../../styles/ResetPassword.module.css";
import phone from "../../assets/images/png-phone.png";
import phoneSecond from "../../assets/images/png-phone-2.png";
import emailIcon from "../../assets/icons/mail.png";


const ResetPassword = () => {
  const [email, setEmail] = useState("");

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(
        `${process.env.NEXT_PUBLIC_DOI_BACKEND_API}/auth/forgot-password`,
        {
          email,
          linkDirect: "https://doi.vercel.app/password/",
        }
      );
      // console.log(response);
      Swal.fire({
        title: `${response.data.msg}`,
        showConfirmButton: false,
        timer: 2000,
        position: "top-start",
        background: "#6379F4",
        color: "#ffffff",
        width: "18rem",
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <>
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
                trends. 5000+ users registered in Doi everyday with
                worldwide users coverage.
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
                Enter your Doi e-mail so we can send you a password reset
                link.
              </p>
            </span>
            <form className={styles["form"]} onSubmit={handleResetPassword}>
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
              <ForgotPasswordButton email={email} />
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default ResetPassword;
