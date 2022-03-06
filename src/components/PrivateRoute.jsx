import { Outlet, Route } from "react-router-dom";
import { useState } from "react";

import React from "react";
import Signin from "./Signin";

const PrivateRoute = ({ children, ...rest }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  console.log("private route");
  return isLoggedIn ? <Outlet /> : <Signin />;
};

export default PrivateRoute;
