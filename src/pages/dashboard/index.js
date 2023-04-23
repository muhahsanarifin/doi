import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import historyTransactionAction from "../../redux/actions/history";

import { PrivateRoute } from "../../helpers/handleRoutes";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import TitleBar from "../../components/TitleBar";
import Charts from "../../components/Chart";
import ArrowUpBlueMagenta from "../../assets/icons/arrow-up-blue-magenta.png";
import PlusBlueMagenta from "../../assets/icons/plus-blue-magenta.png";

import gridIconBlue from "../../assets/icons/grid-blue.png";
import styles from "../../styles/Dashboard.module.css";

const Dashbord = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const [filter, setFilter] = useState("");
  const histories = useSelector(
    (state) => state.historyTransaction.getHistoryTransaction
  );
  const user = useSelector((state) => state.users.getDataUser.data);

  useEffect(() => {
    dispatch(
      historyTransactionAction.getHistoryTransactionThunk(
        `page=${page}&limit=${limit}&filter=${filter}`,
        getCookie("token")
      )
    );
  }, [dispatch, page, limit, filter]);

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
        <TitleBar name={"Dashboard"} />
        <Header />
        <main className={styles["main"]}>
          <SideBar
            focusStyleDashbord={styles["focus-style-side-dashboard-button"]}
            dashboardStyle={styles["init-button-active"]}
            gridIconBlue={gridIconBlue}
          />
          <section className={styles["right-side-content"]}>
            <span className={styles["balance"]}>
              <span className={styles["balance__content_left"]}>
                <p className={styles["title"]}>Balance</p>
                <h1 className={styles["fund"]}>{idrCurreny(user?.balance)}</h1>
                <p className={styles["phone-number"]}>
                  {user?.noTelp === null ? (
                    <span
                      style={{
                        fontWeight: 700,
                        color: "#ff8c90",
                      }}
                    >
                      Please, set your phone number!
                    </span>
                  ) : (
                    user?.noTelp
                  )}
                </p>
              </span>
              <span className={styles["balance__content_right"]}>
                <button
                  className={styles["transfer-btn"]}
                  onClick={() => router.push("/transfer")}
                >
                  <Image
                    src={ArrowUpBlueMagenta}
                    alt="Arrow Up Blue Magenta"
                    width={500}
                    height={500}
                    className={styles["transfer-btn-icon"]}
                  />
                  <p className={styles["transfer-btn-init"]}>Transfer</p>
                </button>
                <button
                  className={styles["top-up-btn"]}
                  onClick={() => router.push("/topup")}
                >
                  <Image
                    src={PlusBlueMagenta}
                    alt="Arrow Up Blue Magenta"
                    width={500}
                    height={500}
                    className={styles["top-up-btn-icon"]}
                  />
                  <p className={styles["top-up-btn-init"]}>Top Up</p>
                </button>
              </span>
            </span>
            <span className={styles["history__content_rigth"]}>
              <Charts />
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
                  {histories.data?.map((history) => (
                    <li className={styles["content-list"]} key={history.id}>
                      <span className={styles["sub-content-list"]}>
                        <Image
                          src={`${process.env.NEXT_PUBLIC_DOI_CLOUDINARY}${history.image}`}
                          alt={history.firstName}
                          className={styles["image"]}
                          width={500}
                          height={500}
                        />
                        <span className={styles["identity"]}>
                          <p className={styles["name"]}>
                            {history.firstName} {history.lastName}
                          </p>
                          <p className={styles["status"]}>{history.status}</p>
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
              </span>
            </span>
          </section>
        </main>
        <Footer />
      </PrivateRoute>
    </>
  );
};

export default Dashbord;
