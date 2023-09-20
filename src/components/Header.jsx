import React, { useRef } from "react";
import Image from "next/image";
import { useSelector } from "react-redux";
import { Icon } from "@iconify/react";
import { useOutsideClick, useBoolean } from "@chakra-ui/react";

import { ICP } from "../helpers/handleSentence";
import { NotificationModal } from "../components/Overlay";
import { Fadex } from "./Transitions";

import icon from "../utils/icon";
import styles from "../styles/Header.module.css";

const Header = () => {
  const [isOpen, setIsOpen] = useBoolean();
  const refNotification = useRef();
  const user = useSelector((state) => state.users?.getDataUser);
  useOutsideClick({
    ref: refNotification,
    handler: setIsOpen.off,
  });

  return (
    <>
      <header className={styles["header-section"]}>
        <span className={styles["header"]}>
          <span className={styles["logo"]}>Doi</span>
          <span className={styles["header__profile"]}>
            {user?.isFulfilled && (
              <>
                {user.data?.data?.image ? (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_DOI_CLOUDINARY}/${user.data?.data?.image}`}
                    alt="Profile"
                    className={styles["image-profile"]}
                    width={50}
                    height={50}
                  />
                ) : (
                  <Icon
                    icon="radix-icons:avatar"
                    className={styles["avatar-profile"]}
                  />
                )}
                <span className={styles["indentity-short"]}>
                  <p className={styles["fullname"]}>
                    {`${user?.data?.data?.firstName} ${user?.data?.data?.lastName}`}
                  </p>
                  <p className={styles["phonenumber"]}>
                    {user.data?.data?.noTelp === null && (
                      <span className={styles["spna"]}>
                        Please, set your phone number!
                      </span>
                    )}
                    {user.data?.data?.noTelp && ICP(user.data?.data?.noTelp)}
                  </p>
                </span>
              </>
            )}
            <span className={styles["bell"]}>
              {isOpen && (
                <div className={styles["notification"]}>
                  <Fadex isOpen={isOpen}>
                    <div
                      className={styles["notification-layout"]}
                      ref={refNotification}
                    >
                      <NotificationModal />
                    </div>
                  </Fadex>
                </div>
              )}
              {isOpen === true ? (
                <div className={styles["bell-btn"]}>
                  <Image
                    src={icon.bell}
                    alt="Bell"
                    className={styles["bell-image"]}
                    placeholder="blur"
                  />
                </div>
              ) : (
                <button className={styles["bell-btn"]} onClick={setIsOpen.on}>
                  <Image
                    src={icon.bell}
                    alt="Bell"
                    className={styles["bell-image"]}
                    placeholder="blur"
                  />
                </button>
              )}
            </span>
          </span>
        </span>
      </header>
    </>
  );
};

export default Header;
