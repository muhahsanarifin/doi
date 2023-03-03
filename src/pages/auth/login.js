import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { setCookie } from "cookies-next";
import { useDispatch } from "react-redux";

import TitleBar from "../../components/TitleBar";

import { LoginButton } from "../../components/Button";
import { HideShowPassword } from "../../components/Toggle";
import { ErrorMsg, Loader } from "../../components/Feedback";
import { PreventBackPage } from "../../helpers/handleRoutes";

import phone from "../../assets/images/png-phone.png";
import phoneSecond from "../../assets/images/png-phone-2.png";
import emailIcon from "../../assets/icons/mail.png";
import emailIconBlue from "../../assets/icons/mail-blue.png";
import emailIconRed from "../../assets/icons/mail-red.png";
import passwordIcon from "../../assets/icons/lock.png";
import passwordIconBlue from "../../assets/icons/lock-blue.png";
import passwordIconRed from "../../assets/icons/lock-red.png";
import styles from "../../styles/Login.module.css";
import authsAction from "../../redux/actions/auth";

const Login = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorLoginMsg, setErrorLoginMsg] = useState("");

  const body = {
    email: email,
    password: password,
  };

  const handleLogin = () => {
    dispatch(
      authsAction.loginThunk(
        body,
        resPendingLogin,
        resFulfilledLogin,
        resRejectedLogin,
        resFinallyLogin
      )
    );
  };

  const resPendingLogin = () => {
    setLoading(true);
  };

  const resFulfilledLogin = (response) => {
    if (response.status === 200) {
      setCookie("id", response.data?.id);
      setCookie("token", response.data?.token);

      router.push("/dashboard");
    }
  };

  const resRejectedLogin = (error) => {
    setErrorLoginMsg(error.response.data?.msg);
  };

  const resFinallyLogin = () => {
    setTimeout(() => {
      setLoading(false);
    }, 1500);
  };

  return (
    <>
      <PreventBackPage>
        <TitleBar name={"Login"} />
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
                <h3>Login</h3>
                <p>
                  Login to your existing account to access all the features in
                  Doi.
                </p>
              </span>
              <span className={styles["form"]}>
                <span
                  className={
                    styles[
                      errorLoginMsg
                        ? "form__email-content-active-error-msg"
                        : !email
                        ? "form__email-content"
                        : "form__email-content-active"
                    ]
                  }
                >
                  <label className={styles["label-email"]}>
                    <Image
                      src={
                        errorLoginMsg
                          ? emailIconRed
                          : !email
                          ? emailIcon
                          : emailIconBlue
                      }
                      alt="email"
                      className={styles["email-icon"]}
                    />
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your e-mail"
                    className={styles["email"]}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </span>
                <span
                  className={
                    styles[
                      errorLoginMsg
                        ? "form__password-content-active-error-msg"
                        : !password
                        ? "form__password-content"
                        : "form__password-content-active"
                    ]
                  }
                >
                  <label className={styles["label-password"]}>
                    <Image
                      src={
                        errorLoginMsg
                          ? passwordIconRed
                          : !password
                          ? passwordIcon
                          : passwordIconBlue
                      }
                      alt="password"
                      className={styles["password-icon"]}
                    />
                  </label>
                  <input
                    type={show ? "text" : "password"}
                    placeholder="Enter your password"
                    className={styles["password"]}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <HideShowPassword
                    onClick={() => setShow(!show)}
                    onShow={show}
                    className={styles["show-password"]}
                  />
                </span>
                <span
                  className={styles["forgot-password"]}
                  onClick={() => router.push("/password/reset")}
                >
                  <p>Forgot password ?</p>
                </span>
                <span className={styles["error-msg-section"]}>
                  {errorLoginMsg ? (
                    <ErrorMsg failedMsg={errorLoginMsg} />
                  ) : null}
                </span>
                <LoginButton
                  email={email}
                  password={password}
                  init={loading ? <Loader onColor="#5464c7" /> : "Login"}
                  onClick={handleLogin}
                />
              </span>
              <span className={styles["link-to-sign-up"]}>
                <p>
                  Don&apos;t have an account? Let&apos;s{" "}
                  <span onClick={() => router.push("/auth/register")}>
                    Sign Up
                  </span>
                </p>
              </span>
            </div>
          </section>
        </main>
      </PreventBackPage>
    </>
  );
};

export default Login;
