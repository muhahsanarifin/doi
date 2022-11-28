/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import { useRouter } from "next/router";
import Axios from "axios";
import { useEffect, useState } from "react";
import { getCookie } from "cookies-next";

import Header from "../components/Header";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import Image from "next/image";

import privateRoute from "../helpers/private";

import styles from "../styles/Dashboard.module.css";

const dashbord = () => {
  // « Private Route »
  privateRoute();

  // « Init »
  const router = useRouter();
  const [balance, setBalance] = useState([]);
  const [noTelp, setContact] = useState([]);

  const getDataUser = async () => {
    try {
      await Axios.get(
        `${process.env.NEXT_PUBLIC_DOI_BACKEND_API}/dashboard/${getCookie(
          "id"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      // console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getDataUser();
  }, []);

  useEffect(() => {
    setBalance(getCookie("balance"));
  }, []);

  useEffect(() => {
    setContact(getCookie("noTelp"));
  }, []);

  return (
    <>
      <Header />
      <main className={styles["main"]}>
        <SideBar />
        <section className={styles["right-side-content"]}>
          <span className={styles["balance"]}>
            <span className={styles["balance__content_left"]}>
              <p className={styles["title"]}>Balance</p>
              <h1 className={styles["fund"]}>
                {`RP.`} {balance}
              </h1>
              <p className={styles["phone-number"]}>{noTelp}</p>
            </span>
            <span className={styles["balance__content_right"]}>
              <button
                className={styles["transfer-btn"]}
                onClick={() => router.push("/transfer")}
              >
                Transfer
              </button>
              <button
                className={styles["top-up-btn"]}
                onClick={(e) => router.push("/topup")}
              >
                Top Up
              </button>
            </span>
          </span>
          <span className={styles["history__content_rigth"]}>
            <span className={styles["chart"]}>
              <span className={styles["income-expense"]}>
                <span className={styles["income-section"]}>
                  <Image
                    src={``}
                    alt={`Down`}
                    className={styles["income-expense-image"]}
                  />
                  <p className={styles["income-title"]}>Income</p>
                  <p className={styles["income-section__value"]}>{`10000`}</p>
                </span>
                <span className={styles["expense-section"]}>
                  <Image
                    src={``}
                    alt={`Up`}
                    className={styles["income-expense-image"]}
                  />
                  <p className={styles["expense-title"]}>Expense</p>
                  <p className={styles["expense-section__value"]}>{`10000`}</p>
                </span>
              </span>
              <span className={styles["chart-data"]}>
                <p>👨‍💻 Developing</p>
              </span>
            </span>
            <span className={styles["transcation-history"]}>
              <span className={styles["transcation-history__title"]}>
                <p>Transcation History</p>
                <p
                  className={styles["btn-see-all"]}
                  onClick={() => router.push("/history")}
                >
                  See all
                </p>
              </span>
              <ul className={styles["list"]}>
                <li className={styles["content-list"]}>
                  <span className={styles["sub-content-list"]}>
                    <Image src={``} alt={`Image`} className={styles["image"]} />
                    <span className={styles["identity"]}>
                      <p className={styles["name"]}>{`Samuel`}</p>
                      <p className={styles["status"]}>{`Transfer`}</p>
                    </span>
                    <p className={styles["value"]}>{`10000`}</p>
                  </span>
                </li>
              </ul>
            </span>
          </span>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default dashbord;
