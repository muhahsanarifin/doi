import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import transferAction from "../../redux/actions/transfer";
import usersAction from "../../redux/actions/user";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { DateTime } from "luxon";
import { rupiah } from "../../helpers/intl";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import TitleBar from "../../components/TitleBar";
import { dt } from "../../helpers/intl";

import icon from "../../utils/icon";
import styles from "../../styles/inputTransfer.module.css";

const Input = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const receiverId = router.query.input;
  const user = useSelector((state) => state.users?.getDataUser);
  const receiver = useSelector((state) => state.users?.getDataReceiver);
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const id = receiverId;
    const accessToken = getCookie("token");
    dispatch(usersAction.getDataReceiverThunk({ id, accessToken }));
  }, [dispatch, receiverId]);


  // Balance left
  const bl = (tempBalance, amountTf) => {
    const balanceLeft = tempBalance - amountTf;
    return balanceLeft;
  };

  // Handle Confirm Transfer
  const handleConfirmTransfer = () => {
    const body = {
      id: receiver?.data?.data?.id,
      firstName: receiver?.data?.data?.firstName,
      lastName: receiver?.data?.data?.lastName,
      image: receiver?.data?.data?.image,
      noTelp: receiver?.data?.data?.noTelp,
      amount: parseFloat(amount),
      balanceLeft: bl(user?.data?.data?.balance, parseFloat(amount)),
      date: dt(DateTime.now()),
      notes: notes,
    };

    dispatch(transferAction.transferConfirmationThunk(body));

    router.replace("/transfer/confirmation");
  };

  return (
    <>
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
          <span className={styles["right-side-content__title"]}>
            <p className={styles["title"]}>Transfer Money</p>
          </span>
          <span className={styles["bottom-content"]}>
            <ul className={styles["list"]}>
              <li className={styles["content-list"]}>
                <span className={styles["sub-content-list"]}>
                  {receiver?.isFulfilled && (
                    <>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_DOI_CLOUDINARY}/${receiver?.data?.data?.image}`}
                        alt={receiver?.data?.data?.firstName}
                        className={styles["image"]}
                        width={500}
                        height={500}
                      />
                      <span className={styles["identity"]}>
                        <p className={styles["name"]}>
                          {`${receiver?.data?.data?.firstName} ${receiver?.data?.data?.lastName}`}
                        </p>
                        <p className={styles["contact"]}>
                          {receiver?.data?.data?.noTelp}
                        </p>
                      </span>
                    </>
                  )}
                </span>
              </li>
            </ul>
            <span className={styles["description"]}>
              <p className={styles["description-content"]}>
                Type the amount you want to transfer and then press continue to
                the next steps.
              </p>
            </span>
            <span className={styles["form"]}>
              <span className={styles["input-section"]}>
                <input
                  type="number"
                  placeholder="0.00"
                  className={
                    styles[
                      !amount
                        ? "amount"
                        : Number(amount) <= 1000 && amount !== ""
                        ? "error-amount"
                        : amount > user?.data?.data?.balance && amount !== ""
                        ? "error-amount"
                        : "amount-active"
                    ]
                  }
                  onChange={(e) => setAmount(e.target.value)}
                  value={"-Infinity" < amount ? amount : !amount}
                />
                {Number(amount) <= 1000 && amount !== "" ? (
                  <p className={styles["error-input"]}>
                    Please input amount more than Rp 1000,00
                  </p>
                ) : amount > user?.data?.data?.balance && amount !== "" ? (
                  <p className={styles["error-input"]}>Insufficient balance</p>
                ) : null}
                {user?.isFulfilled && (
                  <p className={styles["rest-balance"]}>
                    {rupiah(user?.data?.data?.balance) + " Available"}
                  </p>
                )}
                <span className={styles[!notes ? "note" : "note-active"]}>
                  <label className={styles["pen-icon-label"]}>
                    <Image
                      src={!notes ? icon.pen : icon.penBlue}
                      alt="Pen"
                      className={styles["pen-icon"]}
                      placeholder="blur"
                    />
                  </label>
                  <input
                    type="text"
                    className={styles["note-input"]}
                    placeholder="Add some notes"
                    onChange={(e) => setNotes(e.target.value)}
                  />
                </span>
              </span>
              <span className={styles["btn-section"]}>
                <button
                  className={
                    styles[
                      !amount ||
                      (Number(amount) <= 1000 && amount !== "") ||
                      (amount > user?.data?.data?.balance && amount !== "")
                        ? "continue-btn"
                        : "continue-btn-active"
                    ]
                  }
                  onClick={handleConfirmTransfer}
                  disabled={!amount}
                >
                  Continue
                </button>
              </span>
            </span>
          </span>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Input;
