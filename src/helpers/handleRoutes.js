import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { getCookie } from "cookies-next";
import { useRouter } from "next/router";

const PrivateRoute = ({ children }) => {
  const route = useRouter();

  useEffect(() => {
    if (!getCookie("token")) {
      route.replace("/auth/login");
    }
  }, [route]);

  return children;
};

const PreventBackPage = ({ children }) => {
  const route = useRouter();

  useEffect(() => {
    if (getCookie("token")) {
      route.replace("/dashboard");
    }
  }, [route]);

  return children;
};

const PreventDirectStatusPage = ({ children }) => {
  const route = useRouter();
  const confirmationTransferData = useSelector(
    (state) => state.transfer?.confirmationTransfer
  );

  useEffect(() => {
    if (confirmationTransferData === undefined) {
      route.replace("/dashboard");
    }
  }, [confirmationTransferData, route]);

  return children;
};

export { PrivateRoute, PreventBackPage, PreventDirectStatusPage };
