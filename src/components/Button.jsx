import React, { useRef, useEffect } from "react";
import styles from "../styles/Button.module.css";

const LoginButton = ({ disabled, init, onClick }) => {
  return (
    <>
      <button
        className={styles[disabled ? "btn" : "btn-active"]}
        disabled={disabled}
        onClick={onClick}
      >
        {init}
      </button>
    </>
  );
};

const SignUpButton = ({ disabled, onClick, init }) => {
  return (
    <>
      <button
        className={styles[disabled ? "btn" : "btn-active"]}
        onClick={onClick}
      >
        {init}
      </button>
    </>
  );
};

const ForgotPasswordButton = ({ email, onClick, init }) => {
  return (
    <>
      <button
        className={styles[!email ? "btn" : "btn-active"]}
        disabled={!email}
        onClick={onClick}
      >
        {init}
      </button>
    </>
  );
};

const PinButton = ({
  disabled,
  onClick,
  init
}) => {
  return (
    <>
      <button
        className={styles[disabled ? "btn" : "btn-active"]}
        disabled={disabled}
        onClick={onClick}
      >
        {init}
      </button>
    </>
  );
};

const ChangePasswordButton = ({ disabled, onClick, init }) => {
  return (
    <>
      <button
        className={styles[disabled ? "btn" : "btn-active"]}
        disabled={disabled}
        onClick={onClick}
      >
        {init}
      </button>
    </>
  );
};

const EditPhoneNumberButton = ({ disabled, onClick, init }) => {
  return (
    <>
      <button
        className={styles[disabled ? "btn" : "btn-active"]}
        disabled={disabled}
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
        className={styles[disabled ? "btn" : "btn-active"]}
        disabled={disabled}
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

const UpdatedPinButton = ({ disabled, initBtn, onClick }) => {
  return (
    <>
      <button
        className={styles[disabled ? "btn" : "btn-active"]}
        disabled={disabled}
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
