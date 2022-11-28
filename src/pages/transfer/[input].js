/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Axios from "axios";
import Image from "next/image";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import { useEffect, useState } from "react";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import Swal from "sweetalert2";
import penIcon from "../../assets/icons/edit-2.png";

import styles from "../../styles/InputTransfer.module.css";

const input = () => {
  const router = useRouter();
  // console.log(router.query.input);
  const [receiver, setReceiver] = useState([]);
  const [balance, setBalance] = useState([]);
  const receiverId = router.query.input;
  const [amount, setAmount] = useState("");
  const [notes, setNotes] = useState("");

  const getReceiver = async () => {
    try {
      const response = await Axios.get(
        `${process.env.NEXT_PUBLIC_DOI_BACKEND_API}/user/profile/${router.query.input}`,
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      console.log(response.data);
      setReceiver(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getReceiver();
  }, []);

  const { firstName, lastName, noTelp, image } = receiver;

  useEffect(() => {
    setBalance(getCookie("balance"));
  }, []);

  const handleTransfer = async(e) =>{
    e.preventDefault()
    try {
      const response = await Axios.post(
        `${process.env.NEXT_PUBLIC_DOI_BACKEND_API}/transaction/transfer`,
        {
          receiverId,
          amount,
          notes,
        },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      Swal.fire({
        title: `${response.data.msg}`,
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
        position: "top-start",
        background: "#6379F4",
        color: "#ffffff",
        width: "18rem",
      });
    } catch (error) {
      Swal.fire({
        title: `${error.message}`,
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
        position: "top-start",
        background: "#6379F4",
        color: "#ffffff",
        width: "18rem",
      });
    }
  }

  return (
    <>
      <Header />
      <main className={styles["main"]}>
        <SideBar />
        <section className={styles["right-side-content"]}>
          <span className={styles["right-side-content__title"]}>
            <p className={styles["title"]}>Transfer Money</p>
          </span>
          <span className={styles["bottom-content"]}>
            <ul className={styles["list"]}>
              <li className={styles["content-list"]}>
                <span className={styles["sub-content-list"]}>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_DOI_CLOUDINARY}/${image}`}
                    alt={firstName}
                    className={styles["image"]}
                    width={500}
                    height={500}
                  />
                  <span className={styles["identity"]}>
                    <p className={styles["name"]}>
                      {firstName} {lastName}
                    </p>
                    <p className={styles["contact"]}>{noTelp}</p>
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
            <form className={styles["form"]} onSubmit={handleTransfer}>
              <span className={styles["input-section"]}>
                <input
                  type="text"
                  placeholder={`0.00`}
                  className={styles["amount"]}
                  onChange={(e) => setAmount(e.target.value)}
                  required
                />
                <p className={styles["rest-balance"]}>{`Rp.`}{balance}</p>

                <span className={styles["note"]}>
                  <label className={styles["pen-icon-label"]}>
                    <Image
                      src={penIcon}
                      alt=""
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
                <button className={styles["continue-btn"]}>Continue</button>
              </span>
            </form>
          </span>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default input;
