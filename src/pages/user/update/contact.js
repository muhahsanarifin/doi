import React, { useState } from "react";
import Image from "next/image";
import { getCookie } from "cookies-next";
import { useDispatch, useSelector } from "react-redux";

import usersAction from "../../../redux/actions/user";
import { PrivateRoute } from "../../../helpers/handleRoutes";
import { INPCwZero } from "../../../helpers/validate";

import Header from "../../../components/Header";
import Footer from "../../../components/Footer";
import SideBar from "../../../components/SideBar";
import { EditPhoneNumberButton } from "../../../components/Button";
import TitleBar from "../../../components/TitleBar";
import { ErrorMsg, Loader } from "../../../components/Feedback";
import { SuccessPhoneNumberMsg } from "../../../components/Feedback";

import icon from "../../../utils/icon";
import styles from "../../../styles/contact.module.css";

const Contact = () => {
  const dispatch = useDispatch();
  const updateProfileUser = useSelector(
    (state) => state.users?.updateProfileUser
  );
  const [noTelp, setNoTelp] = useState("");

  const body = {
    noTelp: noTelp,
  };

  const handleUpdatePhoneNumber = () => {
    const id = getCookie("id");
    const accessToken = getCookie("token");
    dispatch(
      usersAction.updateProfileUserThunk({
        id,
        body,
        accessToken,
        cbUPUFulfilled,
      })
    );
  };

  const cbUPUFulfilled = () => {
    setNoTelp("");
    const id = getCookie("id");
    const accessToken = getCookie("token");
    dispatch(usersAction.getDataUserThunk({ id, accessToken, cbFulfilled }));
  };

  const cbFulfilled = () => {
    setTimeout(() => {
      dispatch(usersAction.cupdThunk());
    }, 1000);
  };

  return (
    <>
      <PrivateRoute>
        <TitleBar title={"Edit Phone Number"} />
        <Header />
        <main className={styles["main"]}>
          <SideBar
            focusStyle={styles["focus-style-side-profile-button"]}
            titleStyle={styles["init-button-active"]}
            activeIcon={icon.userBlue}
            onTitle={"Profile"}
          />
          <section className={styles["right-side-content"]}>
            <span className={styles["title"]}>
              <h3>Edit Phone Number</h3>
              {updateProfileUser?.isFulfilled ? null : (
                <p className={styles["description"]}>
                  Add at least one phone number for the transfer ID so you can
                  start transfering your money to another user.
                </p>
              )}
            </span>
            {updateProfileUser?.isFulfilled ? (
              <SuccessPhoneNumberMsg
                icon={icon.success}
                msg={updateProfileUser?.data?.msg}
              />
            ) : (
              <span className={styles["form"]}>
                <ul className={styles["list"]}>
                  <li className={styles["content-list"]}>
                    <span
                      className={
                        styles[
                          updateProfileUser?.isRejected
                            ? "form__telp-content-active-rejected"
                            : !noTelp || !INPCwZero(noTelp)
                            ? "form__telp-content"
                            : "form__telp-content-active"
                        ]
                      }
                    >
                      <label className={styles["label-phone"]} htmlFor="noTelp">
                        <Image
                          src={
                            updateProfileUser?.isRejected
                              ? icon.telpRed
                              : !noTelp || !INPCwZero(noTelp)
                              ? icon.telp
                              : icon.telpBlue
                          }
                          alt="phone"
                          className={styles["phone-icon"]}
                          placeholder="blur"
                        />
                        <span className={styles["country-phone-code"]}>
                          +62
                        </span>
                      </label>
                      <input
                        id="noTelp"
                        type="number"
                        placeholder="Enter your phone number"
                        className={styles[noTelp ? "phone-active" : "phone"]}
                        onChange={(e) => setNoTelp(e.target.value)}
                        value={"-Infinity" < noTelp ? noTelp : !noTelp}
                      />
                    </span>
                  </li>
                  {updateProfileUser?.isRejected ? (
                    <ErrorMsg failedMsg={updateProfileUser?.err} />
                  ) : null}
                  <EditPhoneNumberButton
                    disabled={!noTelp || !INPCwZero(noTelp)}
                    onClick={handleUpdatePhoneNumber}
                    init={
                      updateProfileUser?.isLoading ? (
                        <Loader onColor={"#5464c7"} />
                      ) : (
                        "Edit Phone Number"
                      )
                    }
                  />
                </ul>
              </span>
            )}
          </section>
        </main>
        <Footer />
      </PrivateRoute>
    </>
  );
};

export default Contact;
