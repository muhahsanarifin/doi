import React, { useState } from "react";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { useDisclosure } from "@chakra-ui/react";
import usersAction from "../../redux/actions/user";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { Icon } from "@iconify/react";

import { PrivateRoute } from "../../helpers/handleRoutes";
import { ICP } from "../../helpers/handleSentence";

import Header from "../../components/Header";
import SideBar from "../../components/SideBar";
import Footer from "../../components/Footer";
import TitleBar from "../../components/TitleBar";
import { LogoutModal } from "../../components/Overlay";
import { SuccessMsg } from "../../components/Feedback";
import { PersonLoader } from "../../components/Loader";

import icon from "../../utils/icon";
import styles from "../../styles/profile.module.css";

const Profile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const user = useSelector((state) => state.users?.getDataUser);
  const updateImageUser = useSelector((state) => state?.users?.updateImageUser);
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

  const body = handleBody(image);

  const handleUpdateImage = () => {
    const id = getCookie("id");
    const accessToken = getCookie("token");
    if (image.length === 0) return console.error("Must be fill image.");
    dispatch(
      usersAction.updateImageUserThunk({
        accessToken,
        id,
        body,
        cbUIUFulfilled,
      })
    );
  };

  // Update image user condition callback function
  const cbUIUFulfilled = () => {
    const id = getCookie("id");
    const accessToken = getCookie("token");

    dispatch(usersAction.getDataUserThunk({ id, accessToken, cbFulfilled }));
  };

  // Get data user condition callback function
  const cbFulfilled = () => {
    dispatch(usersAction.cuidThunk());
  };

  return (
    <>
      <PrivateRoute>
        <TitleBar title={"Profile"} />
        <Header />
        <main className={styles["main"]}>
          <SideBar
            focusStyle={styles["focus-style-side-profile-button"]}
            titleStyle={styles["init-button-active"]}
            activeIcon={icon.userBlue}
            onTitle={"Profile"}
          />
          <section className={styles["profile-side"]}>
            <span className={styles["profile-side__picture"]}>
              <span className={styles["profile-side__edit-picture"]}>
                {updateImageUser?.isFulfilled ? (
                  <SuccessMsg fulfilledMsg={updateImageUser?.data?.msg} />
                ) : (
                  <>
                    {user?.isLoading ? (
                      <PersonLoader />
                    ) : (
                      <>
                        {user?.data?.data?.image ? (
                          <Image
                            src={
                              prevImage
                                ? prevImage
                                : `${process.env.NEXT_PUBLIC_DOI_CLOUDINARY}/${user?.data?.data?.image}`
                            }
                            alt={user?.data?.data?.firstName}
                            width={500}
                            height={500}
                            className={styles["profile-side-image"]}
                          />
                        ) : (
                          <Icon
                            icon="radix-icons:avatar"
                            style={{ width: "80px", height: "80px" }}
                          />
                        )}
                      </>
                    )}
                    <span className={styles["input-file"]}>
                      <label onClick={handleUpdateImage}>
                        <Image
                          src={icon.edit}
                          alt="edit"
                          className={styles["edit"]}
                          placeholder="blur"
                        />
                      </label>
                      <input name="image" type="file" onChange={handleImage} />
                    </span>
                  </>
                )}
              </span>
              {user?.isFulfilled && (
                <span className={styles["profile-side-indentity"]}>
                  <h3>{`${user?.data?.data?.firstName} ${user?.data?.data?.lastName}`}</h3>
                  {user?.data?.data?.noTelp && (
                    <p>{ICP(user?.data?.data?.noTelp)}</p>
                  )}
                </span>
              )}
            </span>
            <span className={styles["btn-content"]}>
              <ul className={styles["btn-content__list"]}>
                <li onClick={() => router.push("/user/info")}>
                  <p>Personal Information</p>

                  <Image
                    src={icon.arrowLeft}
                    alt="arrow left"
                    className={styles["arrow-left"]}
                    placeholder="blur"
                  />
                </li>
                <li onClick={() => router.push("/user/update/password")}>
                  <p>Change Password</p>
                  <Image
                    src={icon.arrowLeft}
                    alt="arrow left"
                    className={styles["arrow-left"]}
                    placeholder="blur"
                  />
                </li>
                <li onClick={() => router.push("/user/update/pin")}>
                  <p>Change PIN</p>
                  <Image
                    src={icon.arrowLeft}
                    alt="arrow left"
                    className={styles["arrow-left"]}
                    placeholder="blur"
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
