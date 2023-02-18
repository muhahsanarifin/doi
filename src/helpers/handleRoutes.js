import React, { useEffect } from "react";

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
export { PrivateRoute, PreventBackPage };
