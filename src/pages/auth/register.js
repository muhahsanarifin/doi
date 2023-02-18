import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import Auth from "../../utils/api/auth";

import { SignUpButton } from "../../components/Button";
import { PreventBackPage } from "../../helpers/handleRoutes";

import phone from "../../assets/images/png-phone.png";
import phoneSecond from "../../assets/images/png-phone-2.png";
import emailIcon from "../../assets/icons/mail.png";
import emailIconBlue from "../../assets/icons/mail-blue.png";
import passwordIcon from "../../assets/icons/lock.png";
import passwordIconBlue from "../../assets/icons/lock-blue.png";
import personIcon from "../../assets/icons/person.png";
import personIconBlue from "../../assets/icons/person-blue.png";

import styles from "../../styles/Register.module.css";
import TitleBar from "../../components/TitleBar";
import { HideShowPassword } from "../../components/Toggle";

const Register = () => {
  const { register, login } = Auth;
  const router = useRouter();
  const [show, setShow] = useState(false);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const response = await register({
        firstName,
        lastName,
        email,
        password,
      });

      if (response.data.status === 200) {
        const response = await login({ email, password });

        const { pin } = response.data.data;
        if (pin === null) return router.push("/auth/pin");
      }
    } catch (error) {
      setErrorMsg(error.response.data.msg);
    }
  };

  return (
    <>
      <PreventBackPage>
        <TitleBar name={"Register"} />
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
                  Start Accessing Banking Needs With All Devices and All
                  Platforms With 30.000+ Users
                </h3>
                <p>
                  Transfering money is eassier than ever, you can access Doi
                  wherever you are. Desktop, laptop, mobile phone? we cover all
                  of that for you!
                </p>
              </span>
              <span className={styles["right-content__description-mobile"]}>
                <h3>Sign Up</h3>
                <p>Create your account to access Doi.</p>
              </span>
              <form className={styles["form"]} onSubmit={handleRegister}>
                <span
                  className={
                    styles[
                      !firstName
                        ? "form__firstname-content"
                        : "form__firstname-content-active"
                    ]
                  }
                >
                  <label className={styles["label-firstname"]}>
                    <Image
                      src={!firstName ? personIcon : personIconBlue}
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
                <span
                  className={
                    styles[
                      !lastName
                        ? "form__lastname-content"
                        : "form__lastname-content-active"
                    ]
                  }
                >
                  <label className={styles["label-lastname"]}>
                    <Image
                      src={!lastName ? personIcon : personIconBlue}
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
                      src={!email ? emailIcon : emailIconBlue}
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
                <span
                  className={
                    styles[
                      !password
                        ? "form__password-content"
                        : "form__password-content-active"
                    ]
                  }
                >
                  <label className={styles["label-password"]}>
                    <Image
                      src={!password ? passwordIcon : passwordIconBlue}
                      alt="password"
                      className={styles["password-icon"]}
                    />
                  </label>
                  <input
                    type={show ? "text" : "password"}
                    placeholder="Enter your password"
                    className={styles["password"]}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <HideShowPassword
                    onClick={() => setShow(!show)}
                    onShow={show}
                    className={styles["show-password"]}
                  />
                </span>
                {errorMsg ? (
                  <span className={styles["error-msg"]}>
                    <p>{errorMsg}</p>
                  </span>
                ) : null}
                <SignUpButton
                  firstName={firstName}
                  lastName={lastName}
                  email={email}
                  password={password}
                />
              </form>
              <span className={styles["link-to-login"]}>
                <p>
                  Don&apos;t have an account? Let&apos;s{" "}
                  <span onClick={() => router.push("/auth/login")}>login</span>
                </p>
              </span>
            </div>
          </section>
        </main>
      </PreventBackPage>
    </>
  );
};

export default Register;
