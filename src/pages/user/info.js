/* eslint-disable react-hooks/rules-of-hooks */
import React, { use } from "react";
// import Axios from "axios";
// import Image from "next/image";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

import privateRoute from "../../helpers/private";

import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import Footer from "../../components/Footer";
import styles from "../../styles/UserInfo.module.css";

const info = () => {
  // « Private Route »
  privateRoute();
  
  const router = useRouter();

  const [firstname, setFirstName] = useState([]);
  const [lastname, setLastName] = useState([]);
  const [email, setEmail] = useState([]);
  const [contact, setNoTelp] = useState([]);

  useEffect(() => {
    setFirstName(getCookie("firstname"));
    setLastName(getCookie("lastname"));
    setEmail(getCookie("email"));
    setNoTelp(getCookie("noTelp"));
  }, []);

  return (
    <>
      <Header />
      <main className={styles["main"]}>
        <SideBar />
        <section className={styles["right-side-content"]}>
          <span className={styles["title"]}>
            <h3>Personal Infromation</h3>
            <p className={styles["description"]}>
              We got your personal information from the sign up proccess. If you
              want to make changes on your information, contact our support.
            </p>
          </span>
          <ul className={styles["list"]}>
            <li className={styles["content-list"]}>
              <span className={styles["sub-content-list"]}>
                <span className={styles["identity"]}>
                  <p className={styles["identify__title"]}>Firstname</p>
                  <p className={styles["identify__main-content"]}>
                    {firstname}
                  </p>
                </span>
              </span>
            </li>
            <li className={styles["content-list"]}>
              <span className={styles["sub-content-list"]}>
                <span className={styles["identity"]}>
                  <p className={styles["identify__title"]}>Lastname</p>
                  <p className={styles["identify__main-content"]}>{lastname}</p>
                </span>
              </span>
            </li>
            <li className={styles["content-list"]}>
              <span className={styles["sub-content-list"]}>
                <span className={styles["identity"]}>
                  <p
                    className={styles["identify__title"]}
                  >{`Verified E-mail`}</p>
                  <p className={styles["identify__main-content"]}>{email}</p>
                </span>
              </span>
            </li>
            <li
              className={`${styles["content-list"]} ${styles["phone-number-content-list"]}`}
            >
              <span className={styles["sub-content-list"]}>
                <span className={styles["identity"]}>
                  <p className={styles["identify__title"]}>Phone Number</p>
                  <p className={styles["identify__main-content"]}>{contact}</p>
                </span>
              </span>
              <button
                className={styles["btn-manage"]}
                onClick={() => router.push("/user/update/contact")}
              >
                Manage
              </button>
            </li>
          </ul>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default info;
