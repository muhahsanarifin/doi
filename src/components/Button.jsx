import React from "react";
import styles from "../styles/Button.module.css";

const LoginButton = ({ password, email, init }) => {
  return (
    <>
      <button
        className={styles[!password || !email ? "btn" : "btn-active"]}
        disabled={!password || !email}
      >
        {init}
      </button>
    </>
  );
};

const SignUpButton = ({ firstName, lastName, email, password }) => {
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
      >
        SignUp
      </button>
    </>
  );
};

const ForgotPasswordButton = ({ email }) => {
  return (
    <>
      <button
        className={styles[!email ? "btn" : "btn-active"]}
        disabled={!email}
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
      >
        Confirm
      </button>
    </>
  );
};

const EditPhoneNumberButton = ({ noTelp }) => {
  return (
    <>
      <button
        className={styles[!noTelp ? "btn" : "btn-active"]}
        disabled={!noTelp}
      >
        Edit Phone Number
      </button>
    </>
  );
};

const TopupButton = ({ amount }) => {
  return (
    <>
      <button
        className={styles[!amount ? "btn" : "btn-active"]}
        disabled={!amount}
      >
        Submit
      </button>
    </>
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
};
