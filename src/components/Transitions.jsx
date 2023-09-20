import React from "react";
import { Fade} from '@chakra-ui/react'

export const Fadex = ({ children, isOpen}) => {
  return (
    <>
      <Fade in={isOpen}>{children}</Fade>
    </>
  );
};
