/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";

import Axios from "axios";
import { useState } from "react";
import { getCookie } from "cookies-next";
import Swal from "sweetalert2";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import SideBar from "../../../components/SideBar";

import { PinInput, PinInputField } from "@chakra-ui/react";

import styles from "../../../styles/PinUpdate.module.css";

const pin = () => {
  let [numeric, setPin] = useState([]);
  let [numericTwo, setPinTwo] = useState([]);
  let [numericTree, setPinThree] = useState([]);
  let [numericFour, setPinFour] = useState([]);
  let [numericFive, setPinFive] = useState([]);
  let [numericSixe, setPinSix] = useState([]);

  let numerics = [
    numeric,
    numericTwo,
    numericTree,
    numericFour,
    numericFive,
    numericSixe,
  ];

  let pin = numerics.join("");

  const handleChangePin = async (e) => {
    e.preventDefault();
    try {
      const response = await Axios.patch(
        `${process.env.NEXT_PUBLIC_DOI_BACKEND_API}/user/pin/${getCookie(
          "id"
        )}`,
        {
          pin,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
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
      console.log(error.message);
    }
  };
  return (
    <>
      <Header />
      <main className={styles["main"]}>
        <SideBar />
        <section className={styles["right-side-content"]}>
          <span className={styles["title"]}>
            <h3>Change Pin</h3>
            <p className={styles["description"]}>
              Enter your current 6 digits Fazzpay PIN below to continue to the
              next steps.
            </p>
          </span>
          <form className={styles["form"]} onSubmit={handleChangePin}>
            <span className={styles["pin-form"]}>
              <PinInput otp placeholder="…">
                <PinInputField
                  className={styles["pin-styles"]}
                  onChange={(e) => setPin(e.target.value)}
                  required
                />
                <PinInputField
                  className={styles["pin-styles"]}
                  onChange={(e) => setPinTwo(e.target.value)}
                  required
                />
                <PinInputField
                  className={styles["pin-styles"]}
                  onChange={(e) => setPinThree(e.target.value)}
                  required
                />
                <PinInputField
                  className={styles["pin-styles"]}
                  onChange={(e) => setPinFour(e.target.value)}
                  required
                />
                <PinInputField
                  className={styles["pin-styles"]}
                  onChange={(e) => setPinFive(e.target.value)}
                  required
                />
                <PinInputField
                  className={styles["pin-styles"]}
                  onChange={(e) => setPinSix(e.target.value)}
                  required
                />
              </PinInput>
            </span>
            <button className={styles["btn-confirm"]}> Confirm </button>
          </form>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default pin;
