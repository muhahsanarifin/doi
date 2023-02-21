import React from "react";
import { PinInput, PinInputField } from "@chakra-ui/react";

import styles from "../styles/Pin.module.css";

const Pin = ({
  onSetPin,
  onSetPinTwo,
  onSetPinThree,
  onSetPinFour,
  onSetPinFive,
  onSetPinSix,
  onSetPinFailed,
  onSetPinTrue,
}) => {
  return (
    <>
      <span className={styles["form"]}>
        <span className={styles["pin-form"]}>
          <PinInput otp placeholder="_" autoFocus={true}>
            <PinInputField
              className={
                styles[
                  onSetPinTrue
                    ? "pin-styles"
                    : onSetPinFailed
                    ? "pin-styles-failed"
                    : "pin-styles"
                ]
              }
              onChange={onSetPin}
              required
            />
            <PinInputField
              className={
                styles[
                  onSetPinTrue
                    ? "pin-styles"
                    : onSetPinFailed
                    ? "pin-styles-failed"
                    : "pin-styles"
                ]
              }
              onChange={onSetPinTwo}
              required
            />
            <PinInputField
              className={
                styles[
                  onSetPinTrue
                    ? "pin-styles"
                    : onSetPinFailed
                    ? "pin-styles-failed"
                    : "pin-styles"
                ]
              }
              onChange={onSetPinThree}
              required
            />
            <PinInputField
              className={
                styles[
                  onSetPinTrue
                    ? "pin-styles"
                    : onSetPinFailed
                    ? "pin-styles-failed"
                    : "pin-styles"
                ]
              }
              onChange={onSetPinFour}
              required
            />
            <PinInputField
              className={
                styles[
                  onSetPinTrue
                    ? "pin-styles"
                    : onSetPinFailed
                    ? "pin-styles-failed"
                    : "pin-styles"
                ]
              }
              onChange={onSetPinFive}
              required
            />
            <PinInputField
              className={
                styles[
                  onSetPinTrue
                    ? "pin-styles"
                    : onSetPinFailed
                    ? "pin-styles-failed"
                    : "pin-styles"
                ]
              }
              onChange={onSetPinSix}
              required
            />
          </PinInput>
        </span>
      </span>
    </>
  );
};

export default Pin;
