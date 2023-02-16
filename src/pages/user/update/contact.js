/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { getCookie } from "cookies-next";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import SideBar from "../../../components/SideBar";
import { EditPhoneNumberButton } from "../../../components/Button";

import styles from "../../../styles/Contact.module.css";
import phoneIcon from "../../../assets/icons/phone.png";
import phoneIconBlue from "../../../assets/icons/phone-blue.png";

const Contact = () => {
  const [noTelp, setNoTelp] = useState("");

  const handleSetPhoneNumber = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.patch(
        `${process.env.NEXT_PUBLIC_DOI_BACKEND_API}/user/profile/${getCookie(
          "id"
        )}`,
        {
          noTelp,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      if (response.data.status === 200) {
        window.location.reload();
      }
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  return (
    <>
      <Header />
      <main className={styles["main"]}>
        <SideBar />
        <section className={styles["right-side-content"]}>
          <span className={styles["title"]}>
            <h3>Edit Phone Number</h3>
            <p className={styles["description"]}>
              Add at least one phone number for the transfer ID so you can start
              transfering your money to another user.
            </p>
          </span>
          <form className={styles["form"]} onSubmit={handleSetPhoneNumber}>
            <ul className={styles["list"]}>
              <li className={styles["content-list"]}>
                <span
                  className={
                    styles[
                      !noTelp ? "form__telp-content" : "form__telp-content-active"
                    ]
                  }
                >
                  <label className={styles["label-phone"]}>
                    <Image
                      src={!noTelp ? phoneIcon : phoneIconBlue}
                      alt="phone"
                      className={styles["phone-icon"]}
                    />
                  </label>
                  <input
                    type="text"
                    placeholder="Enter your phone number"
                    className={styles["phone"]}
                    onChange={(e) => setNoTelp(e.target.value)}
                    required
                  />
                </span>
              </li>

              <EditPhoneNumberButton noTelp={noTelp} />
            </ul>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
