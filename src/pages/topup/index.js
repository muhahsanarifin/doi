import React, { useState, useRef } from "react";
import { getCookie } from "cookies-next";
import { useDispatch, useSelector } from "react-redux";
import { useDisclosure, CloseButton, useOutsideClick } from "@chakra-ui/react";

import topUpAction from "../../redux/actions/topup";
import usersAction from "../../redux/actions/user";
import { PrivateRoute } from "../../helpers/handleRoutes";

import { PinModalTopUp } from "../../components/Overlay";
import { TopupButton, TryAgainButton } from "../../components/Button";
import { TopUpMsg } from "../../components/Feedback";
import TitleBar from "../../components/TitleBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";

import icon from "../../utils/icon";
import styles from "../../styles/topUp.module.css";

const Topup = () => {
  const dispatch = useDispatch();
  const topUp = useSelector((state) => state.topUp?.topUp);
  const checkPin = useSelector((state) => state.users?.checkPinUser);
  const [amount, setAmount] = useState("");
  const [numeric, setPin] = useState("");
  const [numericTwo, setPinTwo] = useState("");
  const [numericTree, setPinThree] = useState("");
  const [numericFour, setPinFour] = useState("");
  const [numericFive, setPinFive] = useState("");
  const [numericSix, setPinSix] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

  const handleInput = (e) => {
    setAmount(e.target.value);
  };

  let numerics = [
    numeric,
    numericTwo,
    numericTree,
    numericFour,
    numericFive,
    numericSix,
  ];

  const handleConfimationTopUp = () => {
    const pin = Number(numerics.join(""));
    const accessToken = getCookie("token");
    dispatch(
      usersAction.checkPinUserThunk({
        pin,
        accessToken,
        cbCPUFulfilled,
      })
    );
  };

  // Check pin user condition
  const cbCPUFulfilled = () => {
    setPin("");
    setPinTwo("");
    setPinThree("");
    setPinFour("");
    setPinFive("");
    setPinSix("");
    
    setTimeout(() => {
      dispatch(usersAction.ccpudThunk());
    }, 1000);

    const body = {
      amount: amount,
    };

    const accessToken = getCookie("token");

    dispatch(
      topUpAction.topUpThunk({
        body,
        accessToken,
        cbTUFulfilled,
      })
    );
  };

  // Top Up Condition
  const cbTUFulfilled = (response) => {
    setTimeout(() => {
      const { redirectUrl } = response.data.data;
      window.open(redirectUrl, "_blank");
    }, 1000);
  };

  // Handle outsideclick of TopUp Success Message element.
  const topUpMsgRef = useRef();

  const handleCLoseTopUp = () => {
    dispatch(topUpAction.ctuadThunk());
  };

  useOutsideClick({
    ref: topUpMsgRef,
    handler: handleCLoseTopUp,
  });

  return (
    <>
      <PrivateRoute>
        <TitleBar title={"Top Up"} />
        <Header />
        <main className={styles["main"]}>
          <SideBar
            focusStyle={styles["focus-style-side-topup-button"]}
            titleStyle={styles["init-button-active"]}
            activeIcon={icon.plusBlue}
            onTitle={"Top Up"}
          />
          <section className={styles["right-side-content"]}>
            <span className={styles["top-up"]}>
              {topUp?.isRejected && (
                <TopUpMsg icon={icon.failed} msg={topUp?.err} />
              )}

              {topUp?.isFulfilled && (
                <>
                  <div className={styles["close-btn"]}>
                    <CloseButton size="md" />
                  </div>
                  <TopUpMsg
                    icon={icon.success}
                    msg={`${topUp?.data?.msg}!`}
                    ref={topUpMsgRef}
                  />
                </>
              )}

              {!topUp?.isFulfilled && (
                <>
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
                            amount < 20000 && amount
                              ? "input-number-failed"
                              : !amount
                              ? "input-number"
                              : "input-number-active"
                          ]
                        }
                        onChange={handleInput}
                        value={"-Infinity" < amount ? amount : !amount}
                      />
                      <div className={styles["min-amount-sec"]}>
                        {amount < 20000 && amount && (
                          <p className={styles["min-amount"]}>
                            Minumum amount to top-up Rp 20.000,00
                          </p>
                        )}
                      </div>
                    </span>
                    {topUp?.isRejected ? (
                      <TryAgainButton disabled={amount} onClick={onOpen} />
                    ) : (
                      <TopupButton
                        disabled={amount < 20000 || !amount}
                        onClick={onOpen}
                      />
                    )}
                  </span>
                </>
              )}
            </span>
          </section>
        </main>
        <Footer />
      </PrivateRoute>
      {/* Pin Modal Topup */}
      <PinModalTopUp
        initBtn="Continue"
        isOpen={topUp.isFulfilled ? false : isOpen}
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
          !numericSix ||
          checkPin?.isLoading ||
          checkPin?.isFulfilled
        }
        onSuccessMsg={checkPin?.data?.msg}
        onFailedMsg={checkPin?.err}
        onTrueSuccessMsg={checkPin?.isFulfilled}
        onTrueFailedMsg={checkPin?.isRejected}
        onLoading={checkPin?.isLoading}
      />
    </>
  );
};

export default Topup;
