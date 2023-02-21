import { useToast, CircularProgress } from "@chakra-ui/react";
import Image from "next/image";

const Toast = ({ title, id, status, position }) => {
  const toast = useToast();
  if (!toast.isActive(id)) {
    // <- Preventing duplicate Toast
    toast({
      id,
      title: title,
      duration: 2000,
      status: status,
      position: position,
      isClosable: true,
    });
  }
};

const Loader = ({ onColor }) => {
  return (
    <CircularProgress
      color={onColor}
      isIndeterminate
      size="24px"
      thickness="12px"
    />
  );
};

const TopUpMsg = ({ icon, msg }) => {
  return (
    <>
      <span
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Image
          src={icon}
          width={100}
          height={100}
          style={{ width: "48px", height: "48px", alignSelf: "center" }}
          alt="Success Icon"
        />
        <p
          style={{
            colo: "#4D4B57",
            textAlign: "center",
            fontWeight: "700",
            fontSize: "22px",
          }}
        >
          {msg}
        </p>
      </span>
    </>
  );
};

export { Toast, Loader, TopUpMsg };
