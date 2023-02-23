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

const ChangePinMsg = ({ icon, msg }) => {
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

const CreatePinMsg = ({ icon, msg }) => {
  return (
    <>
      <span
        style={{
          alignSelf: "flex-start",
          display: "flex",
          flexDirection: "column",
          gap: "1rem",
        }}
      >
        <Image
          src={icon}
          width={100}
          height={100}
          style={{ width: "48px", height: "48px", alignSelf: "flex-start" }}
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
        <p>{msg} and you can now access all the features in Doi.</p>
      </span>
    </>
  );
};

// Including used by contact page for hadle fulfilled & rejected response.
const ChangePasswordMsg = ({ icon, msg }) => {
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

const ErrorMsg = ({ failedMsg }) => {
  return (
    <>
      <span
        style={{
          width: "27.0625rem",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <p
          style={{
            color: "#ff5b37",
            fontWeight: "700",
            padding: "0.5rem 1rem",
            backgroundColor: "#ff5c3710",
            borderRadius: "6px",
          }}
        >
          {failedMsg}
        </p>
      </span>
    </>
  );
};

export {
  Toast,
  Loader,
  TopUpMsg,
  CreatePinMsg,
  ChangePinMsg,
  ChangePasswordMsg,
  ErrorMsg,
};
