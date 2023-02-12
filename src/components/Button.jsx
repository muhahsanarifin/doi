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

export { LoginButton, SignUpButton, ForgotPasswordButton };
