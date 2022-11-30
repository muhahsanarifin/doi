import React from "react";
import { useState, useToggle } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import { setCookie } from "cookies-next";
import Axios from "axios";
import Swal from "sweetalert2";

// import Toast from "../../components/Toast";
// import Layout from "../../components/Layout";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

import phone from "../../assets/images/png-phone.png";
import phoneSecond from "../../assets/images/png-phone-2.png";
import emailIcon from "../../assets/icons/mail.png";
import passwordIcon from "../../assets/icons/lock.png";

import styles from "../../styles/Login.module.css";

const Login = () => {
  // « Layout »
  // <Layout title="Login" />;

  // « Toast »
  // const toast = useToast();

  // « Init »
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.post(
        `${process.env.NEXT_PUBLIC_DOI_BACKEND_API}/auth/login`,
        {
          email,
          password,
        }
      );

      setCookie("id", `${response.data.data.id}`);
      setCookie("token", `${response.data.data.token}`);

      const { pin } = response.data.data;
      console.log(response.data);
      if (pin === null)
        Swal.fire({
          title: "Please, create pin",
          showConfirmButton: false,
          timer: 2000,
          position: "top-start",
          background: "#6379F4",
          color: "#ffffff",
          width: "18rem",
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer)
            router.push("/auth/pin");
        });
      if (pin)
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
            router.push("/dashbord");
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

  const showPassword = () => {
    setShow(!show);
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
            <form className={styles["form"]} onSubmit={handleSubmit}>
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
                  type={show ? "text" : "password"}
                  placeholder="Enter your password"
                  className={styles["password"]}
                  onChange={(e) => setPassword(e.target.value)}
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
                className={styles["forgot-password"]}
                onClick={() => router.push("/password/reset")}
              >
                <p>Forgot password ?</p>
              </span>
              <button className={styles["btn-login"]}>Login</button>
            </form>
            <span className={styles["link-to-sign-up"]}>
              <p>
                Don{`'`}t have an account? Let{`'`}s{" "}
                <span onClick={() => router.push("/auth/register")}>
                  Sign Up
                </span>
              </p>
            </span>
          </div>
        </section>
      </main>
    </>
  );
};

export default Login;
