import React, { useState, useEffect } from "react";
import Image from "next/image";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import Auth from "../../utils/api/auth";

import privateRoute from "../../helpers/private";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import Footer from "../../components/Footer";
import TitleBar from "../../components/TitleBar";

import edit from "../../assets/icons/edit-2.png";
import arrowLeft from "../../assets/icons/arrow-left.png";
import userIconBlue from "../../assets/icons/user-blue.png";
import styles from "../../styles/Profile.module.css";

const Profile = () => {
  privateRoute();
  const route = useRouter();
  const user = useSelector((state) => state.users.getDataUser?.data);

  console.log("User data: ", user);

  const handleLogout = async () => {
    try {
      const response = await Auth.logout(getCookie("token"));
      if (response.status === 200) {
        // Delete cookies
        const values = ["id", "token"];
        values.map((value) => deleteCookie(value));

        route.push("/auth/login");
      }
    } catch (error) {
      console.log(error.msg);
    }
  };

  return (
    <>
      <TitleBar name={"Profile"} />
      <Header />
      <main className={styles["main"]}>
        <SideBar
          focusStyleProfile={styles["focus-style-side-profile-button"]}
          profileStyle={styles["init-button-active"]}
          userIconBlue={userIconBlue}
        />
        <section className={styles["profile-side"]}>
          <span className={styles["profile-side__picture"]}>
            <span className={styles["profile-side__edit-picture"]}>
              <Image
                src={`${process.env.NEXT_PUBLIC_DOI_CLOUDINARY}/${user.image}`}
                alt={user.firstName}
                width={500}
                height={500}
                className={styles["profile-side-image"]}
              />
              <span className={styles["input-file"]}>
                <label>
                  <Image src={edit} alt="edit" className={styles["edit"]} />
                </label>
                <input type="file" />
              </span>
            </span>
            <span className={styles["profile-side-indentity"]}>
              <h3>
                {getCookie("firstname")} {getCookie("lastname")}
              </h3>
              <p>{getCookie("noTelp")}</p>
            </span>
          </span>
          <span className={styles["btn-content"]}>
            <ul className={styles["btn-content__list"]}>
              <li onClick={() => route.push("/user/info")}>
                <p>Personal Information</p>

                <Image
                  src={arrowLeft}
                  alt="arrow left"
                  className={styles["arrow-left"]}
                />
              </li>
              <li onClick={() => route.push("/user/update/password")}>
                <p>Change Password</p>
                <Image
                  src={arrowLeft}
                  alt="arrow left"
                  className={styles["arrow-left"]}
                />
              </li>
              <li onClick={() => route.push("/user/update/pin")}>
                <p>Change PIN</p>
                <Image
                  src={arrowLeft}
                  alt="arrow left"
                  className={styles["arrow-left"]}
                />
              </li>
              <li onClick={handleLogout}>
                <p>Logout</p>
              </li>
            </ul>
          </span>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default Profile;
