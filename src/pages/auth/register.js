import React from "react";

import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import Axios from "axios";
import Swal from "sweetalert2";

import phone from "../../assets/images/png-phone.png";
import phoneSecond from "../../assets/images/png-phone-2.png";
import emailIcon from "../../assets/icons/mail.png";
import passwordIcon from "../../assets/icons/lock.png";
import personIcon from "../../assets/icons/person.png";

import styles from "../../styles/Register.module.css";

const Register = () => {
  // « Init route »
  const route = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(
        `${process.env.NEXT_PUBLIC_DOI_BACKEND_API}/auth/register`,
        {
          firstName,
          lastName,
          email,
          password,
        }
      );
      // console.log(response.data);
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
          route.push("/auth/login");
      });
    } catch (error) {
      Swal.fire({
        title: `${error.response.data.msg}`,
        showConfirmButton: false,
        timer: 2000,
        position: "top-start",
        background: "#EB1D36",
        color: "#ffffff",
        width: "18rem",
      });
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
                trends. 5000+ users registered in FazzPay everyday with
                worldwide users coverage.
              </p>
            </span>
          </aside>
          <div className={styles["right-content"]}>
            <span className={styles["right-content__description"]}>
              <h3>
                Start Accessing Banking Needs With All Devices and All Platforms
                With 30.000+ Users
              </h3>
              <p>
                Transfering money is eassier than ever, you can access FazzPay
                wherever you are. Desktop, laptop, mobile phone? we cover all of
                that for you!
              </p>
            </span>
            <form className={styles["form"]} onSubmit={handleRegister}>
              <span className={styles["form__firstname-content"]}>
                <label className={styles["label-firstname"]}>
                  <Image
                    src={personIcon}
                    alt="firstname"
                    className={styles["person-icon"]}
                  />
                </label>
                <input
                  type="text"
                  placeholder="Enter your firstname"
                  className={styles["email"]}
                  onChange={(e) => setFirstName(e.target.value)}
                  required
                />
              </span>
              <span className={styles["form__lastname-content"]}>
                <label className={styles["label-lastname"]}>
                  <Image
                    src={personIcon}
                    alt="lastname"
                    className={styles["person-icon"]}
                  />
                </label>
                <input
                  type="text"
                  placeholder="Enter your lastname"
                  className={styles["person-icon"]}
                  onChange={(e) => setLastName(e.target.value)}
                  required
                />
              </span>
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
              <span className={styles["form__password-content"]}>
                <label className={styles["label-password"]}>
                  <Image
                    src={passwordIcon}
                    alt="password"
                    className={styles["password-icon"]}
                  />
                </label>
                <input
                  type="password"
                  placeholder="Enter your password"
                  className={styles["password"]}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </span>
              <button className={styles["btn-login"]}> SignUp </button>
            </form>
            <span className={styles["link-to-login"]}>
              <p>
                Don{`'`}t have an account? Let{`'`}s{" "}
                <span onClick={() => route.push("/auth/login")}>login</span>
              </p>
            </span>
          </div>
        </section>
      </main>
    </>
  );
};

export default Register;
