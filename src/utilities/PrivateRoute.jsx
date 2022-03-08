import { Outlet, Route } from "react-router-dom";
import { useState } from "react";

import React from "react";
import Signin from "../components/Signin";
import Sidebar from "../components/Sidebar";
import { useEffect } from "react/cjs/react.production.min";

const PrivateComponent = ({ children }) => {
  return (
    <div className="w-full h-full flex">
      <Sidebar />
      <div className="w-full overflow-scroll border border-green-500">
        {<Outlet />}
      </div>
    </div>
  );
};

const PrivateRoute = ({ children, ...rest }) => {
  const authTokens = localStorage.getItem("token")
    ? JSON.parse(localStorage.getItem("token"))
    : null;

  const [isSignedIn, setIsSignedIn] = useState(authTokens ? true : false);

  console.log("private route");
  return isSignedIn ? (
    <PrivateComponent />
  ) : (
    <Signin state={[isSignedIn, setIsSignedIn]} />
  );
};

export default PrivateRoute;
