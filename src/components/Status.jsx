import React, { useState, useRef } from "react";
import { useRouter } from "next/router";
import { useReactToPrint } from "react-to-print";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";

import transferAction from "../redux/actions/transfer";
import { rupiah } from "../helpers/intl";

import icon from "../utils/icon";
import styles from "../styles/statusFPnC.module.css";

const Status = () => {
  const componentRef = useRef();
  const dispacth = useDispatch();
  const router = useRouter();
  const confirmationTransferData = useSelector(
    (state) => state.transfer?.confirmationTransfer
  );

  const transfer = useSelector((state) => state.transfer?.transfer);

  const handleBackToHome = () => {
    dispacth(transferAction.ctdThunk());
    dispacth(transferAction.ctdcThunk());
  };

  // Handle print
  const handlePrintTransaction = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: `doi-transfer-success-to-${confirmationTransferData?.data?.firstName}-${confirmationTransferData?.data?.lastName}`,
  });

  return (
    <>
      <span ref={componentRef} style={{ padding: "1rem" }}>
        {transfer?.data?.data?.status === "success" ? (
          <span className={styles["status"]}>
            <Image
              src={icon.success}
              alt={`success`}
              className={styles["image-status"]}
              width={100}
              height={100}
              placeholder="blur"
            />
            <p className={styles["title-status"]}>Transfer Success</p>
          </span>
        ) : (
          <span className={styles["status"]}>
            <Image
              src={icon.failed}
              alt={`failed`}
              className={styles["image-status"]}
              width={100}
              height={100}
              placeholder="blur"
            />
            <p className={styles["title-status"]}>Transfer Failed</p>
            <p className={styles["sub-title-status"]}>
              We can’t transfer your money at the moment, we recommend you to
              check your internet connection and try again.
            </p>
          </span>
        )}
        <ul className={styles["list"]} ref={componentRef}>
          <li className={styles["content-list"]}>
            <span className={styles["sub-content-list"]}>
              <span className={styles["identity"]}>
                <p className={styles["identify__title"]}>{`Amount`}</p>
                <p className={styles["identify__main-content"]}>
                  {rupiah(confirmationTransferData?.data?.amount)}
                </p>
              </span>
            </span>
          </li>
          <li className={styles["content-list"]}>
            <span className={styles["sub-content-list"]}>
              <span className={styles["identity"]}>
                <p className={styles["identify__title"]}>{`Balance Left`}</p>
                <p className={styles["identify__main-content"]}>
                  {rupiah(confirmationTransferData?.data?.balanceLeft)}
                </p>
              </span>
            </span>
          </li>
          <li className={styles["content-list"]}>
            <span className={styles["sub-content-list"]}>
              <span className={styles["identity"]}>
                <p className={styles["identify__title"]}>{`Date & Time`}</p>
                <p className={styles["identify__main-content"]}>
                  {confirmationTransferData?.data?.date}
                </p>
              </span>
            </span>
          </li>
          <li className={styles["content-list"]}>
            <span className={styles["sub-content-list"]}>
              <span className={styles["identity"]}>
                <p className={styles["identify__title"]}>{`Notes`}</p>
                <p className={styles["identify__main-content"]}>
                  {confirmationTransferData?.data?.notes}
                </p>
              </span>
            </span>
          </li>
          <li className={styles["content-list"]}>
            <p className={styles["content-header-list"]}>{`Transfer to`}</p>
            <span className={styles["sub-content-list"]}>
              <Image
                src={`${process.env.NEXT_PUBLIC_DOI_CLOUDINARY}/${confirmationTransferData?.data?.image}`}
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
        </ul>
      </span>
      {transfer?.data?.data?.status === "success" ? (
        <span className={styles["btn-section"]}>
          <button
            className={styles["download-btn"]}
            onClick={handlePrintTransaction}
          >
            Download PDF
          </button>
          <button className={styles["home-btn"]} onClick={handleBackToHome}>
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
