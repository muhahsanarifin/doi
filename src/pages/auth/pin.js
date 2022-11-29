/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Axios from "axios";
import { getCookie } from "cookies-next";
import Image from "next/image";
import Swal from "sweetalert2";
import { useState } from "react";
import { useRouter } from "next/router";

import { PinInput, PinInputField } from "@chakra-ui/react";

import phone from "../../assets/images/png-phone.png";
import phoneSecond from "../../assets/images/png-phone-2.png";

import styles from "../../styles/Pin.module.css";

const pin = () => {
  const router = useRouter();

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

  const handleSetPin = async (e) => {
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
      // console.log(response.data);
      Swal.fire({
        title: "Success create Pin",
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
        position: "top-start",
        background: "#6379F4",
        color: "#ffffff",
        width: "18rem",
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer)
          router.push("/dashbord");
      });
    } catch (error) {
      console.log(error.message);
    }
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
                Secure Your Account, Your Wallet, and Your Data With 6 Digits
                PIN That You Created Yourself.
              </h3>
              <p>
                Create 6 digits pin to secure all your money and your data in
                Doi app. Keep it secret and don’t tell anyone about your Doi
                account password and the PIN.
              </p>
            </span>
            <form className={styles["form"]} onSubmit={handleSetPin}>
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
          </div>
        </section>
      </main>
    </>
  );
};

export default pin;
