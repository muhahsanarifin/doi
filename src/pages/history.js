/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Axios from "axios";
import { useEffect, useState } from "react";
import Image from "next/image";
import privateRoute from "../helpers/private";
import { getCookie } from "cookies-next";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import SideBar from "../components/SideBar";
import styles from "../styles/History.module.css";

const history = () => {
  // « Private Route »
  privateRoute();

  const [histories, setHistory] = useState([]);

  const getHistory = async () => {
    try {
      const response = await Axios.get(
        `${process.env.NEXT_PUBLIC_DOI_BACKEND_API}/transaction/history?page=1&limit=10&filter=YEAR`,
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      setHistory(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  const Week = async () => {
    try {
      const response = await Axios.get(
        `${process.env.NEXT_PUBLIC_DOI_BACKEND_API}/transaction/history?page=1&limit=10&filter=WEEK`,
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      setHistory(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  }
  const Month = async () => {
    try {
      const response = await Axios.get(
        `${process.env.NEXT_PUBLIC_DOI_BACKEND_API}/transaction/history?page=1&limit=10&filter=MONTH`,
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      setHistory(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };
  const Year = async() => {
    try {
      const response = await Axios.get(
        `${process.env.NEXT_PUBLIC_DOI_BACKEND_API}/transaction/history?page=1&limit=10&filter=YEAR`,
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      setHistory(response.data.data);
      // console.log(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getHistory();
  }, []);
  return (
    <>
      <Header />
      <main className={styles["main"]}>
        <SideBar />
        <section className={styles["right-side-content"]}>
          <span className={styles["head-content"]}>
            <p className={styles["title"]}>Transaction History</p>
            <span className={styles["select-filter"]}>
              <Menu>
                {({ isOpen }) => (
                  <>
                    <MenuButton
                      isActive={isOpen}
                      className={styles["menu-btn"]}
                    >
                      {isOpen ? "Close Filter" : "--Select Filter--"}
                    </MenuButton>
                    <MenuList>
                      <MenuItem onClick={Week} className={styles["menu-item"]}>
                        Week
                      </MenuItem>
                      <MenuItem onClick={Month} className={styles["menu-item"]}>
                        Month
                      </MenuItem>
                      <MenuItem onClick={Year} className={styles["menu-item"]}>
                        Year
                      </MenuItem>
                    </MenuList>
                  </>
                )}
              </Menu>
            </span>
          </span>
          <span className={styles["bottom-content"]}>
            <ul className={styles["list"]}>
              {histories.map((history) => (
                <li className={styles["content-list"]} key={history.id}>
                  <span className={styles["sub-content-list"]}>
                    <Image
                      src={`${process.env.NEXT_PUBLIC_DOI_CLOUDINARY}${history.image}`}
                      alt={history.firstname}
                      className={styles["image"]}
                      width={500}
                      height={500}
                    />
                    <span className={styles["identity"]}>
                      <p className={styles["name"]}>
                        {history.firstName} {history.lastName}
                      </p>
                      <span className={styles["status-type"]}>
                        <p className={styles["status"]}>{history.status}</p>
                        <p className={styles["type"]}> {history.type}</p>
                      </span>
                    </span>
                    <p className={styles["value"]}>RP. {history.amount}</p>
                  </span>
                </li>
              ))}
            </ul>
          </span>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default history;
