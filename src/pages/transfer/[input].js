import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import transferAction from "../../redux/actions/transfer";
import usersAction from "../../redux/actions/user";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { DateTime } from "luxon";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";

import penIcon from "../../assets/icons/edit-2.png";
import penIconBlue from "../../assets/icons/edit-2-blue.png";
import arrowUpIconBlue from "../../assets/icons/arrow-up-blue.png";
import styles from "../../styles/InputTransfer.module.css";

const Input = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.getDataUser.data);
  const receiver = useSelector((state) => state.users);
  const router = useRouter();
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");
  const receiverId = router.query.input;

  useEffect(() => {
    dispatch(usersAction.getDataReceiverThunk(receiverId, getCookie("token")));
  }, [dispatch, receiverId]);

  console.log("Entity receiver: ", receiver.getDataReceiver.data);
  // console.log("Entity user: ", user);

  // Data & Time
  const dt = (dateTime) => {
    return dateTime;
  };

  // Balance left
  const bl = (tempBalance, amountTf) => {
    const balanceLeft = tempBalance - amountTf;
    return balanceLeft;
  };

  // Handle Confirm Transfer
  const handleConfirmTransfer = () => {
    const body = {
      id: receiver.getDataReceiver.data?.id,
      firstName: receiver.getDataReceiver.data?.firstName,
      lastName: receiver.getDataReceiver.data?.lastName,
      image: receiver.getDataReceiver.data?.image,
      noTelp: receiver.getDataReceiver.data?.noTelp,
      amount: parseFloat(amount),
      balanceLeft: bl(user?.balance, parseFloat(amount)),
      date: dt(DateTime.now().toFormat("ff")),
      notes: notes,
    };
    // console.log("Sample body: ", body);

    dispatch(transferAction.transferConfirmationThunk(body));

    router.replace("/transfer/confirmation");
  };

  console.log("Amount: ", amount);

  // Handle currency
  const idrCurreny = (number) => {
    return Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <>
      <Header />
      <main className={styles["main"]}>
        <SideBar
          focusStyleTransfer={styles["focus-style-side-transfer-button"]}
          transferStyle={styles["init-button-active"]}
          arrowUpIconBlue={arrowUpIconBlue}
        />
        <section className={styles["right-side-content"]}>
          <span className={styles["right-side-content__title"]}>
            <p className={styles["title"]}>Transfer Money</p>
          </span>
          <span className={styles["bottom-content"]}>
            <ul className={styles["list"]}>
              <li className={styles["content-list"]}>
                <span className={styles["sub-content-list"]}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_DOI_CLOUDINARY}/${receiver.getDataReceiver.data?.image}`}
                    alt={receiver.getDataReceiver.data?.firstName}
                    className={styles["image"]}
                    width={500}
                    height={500}
                  />
                  <span className={styles["identity"]}>
                    <p className={styles["name"]}>
                      {`${receiver.getDataReceiver.data?.firstName} ${receiver.getDataReceiver.data?.lastName}`}
                    </p>
                    <p className={styles["contact"]}>
                      {receiver.getDataReceiver.data?.noTelp}
                    </p>
                  </span>
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
                {
                  <input
                    type="number"
                    placeholder="0.00"
                    className={styles[!amount ? "amount" : "amount-active"]}
                    onChange={(e) => setAmount(e.target.value)}
                    value={"-Infinity" < amount ? amount : !amount}
                  />
                }
                <p className={styles["rest-balance"]}>
                  {`${idrCurreny(user?.balance)} Availabe`}
                </p>
                <span className={styles[!notes ? "note" : "note-active"]}>
                  <label className={styles["pen-icon-label"]}>
                    <Image
                      src={!notes ? penIcon : penIconBlue}
                      alt="Pen"
                      className={styles["pen-icon"]}
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
                    styles[!amount ? "continue-btn" : "continue-btn-active"]
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
