import React, { useState } from "react";
import authsAction from "../redux/actions/auth";
import { useDispatch } from "react-redux";
import { getCookie, deleteCookie } from "cookies-next";
import { useRouter } from "next/router";
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
  const route = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  // Handle logout
  const handleLogout = () => {
    dispatch(
      authsAction.logoutThunk(
        getCookie("token"),
        resCbLogoutPending,
        resCbLogoutFulfilled,
        "",
        resCbLogoutFinally
      )
    );
  };

  const resCbLogoutPending = () => {
    setTimeout(() => {
      setLoading(true);
    }, 1000);
  };

  const resCbLogoutFulfilled = () => {
    setTimeout(() => {
      // Delete cookies
      const values = ["id", "token"];
      values.map((value) => deleteCookie(value));

      // Clear lstorage
      window.localStorage.clear();

      route.push("/auth/login");
    }, 2000);
  };

  const resCbLogoutFinally = () => {
    setLoading(false);
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
              mr={3}
              onClick={onClose}
              fontSize="14px"
              width="4.243rem"
            >
              Close
            </Button>
            <Button
              colorScheme="green"
              mr={3}
              onClick={handleLogout}
              fontSize="14px"
              width="4.243rem"
            >
              {loading ? <Loader onColor="#266a48" /> : initBtn}
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

// Pin modal tranfer
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
  onSetSuccess,
  onSetFailed,
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
                Enter your 6 digits PIN for confirmation to continue
                transferring money.
              </p>
            </div>
            <div style={{ alignSelf: "center" }}>
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
                <p style={{ color: "#1EC15F", fontWeight: "700" }}>
                  {onSetSuccess}
                </p>
              </div>
            ) : onTrueFailedMsg ? (
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <p style={{ color: "#FF5B37", fontWeight: "700" }}>
                  {onSetFailed}
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
      ;
    </>
  );
};

// Pin modal Toupup
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
  onSetSuccess,
  onSetFailed,
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
                Enter your 6 digits PIN for confirmation to continue Top Up.
              </p>
            </div>
            <div style={{ alignSelf: "center" }}>
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
                  {onSetSuccess}
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
                  {onSetFailed}
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

export { LogoutModal, PinConfirmationModal, PinModalTopUp };
