import React, { useEffect, useState } from "react";
import { getCookie } from "cookies-next";
import { useDispatch, useSelector } from "react-redux";
import dashboardAction from "../redux/actions/dashboard";
import { Bar } from "react-chartjs-2";
import "chart.js/auto";
import Image from "next/image";
import greenArrowUpIcon from "../assets/icons/arrow-up-green.png";
import redArrowUpIcon from "../assets/icons/arrow-up-red.png";
import greenArrowDownIcon from "../assets/icons/arrow-down-green.png";
import redArrowDownIcon from "../assets/icons/arrow-down-red.png";

const Charts = () => {
  const [listExpense, setListExpense] = useState([]);
  const [listIncome, setListIncome] = useState([]);

  // Function for response data dashboard if fulfilled
  const resDataDashboardFulfilled = (data) => {
    setListExpense(data.data.listExpense);
    setListIncome(data.data.listIncome);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(
      dashboardAction.getDataDashboardThunk(
        getCookie("id"),
        getCookie("token"),
        "",
        resDataDashboardFulfilled,
        "",
        ""
      )
    );
  }, [dispatch]);

  const times = () => {
    const days = [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ];
    return days;
  };

  const data = {
    labels: times(),
    datasets: [
      {
        label: "Expense",
        data: listExpense.map((expense) => expense.total),
        backgroundColor: "#FF5B37",
      },
      {
        label: "Income",
        data: listIncome.map((income) => income.total),
        backgroundColor: "#1EC15F",
      },
    ],
  };

  // Function for sum income/expense total
  const sum = (totals) => {
    const initialValue = 0;
    const result = totals
      .map((total) => total.total)
      .reduce(
        (accumulator, currentValue) => accumulator + currentValue,
        initialValue
      );

    return result;
  };

  // const checkTotal = (totals) => {
  //   const result = totals.map((total) => total.total === 0).includes(false);

  //   return result;
  // };
  // console.log("Check total list expense: ", checkTotal(listExpense))
  // console.log("Check total list income: ", checkTotal(listIncome));

  return (
    <>
      <span className={"chart"}>
        <span className={"income-expense"}>
          <span className={"income-section"}>
            <Image
              src={
                sum(listIncome) > sum(listExpense)
                  ? greenArrowUpIcon
                  : greenArrowDownIcon
              }
              alt="Down"
              // className={"income-expense-image"}
              width={50}
              height={50}
              style={{ width: "24px", height: "24px" }}
            />
            <p className={"income-title"}>Income</p>
            <p className={"income-section__value"}>
              {sum(listIncome) ? `RP${sum(listIncome)}` : null}
            </p>
          </span>
          <span className={"expense-section"}>
            <Image
              src={
                sum(listExpense) > sum(listIncome)
                  ? redArrowUpIcon
                  : redArrowDownIcon
              }
              alt="Up"
              // className={"income-expense-image"}
              width={50}
              height={50}
              style={{ width: "24px", height: "24px" }}
            />
            <p className={"expense-title"}>Expense</p>
            <p className={"expense-section__value"}>
              {sum(listExpense) ? `RP${sum(listExpense)}` : null}
            </p>
          </span>
        </span>
        <div className={"chart-section"}>
          <div className={"chart-data"}>
            <Bar data={data} />
          </div>
        </div>
      </span>
      {/* Functional same as css internal */}
      <style jsx>
        {`
          .chart {
            /* border: 1px solid darkblue; */
            width: 60%;
            padding: 1.5rem;
            background: #ffffff;
            box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.05);
            border-radius: 18px;
            display: flex;
            flex-direction: column;
          }

          .chart-section {
            /* border: 1px solid darkblue; */
            display: flex;
            justify-content: center;
            padding: 2rem;
          }

          .chart-data {
            align-self: center;
            border: 1px solid #e9e8e8;
            display: flex;
            justify-content: center;
            padding: 0.5rem;
            border-radius: 25px;
            width: 30rem;
            height: 15rem;
          }

          .income-expense {
            /* border: 1px solid darkblue; */
            display: flex;
            flex-direction: row;
            justify-content: space-between;
          }

          /* .income-section {
            border: 1px solid darkblue}; */

          /*.income-expense-image {
            width: 24px;
            height: 24px;
          }*/

          .income-title,
          .expense-title {
            font-size: 10px;
          }

          .income-section__value,
          .expense-section__value {
            font-weight: 800;
          }

          @media all and (min-width: 768px) and (max-width: 1024px) {
            .main {
              padding: 0 0.5rem;
              flex-direction: column;
              height: 100vh;
            }
            .history__content_rigth {
              flex-direction: column;
            }
            .history__content_rigth {
              flex-direction: column;
            }
            .chart {
              width: auto;
            }
            .transcation-history {
              width: auto;
            }
            .content-list {
              /* border: 1px solid darkblue; */
              margin: 1rem 0;
            }
          }

          @media all and (min-width: 480px) and (max-width: 768px) {
            .chart {
              width: auto;
            }
          }

          @media all and (max-width: 480px) {
            .chart {
              width: auto;
            }

            .chart-data {
              width: 20rem;
              heigth: 10rem;
              padding: 2rem 0;
            }
          }
        `}
      </style>
    </>
  );
};

export default Charts;
