import { useSelector } from "react-redux";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

const PrivateRoute = ({ children }) => {
  const route = useRouter();

  if (!getCookie("token")) route.replace("/auth/login");

  return children;
};

const PreventBackPage = ({ children }) => {
  const route = useRouter();

  if (getCookie("token")) route.replace("/dashboard");

  return children;
};

const PreventDirectStatusPage = ({ children }) => {
  const route = useRouter();
  const confirmationTransferData = useSelector(
    (state) => state.transfer?.confirmationTransfer
  );

  const transfer = useSelector((state) => state.transfer?.transfer);

  if (!confirmationTransferData?.isFulfilled || !transfer?.isFulfilled)
    route.replace("/dashboard");

  return children;
};

const PreventDirectConfirmationPage = ({ children }) => {
  const route = useRouter();
  const confirmationTransferData = useSelector(
    (state) => state.transfer?.confirmationTransfer
  );

  if (!confirmationTransferData?.isFulfilled) route.replace("/dashboard");
  return children;
};

export {
  PrivateRoute,
  PreventBackPage,
  PreventDirectStatusPage,
  PreventDirectConfirmationPage,
};
