/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Axios from "axios";
import { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import Swal from "sweetalert2";

// import styles from "../../styles/createNewPassword.module.css";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import styles from "../../styles/CreateNewPassword.module.css";
import phone from "../../assets/images/png-phone.png";
import phoneSecond from "../../assets/images/png-phone-2.png";
import passwordIcon from "../../assets/icons/lock.png";

// on going fixing ◬
const createNewPassword = () => {
  const router = useRouter();

  const keyChangePassword = parseInt(router.query.create);
  console.log(keyChangePassword);

  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [show, setShow] = useState(false);
  const [showSecond, setShowSecond] = useState(false);

  const handleCreateNewPassword = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.patch(
        `${process.env.NEXT_PUBLIC_DOI_BACKEND_API}/auth/reset-password`,
        {
          keysChangePassword: parseInt(router.query.create),
          newPassword,
          confirmPassword,
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
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer)
          router.push("/auth/login");
      });
    } catch (error) {
      console.log(error.message);
    }
  };

  const showPassword = () => {
    setShow(!show);
  };
  const showPasswordSecond = () => {
    setShowSecond(!showSecond);
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
                trends. 5000+ users registered in FazzPay everyday with
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
            <form className={styles["form"]} onSubmit={handleCreateNewPassword}>
              <span className={styles["form__password-content"]}>
                <label className={styles["label-password"]}>
                  <Image
                    src={passwordIcon}
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
              <span className={styles["form__password-content"]}>
                <label className={styles["label-password"]}>
                  <Image
                    src={passwordIcon}
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
              <button className={styles["btn-confirm"]}> Confirm </button>
            </form>
          </div>
        </section>
      </main>
    </>
  );
};

export default createNewPassword;
