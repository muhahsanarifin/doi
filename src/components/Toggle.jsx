import React from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";

const HideShowPassword = ({ onClick, onShow, className }) => {
  return (
    // Dynamic click event and classname
    <span onClick={onClick} className={className}>
      {onShow ? <ViewIcon color="#A9A9A9" /> : <ViewOffIcon color="#A9A9A9" />}
    </span>
  );
};

export { HideShowPassword };
