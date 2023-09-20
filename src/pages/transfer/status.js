import React from "react";

import StatusComponent from "../../components/Status";
import TitleBar from "../../components/TitleBar";
import Header from "../../components/Header";
import Footer from "../../components/Footer";
import SideBar from "../../components/SideBar";

import { PrivateRoute } from "../../helpers/handleRoutes";
import {PreventDirectStatusPage} from "../../helpers/handleRoutes"

import icon from "../../utils/icon";
import styles from "../../styles/status.module.css";

const Status = () => {
  return (
    <>
      <PrivateRoute>
        <PreventDirectStatusPage>
          <TitleBar title={"Status"} />
          <Header />
          <main className={styles["main"]}>
            <SideBar
              focusStyle={styles["focus-style-side-transfer-button"]}
              titleStyle={styles["init-button-active"]}
              activeIcon={icon.arrowUpBlue}
              onTitle={"Transfer"}
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
