import React, { useState, useRef, useEffect } from "react";
import { getCookie } from "cookies-next";
import usersAction from "../../redux/actions/user";
import { useDisclosure } from "@chakra-ui/react";
import { PrivateRoute } from "../../helpers/handleRoutes";
import { PinModalTopUp } from "../../components/Overlay";
import topUpAction from "../../redux/actions/topup";
import { useDispatch } from "react-redux";
import { TopUpMsg } from "../../components/Feedback";
import { TopupButton, TryAgainButton } from "../../components/Button";

import TitleBar from "../../components/TitleBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import plusIconBlue from "../../assets/icons/plus-blue.png";
import successIcon from "../../assets/icons/success.png";
import failedIcon from "../../assets/icons/failed.png";
import styles from "../../styles/TopUp.module.css";

const Topup = () => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [numeric, setPin] = useState("");
  const [numericTwo, setPinTwo] = useState("");
  const [numericTree, setPinThree] = useState("");
  const [numericFour, setPinFour] = useState("");
  const [numericFive, setPinFive] = useState("");
  const [numericSix, setPinSix] = useState("");
  const [succes, setSuccess] = useState("");
  const [failed, setFailed] = useState("");
  const [trueSuccessMsg, setTrueSuccessMsg] = useState(false);
  const [trueFailedMsg, setTrueFailedMsg] = useState(false);
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const [closeModal, setCloseModal] = useState(false);
  const [failedMsgTopUp, setFailedMsgTopUp] = useState("");
  const [successMsgTopUp, setSuccessMsgTopUp] = useState("");
  const [failedTopUp, setFailedTopUp] = useState(false);
  const [successTopUp, setSuccessTopUp] = useState(false);

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

  // Handle currency
  const idrCurreny = (number) => {
    return Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const handleConfimationTopUp = () => {
    // console.log("Test");
    dispatch(
      usersAction.checkPinUserThunk(
        pin(numerics),
        getCookie("token"),
        resPendingCheckPinUser,
        resFulfilledCheckPinUser,
        resRejectedCheckPinUser,
        resFinallyCheckPinUser
      )
    );
  };

  // Check pin user condition
  const resPendingCheckPinUser = () => {
    setLoading(true);
  };

  const body = {
    amount: amount,
  };

  const resFulfilledCheckPinUser = (response) => {
    setFailedMsgTopUp(false);

    const minValue = 20000;
    if (amount < minValue)
      return setFailedMsgTopUp(
        `Minumum amount to top-up ${idrCurreny(minValue)}`
      );

    setSuccess(response.data?.msg);
    setTimeout(() => {
      setTrueFailedMsg(false);
      setTrueSuccessMsg(true);
    }, 1000);

    setTimeout(() => {
      setCloseModal(true);
    }, 2000);

    dispatch(
      topUpAction.topUpThunk(
        body,
        getCookie("token"),
        resPendingTopUp,
        resFulfilledTopUp,
        resRejectedTopUp,
        resFinallyTopUp
      )
    );
  };

  const resRejectedCheckPinUser = (error) => {
    setLoading(false);
    setTrueSuccessMsg(false);
    setFailed(error?.data.msg);
    setTrueFailedMsg(true);
  };

  const resFinallyCheckPinUser = () => {
    setTrueSuccessMsg(false);
  };

  // Top Up Condition
  const resPendingTopUp = () => {}; // Developer does not use it temporarily.

  const resFulfilledTopUp = (response) => {
    setSuccessMsgTopUp(response.data?.msg);

    setTimeout(() => {
      setSuccessTopUp(true);
    }, 1000);

    setTimeout(() => {
      const { redirectUrl } = response.data.data;
      window.open(redirectUrl, "_blank");
      window.location.replace("/dashboard");
    }, 2000);
  };

  const resRejectedTopUp = (response) => {
    setFailedTopUp(true);
    setFailedMsgTopUp(response.response.data?.msg);
  };

  const resFinallyTopUp = () => {
    setSuccessTopUp(false);
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
            <span
              className={styles[!successTopUp ? "top-up" : "top-up-visible-bg"]}
            >
              {!successTopUp ? (
                <>
                  {failedMsgTopUp ? (
                    <TopUpMsg icon={failedIcon} msg={failedMsgTopUp} />
                  ) : null}
                  <span className={styles["top-up__title"]}>
                    <p className={styles["top-up__title"]}>Topup</p>
                  </span>
                  <span className={styles["top-up__description"]}>
                    <p className={styles["description"]}>
                      Enter the amount of money and click submit
                    </p>
                  </span>
                  <span className={styles["form"]}>
                    <span className={styles["top-up__input"]}>
                      <input
                        type="number"
                        className={
                          styles[
                            failedMsgTopUp
                              ? "input-number-failed"
                              : !amount
                              ? "input-number"
                              : "input-number-active"
                          ]
                        }
                        onChange={(e) => setAmount(e.target.value)}
                        value={"-Infinity" < amount ? amount : !amount}
                      />
                    </span>
                    {failedTopUp || failedMsgTopUp ? (
                      <TryAgainButton disabled={amount} onClick={onOpen} />
                    ) : (
                      <TopupButton disabled={amount} onClick={onOpen} />
                    )}
                  </span>
                </>
              ) : (
                <TopUpMsg icon={successIcon} msg={successMsgTopUp} />
              )}
            </span>
          </section>
        </main>
        <Footer />
      </PrivateRoute>
      {/* Pin Modal Topup */}
      {closeModal ? null : (
        <PinModalTopUp
          initBtn="Continue"
          isOpen={isOpen}
          onClose={onClose}
          onClick={handleConfimationTopUp}
          onSetPin={(e) => setPin(e.target.value)}
          onSetPinTwo={(e) => setPinTwo(e.target.value)}
          onSetPinThree={(e) => setPinThree(e.target.value)}
          onSetPinFour={(e) => setPinFour(e.target.value)}
          onSetPinFive={(e) => setPinFive(e.target.value)}
          onSetPinSix={(e) => setPinSix(e.target.value)}
          disabled={
            !numeric ||
            !numericTwo ||
            !numericTree ||
            !numericFour ||
            !numericFive ||
            !numericSix
          }
          onSetSuccess={succes}
          onSetFailed={failed}
          onTrueSuccessMsg={trueSuccessMsg}
          onTrueFailedMsg={trueFailedMsg}
          onLoading={loading}
        />
      )}
    </>
  );
};

export default Topup;
