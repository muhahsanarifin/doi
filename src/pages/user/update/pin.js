import React, { useState } from "react";
import { getCookie } from "cookies-next";
import usersAction from "../../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";

import { PrivateRoute } from "../../../helpers/handleRoutes";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import SideBar from "../../../components/SideBar";
import TitleBar from "../../../components/TitleBar";
import { UpdatedPinButton } from "../../../components/Button";
import PinForm from "../../../components/Pin";
import { ChangePinMsg } from "../../../components/Feedback";
import { Loader } from "../../../components/Feedback";


import icon from "../../../utils/icon";
import styles from "../../../styles/pinUpdate.module.css";

const Pin = () => {
  const dispatch = useDispatch();
  const checkPin = useSelector((state) => state.users?.checkPinUser);
  const updatePin = useSelector((state) => state.users?.updatePinUser);
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

  // Check pin
  const handleCheckPin = () => {
    const pin = +numerics.join("");
    const accessToken = getCookie("token");
    dispatch(
      usersAction.checkPinUserThunk({
        pin,
        accessToken,
        cbCPUFinally,
      })
    );
  };

  const cbCPUFinally = () => {
    setPin("");
    setPinTwo("");
    setPinThree("");
    setPinFour("");
    setPinFive("");
    setPinSix("");
  };

  const handleChangePin = () => {
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
        cbUPUFinally,
        cbUPUFulfilled,
      })
    );
  };

  const cbUPUFulfilled = () => {
    setPin("");
    setPinTwo("");
    setPinThree("");
    setPinFour("");
    setPinFive("");
    setPinSix("");
  };

  const cbUPUFinally = () => {
    setTimeout(() => {
      dispatch(usersAction.ccpdThunk());
    }, 1000);

    setTimeout(() => {
      dispatch(usersAction.ccpudThunk());
    }, 2000);
  };

  return (
    <>
      <PrivateRoute>
        <TitleBar title={"Change Pin"} />
        <Header />
        <main className={styles["main"]}>
          <SideBar
            focusStyle={styles["focus-style-side-pin-button"]}
            titleStyle={styles["init-button-active"]}
            activeIcon={icon.userBlue}
            onTitle={"Profile"}
          />
          <section className={styles["right-side-content"]}>
            <span className={styles["title"]}>
              <h3>Change Pin</h3>
              {checkPin?.isFulfilled ? (
                <>
                  {!updatePin?.isFulfilled || updatePin?.isRejected ? (
                    <p className={styles["description"]}>
                      Type{" "}
                      <span style={{ fontWeight: "800" }}>
                        your new 6 digits security PIN{" "}
                      </span>
                      to use in Doi.
                    </p>
                  ) : null}
                </>
              ) : (
                <p className={styles["description"]}>
                  Enter{" "}
                  <span style={{ fontWeight: "800" }}>
                    your current 6 digits Doi PIN{" "}
                  </span>
                  below to continue to the next steps.
                </p>
              )}
            </span>
            <span className={styles["form"]}>
              {checkPin?.isFulfilled ? (
                <>
                  {updatePin?.isFulfilled && (
                    <ChangePinMsg
                      icon={icon.success}
                      msg={updatePin?.data?.msg}
                    />
                  )}
                  {updatePin?.isRejected && (
                    <ChangePinMsg icon={icon.failed} msg={updatePin?.err} />
                  )}
                  {!updatePin?.isFulfilled && (
                    <>
                      <span className={styles["pin-form"]}>
                        <PinForm
                          onSetPin={(e) => setPin(e.target.value)}
                          onSetPinTwo={(e) => setPinTwo(e.target.value)}
                          onSetPinThree={(e) => setPinThree(e.target.value)}
                          onSetPinFour={(e) => setPinFour(e.target.value)}
                          onSetPinFive={(e) => setPinFive(e.target.value)}
                          onSetPinSix={(e) => setPinSix(e.target.value)}
                        />
                      </span>
                      <UpdatedPinButton
                        disabled={
                          !numeric ||
                          !numericTwo ||
                          !numericTree ||
                          !numericFour ||
                          !numericFive ||
                          !numericSix ||
                          updatePin?.isLoading ||
                          numerics.every((num) => num === "0")
                        }
                        initBtn={
                          updatePin?.isLoading ? (
                            <Loader onColor={"#5464c7"} />
                          ) : (
                            "Change PIN"
                          )
                        }
                        onClick={handleChangePin}
                      />
                    </>
                  )}
                </>
              ) : (
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
                        onSetPinFailed={checkPin?.err}
                        onSetPinTrue={checkPin?.data?.msg}
                      />
                      <div className={styles["pin-msg-section"]}>
                        {checkPin?.isFulfilled && (
                          <p className={styles["success-msg"]}>
                            {checkPin?.data?.msg}
                          </p>
                        )}

                        {checkPin?.isRejected && (
                          <p className={styles["failed-msg"]}>
                            {checkPin?.err}
                          </p>
                        )}
                      </div>
                    </div>
                  </span>
                  <UpdatedPinButton
                    disabled={
                      !numeric ||
                      !numericTwo ||
                      !numericTree ||
                      !numericFour ||
                      !numericFive ||
                      !numericSix ||
                      checkPin?.isLoading
                    }
                    initBtn={
                      checkPin?.isLoading ? (
                        <Loader onColor={"#5464c7"} />
                      ) : (
                        "Continue"
                      )
                    }
                    onClick={handleCheckPin}
                  />
                </>
              )}
            </span>
          </section>
        </main>
        <Footer />
      </PrivateRoute>
    </>
  );
};

export default Pin;
