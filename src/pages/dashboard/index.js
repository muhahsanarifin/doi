import React, { useEffect, useState} from "react";

import { useRouter } from "next/router";
import { getCookie } from "cookies-next";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import { rupiah } from "../../helpers/intl";
import { PrivateRoute } from "../../helpers/handleRoutes";
import { sentenceCase, ICP } from "../../helpers/handleSentence";
import historyTransactionAction from "../../redux/actions/history";
import usersAction from "../../redux/actions/user";

import { CircleLoader } from "../../components/Loader";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import TitleBar from "../../components/TitleBar";
import Charts from "../../components/Chart";

import icon from "../../utils/icon";
import styles from "../../styles/dashboard.module.css";

export const Dashboard = () => {
  const { arrowUpBlueMagenta, plusBlueMagenta, gridBlue } = icon;
  const dispatch = useDispatch();
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const histories = useSelector(
    (state) => state.historyTransaction?.getHistoryTransactionOfDashboard
  );
  const user = useSelector((state) => state.users?.getDataUser);

  useEffect(() => {
    const id = getCookie("id");
    const accessToken = getCookie("token");

    // Get user data
    dispatch(usersAction.getDataUserThunk({ id, accessToken }));

    const queryParams = `page=${page}&limit=${limit}`;

    // Get transaction history data dashboard
    dispatch(
      historyTransactionAction.getHistoryTransactionOfDashboardThunk({
        queryParams,
        accessToken,
      })
    );
  }, [dispatch, page, limit]);

  return (
    <>
      <PrivateRoute>
        <TitleBar title={"Dashboard"} />
        <Header />
        <main className={styles["main"]}>
          <SideBar
            focusStyle={styles["focus-style-side-dashboard-button"]}
            titleStyle={styles["init-button-active"]}
            activeIcon={gridBlue}
            onTitle={"Dashboard"}
          />
          <section className={styles["right-side-content"]}>
            <span className={styles["balance"]}>
              <span className={styles["balance__content_left"]}>
                {user?.isFulfilled && (
                  <>
                    <p className={styles["title"]}>Balance</p>

                    <h1 className={styles["fund"]}>
                      {rupiah(user?.data?.data?.balance)}
                    </h1>
                    <p className={styles["phone-number"]}>
                      {user?.data?.data?.noTelp === null ? (
                        <span className={styles["spna"]}>
                          Please, set your phone number!
                        </span>
                      ) : (
                        ICP(user?.data?.data?.noTelp)
                      )}
                    </p>
                  </>
                )}
              </span>
              <span className={styles["balance__content_right"]}>
                <button
                  className={styles["transfer-btn"]}
                  onClick={() => router.push("/transfer")}
                >
                  <Image
                    src={arrowUpBlueMagenta}
                    alt="Arrow Up Blue Magenta"
                    width={500}
                    height={500}
                    className={styles["transfer-btn-icon"]}
                    placeholder="blur"
                  />
                  <p className={styles["transfer-btn-init"]}>Transfer</p>
                </button>
                <button
                  className={styles["top-up-btn"]}
                  onClick={() => router.push("/topup")}
                >
                  <Image
                    src={plusBlueMagenta}
                    alt="Arrow Up Blue Magenta"
                    width={500}
                    height={500}
                    className={styles["top-up-btn-icon"]}
                    placeholder="blur"
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
                {histories?.isLoading ? (
                  <CircleLoader />
                ) : (
                  <ul className={styles["list"]}>
                    {histories?.data?.data?.map((history) => (
                      <li className={styles["content-list"]} key={history.id}>
                        <span className={styles["sub-content-list"]}>
                          <Image
                            src={`${process.env.NEXT_PUBLIC_DOI_CLOUDINARY}${history.image}`}
                            alt={history.firstName}
                            width={500}
                            height={500}
                            className={styles["image"]}
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
                {histories.data?.data?.length === 0 && (
                  <h1 className={styles["error-info"]}>
                    Does not exist transaction!
                  </h1>
                )}
              </span>
            </span>
          </section>
        </main>
        <Footer />
      </PrivateRoute>
    </>
  );
};

export default Dashboard;
