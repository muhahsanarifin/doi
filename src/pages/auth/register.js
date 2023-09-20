import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import authsAction from "../../redux/actions/auth";
import { useDispatch, useSelector } from "react-redux";

import { SignUpButton } from "../../components/Button";
import { PreventBackPage } from "../../helpers/handleRoutes";
import { ErrorMsg, Loader } from "../../components/Feedback";
import { HideShowPassword } from "../../components/Toggle";
import TitleBar from "../../components/TitleBar";
import { SuccessMsg } from "../../components/Feedback";

import * as Banner from "../../components/Banner";
import icon from "../../utils/icon";
import styles from "../../styles/register.module.css";

const Register = () => {
  const { mail, mailBlue, lock, lockBlue, person, personBlue, success } = icon;
  const register = useSelector((state) => state.auth?.register);
  const dispatch = useDispatch();
  const router = useRouter();
  const [show, setShow] = useState(false);

  const [body, setBody] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInput = (el) => {
    const { name, value } = el.target;
    setBody({ ...body, [name]: value.trim() });
  };

  const handleRegister = () => {
    dispatch(authsAction.registerThunk(body, cbRFulfilled));
  };

  // Register condition callback function
  const cbRFulfilled = () => {
    setTimeout(() => {
      dispatch(authsAction.crdThunk());
    }, 1000);
  };

  return (
    <>
      <PreventBackPage>
        <TitleBar title={"Register"} />
        <main className={styles["main"]}>
          <section className={styles["content"]}>
            <Banner.Auth />
            {register?.isFulfilled ? (
              <div className={styles["right-content"]}>
                <span className={styles["success-msg-section"]}>
                  <Image
                    src={success}
                    width={100}
                    height={100}
                    style={{
                      width: "48px",
                      height: "48px",
                      alignSelf: "center",
                    }}
                    alt="Success Icon"
                    placeholder="blur"
                  />
                  <SuccessMsg fulfilledMsg={register?.data.msg} />
                </span>
              </div>
            ) : (
              <div className={styles["right-content"]}>
                <span className={styles["right-content__description"]}>
                  <h3>
                    Start Accessing Banking Needs With All Devices and All
                    Platforms With 30.000+ Users
                  </h3>
                  <p>
                    Transfering money is eassier than ever, you can access Doi
                    wherever you are. Desktop, laptop, mobile phone? we cover
                    all of that for you!
                  </p>
                </span>
                <span className={styles["right-content__description-mobile"]}>
                  <h3>Sign Up</h3>
                  <p>Create your account to access Doi.</p>
                </span>
                <span className={styles["form"]}>
                  <span
                    className={
                      styles[
                        !body.firstName
                          ? "form__firstname-content"
                          : "form__firstname-content-active"
                      ]
                    }
                  >
                    <label
                      className={styles["label-firstname"]}
                      htmlFor="firstName"
                    >
                      <Image
                        src={!body.firstName ? person : personBlue}
                        alt="firstname"
                        className={styles["person-icon"]}
                        placeholder="blur"
                      />
                    </label>
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      placeholder="Enter your firstname"
                      onChange={handleInput}
                      required
                    />
                  </span>
                  <span
                    className={
                      styles[
                        !body.lastName
                          ? "form__lastname-content"
                          : "form__lastname-content-active"
                      ]
                    }
                  >
                    <label
                      className={styles["label-lastname"]}
                      htmlFor="lastName"
                    >
                      <Image
                        src={!body.lastName ? person : personBlue}
                        alt="lastname"
                        className={styles["person-icon"]}
                        placeholder="blur"
                      />
                    </label>
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      placeholder="Enter your lastname"
                      onChange={handleInput}
                      required
                    />
                  </span>
                  <span
                    className={
                      styles[
                        !body.email
                          ? "form__email-content"
                          : "form__email-content-active"
                      ]
                    }
                  >
                    <label className={styles["label-email"]} htmlFor="email">
                      <Image
                        src={!body.email ? mail : mailBlue}
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
                      onChange={handleInput}
                      required
                    />
                  </span>
                  <span
                    className={
                      styles[
                        !body.password
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
                        src={!body.password ? lock : lockBlue}
                        alt="password"
                        className={styles["password-icon"]}
                        placeholder="blur"
                      />
                    </label>
                    <input
                      id="password"
                      name="password"
                      type={show ? "text" : "password"}
                      placeholder="Enter your password"
                      onChange={handleInput}
                      required
                    />
                    <HideShowPassword
                      onClick={() => setShow(!show)}
                      onShow={show}
                      className={styles["show-password"]}
                    />
                  </span>
                  <span className={styles["error-msg-section"]}>
                    {register?.isRejected && (
                      <ErrorMsg failedMsg={register?.err} />
                    )}
                  </span>
                  <SignUpButton
                    disabled={Object.values(body).includes("")}
                    onClick={handleRegister}
                    init={
                      register?.isLoading ? (
                        <Loader onColor="#5464c7" />
                      ) : (
                        "SignUp"
                      )
                    }
                  />
                </span>
                <span className={styles["link-to-login"]}>
                  <p>
                    Don&apos;t have an account? Let&apos;s{" "}
                    <span onClick={() => router.push("/auth/login")}>
                      login
                    </span>
                  </p>
                </span>
              </div>
            )}
          </section>
        </main>
      </PreventBackPage>
    </>
  );
};

export default Register;
