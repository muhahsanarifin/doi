import React from "react";
import styles from "../styles/Pagination.module.css";

const Pagination = ({ onPage, onSetPage, historyData }) => {

  // console.log("Result", onPage);
  // console.log("History data", historyData?.pagination);
  // console.log(onPage === 1);

  const handlePrev = () => {
    onSetPage(onPage - 1);
  };

  const handleNext = () => {
    onSetPage(onPage + 1);
  };
  return (
    <>
      <span className={styles["pagination-section"]}>
        <button
          className={
            styles[onPage === 1 ? "previous-btn" : "previous-btn-active"]
          }
          onClick={handlePrev}
          disabled={onPage === 1}
        >
          Previous
        </button>
        <span className={styles["total-page-section"]}>
          <p className={styles["total-page"]}>{historyData.pagination?.page}</p>
        </span>
        <button
          className={
            styles[
              onPage === historyData.pagination?.totalPage
                ? "next-btn"
                : "next-btn-active"
            ]
          }
          onClick={handleNext}
          disabled={onPage === historyData.pagination?.totalPage}
        >
          Next
        </button>
      </span>
      {/* Functional same as css internal */}
    </>
  );
};

export default Pagination;
