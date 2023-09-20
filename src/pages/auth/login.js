import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { setCookie } from "cookies-next";
import { useDispatch, useSelector } from "react-redux";

import TitleBar from "../../components/TitleBar";

import { LoginButton } from "../../components/Button";
import { HideShowPassword } from "../../components/Toggle";
import { ErrorMsg, Loader } from "../../components/Feedback";
import { PreventBackPage } from "../../helpers/handleRoutes";

import * as Banner from "../../components/Banner";
import icon from "../../utils/icon";

import styles from "../../styles/login.module.css";
import authsAction from "../../redux/actions/auth";

const Login = () => {
  const { mail, mailBlue, mailRed, lock, lockBlue, lockRed } = icon;
  const dispatch = useDispatch();
  const login = useSelector((state) => state?.auth?.login);
  const router = useRouter();
  const [body, setBody] = useState({
    email: "",
    password: "",
  });
  const [visiblePwd, setVisiblePwd] = useState(false);

  const handleInput = (el) => {
    const { name, value } = el.target;
    setBody({ ...body, [name]: value.trim() });
  };

  const handleLogin = () => {
    dispatch(
      authsAction.loginThunk({
        body,
        cbFulfilled,
      })
    );
  };

  const cbFulfilled = (response) => {
    if (response.status === 200) {
      const store = ["id", "token"];

      store.map((key) =>
        setCookie(key, key === "id" ? response.data?.id : response.data?.token)
      );
      setCookie("id", response.data?.id);
      setCookie("token", response.data?.token);

      const { pin } = response.data;
      if (pin === null) return router.push("/auth/pin");
    }
  };

  return (
    <>
      <PreventBackPage>
        <TitleBar title={"Login"} />
        <main className={styles["main"]}>
          <section className={styles["content"]}>
            <Banner.Auth />
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
                      login?.isRejected
                        ? "form__email-content-active-error-msg"
                        : !body.email
                        ? "form__email-content"
                        : "form__email-content-active"
                    ]
                  }
                >
                  <label className={styles["label-email"]} htmlFor="email">
                    <Image
                      src={
                        login?.isRejected
                          ? mailRed
                          : !body.email
                          ? mail
                          : mailBlue
                      }
                      alt="email"
                      className={styles["email-icon"]}
                      placeholder="blur"
                    />
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="text"
                    placeholder="Enter your e-mail"
                    className={styles["email"]}
                    onChange={handleInput}
                  />
                </span>
                <span
                  className={
                    styles[
                      login?.isRejected
                        ? "form__password-content-active-error-msg"
                        : !body.password
                        ? "form__password-content"
                        : "form__password-content-active"
                    ]
                  }
                >
                  <label
                    className={styles["label-password"]}
                    htmlFor="password"
                  >
                    <Image
                      src={
                        login?.isRejected
                          ? lockRed
                          : !body.password
                          ? lock
                          : lockBlue
                      }
                      alt="password"
                      className={styles["password-icon"]}
                      placeholder="blur"
                    />
                  </label>
                  <input
                    id="password"
                    name="password"
                    type={visiblePwd ? "text" : "password"}
                    placeholder="Enter your password"
                    className={styles["password"]}
                    onChange={handleInput}
                  />
                  <HideShowPassword
                    onClick={() => setVisiblePwd(!visiblePwd)}
                    onShow={visiblePwd}
                    className={styles["show-password"]}
                  />
                </span>
                <span
                  className={styles["forgot-password"]}
                  onClick={() => router.push("/password/reset")}
                >
                  <p>Forgot password?</p>
                </span>
                <span className={styles["error-msg-section"]}>
                  {login?.isRejected && <ErrorMsg failedMsg={login?.err} />}
                </span>
                <LoginButton
                  disabled={
                    Object.values(body).includes("") || login?.isLoading
                  }
                  init={
                    login?.isLoading ? <Loader onColor="#5464c7" /> : "Login"
                  }
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
