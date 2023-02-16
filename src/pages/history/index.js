import React, { useEffect, useState } from "react";
import Image from "next/image";
import privateRoute from "../../helpers/private";
import { getCookie } from "cookies-next";
import historyTransaction from "../../utils/api/history";

import { Menu, MenuButton, MenuList, MenuItem } from "@chakra-ui/react";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import TitleBar from "../../components/TitleBar";

import gridIconBlue from "../../assets/icons/grid-blue.png";
import styles from "../../styles/History.module.css";

const History = () => {
  // Private Route
  privateRoute();
  const [histories, setHistory] = useState([]);
  const [filter, setFilter] = useState("");
  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(5);
  const filterMenuItems = ["Week", "Month", "Year"];

  useEffect(() => {
    const getHistory = async () => {
      try {
        const response = await historyTransaction(
          `page=${page}&limit=${limit}&filter=${filter}`,
          getCookie("token")
        );
        setHistory(response.data);

        if (response.data.data.length === 0) {
          throw new Error("Data Not Found.");
        }
      } catch (error) {
        console.log(error);
      }
    };

    getHistory();
  }, [page, filter, limit]);

  // Handle currency
  const idrCurreny = (number) => {
    return Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    }).format(number);
  };

  return (
    <>
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
                          onClick={() => setFilter(filterMenuItem)}
                          className={styles["menu-item"]}
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
          <span className={styles["bottom-content"]}>
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
                        <p className={styles["status"]}>{history.status}</p>
                        <p className={styles["type"]}> {history.type}</p>
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
          </span>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default History;
