import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { PrivateRoute } from "../../helpers/handleRoutes";
// import { useSearchParams } from "next/navigation";
// import { useRouter } from "next/router";
import { useDebouncedCallback } from "use-debounce";
import { useDispatch, useSelector } from "react-redux";
import { Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import usersAction from "../../redux/actions/user";

import { CircleLoader } from "../../components/Loader";
import TitleBar from "../../components/TitleBar";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import Footer from "../../components/Footer";

import icon from "../../utils/icon";
import styles from "../../styles/transfer.module.css";

const Transfer = () => {
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users?.getDataUsers);
  const [identify, setIdentify] = useState("");
  // const searchParams = useSearchParams();
  // const router = useRouter();

  useEffect(() => {
    const accessToken = getCookie("token");
    const queryParams = `page=1&limit=5&sort=noTelp DESC&search=${identify}`;
    dispatch(usersAction.getDataUsersThunk({ accessToken, queryParams }));
  }, [dispatch, identify]);

  const debounced = useDebouncedCallback((value) => {
    setIdentify(value);
  }, 1000);

  return (
    <>
      <PrivateRoute>
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
              <p className={styles["title"]}>Search Receiver</p>
            </span>
            <span className={styles["search-input"]}>
              <InputGroup>
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
            {users?.isLoading ? (
              <span className={styles["bottom-content"]}>
                <CircleLoader />
              </span>
            ) : (
              <span className={styles["bottom-content"]}>
                <ul className={styles["list"]}>
                  {users?.data?.data.length > 0 &&
                    users?.data?.data?.map((user, idx) => (
                      <li className={styles["content-list"]} key={idx}>
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
                                {`${user.firstName} ${user.lastName}`}
                              </p>
                              <p className={styles["contact"]}>{user.noTelp}</p>
                            </span>
                          </span>
                        </Link>
                      </li>
                    ))}
                  {users?.data?.data.length === 0 && (
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
            )}
          </section>
        </main>
        <Footer />
      </PrivateRoute>
    </>
  );
};

export default Transfer;
