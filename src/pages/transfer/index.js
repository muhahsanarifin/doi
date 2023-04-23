import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getCookie } from "cookies-next";
import Link from "next/link";
import Users from "../../utils/api/user";
import { PrivateRoute } from "../../helpers/handleRoutes";
import TitleBar from "../../components/TitleBar";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { useDebouncedCallback } from "use-debounce";
import { LdsFacebook } from "../../components/Feedback";

import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
// import { SearchIcon } from "@chakra-ui/icons";
import arrowUpIconBlue from "../../assets/icons/arrow-up-blue.png";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import styles from "../../styles/Transfer.module.css";

const Transfer = () => {
  // const searchParams = useSearchParams();
  const { dataUsers } = Users;
  const router = useRouter();
  const [users, setUsers] = useState([]);
  const [identify, setIdentify] = useState("");
  const [queryParams, setQueryParams] = useState("");
  const [loading, setLoading] = useState(false);
  // const [notFound, setNotFound] = useState("");

  useEffect(() => {
    const query = new URLSearchParams({
      search: identify,
    });

    setQueryParams(query.toString());
  }, [identify]);

  useEffect(() => {
    const searchReciever = async () => {
      try {
        setLoading(true);
        const response = await dataUsers(
          `page=1&limit=5&sort=noTelp DESC&${queryParams}`,
          getCookie("token")
        );
        setUsers(response.data.data);

        if (response.data.data.length === 0) {
          // setNotFound("Data Not Found!");

          throw new Error("Data Not Found!");
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    searchReciever();

    router.push(`transfer?${queryParams}`);
  }, [dataUsers, queryParams]);

  const debounced = useDebouncedCallback((value) => {
    setIdentify(value);
  }, 1000);

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
                  onChange={(e) => {
                    debounced(e.target.value);
                  }}
                />
              </InputGroup>
            </span>
            {!loading ? (
              <span className={styles["bottom-content"]}>
                <ul className={styles["list"]}>
                  {users.length > 0 &&
                    users.map((user) => (
                      <li className={styles["content-list"]} key={user.id}>
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
                  {users.length === 0 && (
                    <div className={styles["not-found-section"]}>
                      <span className={styles["not-found"]}>
                        <h1>We can&apos;t find that</h1>
                        <p className={styles["not-found-decs"]}>
                          Sorry, the receiver you are looking for doesn&apos;t
                          exist.
                        </p>
                      </span>
                    </div>
                  )}
                </ul>
              </span>
            ) : (
              <span className={styles["bottom-content"]}>
                <LdsFacebook />
              </span>
            )}
          </section>
        </main>
        <Footer />
      </PrivateRoute>
    </>
  );
};

export default Transfer;
