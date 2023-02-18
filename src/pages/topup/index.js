import React from "react";
import Axios from "axios";
import {PrivateRoute} from "../../helpers/handleRoutes";
import { useState } from "react";
import { getCookie } from "cookies-next";
// import { useRouter} from "next/router"

import TitleBar from "../../components/TitleBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import plusIconBlue from "../../assets/icons/plus-blue.png";

import styles from "../../styles/TopUp.module.css";
import { TopupButton } from "../../components/Button";

const Topup = () => {
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
      // console.log(response.data)
      const { redirectUrl } = response.data.data;
      window.open(redirectUrl, "_blank");
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  return (
    <>
      <PrivateRoute>
        <TitleBar name={"Topup"} />
        <Header />
        <main className={styles["main"]}>
          <SideBar
            focusStyleTopUp={styles["focus-style-side-topup-button"]}
            topUpStyle={styles["init-button-active"]}
            plusIconBlue={plusIconBlue}
          />
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
                    type="number"
                    className={
                      styles[!amount ? "input-number" : "input-number-active"]
                    }
                    onChange={(e) => setAmount(e.target.value)}
                    required
                  />
                </span>
                <TopupButton amount={amount} />
              </form>
            </span>
          </section>
        </main>
        <Footer />
      </PrivateRoute>
    </>
  );
};

export default Topup;
