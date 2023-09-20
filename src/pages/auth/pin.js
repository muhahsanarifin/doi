import React, { useState } from "react";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useRouter } from "next/router";
import usersAction from "../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";
import { PinInput, PinInputField } from "@chakra-ui/react";

import { PrivateRoute } from "../../helpers/handleRoutes";

import { GoToDashboardButton, PinButton } from "../../components/Button";
import TitleBar from "../../components/TitleBar";
import { CreatePinMsg, ErrorMsg } from "../../components/Feedback";
import { Loader } from "../../components/Feedback";

import icon from "../../utils/icon";
import styles from "../../styles/pinCreate.module.css";

const Pin = () => {
  const dispatch = useDispatch();
  const updatePinUser = useSelector((state) => state.user?.updatePinUser);
  const router = useRouter();
  const [numeric, setPin] = useState("");
  const [numericTwo, setPinTwo] = useState("");
  const [numericTree, setPinThree] = useState("");
  const [numericFour, setPinFour] = useState("");
  const [numericFive, setPinFive] = useState("");
  const [numericSix, setPinSix] = useState("");

  const numerics = [
    numeric,
    numericTwo,
    numericTree,
    numericFour,
    numericFive,
    numericSix,
  ];

  const handleSetPin = () => {
    const id = getCookie("id");
    const accessToken = getCookie("token");
    const body = {
      pin: Number(numerics.join("")),
    };
    dispatch(
      usersAction.updatePinUserThunk({
        id,
        body,
        accessToken,
      })
    );
  };

  const handleGoToDashboard = () => {
    router.replace("/dashboard");

    dispatch(usersAction.ccpdThunk());
  };

  return (
    <>
      <PrivateRoute>
        <TitleBar title={"Create Pin"} />
        <main className={styles["main"]}>
          <section className={styles["content"]}>
            <aside className={styles["left-content"]}>
              <h3 className={styles["init-logo"]}>Doi</h3>
              <span className={styles["left-content_image"]}>
                <Image
                  src={icon.phone}
                  alt={`phone`}
                  className={`${styles["image"]} ${styles["image-one"]}`}
                />
                <Image
                  src={icon.phoneSecond}
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
              {updatePinUser?.isFulfilled ? (
                <CreatePinMsg
                  icon={icon.success}
                  msg={updatePinUser?.data?.msg}
                />
              ) : (
                <>
                  <span className={styles["right-content__description"]}>
                    <h3>
                      Secure Your Account, Your Wallet, and Your Data With 6
                      Digits PIN That You Created Yourself.
                    </h3>
                    <p>
                      Create 6 digits pin to secure all your money and your data
                      in Doi app. Keep it secret and don’t tell anyone about
                      your Doi account password and the PIN.
                    </p>
                  </span>
                  <span className={styles["right-content__description-mobile"]}>
                    <h3>Create PIN</h3>
                    <p>
                      Create 6 digits pin to secure all your money and your data
                      in Doi app. Keep it secret and don’t tell anyone about
                      your Doi account password and the PIN.
                    </p>
                  </span>
                </>
              )}
              <span className={styles["form"]}>
                {updatePinUser?.isFulfilled ? null : (
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
                )}
                {updatePinUser?.isRejected ? (
                  <ErrorMsg failedMsg={updatePinUser?.err} />
                ) : null}
                {updatePinUser?.isFulfilled ? (
                  <GoToDashboardButton onClick={handleGoToDashboard} />
                ) : (
                  <PinButton
                    numeric={numeric}
                    numericTwo={numericTwo}
                    numericTree={numericTree}
                    numericFour={numericFour}
                    numericFive={numericFive}
                    numericSix={numericSix}
                    disabled={
                      !numeric ||
                      !numericTwo ||
                      !numericTree ||
                      !numericFour ||
                      !numericFive ||
                      !numericSix ||
                      updatePinUser?.isLoading
                    }
                    onClick={handleSetPin}
                    init={updatePinUser?.isLoading ? <Loader /> : "Confirm"}
                  />
                )}
              </span>
            </div>
          </section>
        </main>
      </PrivateRoute>
    </>
  );
};

export default Pin;
