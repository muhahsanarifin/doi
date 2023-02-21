import React, { useState } from "react";
import { getCookie } from "cookies-next";
import Users from "../../../utils/api/user";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import SideBar from "../../../components/SideBar";
import TitleBar from "../../../components/TitleBar";
import { PinButton } from "../../../components/Button";
import { PinInput, PinInputField } from "@chakra-ui/react";
import userIconBlue from "../../../assets/icons/user-blue.png";

import styles from "../../../styles/PinUpdate.module.css";

const Pin = () => {
  const { updatePinUser } = Users;

  const [numeric, setPin] = useState("");
  const [numericTwo, setPinTwo] = useState("");
  const [numericTree, setPinThree] = useState("");
  const [numericFour, setPinFour] = useState("");
  const [numericFive, setPinFive] = useState("");
  const [numericSix, setPinSix] = useState("");

  let numerics = [
    numeric,
    numericTwo,
    numericTree,
    numericFour,
    numericFive,
    numericSix,
  ];

  const pin = (numerics) => {
    let result = "";
    for (let idx = 0; idx < numerics.length; idx++) {
      result += numerics[idx];
    }
    return parseFloat(result);
  };

  const handleChangePin = async () => {
    try {
      const response = await updatePinUser(
        getCookie("id"),
        pin(numerics),
        getCookie("token")
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
      <TitleBar name={"Change Pin"} />
      <Header />
      <main className={styles["main"]}>
        <SideBar
          focusStyleProfile={styles["focus-style-side-pin-button"]}
          profileStyle={styles["init-button-active"]}
          userIconBlue={userIconBlue}
        />
        <section className={styles["right-side-content"]}>
          <span className={styles["title"]}>
            <h3>Change Pin</h3>
            <p className={styles["description"]}>
              Enter your current 6 digits Fazzpay PIN below to continue to the
              next steps.
            </p>
          </span>
          <span className={styles["form"]}>
            <span className={styles["pin-form"]}>
              <PinInput otp placeholder="_">
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
            <PinButton
              numeric={numeric}
              numericTwo={numericTwo}
              numericTree={numericTree}
              numericFour={numericFour}
              numericFive={numericFive}
              numericSix={numericSix}
              onClick={handleChangePin}
            />
          </span>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Pin;
