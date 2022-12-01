/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Image from "next/image";
import Axios from "axios";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
import Swal from "sweetalert2";
import { useState, useEffect } from "react";

import privateRoute from "../../helpers/private";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import Footer from "../../components/Footer";

import edit from "../../assets/icons/edit-2.png";
import arrowLeft from "../../assets/icons/arrow-left.png";

import styles from "../../styles/Profile.module.css";

const Profile = () => {
  // « Private Route »
  privateRoute();

  const route = useRouter();
  // const [image, setImage] = useState();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [picture, setPicture] = useState("");

  const handleLogout = async () => {
    try {
      const response = await Axios.post(
        `${process.env.NEXT_PUBLIC_DOI_BACKEND_API}/auth/logout`,
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      deleteCookie("id");
      deleteCookie("token");
      deleteCookie("pin");
      deleteCookie("firstname");
      deleteCookie("lastname");
      deleteCookie("email");
      deleteCookie("image");
      deleteCookie("noTelp");
      deleteCookie("balance");
      Swal.fire({
        title: `${response.data.msg}`,
        timer: 2000,
        showConfirmButton: false,
        timerProgressBar: true,
        position: "top-start",
        background: "#6379F4",
        color: "#FFFFFF",
        width: "18rem",
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer)
          route.push("/auth/login");
      });
    } catch (error) {
      console.log(error.msg);
    }
  };

  let formData = new FormData();

  const setImage = (e) => {
    console.log(e.target.files[0]);
    if (e.target && e.target.files[0]) {
      formData.append("file", e.target.files[0]);
    }
  };

  // formData.append("file", image);

  const handleChangePicture = async () => {
    try {
      const response = await Axios.patch(
        `${process.env.NEXT_PUBLIC_DOI_BACKEND_API}/user/image/${getCookie(
          "id"
        )}`,
        { formData },
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      console.log(response.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setFirstname(getCookie("firstname"));
  }, []);
  useEffect(() => {
    setLastname(getCookie("lastname"));
  }, []);
  useEffect(() => {
    setNoTelp(getCookie("noTelp"));
  }, []);
  useEffect(() => {
    setPicture(getCookie("picture"));
  }, []);

  return (
    <>
      <Header />
      <main className={styles["main"]}>
        <SideBar
        // onClick={handleLogout}
        />
        <section className={styles["profile-side"]}>
          <span className={styles["profile-side__picture"]}>
            <span className={styles["profile-side__edit-picture"]}>
              <Image
                src={`${process.env.NEXT_PUBLIC_DOI_CLOUDINARY}/${picture}`}
                alt={firstname}
                width={500}
                height={500}
                className={styles["profile-side-image"]}
              />
              <span className={styles["input-file"]}>
                <label onClick={handleChangePicture}>
                  <Image src={edit} alt="edit" className={styles["edit"]} />
                </label>
                <input type="file" onChange={setImage} />
              </span>
            </span>
            <span className={styles["profile-side-indentity"]}>
              <h3>
                {firstname} {lastname}
              </h3>
              <p>{noTelp}</p>
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
