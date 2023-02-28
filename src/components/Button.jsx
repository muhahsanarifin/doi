import React, { useRef, useEffect } from "react";
import styles from "../styles/Button.module.css";

const LoginButton = ({ password, email, init, onClick }) => {
  return (
    <>
      <button
        className={styles[!password || !email ? "btn" : "btn-active"]}
        disabled={!password || !email}
        onClick={onClick}
      >
        {init}
      </button>
    </>
  );
};

const SignUpButton = ({
  firstName,
  lastName,
  email,
  password,
  onClick,
  init,
}) => {
  return (
    <>
      <button
        className={
          styles[
            !firstName || !lastName || !password || !email
              ? "btn"
              : "btn-active"
          ]
        }
        onClick={onClick}
      >
        {init}
      </button>
    </>
  );
};

const ForgotPasswordButton = ({ email, onClick }) => {
  return (
    <>
      <button
        className={styles[!email ? "btn" : "btn-active"]}
        disabled={!email}
        onClick={onClick}
      >
        Confirm
      </button>
    </>
  );
};

const PinButton = ({
  numeric,
  numericTwo,
  numericTree,
  numericFour,
  numericFive,
  numericSix,

  onClick,
}) => {
  return (
    <>
      <button
        className={
          styles[
            !numeric ||
            !numericTwo ||
            !numericTree ||
            !numericFour ||
            !numericFive ||
            !numericSix
              ? "btn"
              : "btn-active"
          ]
        }
        disabled={
          !numeric ||
          !numericTwo ||
          !numericTree ||
          !numericFour ||
          !numericFive ||
          !numericSix
        }
        onClick={onClick}
      >
        Confirm
      </button>
    </>
  );
};

const ChangePasswordButton = ({
  currentPassword,
  newPassword,
  repeatPassword,
  onClick,
  init,
}) => {
  return (
    <>
      <button
        className={
          styles[
            !currentPassword || !newPassword || !repeatPassword
              ? "btn"
              : "btn-active"
          ]
        }
        disabled={!currentPassword || !newPassword || !repeatPassword}
        onClick={onClick}
      >
        {init}
      </button>
    </>
  );
};

const EditPhoneNumberButton = ({ noTelp, onClick, init }) => {
  return (
    <>
      <button
        className={styles[!noTelp ? "btn" : "btn-active"]}
        disabled={!noTelp}
        onClick={onClick}
      >
        {init}
      </button>
    </>
  );
};

const TopupButton = ({ onClick, disabled }) => {
  const inputRefence = useRef(null);

  useEffect(() => {
    inputRefence.current.focus();
  }, []);
  return (
    <>
      <button
        ref={inputRefence}
        className={styles[!disabled ? "btn" : "btn-active"]}
        disabled={!disabled}
        onClick={onClick}
      >
        Submit
      </button>
    </>
  );
};

const TryAgainButton = ({ onClick, disabled }) => {
  const inputRefence = useRef(null);

  useEffect(() => {
    inputRefence.current.focus();
  }, []);
  return (
    <>
      <button
        ref={inputRefence}
        onClick={onClick}
        className={styles[!disabled ? "btn" : "btn-active"]}
        disabled={!disabled}
      >
        Try Again
      </button>
    </>
  );
};

const ResetPasswordButton = ({ onClick, disabled, init }) => {
  return (
    <>
      <button
        onClick={onClick}
        className={styles[!disabled ? "btn" : "btn-active"]}
        disabled={!disabled}
      >
        {init}
      </button>
    </>
  );
};

const UpdatedPinButton = ({
  numeric,
  numericTwo,
  numericTree,
  numericFour,
  numericFive,
  numericSix,
  initBtn,
  onClick,
}) => {
  return (
    <>
      <button
        className={
          styles[
            !numeric ||
            !numericTwo ||
            !numericTree ||
            !numericFour ||
            !numericFive ||
            !numericSix
              ? "btn"
              : "btn-active"
          ]
        }
        disabled={
          !numeric ||
          !numericTwo ||
          !numericTree ||
          !numericFour ||
          !numericFive ||
          !numericSix
        }
        onClick={onClick}
      >
        {initBtn}
      </button>
    </>
  );
};

const GoToDashboardButton = ({ onClick }) => {
  return (
    <>
      <button onClick={onClick} className={styles["btn-active"]}>
        Got To Dashboard
      </button>
    </>
  );
};

const PersonalInfoButton = ({
  setEdictOnClick,
  setSaveOnClick,
  disabledEdit,
  disabledSave,
  disabledStyleEdit,
  disabledStyleSave,
}) => {
  return (
    <span className={styles["btn-section"]}>
      <button
        className={
          styles[
            disabledStyleEdit ? "btn-section__edit" : "btn-section__edit-active"
          ]
        }
        onClick={setEdictOnClick}
        disabled={disabledEdit}
      >
        Edit
      </button>
      <button
        className={
          styles[
            disabledStyleSave ? "btn-section__save" : "btn-section__save-active"
          ]
        }
        onClick={setSaveOnClick}
        disabled={disabledSave}
      >
        Save
      </button>
    </span>
  );
};

export {
  LoginButton,
  SignUpButton,
  ForgotPasswordButton,
  PinButton,
  ChangePasswordButton,
  EditPhoneNumberButton,
  TopupButton,
  TryAgainButton,
  UpdatedPinButton,
  GoToDashboardButton,
  ResetPasswordButton,
  PersonalInfoButton,
};
