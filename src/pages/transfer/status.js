import React from "react";
import StatusComponent from "../../components/Status";
import { PrivateRoute } from "../../helpers/handleRoutes";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";
import {PreventDirectStatusPage} from "../../helpers/handleRoutes"

import styles from "../../styles/Status.module.css";
import arrowUpIconBlue from "../../assets/icons/arrow-up-blue.png";

const Status = () => {
  return (
    <>
      <PrivateRoute>
        <PreventDirectStatusPage>
          <Header />
          <main className={styles["main"]}>
            <SideBar
              focusStyleTransfer={styles["focus-style-side-transfer-button"]}
              transferStyle={styles["init-button-active"]}
              arrowUpIconBlue={arrowUpIconBlue}
            />
            <section className={styles["right-side-content"]}>
              <StatusComponent />
            </section>
          </main>
          <Footer />
        </PreventDirectStatusPage>
      </PrivateRoute>
    </>
  );
};

export default Status;
