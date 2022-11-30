/* eslint-disable react/jsx-key */
/* eslint-disable react/no-children-prop */
/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Axios from "axios";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getCookie } from "cookies-next";
// import { useRouter} from "next/router"
import Link from "next/link";

import privateRoute from "../../helpers/private";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import styles from "../../styles/Transfer.module.css";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

const transfer = () => {
  privateRoute();

  const [users, setUsers] = useState([]);
  const [identify, setIdentify] = useState([])

  const getDataUsers = async () => {
    try {
      const response = await Axios.get(
        `${process.env.NEXT_PUBLIC_DOI_BACKEND_API}/user?page=1&limit=10&sort=noTelp DESC`,
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      // console.log(response.data.data);
      setUsers(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getDataUsers();
  }, []);

  const searchReciever = async () => {
    try {
      const response = await Axios.get(
        `${process.env.NEXT_PUBLIC_DOI_BACKEND_API}/user?page=1&limit=10&sort=noTelp DESC&search=${identify}`,
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      // console.log(response.data.data);
      setUsers(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    searchReciever()
  }, [identify]);

  return (
    <>
      <Header />
      <main className={styles["main"]}>
        <SideBar />
        <section className={styles["right-side-content"]}>
          <span className={styles["right-side-content__title"]}>
            <p className={styles["title"]}>Search Receiver</p>
          </span>
          <span className={styles["search-input"]}>
            <InputGroup>
              <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon className={styles["search-icon"]} />}
              />
              <Input
                type="text"
                placeholder="Search receiver here"
                className={styles["input-receiver"]}
                onChange={(e) => setIdentify(e.target.value)}
              />
            </InputGroup>
          </span>
          <span className={styles["bottom-content"]}>
            <ul className={styles["list"]}>
              {users.map((user) => (
                <li
                  className={styles["content-list"]}
                  key={user.id}
                  value={identify}
                >
                  <Link
                    href={{
                      pathname: "/transfer/[input]",
                      query: { input: user.id },
                    }}
                    className={styles["link-input"]}
                  >
                    <span className={styles["sub-content-list"]}>
                      <Image
                        src={`${process.env.NEXT_PUBLIC_DOI_CLOUDINARY}${user.image}`}
                        alt={user.firstName}
                        className={styles["image"]}
                        width={500}
                        height={500}
                      />
                      <span className={styles["identity"]}>
                        <p className={styles["name"]}>
                          {user.firstName} {user.lastName}
                        </p>
                        <p className={styles["contact"]}>{user.noTelp}</p>
                      </span>
                    </span>
                  </Link>
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

export default transfer;
