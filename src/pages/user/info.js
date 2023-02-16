import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import privateRoute from "../../helpers/private";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import Footer from "../../components/Footer";
import TitleBar from "../../components/TitleBar";
import userIconBlue from "../../assets/icons/user-blue.png";

import styles from "../../styles/UserInfo.module.css";

const Info = () => {
  // Private Route
  privateRoute();
  const user = useSelector((state) => state.users.getDataUser?.data);
  const router = useRouter();
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
  }, [user.firstName, user.lastName]);

  return (
    <>
      <TitleBar name={"Personal Information"} />
      <Header />
      <main className={styles["main"]}>
        <SideBar
          focusStyleProfile={styles["focus-style-side-info-button"]}
          profileStyle={styles["init-button-active"]}
          userIconBlue={userIconBlue}
        />
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
                  <input
                    type="text"
                    className={styles["identify__main-content"]}
                    value={firstname}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </span>
              </span>
            </li>
            <li className={styles["content-list"]}>
              <span className={styles["sub-content-list"]}>
                <span className={styles["identity"]}>
                  <p className={styles["identify__title"]}>Lastname</p>
                  <input
                    type="text"
                    className={styles["identify__main-content"]}
                    value={lastname}
                    onChange={(e) => setLastName(e.target.name)}
                  />
                </span>
              </span>
            </li>
            <li className={styles["content-list"]}>
              <span className={styles["sub-content-list"]}>
                <span className={styles["identity"]}>
                  <p className={styles["identify__title"]}>Verified E-mail</p>
                  <p className={styles["identify__main-content"]}>
                    {user.email}
                  </p>
                </span>
              </span>
            </li>
            <li
              className={`${styles["content-list"]} ${styles["phone-number-content-list"]}`}
            >
              <span className={styles["sub-content-list"]}>
                <span className={styles["identity"]}>
                  <p className={styles["identify__title"]}>Phone Number</p>
                  <p className={styles["identify__main-content"]}>
                    {user.noTelp}
                  </p>
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

export default Info;
