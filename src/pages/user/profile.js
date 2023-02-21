import React, { useState } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useDisclosure } from "@chakra-ui/react";
import { useRouter } from "next/router";
import usersAction from "../../redux/actions/user";
import { getCookie } from "cookies-next";

import { PrivateRoute } from "../../helpers/handleRoutes";
import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import Footer from "../../components/Footer";
import TitleBar from "../../components/TitleBar";
import { LogoutModal } from "../../components/Overlay";

import edit from "../../assets/icons/edit-2.png";
import arrowLeft from "../../assets/icons/arrow-left.png";
import userIconBlue from "../../assets/icons/user-blue.png";
import styles from "../../styles/Profile.module.css";

const Profile = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector((state) => state.users.getDataUser?.data);
  const [image, setImage] = useState("");
  const [prevImage, setPrevImage] = useState("");

  const handleImage = (e) => {
    let uploaded = e.target.files[0];
    setPrevImage(URL.createObjectURL(uploaded));
    setImage(uploaded);
  };

  const handleBody = (image) => {
    let formData = new FormData();
    formData.append("image", image);
    return formData;
  };

  const body = handleBody(image); // <- Clouser

  const handleUpdateImage = () => {
    if (image.length === 0) return console.log("Must be fill image.");
    dispatch(
      usersAction.updateImageUserThunk(
        getCookie("id"),
        body,
        getCookie("token"),
        "",
        resCbFulfilled,
        ""
      )
    );
  };

  const resCbFulfilled = (data) => {
    setTimeout(() => {
      console.log(data?.msg);
    }, 500);

    setTimeout(() => {
      router.reload();
    }, 1000);
  };

  return (
    <>
      <PrivateRoute>
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
                  src={
                    prevImage
                      ? prevImage
                      : `${process.env.NEXT_PUBLIC_DOI_CLOUDINARY}/${user?.image}`
                  }
                  alt={user.firstName}
                  width={500}
                  height={500}
                  className={styles["profile-side-image"]}
                />
                <span className={styles["input-file"]}>
                  <label onClick={handleUpdateImage}>
                    <Image src={edit} alt="edit" className={styles["edit"]} />
                  </label>
                  <input name="image" type="file" onChange={handleImage} />
                </span>
              </span>
              <span className={styles["profile-side-indentity"]}>
                <h3>{`${user.firstName} ${user.lastName}`}</h3>
                <p>{user.noTelp}</p>
              </span>
            </span>
            <span className={styles["btn-content"]}>
              <ul className={styles["btn-content__list"]}>
                <li onClick={() => router.push("/user/info")}>
                  <p>Personal Information</p>

                  <Image
                    src={arrowLeft}
                    alt="arrow left"
                    className={styles["arrow-left"]}
                  />
                </li>
                <li onClick={() => router.push("/user/update/password")}>
                  <p>Change Password</p>
                  <Image
                    src={arrowLeft}
                    alt="arrow left"
                    className={styles["arrow-left"]}
                  />
                </li>
                <li onClick={() => router.push("/user/update/pin")}>
                  <p>Change PIN</p>
                  <Image
                    src={arrowLeft}
                    alt="arrow left"
                    className={styles["arrow-left"]}
                  />
                </li>
                <li onClick={onOpen}>
                  <p>Logout</p>
                </li>
              </ul>
            </span>
          </section>
        </main>
        <Footer />
        {/* Logout Modal */}
        <LogoutModal
          initBtn="Logout"
          body="Are you sure want to logout ?"
          isOpen={isOpen}
          onClose={onClose}
        />
      </PrivateRoute>
    </>
  );
};

export default Profile;
