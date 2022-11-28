import React from "react";

import Image from "next/image";

import { PinInput, PinInputField } from "@chakra-ui/react";

import phone from "../../assets/images/png-phone.png";
import phoneSecond from "../../assets/images/png-phone-2.png";

import styles from "../../styles/Pin.module.css";

const pin = () => {
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
            <span className={styles["pin-form"]}>
              <PinInput otp placeholder="…">
                <PinInputField className={styles["pin-styles"]} />
                <PinInputField className={styles["pin-styles"]} />
                <PinInputField className={styles["pin-styles"]} />
                <PinInputField className={styles["pin-styles"]} />
                <PinInputField className={styles["pin-styles"]} />
                <PinInputField className={styles["pin-styles"]} />
              </PinInput>
            </span>
            <button className={styles["btn-confirm"]}> Confirm </button>
          </div>
        </section>
      </main>
    </>
  );
};

export default pin;
