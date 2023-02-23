import React, { useState } from "react";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import usersAction from "../../redux/actions/user";
import { useDispatch } from "react-redux";

import { PinInput, PinInputField } from "@chakra-ui/react";
import { GoToDashboardButton, PinButton } from "../../components/Button";
import TitleBar from "../../components/TitleBar";
import successIcon from "../../assets/icons/success.png";
import { CreatePinMsg, ErrorMsg } from "../../components/Feedback";

import phone from "../../assets/images/png-phone.png";
import phoneSecond from "../../assets/images/png-phone-2.png";
import styles from "../../styles/PinCreate.module.css";

const Pin = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [numeric, setPin] = useState("");
  const [numericTwo, setPinTwo] = useState("");
  const [numericTree, setPinThree] = useState("");
  const [numericFour, setPinFour] = useState("");
  const [numericFive, setPinFive] = useState("");
  const [numericSix, setPinSix] = useState("");
  const [successCreatePinMsg, setSuccessCreatePinMsg] = useState("");
  const [failedCreatePinMsg, setFailedCreatePinMsg] = useState("");

  const numerics = [
    numeric,
    numericTwo,
    numericTree,
    numericFour,
    numericFive,
    numericSix,
  ];

  // const pin = (numeric) => {
  //   let result = [];
  //   for (let idx = 0; idx < numeric.length; idx++) {
  //     result.push(parseFloat(numeric[idx]));
  //   }
  //   return result;
  // };

  // const pin = (numerics) => { // <= Short hand
  //   return parseFloat(numerics.join(""));
  // }
  // console.log(pin(numerics));

  const pin = (numerics) => {
    let result = "";
    for (let idx = 0; idx < numerics.length; idx++) {
      result += numerics[idx];
    }
    return parseFloat(result);
  };

  const body = {
    pin: pin(numerics),
  };

  const handleSetPin = () => {
    dispatch(
      usersAction.updatePinUserThunk(
        getCookie("id"),
        body,
        getCookie("token"),
        resCreatePinPending,
        resCreatePinFulfilled,
        resCreatePinRejected,
        resCreatePinFinally
      )
    );
  };

  const resCreatePinPending = () => {};

  const resCreatePinFulfilled = (response) => {
    setSuccessCreatePinMsg(response.data?.msg);
  };

  const resCreatePinRejected = (error) => {
    setFailedCreatePinMsg(error.data?.msg);
  };

  const resCreatePinFinally = () => {};

  return (
    <>
      <TitleBar name={"Create Pin"} />
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
                trends. 5000+ users registered in Doi everyday with worldwide
                users coverage.
              </p>
            </span>
          </aside>
          <div className={styles["right-content"]}>
            {!successCreatePinMsg ? (
              <>
                <span className={styles["right-content__description"]}>
                  <h3>
                    Secure Your Account, Your Wallet, and Your Data With 6
                    Digits PIN That You Created Yourself.
                  </h3>
                  <p>
                    Create 6 digits pin to secure all your money and your data
                    in Doi app. Keep it secret and don’t tell anyone about your
                    Doi account password and the PIN.
                  </p>
                </span>
                <span className={styles["right-content__description-mobile"]}>
                  <h3>Create PIN</h3>
                  <p>
                    Create 6 digits pin to secure all your money and your data
                    in Doi app. Keep it secret and don’t tell anyone about your
                    Doi account password and the PIN.
                  </p>
                </span>
              </>
            ) : (
              <CreatePinMsg icon={successIcon} />
            )}
            <span className={styles["form"]}>
              <span className={styles["pin-form"]}>
                <PinInput otp placeholder="_">
                  <PinInputField
                    className={styles["pin-styles"]}
                    onChange={(e) => setPin(e.target.value)}
                  />
                  <PinInputField
                    className={styles["pin-styles"]}
                    onChange={(e) => setPinTwo(e.target.value)}
                  />
                  <PinInputField
                    className={styles["pin-styles"]}
                    onChange={(e) => setPinThree(e.target.value)}
                  />
                  <PinInputField
                    className={styles["pin-styles"]}
                    onChange={(e) => setPinFour(e.target.value)}
                  />
                  <PinInputField
                    className={styles["pin-styles"]}
                    onChange={(e) => setPinFive(e.target.value)}
                  />
                  <PinInputField
                    className={styles["pin-styles"]}
                    onChange={(e) => setPinSix(e.target.value)}
                  />
                </PinInput>
              </span>
              {failedCreatePinMsg ? (
                <ErrorMsg failedMsg={failedCreatePinMsg} />
              ) : null}
              {!successCreatePinMsg ? (
                <PinButton
                  numeric={numeric}
                  numericTwo={numericTwo}
                  numericTree={numericTree}
                  numericFour={numericFour}
                  numericFive={numericFive}
                  numericSix={numericSix}
                  onClick={handleSetPin}
                />
              ) : (
                <GoToDashboardButton
                  onClick={() => router.replace("/dashboard")}
                />
              )}
            </span>
          </div>
        </section>
      </main>
    </>
  );
};

export default Pin;
