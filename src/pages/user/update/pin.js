import React, { useState } from "react";
import { getCookie } from "cookies-next";
import usersAction from "../../../redux/actions/user";
import { useDispatch } from "react-redux";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import SideBar from "../../../components/SideBar";
import TitleBar from "../../../components/TitleBar";
import { UpdatedPinButton } from "../../../components/Button";
import PinForm from "../../../components/Pin";
import { ChangePinMsg } from "../../../components/Feedback";

import userIconBlue from "../../../assets/icons/user-blue.png";
import styles from "../../../styles/PinUpdate.module.css";
import successIcon from "../../../assets/icons/success.png";
import failedIcon from "../../../assets/icons/failed.png";

const Pin = () => {
  const dispatch = useDispatch();
  const [numeric, setPin] = useState("");
  const [numericTwo, setPinTwo] = useState("");
  const [numericTree, setPinThree] = useState("");
  const [numericFour, setPinFour] = useState("");
  const [numericFive, setPinFive] = useState("");
  const [numericSix, setPinSix] = useState("");

  const [successCheckPinMsg, setSuccessCheckPinMsg] = useState("");
  const [failedCheckPinMsg, setFailedCheckPinMsg] = useState("");

  const [successUpdatePinMsg, setSuccessUpdatePinMsg] = useState("");
  const [failedUpdatePinMsg, setFailedUpdatePinMsg] = useState("");

  const [success, setSuccess] = useState(false); // <- The state declaration is used for conditional rendering.

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

  // Check pin
  const handleCheckPin = () => {
    dispatch(
      usersAction.checkPinUserThunk(
        pin(numerics),
        getCookie("token"),
        resPendingCheckPin,
        resFulfilledCheckPin,
        resRejectedCheckPin,
        resFinallyCheckPin
      )
    );
  };

  // Check pin condition
  const resPendingCheckPin = () => {}; // Developer does not use it temporary to make some condition when request Transfer API.

  const resFulfilledCheckPin = (response) => {
    setTimeout(() => {
      setSuccessCheckPinMsg(response.data?.msg);
    }, 1000);

    setTimeout(() => {
      setSuccess(true);

      setPin("");
      setPinTwo("");
      setPinThree("");
      setPinFour("");
      setPinFive("");
      setPinSix("");
    }, 1500);
  };

  const resRejectedCheckPin = (error) => {
    setFailedCheckPinMsg(error.data?.msg);
  };

  const resFinallyCheckPin = () => {
    setTimeout(() => {
      setSuccessCheckPinMsg(false);
      // setFailedCheckPinMsg(false);
    }, 2000);
  };

  // Change pin
  const body = {
    pin: pin(numerics),
  };

  const handleChangePin = () => {
    dispatch(
      usersAction.updatePinUserThunk(
        getCookie("id"),
        body,
        getCookie("token"),
        resPendingChangePin,
        resFulfilledChangePin,
        resRejectedChangePin,
        resFinallyChangePin
      )
    );
  };

  // Change pin condition
  const resPendingChangePin = () => {}; // Developer does not use it temporary to make some condition when request Transfer API.

  const resFulfilledChangePin = (response) => {
    setTimeout(() => {
      setSuccessUpdatePinMsg(response?.msg);
    }, 1000);

    setTimeout(() => {
      window.location.replace("/user/profile");
    }, 2000);
  };

  const resRejectedChangePin = (error) => {
    setFailedUpdatePinMsg(error.response.data?.msg);
  };

  const resFinallyChangePin = () => {}; // Developer does not use it temporary to make some condition when request Transfer API.

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
            {!success ? (
              <p className={styles["description"]}>
                Enter your current 6 digits Doi PIN below to continue to the
                next steps.
              </p>
            ) : (
              <>
                {!successUpdatePinMsg || failedUpdatePinMsg ? (
                  <p className={styles["description"]}>
                    Type your new 6 digits security PIN to use in Doi.
                  </p>
                ) : null}
              </>
            )}
          </span>
          <span className={styles["form"]}>
            {!success ? (
              <>
                <span className={styles["pin-form"]}>
                  <div className={styles["check-pin-section"]}>
                    <PinForm
                      onSetPin={(e) => setPin(e.target.value)}
                      onSetPinTwo={(e) => setPinTwo(e.target.value)}
                      onSetPinThree={(e) => setPinThree(e.target.value)}
                      onSetPinFour={(e) => setPinFour(e.target.value)}
                      onSetPinFive={(e) => setPinFive(e.target.value)}
                      onSetPinSix={(e) => setPinSix(e.target.value)}
                      onSetPinFailed={failedCheckPinMsg}
                      onSetPinTrue={successCheckPinMsg}
                    />
                    <div className={styles["pin-msg-section"]}>
                      {successCheckPinMsg ? (
                        <p className={styles["success-msg"]}>
                          {successCheckPinMsg}
                        </p>
                      ) : failedCheckPinMsg ? (
                        <p className={styles["failed-msg"]}>
                          {failedCheckPinMsg}
                        </p>
                      ) : null}
                    </div>
                  </div>
                </span>
                <UpdatedPinButton
                  numeric={numeric}
                  numericTwo={numericTwo}
                  numericTree={numericTree}
                  numericFour={numericFour}
                  numericFive={numericFive}
                  numericSix={numericSix}
                  initBtn="Continue"
                  onClick={handleCheckPin}
                />
              </>
            ) : (
              <>
                {!successUpdatePinMsg ? (
                  <>
                    <span className={styles["pin-form"]}>
                      <PinForm
                        onSetPin={(e) => setPin(e.target.value)}
                        onSetPinTwo={(e) => setPinTwo(e.target.value)}
                        onSetPinThree={(e) => setPinThree(e.target.value)}
                        onSetPinFour={(e) => setPinFour(e.target.value)}
                        onSetPinFive={(e) => setPinFive(e.target.value)}
                        onSetPinSix={(e) => setPinSix(e.target.value)}
                        // onSetPinFailed={failedCheckPinMsg}
                        // onSetPinTrue={successCheckPinMsg}
                      />
                    </span>
                    <UpdatedPinButton
                      numeric={numeric}
                      numericTwo={numericTwo}
                      numericTree={numericTree}
                      numericFour={numericFour}
                      numericFive={numericFive}
                      numericSix={numericSix}
                      initBtn="Change PIN"
                      onClick={handleChangePin}
                    />
                  </>
                ) : (
                  <>
                    {successUpdatePinMsg ? (
                      <ChangePinMsg
                        icon={successIcon}
                        msg={successUpdatePinMsg}
                      />
                    ) : failedUpdatePinMsg ? (
                      <ChangePinMsg
                        icon={failedIcon}
                        msg={failedUpdatePinMsg}
                      />
                    ) : null}
                  </>
                )}
              </>
            )}
          </span>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Pin;
