/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Axios from "axios";
import privateRoute from "../../helpers/private";
import { useState } from "react";
import { getCookie } from "cookies-next";
// import { useRouter} from "next/router"

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import Swal from "sweetalert2";

import styles from "../../styles/TopUp.module.css";

const topup = () => {
  // « Private Route »
  privateRoute();

  const [amount, setAmount] = useState("");

  const handleTopUp = async (e) => {
    e.preventDefault();

    try {
      const response = await Axios.post(
        `${process.env.NEXT_PUBLIC_DOI_BACKEND_API}/transaction/top-up`,
        {
          amount,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      console.log(response.data)
      const {redirectUrl} = response.data.data;
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
        window.location.replace(redirectUrl);
      });
    } catch (error) {
      // console.log(error.message);
    }
  };

  return (
    <>
      <Header />
      <main className={styles["main"]}>
        <SideBar />
        <section className={styles["right-side-content"]}>
          <span className={styles["top-up"]}>
            <span className={styles["top-up__title"]}>
              <p className={styles["top-up__title"]}>Topup</p>
            </span>
            <span className={styles["top-up__description"]}>
              <p className={styles["description"]}>
                Enter the amount of money and click submit
              </p>
            </span>
            <form className={styles["form"]} onSubmit={handleTopUp}>
              <span className={styles["top-up__input"]}>
                <input
                  type="text"
                  className={styles["input-text"]}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
              </span>
              <button className={styles["top-up-btn"]}>Submit</button>
            </form>
          </span>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default topup;
