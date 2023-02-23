import React, { useEffect, useState } from "react";
import Image from "next/image";
import { getCookie } from "cookies-next";
import usersAction from "../../../redux/actions/user";
import { useDispatch, useSelector } from "react-redux";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import SideBar from "../../../components/SideBar";
import { EditPhoneNumberButton } from "../../../components/Button";
import TitleBar from "../../../components/TitleBar";
import { PrivateRoute } from "../../../helpers/handleRoutes";
import { ErrorMsg, Loader } from "../../../components/Feedback";
import { ChangePasswordMsg } from "../../../components/Feedback";

import styles from "../../../styles/Contact.module.css";
import phoneIcon from "../../../assets/icons/phone.png";
import plusIconBlue from "../../../assets/icons/plus-blue.png";
import phoneIconBlue from "../../../assets/icons/phone-blue.png";
import successIcon from "../../../assets/icons/success.png";
import phoneIconRed from "../../../assets/icons/phone-red.png";

const Contact = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.getDataUser);
  const [noTelp, setNoTelp] = useState("");
  const [updatePhoneNumberSuccessMsg, seUpdatePhoneNumberSuccessMSg] =
    useState("");
  const [updatePhoneNumberFailedMsg, seUpdatePhoneNumberFailedMsg] =
    useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setNoTelp(user.data?.noTelp);
  }, [user]);

  const body = {
    noTelp: noTelp,
  };

  const handleUpdatePhoneNumber = () => {
    dispatch(
      usersAction.updateProfileUserThunk(
        getCookie("id"),
        body,
        getCookie("token"),
        resUpdatePhoneNumberPending,
        resUpdatePhoneNumberFulfilled,
        resUpdatePhoneNumberRejected,
        resUpdatePhoneNumberFinally
      )
    );
  };

  const resUpdatePhoneNumberPending = () => {
    setLoading(true);
  };

  const resUpdatePhoneNumberFulfilled = (response) => {
    setTimeout(() => {
      seUpdatePhoneNumberSuccessMSg(response?.msg);
    }, 1000);

    setTimeout(() => {
      window.location.replace("/user/profile");
    }, 1500);
  };

  const resUpdatePhoneNumberRejected = (error) => {
    seUpdatePhoneNumberFailedMsg(error.response.data?.msg);
  };

  const resUpdatePhoneNumberFinally = () => {
    setLoading(false);
    setTimeout(() => {
      seUpdatePhoneNumberFailedMsg(false);
    }, 1500);
  };

  return (
    <>
      <PrivateRoute>
        <TitleBar name={"Edit Phone Number"} />
        <Header />
        <main className={styles["main"]}>
          <SideBar
            focusStyleTopUp={styles["focus-style-side-topup-button"]}
            topUpStyle={styles["init-button-active"]}
            plusIconBlue={plusIconBlue}
          />
          <section className={styles["right-side-content"]}>
            <span className={styles["title"]}>
              <h3>Edit Phone Number</h3>
              {!updatePhoneNumberSuccessMsg ? (
                <p className={styles["description"]}>
                  Add at least one phone number for the transfer ID so you can
                  start transfering your money to another user.
                </p>
              ) : null}
            </span>
            {!updatePhoneNumberSuccessMsg ? (
              <span className={styles["form"]}>
                <ul className={styles["list"]}>
                  <li className={styles["content-list"]}>
                    <span
                      className={
                        styles[
                          updatePhoneNumberFailedMsg
                            ? "form__telp-content-active-rejected"
                            : !noTelp
                            ? "form__telp-content"
                            : "form__telp-content-active"
                        ]
                      }
                    >
                      <label className={styles["label-phone"]}>
                        <Image
                          src={
                            updatePhoneNumberFailedMsg
                              ? phoneIconRed
                              : !noTelp
                              ? phoneIcon
                              : phoneIconBlue
                          }
                          alt="phone"
                          className={styles["phone-icon"]}
                        />
                        <span className={styles["country-phone-code"]}>
                          +62
                        </span>
                      </label>
                      <input
                        type="number"
                        placeholder="Enter your phone number"
                        className={styles["phone"]}
                        onChange={(e) => setNoTelp(e.target.value)}
                        value={"-Infinity" < noTelp ? noTelp : !noTelp}
                      />
                    </span>
                  </li>
                  {updatePhoneNumberFailedMsg ? (
                    <ErrorMsg failedMsg={updatePhoneNumberFailedMsg} />
                  ) : null}
                  <EditPhoneNumberButton
                    noTelp={noTelp}
                    onClick={handleUpdatePhoneNumber}
                    init={
                      loading ? (
                        <Loader onColor={"#5464c7"} />
                      ) : (
                        "Edit Phone Number"
                      )
                    }
                  />
                </ul>
              </span>
            ) : (
              <ChangePasswordMsg
                icon={successIcon}
                msg={updatePhoneNumberSuccessMsg}
              />
            )}
          </section>
        </main>
        <Footer />
      </PrivateRoute>
    </>
  );
};

export default Contact;
