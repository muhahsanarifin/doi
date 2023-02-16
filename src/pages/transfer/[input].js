import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import transferBalance from "../../utils/api/transfer";
import usersAction from "../../redux/actions/user";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import penIcon from "../../assets/icons/edit-2.png";
import penIconBlue from "../../assets/icons/edit-2-blue.png"
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

  const handleTransfer = async (e) => {
    e.preventDefault();
    try {
      const response = await transferBalance(
        { receiverId, amount, notes },
        getCookie("token")
      );

      console.log("Success response message: ", response.data.msg);
      window.location.reload();
    } catch (error) {
      console.log(error.response.data.msg);
    }
  };

  console.log("Receiver: ", receiver);

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
                <input
                  type="text"
                  placeholder={`0.00`}
                  className={styles[!amount ? "amount": "amount-active"]}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
                <p className={styles["rest-balance"]}>
                  {`Rp${user?.balance} Availabe`}
                </p>
                <span className={styles[!notes ? "note": "note-active"]}>
                  <label className={styles["pen-icon-label"]}>
                    <Image
                      src={!notes ? penIcon: penIconBlue}
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
                  className={styles[!amount ? "continue-btn": "continue-btn-active"]}
                  onClick={handleTransfer}

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
