import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCookie, deleteCookie } from "cookies-next";
import Image from "next/image";

import authsAction from "../redux/actions/auth";
import dashboardAction from "../redux/actions/dashboard";
import historyTransactionAction from "../redux/actions/history";
import topUpAction from "../redux/actions/topup";
import transferAction from "../redux/actions/transfer";
import usersAction from "../redux/actions/user";

import Pin from "./Pin";

import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ModalHeader,
  Button,
} from "@chakra-ui/react";
import { Loader } from "./Feedback";

// Logout Modal
const LogoutModal = ({ title, initBtn, body, isOpen, onClose }) => {
  const dispatch = useDispatch();
  const logout = useSelector((state) => state.auth?.logout);

  // Handle logout
  const handleLogout = () => {
    const accessToken = getCookie("token");
    dispatch(authsAction.logoutThunk({ accessToken, cbFulfilled }));
  };

  const cbFulfilled = () => {
    // Delete in cookies
    const values = ["id", "token"];
    values.map((value) => deleteCookie(value));

    // Delete in local storage
    const actions = [
      authsAction.caadThunk,
      dashboardAction.cdadThunk,
      historyTransactionAction.chtadThunk,
      topUpAction.ctuadThunk,
      transferAction.ctadThunk,
      usersAction.cuadThunk,
    ];

    actions.map((action) => dispatch(action()));
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent maxWidth="18rem">
          <ModalHeader>{title}</ModalHeader>
          <ModalBody textAlign="center" fontSize="16px" fontWeight="700">
            {body}
          </ModalBody>
          <ModalFooter display="flex" justifyContent="center">
            <Button
              colorScheme="blue"
              fontWeight={"bold"}
              mr={3}
              onClick={onClose}
              fontSize="14px"
              width="4.243rem"
            >
              Close
            </Button>
            <Button
              fontWeight={"bold"}
              variant="ghost"
              mr={3}
              onClick={handleLogout}
              fontSize="14px"
              width="4.243rem"
            >
              {logout?.isLoading ? <Loader onColor="#5464c7" /> : initBtn}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

// Tranfer Pin Modal
const PinConfirmationModal = ({
  initBtn,
  isOpen,
  onClose,
  onClick,
  onSetPin,
  onSetPinTwo,
  onSetPinThree,
  onSetPinFour,
  onSetPinFive,
  onSetPinSix,
  disabled,
  onSuccessMsg,
  onFailedMsg,
  onTrueSuccessMsg,
  onTrueFailedMsg,
  onLoading,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#3A3D42" fontStyle="18px" fontWeight="700">
            Enter PIN to Transfer
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" gap="1rem">
            <div style={{ maxWidth: "18.875rem" }}>
              <p
                style={{
                  fontSize: "16px",
                  color: "rgba(58, 61, 66, 0.6)",
                  fontWeight: "400",
                }}
              >
                Enter{" "}
                <span style={{ fontWeight: "800" }}>your 6 digits PIN </span>for
                confirmation to continue transferring money.
              </p>
            </div>
            <div
              style={{
                alignSelf: "center",
                width: "22.7rem",
              }}
            >
              <Pin
                onSetPin={onSetPin}
                onSetPinTwo={onSetPinTwo}
                onSetPinThree={onSetPinThree}
                onSetPinFour={onSetPinFour}
                onSetPinFive={onSetPinFive}
                onSetPinSix={onSetPinSix}
                onSetPinFailed={onTrueFailedMsg}
                onSetPinTrue={onTrueSuccessMsg}
              />
            </div>
            {onTrueSuccessMsg ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    color: "#1EC15F",
                    fontWeight: "700",
                    padding: "0.5rem 1rem",
                    backgroundColor: "#1ec15f0a",
                    borderRadius: "6px",
                  }}
                >
                  {onSuccessMsg}
                </p>
              </div>
            ) : onTrueFailedMsg ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    color: "#FF5B37",
                    fontWeight: "700",
                    padding: "0.5rem 1rem",
                    backgroundColor: "#ff5c3710",
                    borderRadius: "6px",
                  }}
                >
                  {onFailedMsg}
                </p>
              </div>
            ) : null}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              fontSize="14px"
              maxWidth="10.625rem"
              fontWeight="700"
              onClick={onClick}
              disabled={disabled}
            >
              {onLoading ? <Loader onColor="#5464c7" /> : initBtn}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

// Toupup Pin Modal
const PinModalTopUp = ({
  initBtn,
  isOpen,
  onClose,
  onClick,
  onSetPin,
  onSetPinTwo,
  onSetPinThree,
  onSetPinFour,
  onSetPinFive,
  onSetPinSix,
  disabled,
  onSuccessMsg,
  onFailedMsg,
  onTrueSuccessMsg,
  onTrueFailedMsg,
  onLoading,
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose} motionPreset="slideInBottom">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader color="#3A3D42" fontStyle="18px" fontWeight="700">
            Enter PIN to Top Up
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody display="flex" flexDirection="column" gap="1rem">
            <div style={{ maxWidth: "18.875rem" }}>
              <p
                style={{
                  fontSize: "16px",
                  color: "rgba(58, 61, 66, 0.6)",
                  fontWeight: "400",
                }}
              >
                Enter{" "}
                <span style={{ fontWeight: "800" }}>your 6 digits PIN </span>for
                confirmation to continue Top Up.
              </p>
            </div>
            <div style={{ alignSelf: "center", width: "22.7rem" }}>
              <Pin
                onSetPin={onSetPin}
                onSetPinTwo={onSetPinTwo}
                onSetPinThree={onSetPinThree}
                onSetPinFour={onSetPinFour}
                onSetPinFive={onSetPinFive}
                onSetPinSix={onSetPinSix}
                onSetPinFailed={onTrueFailedMsg}
                onSetPinTrue={onTrueSuccessMsg}
              />
            </div>
            {onTrueSuccessMsg ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    color: "#1EC15F",
                    fontWeight: "700",
                    padding: "0.5rem 1rem",
                    backgroundColor: "#1ec15f0a",
                    borderRadius: "6px",
                  }}
                >
                  {onSuccessMsg}
                </p>
              </div>
            ) : onTrueFailedMsg ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <p
                  style={{
                    color: "#FF5B37",
                    fontWeight: "700",
                    padding: "0.5rem 1rem",
                    backgroundColor: "#ff5c3710",
                    borderRadius: "6px",
                  }}
                >
                  {onFailedMsg}
                </p>
              </div>
            ) : null}
          </ModalBody>
          <ModalFooter>
            <Button
              colorScheme="blue"
              mr={3}
              fontSize="14px"
              maxWidth="10.625rem"
              fontWeight="700"
              onClick={onClick}
              disabled={disabled}
            >
              {onLoading ? <Loader onColor="#5464c7" /> : initBtn}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

// Notification Modal
const NotificationModal = () => {
  return (
    <>
      <ul
        style={{
          display: "flex",
          flexDirection: "column",
          rowGap: "1rem",
          flex: "1",
        }}
      >
        {true ? (
          <h1
            style={{
              fontSize: "16px",
              fontWeight: "800",
              height: "fit-content",
              margin: "auto",
              color: "#7a7886",
            }}
          >
            Does not exist notification!
          </h1>
        ) : (
          <>
            {new Array(5).fill(0).map((_, idx) => (
              <>
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    columnGap: "1rem",
                    padding: "0.5rem",
                    boxShadow: "0px 4px 20px 0px rgba(0, 0, 0, 0.05)",
                    borderRadius: "0.625rem",
                  }}
                  key={idx}
                >
                  <Image
                    src={""}
                    alt="icon"
                    style={{
                      border: "1px solid darkRed",
                      width: "24px",
                      height: "24px",
                    }}
                    width={500}
                    height={500}
                  />
                  <div
                    style={{
                      border: "1px solid darkBlue",
                      display: "flex",
                      flexDirection: "column",
                      rowGap: "0.5rem",
                    }}
                  >
                    <p
                      style={{
                        border: "1px solid darkGreen",
                        fontSize: "12px",
                      }}
                    >
                      Accept from Joshua
                    </p>
                    <p
                      style={{
                        border: "1px solid darkBlue",
                        fontWeight: "800",
                      }}
                    >
                      Rp.200.000
                    </p>
                  </div>
                </li>
              </>
            ))}
          </>
        )}
      </ul>
    </>
  );
};

export { LogoutModal, PinConfirmationModal, PinModalTopUp, NotificationModal };
