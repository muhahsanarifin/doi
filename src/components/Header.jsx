/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import Image from "next/image";
import Axios from "axios";
import { useEffect, useState } from "react";
import { getCookie, setCookie } from "cookies-next";

import bellIcon from "../assets/icons/bell.png";
import styles from "../styles/Header.module.css";

const header = () => {
  const [firstname, setFirstName] = useState("");
  const [lastname, setLastName] = useState("");
  const [noTelp, setNoTelp] = useState("");
  const [image, setImage] = useState("");

  const getUserById = async () => {
    try {
      const response = await Axios.get(
        `${process.env.NEXT_PUBLIC_DOI_BACKEND_API}/user/profile/${getCookie(
          "id"
        )}`,
        {
          headers: {
            Authorization: `Bearer ${getCookie("token")}`,
          },
        }
      );
      // console.log(response.data);
      setCookie("balance", response.data.data.balance);
      setCookie("firstname", response.data.data.firstName);
      setCookie("lastname", response.data.data.lastName);
      setCookie("email", response.data.data.email);
      setCookie("image", response.data.data.image);
      setCookie("noTelp", response.data.data.noTelp);
      // setDataById(response.data.data);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    setFirstName(getCookie("firstname"));
  }, []);
  useEffect(() => {
    setLastName(getCookie("lastname"));
  }, []);
  useEffect(() => {
    setNoTelp(getCookie("noTelp"));
  }, []);

  useEffect(() => {
    setImage(getCookie("image"));
  }, []);

  useEffect(() => {
    getUserById();
  }, []);

  // const [data, setDataById] = useState([]);
  // const { firstName, lastName, noTelp, image } = data;
  return (
    <>
      <header className={styles["header"]}>
        <span className={styles["logo"]}>Doi</span>
        {
          <span className={styles["header__profile"]}>
            <Image
              src={`${process.env.NEXT_PUBLIC_DOI_CLOUDINARY}/${image}`}
              alt={``}
              className={styles["image-profile"]}
              width={500}
              height={500}
            />
            <span className={styles["indentity-short"]}>
              <p className={styles["fullname"]}>
                {firstname} {lastname}
              </p>
              <p className={styles["phonenumber"]}>{noTelp}</p>
            </span>
            <span className={styles["bell"]}>
              <span className={styles["notification"]}></span>
              <Image src={bellIcon} alt={`bell`} />
            </span>
          </span>
        }
      </header>
    </>
  );
};

export default header;
