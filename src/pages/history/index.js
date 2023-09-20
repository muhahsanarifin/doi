import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { useDispatch, useSelector } from "react-redux";
// import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import { DateTime } from "luxon";

import { sentenceCase } from "../../helpers/handleSentence";
import { PrivateRoute } from "../../helpers/handleRoutes";
import { rupiah } from "../../helpers/intl";
import historyTransactionAction from "../../redux/actions/history";
import { dt } from "../../helpers/intl";

import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import TitleBar from "../../components/TitleBar";
import Pagination from "../../components/Pagination";
import { CircleLoader } from "../../components/Loader";

import icon from "../../utils/icon";
import styles from "../../styles/history.module.css";

const History = () => {
  const dispatch = useDispatch();
  const searchParams = useSearchParams();
  const [filter, setFilter] = useState(searchParams.get("filter") || "");
  const [page, setPage] = useState(searchParams.get("page") || 1);
  const [limit, setLimit] = useState(6);
  const filterMenuItems = ["Week", "Month", "Year"];

  const histories = useSelector(
    (state) => state.historyTransaction?.getHistoryTransaction
  );

  useEffect(() => {
    const queryParams = `filter=${filter}&page=${page}&limit=${limit}`;
    const accessToken = getCookie("token");
    dispatch(
      historyTransactionAction.getHistoryTransactionThunk({
        accessToken,
        queryParams,
      })
    );
  }, [dispatch, filter, limit, page]);

  console.log("History transactions: ", histories);

  return (
    <>
      <PrivateRoute>
        <TitleBar title={"History"} />
        <Header />
        <main className={styles["main"]}>
          <SideBar
            focusStyle={styles["focus-style-side-history-button"]}
            titleStyle={styles["init-button-active"]}
            activeIcon={icon.gridBlue}
            onTitle={"Dashboard"}
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
            {histories?.isLoading ? (
              <span className={styles["bottom-content-loader"]}>
                <CircleLoader />
              </span>
            ) : (
              <>
                <span className={styles["bottom-content"]}>
                  {histories.data?.data?.length === 0 ? (
                    <h1 className={styles["error-info"]}>
                      Does not exist transaction!
                    </h1>
                  ) : (
                    <ul
                      className={
                        styles[
                          histories.data?.data?.length < 6
                            ? "list-ltsd"
                            : "list"
                        ]
                      }
                    >
                      {histories.data?.data?.map((history) => (
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
                                <p
                                  className={
                                    styles[
                                      history.status === "success"
                                        ? "success-status"
                                        : "failed-status"
                                    ]
                                  }
                                >
                                  {sentenceCase(history.status)}
                                </p>
                                <p className={styles["type"]}>
                                  {" "}
                                  {sentenceCase(history.type)}
                                </p>
                              </span>
                              <p className={styles["date"]}>
                                {dt(DateTime.fromISO(history.createdAt))}
                              </p>
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
                                ? `+${rupiah(history.amount)}`
                                : history.type === "send"
                                ? `-${rupiah(history.amount)}`
                                : null}
                            </p>
                          </span>
                        </li>
                      ))}
                    </ul>
                  )}
                </span>
              </>
            )}
            {histories?.isLoading ||
            histories.data?.data?.length === 0 ||
            histories.data?.data?.length < 6 ? null : (
              <Pagination
                onPage={page}
                onSetPage={setPage}
                historyData={histories.data}
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
