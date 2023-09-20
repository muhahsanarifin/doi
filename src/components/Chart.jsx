import React, { useEffect } from "react";
import { getCookie } from "cookies-next";
import { useDispatch, useSelector } from "react-redux";
import Image from "next/image";
import "chart.js/auto";

import { Bar } from "react-chartjs-2";

import dashboardAction from "../redux/actions/dashboard";
import { rupiah } from "../helpers/intl";
import { CircleLoader } from "./Loader";

import icon from "../utils/icon";
import styles from "../styles/Chart.module.css";

const Charts = () => {
  const dataDashboard = useSelector(
    (state) => state?.dashboard?.getDataDashboard
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const id = getCookie("id");
    const accessToken = getCookie("token");
    dispatch(
      dashboardAction.getDataDashboardThunk({
        id,
        accessToken,
      })
    );
  }, [dispatch]);

  const expenseDays = dataDashboard?.data?.data?.listExpense.map(
    (el) => el.day
  );
  const incomeDays = dataDashboard?.data?.data?.listIncome.map((el) => el.day);
  const duplicateDays = expenseDays?.concat(incomeDays);

  const data = {
    labels: [...new Set(duplicateDays)],
    datasets: [
      {
        label: "Expense",
        data: dataDashboard?.data?.data?.listExpense.map((el) => el.total),
        borderRadius: Number.MAX_VALUE,
        backgroundColor: "#9DA6B5",
      },
      {
        label: "Income",
        data: dataDashboard?.data?.data?.listIncome.map((el) => el.total),
        borderRadius: Number.MAX_VALUE,
        backgroundColor: "#6379F4",
      },
    ],
  };

  const option = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        display: false,
        tricks: {
          beginAtZero: true,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
    plugins: {
      legend: {
        display: false,
      },
    },
  };

  return (
    <>
      <span className={styles["chart"]}>
        {dataDashboard?.isLoading ? (
          <CircleLoader />
        ) : (
          <>
            <span className={styles["income-expense"]}>
              <span className={styles["income-section"]}>
                <Image
                  src={
                    dataDashboard?.data?.data?.totalIncome >
                    dataDashboard?.data?.data?.totalExpense
                      ? icon.arrowUpGreen
                      : icon.arrowDownGreen
                  }
                  alt="Down"
                  // className={"income-expense-image"}
                  width={50}
                  height={50}
                  style={{ width: "24px", height: "24px" }}
                  placeholder="blur"
                />
                <p className={styles["income-title"]}>Income</p>
                <p className={styles["income-section__value"]}>
                  {dataDashboard?.data?.data?.totalIncome
                    ? `${rupiah(dataDashboard?.data?.data?.totalIncome)}`
                    : null}
                </p>
              </span>
              <span className={styles["expense-section"]}>
                <Image
                  src={
                    dataDashboard?.data?.data?.totalExpense >
                    dataDashboard?.data?.data?.totalIncome
                      ? icon.arrowUpRed
                      : icon.arrowDownRed
                  }
                  alt="Up"
                  // className={"income-expense-image"}
                  width={50}
                  height={50}
                  style={{ width: "24px", height: "24px" }}
                  placeholder="blur"
                />
                <p className={styles["expense-title"]}>Expense</p>
                <p className={styles["expense-section__value"]}>
                  {dataDashboard?.data?.data?.totalExpense
                    ? `${rupiah(dataDashboard?.data?.data?.totalExpense)}`
                    : null}
                </p>
              </span>
            </span>
            <div className={styles["chart-section"]}>
              <div className={styles["chart-data"]}>
                <Bar options={option} data={data} />
              </div>
            </div>
          </>
        )}
      </span>
    </>
  );
};

export default Charts;
