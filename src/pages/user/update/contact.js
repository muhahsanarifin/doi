/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Axios from "axios";
import Image from "next/image";
import { useState } from "react";
import { getCookie } from "cookies-next";
import Swal from "sweetalert2";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import SideBar from "../../../components/SideBar";

import styles from "../../../styles/Contact.module.css";
import phoneIcon from "../../../assets/icons/phone.png";

const Contact = () => {
  const [noTelp, setNoTelp] = useState([]);

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
      console.log(`Result: ${response.data}`);
      Swal.fire({
        title: `${response.data.msg}`,
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
        position: "top-start",
        background: "#6379F4",
        color: "#ffffff",
        width: "18rem",
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer)
          window.location.reload();
      });
    } catch (error) {
      // console.log(error.message);
       Swal.fire({
         title: `${error.response.data.msg}`,
         timer: 2000,
         showConfirmButton: false,
         timerProgressBar: true,
         position: "top-start",
         background: "#6379F4",
         color: "#ffffff",
         width: "18rem",
       });
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
                <label className={styles["label-phone"]}>
                  <Image
                    src={phoneIcon}
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
              </li>

              <li className={styles["content-list"]}>
                <button className={styles["btn-manage"]}>
                  Edit Phone Number
                </button>
              </li>
            </ul>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Contact;
