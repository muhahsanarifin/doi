import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import Image from "next/image";
import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";

import { getCookie } from "cookies-next";
import usersAction from "../../redux/actions/user";
import transferAction from "../../redux/actions/transfer";
import { rupiah } from "../../helpers/intl";
import {
  PrivateRoute,
  PreventDirectConfirmationPage,
} from "../../helpers/handleRoutes";

import TitleBar from "../../components/TitleBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import { PinConfirmationModal } from "../../components/Overlay";

import icon from "../../utils/icon";
import styles from "../../styles/confirmationTransfer.module.css";

const Confirmation = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const confirmationTransferData = useSelector(
    (state) => state.transfer?.confirmationTransfer
  );
  const checkPin = useSelector((state) => state.users?.checkPinUser);
  const { isOpen, onOpen, onClose } = useDisclosure();
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

  const handleConfirmationTransfer = () => {
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

  // Check pin user callback function
  const cbCPUFulfilled = () => {
    setPin("");
    setPinTwo("");
    setPinThree("");
    setPinFour("");
    setPinFive("");
    setPinSix("");
    
    const body = {
      receiverId: confirmationTransferData?.data?.id,
      amount: confirmationTransferData?.data?.amount,
      notes: confirmationTransferData?.data?.notes,
    };

    const accessToken = getCookie("token");

    dispatch(
      transferAction.transferBalanceUserThunk({
        body,
        accessToken,
        cbTBFulfilled,
      })
    );
  };

  // Transfer balance callback function
  const cbTBFulfilled = () => {
    dispatch(usersAction.ccpudThunk());

    router.replace("/transfer/status");
  };

  return (
    <>
      <PrivateRoute>
        <PreventDirectConfirmationPage>
          <TitleBar title={"Transfer"} />
          <Header />
          <main className={styles["main"]}>
            <SideBar
              focusStyle={styles["focus-style-side-transfer-button"]}
              titleStyle={styles["init-button-active"]}
              activeIcon={icon.arrowUpBlue}
              onTitle={"Transfer"}
            />
            <section className={styles["right-side-content"]}>
              <ul className={styles["list"]}>
                <li className={styles["content-list"]}>
                  <p
                    className={styles["content-header-list"]}
                  >{`Transfer to`}</p>
                  <span className={styles["sub-content-list"]}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_DOI_CLOUDINARY}/${confirmationTransferData.data?.image}`}
                      alt={confirmationTransferData?.data?.lastName}
                      className={styles["image"]}
                      width={100}
                      height={100}
                    />
                    <span className={styles["identity"]}>
                      <p
                        className={styles["identify__title"]}
                      >{`${confirmationTransferData?.data?.firstName} ${confirmationTransferData?.data?.lastName}`}</p>
                      <p className={styles["identify__main-content"]}>
                        {confirmationTransferData?.data?.noTelp}
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
                        {rupiah(confirmationTransferData?.data?.amount)}
                      </p>
                    </span>
                  </span>
                </li>
                <li className={styles["content-list"]}>
                  <span className={styles["sub-content-list"]}>
                    <span className={styles["identity"]}>
                      <p className={styles["identify__title"]}>Balance Left</p>
                      <p className={styles["identify__main-content"]}>
                        {rupiah(confirmationTransferData?.data?.balanceLeft)}
                      </p>
                    </span>
                  </span>
                </li>
                <li className={styles["content-list"]}>
                  <span className={styles["sub-content-list"]}>
                    <span className={styles["identity"]}>
                      <p className={styles["identify__title"]}>Date & Time</p>
                      <p className={styles["identify__main-content"]}>
                        {confirmationTransferData?.data?.date}
                      </p>
                    </span>
                  </span>
                </li>
                <li className={styles["content-list"]}>
                  <span className={styles["sub-content-list"]}>
                    <span className={styles["identity"]}>
                      <p className={styles["identify__title"]}>Notes</p>
                      <p className={styles["identify__main-content"]}>
                        {confirmationTransferData?.data?.notes}
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
          <Footer />
        </PreventDirectConfirmationPage>
      </PrivateRoute>
    </>
  );
};

export default Confirmation;
