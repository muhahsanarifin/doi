import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { getCookie } from "cookies-next";

import usersAction from "../../redux/actions/user";
import { PrivateRoute } from "../../helpers/handleRoutes";
import { ICP } from "../../helpers/handleSentence";

import { PersonalInfoButton } from "../../components/Button";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import Footer from "../../components/Footer";
import TitleBar from "../../components/TitleBar";
import { SuccessMsg } from "../../components/Feedback";


import icon from "../../utils/icon";
import styles from "../../styles/userInfo.module.css";

const Info = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users?.getDataUser);
  const updateProfileUser = useSelector(
    (state) => state.users?.updateProfileUser
  );
  const router = useRouter();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [disableInputFirstName, setDisableInputFirstName] = useState(true);
  const [disableInputLastName, setDisableInputLastName] = useState(true);

  useEffect(() => {
    setFirstName(user?.data?.data?.firstName);
    setLastName(user?.data?.data?.lastName);
  }, [user?.data?.data?.firstName, user?.data?.data?.lastName]);

  const body = {
    firstName,
    lastName,
  };

  const handleSaveName = () => {
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
        <TitleBar title={"Personal Information"} />
        <Header />
        <main className={styles["main"]}>
          <SideBar
            focusStyle={styles["focus-style-side-info-button"]}
            titleStyle={styles["init-button-active"]}
            activeIcon={icon.userBlue}
            onTitle={"Profile"}
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
                    {updateProfileUser?.isFulfilled &&
                    updateProfileUser?.data?.data?.firstName !==
                      user?.data?.data?.firstName ? (
                      <SuccessMsg fulfilledMsg={updateProfileUser?.data?.msg} />
                    ) : (
                      <>
                        <p className={styles["identify__title"]}>Firstname</p>
                        <input
                          type="text"
                          className={
                            styles[
                              disableInputFirstName
                                ? "identify__main-content"
                                : "identify__main-content-active"
                            ]
                          }
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          disabled={disableInputFirstName}
                        />
                      </>
                    )}
                  </span>
                  <PersonalInfoButton
                    setEdictOnClick={() =>
                      setDisableInputFirstName(!disableInputFirstName)
                    }
                    setSaveOnClick={handleSaveName}
                    disabledSave={!firstName}
                    disabledStyleSave={!firstName}
                  />
                </span>
              </li>
              <li className={styles["content-list"]}>
                <span className={styles["sub-content-list"]}>
                  <span className={styles["identity"]}>
                    {updateProfileUser?.isFulfilled &&
                    updateProfileUser?.data?.data?.lastName !==
                      user?.data?.data?.lastName ? (
                      <SuccessMsg fulfilledMsg={updateProfileUser?.data?.msg} />
                    ) : (
                      <>
                        <p className={styles["identify__title"]}>Lastname</p>
                        <input
                          type="text"
                          className={
                            styles[
                              disableInputLastName
                                ? "identify__main-content"
                                : "identify__main-content-active"
                            ]
                          }
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          disabled={disableInputLastName}
                        />
                      </>
                    )}
                  </span>
                  <PersonalInfoButton
                    setEdictOnClick={() =>
                      setDisableInputLastName(!disableInputLastName)
                    }
                    setSaveOnClick={handleSaveName}
                    disabledSave={!lastName}
                    disabledStyleSave={!lastName}
                  />
                </span>
              </li>
              <li className={styles["content-list"]}>
                <span className={styles["sub-content-list"]}>
                  <span className={styles["identity"]}>
                    <p className={styles["identify__title"]}>Verified E-mail</p>
                    <p className={styles["identify__main-content"]}>
                      {user?.data?.data?.email}
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
                    {user?.data?.data?.noTelp && (
                      <p className={styles["identify__main-content"]}>
                        {ICP(user?.data?.data?.noTelp)}
                      </p>
                    )}
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
