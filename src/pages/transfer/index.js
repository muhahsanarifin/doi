import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getCookie } from "cookies-next";
import Link from "next/link";
import Users from "../../utils/api/user";
import { PrivateRoute } from "../../helpers/handleRoutes";
import TitleBar from "../../components/TitleBar";

import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
// import { SearchIcon } from "@chakra-ui/icons";
import arrowUpIconBlue from "../../assets/icons/arrow-up-blue.png";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import styles from "../../styles/Transfer.module.css";

const Transfer = () => {
  const { dataUsers } = Users;
  const [users, setUsers] = useState([]);
  const [identify, setIdentify] = useState("");

  useEffect(() => {
    const searchReciever = async () => {
      try {
        const response = await dataUsers(
          `page=1&limit=5&sort=noTelp DESC&search=${identify}`,
          getCookie("token")
        );
        setUsers(response.data.data);

        if (response.data.data.length === 0) {
          throw new Error("Data Not Found!");
        }
      } catch (error) {
        console.log(error);
      }
    };
    searchReciever();
  }, [dataUsers, identify]);

  return (
    <>
      <PrivateRoute>
        <TitleBar name={"Transfer"} />
        <Header />
        <main className={styles["main"]}>
          <SideBar
            focusStyleTransfer={styles["focus-style-side-transfer-button"]}
            transferStyle={styles["init-button-active"]}
            arrowUpIconBlue={arrowUpIconBlue}
          />
          <section className={styles["right-side-content"]}>
            <span className={styles["right-side-content__title"]}>
              <p className={styles["title"]}>Search Receiver</p>
            </span>
            <span className={styles["search-input"]}>
              <InputGroup>
                {/* <InputLeftElement
                pointerEvents="none"
                children={<SearchIcon className={styles["search-icon"]} />}
              /> */}
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
      </PrivateRoute>
    </>
  );
};

export default Transfer;
