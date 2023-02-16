import { useToast, CircularProgress } from "@chakra-ui/react";

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

const Loader = () => {
  return (
    <CircularProgress
      color="#5464c7"
      isIndeterminate
      size="24px"
      thickness="12px"
    />
  );
};

export { Toast, Loader };
