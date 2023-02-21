import React, { useState } from "react";
import { useRouter } from "next/router";
import Image from "next/image";
import transferAction from "../redux/actions/transfer";
import { useSelector, useDispatch } from "react-redux";
import successIcon from "../assets/icons/success.png";
import failedIcon from "../assets/icons/failed.png";
import styles from "../styles/Status.module.css";

const Status = () => {
  const dispacth = useDispatch();
  const router = useRouter();
  const confirmationTransferData = useSelector(
    (state) => state.transfer?.confirmationTransfer
  );

  const transferStatus = useSelector(
    (state) => state.transfer.transfer?.data?.status
  );

  // Handle currency
  const idrCurreny = (number) => {
    return Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  const clearObj = (obj) => {
    obj = {};
  };

  const HandleBackToHome = () => {
    dispacth(
      transferAction.transferConfirmationThunk(
        clearObj(confirmationTransferData)
      )
    );
    router.replace("/transfer");
  };

  return (
    <>
      {transferStatus === "success" ? (
        <span className={styles["status"]}>
          <Image
            src={successIcon}
            alt={`Image`}
            className={styles["image-status"]}
            width={100}
            height={100}
          />
          <p className={styles["title-status"]}>Transfer Success</p>
        </span>
      ) : (
        <span className={styles["status"]}>
          <Image
            src={failedIcon}
            alt={`Image`}
            className={styles["image-status"]}
            width={100}
            height={100}
          />
          <p className={styles["title-status"]}>Transfer Failed</p>
          <p className={styles["sub-title-status"]}>
            We can’t transfer your money at the moment, we recommend you to
            check your internet connection and try again.
          </p>
        </span>
      )}
      <ul className={styles["list"]}>
        <li className={styles["content-list"]}>
          <span className={styles["sub-content-list"]}>
            <span className={styles["identity"]}>
              <p className={styles["identify__title"]}>{`Amount`}</p>
              <p className={styles["identify__main-content"]}>
                {idrCurreny(confirmationTransferData?.amount)}
              </p>
            </span>
          </span>
        </li>
        <li className={styles["content-list"]}>
          <span className={styles["sub-content-list"]}>
            <span className={styles["identity"]}>
              <p className={styles["identify__title"]}>{`Balance Left`}</p>
              <p className={styles["identify__main-content"]}>
                {idrCurreny(confirmationTransferData?.balanceLeft)}
              </p>
            </span>
          </span>
        </li>
        <li className={styles["content-list"]}>
          <span className={styles["sub-content-list"]}>
            <span className={styles["identity"]}>
              <p className={styles["identify__title"]}>{`Date & Time`}</p>
              <p className={styles["identify__main-content"]}>
                {confirmationTransferData?.date}
              </p>
            </span>
          </span>
        </li>
        <li className={styles["content-list"]}>
          <span className={styles["sub-content-list"]}>
            <span className={styles["identity"]}>
              <p className={styles["identify__title"]}>{`Notes`}</p>
              <p className={styles["identify__main-content"]}>
                {confirmationTransferData?.notes}
              </p>
            </span>
          </span>
        </li>
        <li className={styles["content-list"]}>
          <p className={styles["content-header-list"]}>{`Transfer to`}</p>
          <span className={styles["sub-content-list"]}>
            <Image
              src={`${process.env.NEXT_PUBLIC_DOI_CLOUDINARY}/${confirmationTransferData?.image}`}
              alt={confirmationTransferData?.lastName}
              className={styles["image"]}
              width={100}
              height={100}
            />
            <span className={styles["identity"]}>
              <p
                className={styles["identify__title"]}
              >{`${confirmationTransferData?.firstName} ${confirmationTransferData?.lastName}`}</p>
              <p className={styles["identify__main-content"]}>
                {confirmationTransferData?.noTelp}
              </p>
            </span>
          </span>
        </li>
      </ul>
      {transferStatus === "success" ? (
        <span className={styles["btn-section"]}>
          <button className={styles["download-btn"]}>Download PDF</button>
          <button className={styles["home-btn"]} onClick={HandleBackToHome}>
            Back to Home
          </button>
        </span>
      ) : (
        <span className={styles["btn-section"]}>
          <button
            className={styles["try-again-btn"]}
            onClick={() => router.replace("/transfer")}
          >
            Try Again
          </button>
        </span>
      )}
    </>
  );
};

export default Status;
