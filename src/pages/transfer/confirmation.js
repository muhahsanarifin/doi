import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { useDisclosure } from "@chakra-ui/react";
import usersAction from "../../redux/actions/user";
import { PrivateRoute } from "../../helpers/handleRoutes";
import { getCookie } from "cookies-next";
import transferAction from "../../redux/actions/transfer";
import { useRouter } from "next/router";

import TitleBar from "../../components/TitleBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import { PinConfirmationModal } from "../../components/Overlay";

import styles from "../../styles/Confirmation.module.css";
import arrowUpIconBlue from "../../assets/icons/arrow-up-blue.png";

const Confirmation = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const confirmationTransferData = useSelector(
    (state) => state.transfer?.confirmationTransfer
  );
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [numeric, setPin] = useState("");
  const [numericTwo, setPinTwo] = useState("");
  const [numericTree, setPinThree] = useState("");
  const [numericFour, setPinFour] = useState("");
  const [numericFive, setPinFive] = useState("");
  const [numericSix, setPinSix] = useState("");
  const [succes, setSuccess] = useState("");
  const [failed, setFalied] = useState("");
  const [trueSuccessMsg, setTruSuccessMsg] = useState(false);
  const [trueFailedMsg, setTruFailedMsg] = useState(false);
  const [loading, setLoading] = useState(false);

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

  // Body Transfer
  const body = {
    receiverId: confirmationTransferData.id,
    amount: confirmationTransferData.amount,
    notes: confirmationTransferData.notes,
  };

  const handleConfirmationTransfer = () => {
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

  const resFulfilledCheckPinUser = (response) => {
    setSuccess(response.data?.msg);
    setTimeout(() => {
      setTruSuccessMsg(true);
      setTruFailedMsg(false);
    }, 1500);

    setTimeout(() => {
      dispatch(
        transferAction.transferBalanceUserThunk(
          body,
          getCookie("token"),
          resPendingTransferBalanceUser,
          resFulfilledTransferBalanceUser,
          resRejectedTransferBalanceUser
        )
      );
    }, 2500);
  };

  const resRejectedCheckPinUser = (error) => {
    setFalied(error.data?.msg);
    setTimeout(() => {
      setTruFailedMsg(true);
      setTruSuccessMsg(false);
    }, 1500);
  };

  const resFinallyCheckPinUser = () => {
    setLoading(false);
    setTimeout(() => {
      // setTruFailedMsg(false);
      setTruSuccessMsg(false);
    }, 3500);
  };

  // Transfer condtition
  const resPendingTransferBalanceUser = () => {}; // Developer does not use it temporary to make some condition when request Transfer API.

  const resFulfilledTransferBalanceUser = () => {
    router.replace("/transfer/status");
  };

  const resRejectedTransferBalanceUser = () => {
    router.replace("/transfer/status");
  };

  return (
    <>
      <PrivateRoute>
        <TitleBar name={"Transfer"} />
        <Header />
        <main className={styles["main"]}>
          <SideBar
            focusStyleTransfer={styles["focus-style-side-transfer-button"]}
            transferStyle={styles["init-button-active"]}
            arrowUpIconBlue={arrowUpIconBlue}
          />
          <section className={styles["right-side-content"]}>
            <ul className={styles["list"]}>
              <li className={styles["content-list"]}>
                <p className={styles["content-header-list"]}>{`Transfer to`}</p>
                <span className={styles["sub-content-list"]}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_DOI_CLOUDINARY}/${confirmationTransferData.image}`}
                    alt={confirmationTransferData.lastName}
                    className={styles["image"]}
                    width={100}
                    height={100}
                  />
                  <span className={styles["identity"]}>
                    <p
                      className={styles["identify__title"]}
                    >{`${confirmationTransferData.firstName} ${confirmationTransferData.lastName}`}</p>
                    <p className={styles["identify__main-content"]}>
                      {confirmationTransferData.noTelp}
                    </p>
                  </span>
                </span>
              </li>
              <li className={styles["content-list"]}>
                <p className={styles["content-header-list"]}>Details</p>
                <span className={styles["sub-content-list"]}>
                  <span className={styles["identity"]}>
                    <p className={styles["identify__title"]}>Amount</p>
                    <p className={styles["identify__main-content"]}>
                      {idrCurreny(confirmationTransferData.amount)}
                    </p>
                  </span>
                </span>
              </li>
              <li className={styles["content-list"]}>
                <span className={styles["sub-content-list"]}>
                  <span className={styles["identity"]}>
                    <p className={styles["identify__title"]}>Balance Left</p>
                    <p className={styles["identify__main-content"]}>
                      {idrCurreny(confirmationTransferData.balanceLeft)}
                    </p>
                  </span>
                </span>
              </li>
              <li className={styles["content-list"]}>
                <span className={styles["sub-content-list"]}>
                  <span className={styles["identity"]}>
                    <p className={styles["identify__title"]}>Date & Time</p>
                    <p className={styles["identify__main-content"]}>
                      {confirmationTransferData.date}
                    </p>
                  </span>
                </span>
              </li>
              <li className={styles["content-list"]}>
                <span className={styles["sub-content-list"]}>
                  <span className={styles["identity"]}>
                    <p className={styles["identify__title"]}>Notes</p>
                    <p className={styles["identify__main-content"]}>
                      {confirmationTransferData.notes}
                    </p>
                  </span>
                </span>
              </li>
            </ul>
            <span className={styles["btn-section"]}>
              <button className={styles["continue-btn"]} onClick={onOpen}>
                Continue
              </button>
            </span>
          </section>
        </main>
        {/* Pin Modal */}
        <PinConfirmationModal
          initBtn="Continue"
          isOpen={isOpen}
          onClose={onClose}
          onClick={handleConfirmationTransfer}
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
        <Footer />
      </PrivateRoute>
    </>
  );
};

export default Confirmation;
