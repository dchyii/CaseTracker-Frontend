import { Outlet, Route } from "react-router-dom";
import { useState } from "react";

import React from "react";
import Signin from "./Signin";

const PrivateComponent = ({ children }) => {
  return (
    <>
      <p className="border border-red-500">Sidebar</p>
      <div className="border border-green-500">{<Outlet />}</div>
    </>
  );
};

const PrivateRoute = ({ children, ...rest }) => {
  const [isSignedIn, setIsSignedIn] = useState(false);
  console.log("private route");
  return isSignedIn ? (
    <PrivateComponent />
  ) : (
    <Signin state={[isSignedIn, setIsSignedIn]} />
  );
};

export default PrivateRoute;
