import React, { useEffect, useState } from "react";
import Image from "next/image";
import { PrivateRoute } from "../../helpers/handleRoutes";
import { getCookie } from "cookies-next";
import historyTransaction from "../../utils/api/history";
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import TitleBar from "../../components/TitleBar";
import Pagination from "../../components/Pagination";
import { LdsFacebook } from "../../components/Feedback";
import { ErrorMessage } from "../../utils/response";

import gridIconBlue from "../../assets/icons/grid-blue.png";
import styles from "../../styles/History.module.css";

const History = () => {
  const searchParams = useSearchParams();
  const [histories, setHistory] = useState([]);
  const [filter, setFilter] = useState(searchParams.get("filter") || "");
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [limit, setLimit] = useState(5);
  const filterMenuItems = ["Week", "Month", "Year"];
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [error, setError] = useState();

  useEffect(() => {
    const getHistory = async () => {
      try {
        setLoading(true);
        const response = await historyTransaction(
          `filter=${filter}&page=${page}&limit=${limit}`,
          getCookie("token")
        );
        setHistory(response.data);

        setError(response.data.data?.length === 0);

        if (response.data.data.length === 0) {
          throw new ErrorMessage("Data Not Found.");
        }
      } catch (error) {
        console.error(error.message);
      } finally {
        setLoading(false);
      }
    };

    getHistory();

    router.push(`history?filter=${filter}&page=${page}`);
  }, [filter, page, limit]);

  // Handle currency
  const idrCurreny = (number) => {
    return Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <>
      <PrivateRoute>
        <TitleBar name={"History"} />
        <Header />
        <main className={styles["main"]}>
          <SideBar
            focusStyleDashbord={styles["focus-style-side-history-button"]}
            dashboardStyle={styles["init-button-active"]}
            gridIconBlue={gridIconBlue}
          />
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
                        {isOpen
                          ? "Close Filter"
                          : filter
                          ? filter
                          : "--Select Filter--"}
                      </MenuButton>
                      <MenuList>
                        {filterMenuItems.map((filterMenuItem, idx) => (
                          <MenuItem
                            onClick={() => {
                              setFilter(filterMenuItem);
                              setPage(1);
                            }}
                            className={
                              styles[
                                filter === filterMenuItem
                                  ? "active-menu-item"
                                  : "menu-item"
                              ]
                            }
                            key={idx}
                          >
                            {filterMenuItem}
                          </MenuItem>
                        ))}
                      </MenuList>
                    </>
                  )}
                </Menu>
              </span>
            </span>
            {!loading ? (
              <>
                <span className={styles["bottom-content"]}>
                  {error ? (
                    <h1 className={styles["error-info"]}>
                      Does not exist transaction
                    </h1>
                  ) : (
                    <ul className={styles["list"]}>
                      {histories.data?.map((history) => (
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
                                {`${history.firstName} ${history.lastName}`}
                              </p>
                              <span className={styles["status-type"]}>
                                <p className={styles["status"]}>
                                  {history.status}
                                </p>
                                <p className={styles["type"]}>
                                  {" "}
                                  {history.type}
                                </p>
                              </span>
                            </span>
                            <p
                              className={
                                styles[
                                  history.type === "topup"
                                    ? "value-income"
                                    : "value-expense"
                                ]
                              }
                            >
                              {history.type === "topup"
                                ? `+${idrCurreny(history.amount)}`
                                : history.type === "send"
                                ? `-${idrCurreny(history.amount)}`
                                : null}
                            </p>
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </span>
              </>
            ) : (
              <span className={styles["bottom-content-loader"]}>
                <LdsFacebook />
              </span>
            )}
            {error ? null : (
              <Pagination
                onPage={page}
                onSetPage={setPage}
                historyData={histories}
              />
            )}
          </section>
        </main>
        <Footer />
      </PrivateRoute>
    </>
  );
};

export default History;
