import React from "react";
import Image from "next/image";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import styles from "../../styles/Confirmation.module.css";
import arrowUpIconBlue from "../../assets/icons/arrow-up-blue.png";

const confirmation = () => {
  return (
    <>
      <Header />
      <main className={styles["main"]}>
        <SideBar
          focusStyleTransfer={styles["focus-style-side-transfer-button"]}
          transferStyle={styles["init-button-active"]}
          arrowUpIconBlue={arrowUpIconBlue}
        />
        <section className={styles["right-side-content"]}>
          <ul className={styles["list"]}>
            <li className={styles["content-list"]}>
              <p className={styles["content-header-list"]}>{`Transfer to`}</p>
              <span className={styles["sub-content-list"]}>
                <Image src={``} alt={`Image`} className={styles["image"]} />
                <span className={styles["identity"]}>
                  <p className={styles["identify__title"]}>{`Samuel`}</p>
                  <p
                    className={styles["identify__main-content"]}
                  >{`085222222222`}</p>
                </span>
              </span>
            </li>
            <li className={styles["content-list"]}>
              <p className={styles["content-header-list"]}>{`Details`}</p>
              <span className={styles["sub-content-list"]}>
                <span className={styles["identity"]}>
                  <p className={styles["identify__title"]}>{`Amount`}</p>
                  <p
                    className={styles["identify__main-content"]}
                  >{`Rp.1000.000`}</p>
                </span>
              </span>
            </li>
            <li className={styles["content-list"]}>
              <span className={styles["sub-content-list"]}>
                <span className={styles["identity"]}>
                  <p className={styles["identify__title"]}>{`Balance Left`}</p>
                  <p
                    className={styles["identify__main-content"]}
                  >{`5000.000`}</p>
                </span>
              </span>
            </li>
            <li className={styles["content-list"]}>
              <span className={styles["sub-content-list"]}>
                <span className={styles["identity"]}>
                  <p className={styles["identify__title"]}>{`Date & Time`}</p>
                  <p
                    className={styles["identify__main-content"]}
                  >{`May 11, 2020 - 12.20`}</p>
                </span>
              </span>
            </li>
            <li className={styles["content-list"]}>
              <span className={styles["sub-content-list"]}>
                <span className={styles["identity"]}>
                  <p className={styles["identify__title"]}>{`Notes`}</p>
                  <p
                    className={styles["identify__main-content"]}
                  >{`Beli minyak telon`}</p>
                </span>
              </span>
            </li>
          </ul>
          <span className={styles["btn-section"]}>
            <button className={styles["continue-btn"]}>Continue</button>
          </span>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default confirmation;
