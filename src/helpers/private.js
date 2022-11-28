/* eslint-disable react-hooks/rules-of-hooks */

import React from "react";

import { getCookie } from "cookies-next";
import { useRouter } from "next/router";
import { useEffect } from "react";

const privateRoute = () => {
  const route = useRouter();

  useEffect(() => {
    if (!getCookie("token")) {
      route.push("/auth/login");
    }
  }, []);
  return <h3>Private Route</h3>;
};
export default privateRoute;
