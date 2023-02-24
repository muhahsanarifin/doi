import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { PrivateRoute } from "../../helpers/handleRoutes";
import { PersonalInfoButton } from "../../components/Button";
import usersAction from "../../redux/actions/user";
import { getCookie } from "cookies-next";

import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import Footer from "../../components/Footer";
import TitleBar from "../../components/TitleBar";
import userIconBlue from "../../assets/icons/user-blue.png";

import styles from "../../styles/UserInfo.module.css";
import { SuccessMsg } from "../../components/Feedback";

const Info = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users.getDataUser?.data);
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [disableInput, setDisableInput] = useState(true);
  const [successUpdateFirstName, setSuccessUpdateFirstName] = useState("");
  // const [failedUpdateFirstName, setFailedUpdateFirstName] = useState("");
  const [successUpdateLastName, setSuccessUpdateLastName] = useState("");
  // const [failedUpdateLastName, setFailedUpdateLastName] = useState("");

  useEffect(() => {
    setFirstName(user.firstName);
    setLastName(user.lastName);
  }, [user.firstName, user.lastName]);

  const body = {
    firstName: firstName,
    lastName: lastName,
  };

  const handleSaveName = () => {
    dispatch(
      usersAction.updateProfileUserThunk(
        getCookie("id"),
        body,
        getCookie("token"),
        resUpdateProfilePending,
        resUpdateProfileFulfilled,
        resUpdateProfileRejected,
        resUpdatProfileFinally
      )
    );
  };

  const resUpdateProfilePending = () => {};

  const resUpdateProfileFulfilled = (response) => {
    if (response.data?.firstName != user.firstName)
      setSuccessUpdateFirstName(response?.msg);

    if (response.data?.lastName != user.lastName)
      setSuccessUpdateLastName(response?.msg);

    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const resUpdateProfileRejected = (error) => {
    // setFailedUpdateFirstName(error.response.data?.msg);
    // setFailedUpdateLastName(error.response.data?.msg);
    console.log(error.response.data?.msg);
  };

  const resUpdatProfileFinally = () => {
    setTimeout(() => {
      setSuccessUpdateFirstName(false);
      setSuccessUpdateLastName(false);
    }, 2000);
  };

  return (
    <>
      <PrivateRoute>
        <TitleBar name={"Personal Information"} />
        <Header />
        <main className={styles["main"]}>
          <SideBar
            focusStyleProfile={styles["focus-style-side-info-button"]}
            profileStyle={styles["init-button-active"]}
            userIconBlue={userIconBlue}
          />
          <section className={styles["right-side-content"]}>
            <span className={styles["title"]}>
              <h3>Personal Infromation</h3>
              <p className={styles["description"]}>
                We got your personal information from the sign up proccess. If
                you want to make changes on your information, contact our
                support.
              </p>
            </span>
            <ul className={styles["list"]}>
              <li className={styles["content-list"]}>
                <span className={styles["sub-content-list"]}>
                  <span className={styles["identity"]}>
                    {!successUpdateFirstName ? (
                      <>
                        <p className={styles["identify__title"]}>Firstname</p>
                        <input
                          type="text"
                          className={
                            styles[
                              disableInput
                                ? "identify__main-content"
                                : "identify__main-content-active"
                            ]
                          }
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          disabled={disableInput}
                        />
                      </>
                    ) : (
                      <SuccessMsg fulfilledMsg={successUpdateFirstName} />
                    )}
                  </span>
                  <PersonalInfoButton
                    setEdictOnClick={() => setDisableInput(!disableInput)}
                    setSaveOnClick={handleSaveName}
                    disabledSave={!firstName || !lastName}
                    disabledStyleSave={!firstName || !lastName}
                  />
                </span>
              </li>
              <li className={styles["content-list"]}>
                <span className={styles["sub-content-list"]}>
                  <span className={styles["identity"]}>
                    {!successUpdateLastName ? (
                      <>
                        <p className={styles["identify__title"]}>Lastname</p>
                        <input
                          type="text"
                          className={
                            styles[
                              disableInput
                                ? "identify__main-content"
                                : "identify__main-content-active"
                            ]
                          }
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          disabled={disableInput}
                        />
                      </>
                    ) : (
                      <SuccessMsg fulfilledMsg={"Updated Lastname"} />
                    )}
                  </span>
                </span>
              </li>
              <li className={styles["content-list"]}>
                <span className={styles["sub-content-list"]}>
                  <span className={styles["identity"]}>
                    <p className={styles["identify__title"]}>Verified E-mail</p>
                    <p className={styles["identify__main-content"]}>
                      {user.email}
                    </p>
                  </span>
                </span>
              </li>
              <li
                className={`${styles["content-list"]} ${styles["phone-number-content-list"]}`}
              >
                <span className={styles["sub-content-list"]}>
                  <span className={styles["identity"]}>
                    <p className={styles["identify__title"]}>Phone Number</p>
                    <p className={styles["identify__main-content"]}>
                      {user.noTelp}
                    </p>
                  </span>
                </span>
                <button
                  className={styles["btn-manage"]}
                  onClick={() => router.push("/user/update/contact")}
                >
                  Manage
                </button>
              </li>
            </ul>
          </section>
        </main>
        <Footer />
      </PrivateRoute>
    </>
  );
};

export default Info;
