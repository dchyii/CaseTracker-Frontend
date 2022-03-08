import { Outlet, Route } from "react-router-dom";
import { useState } from "react";

import React from "react";
import Signin from "./Signin";
import Sidebar from "./Sidebar";

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
  const [isSignedIn, setIsSignedIn] = useState(false);
  console.log("private route");
  return isSignedIn ? (
    <PrivateComponent />
  ) : (
    <Signin state={[isSignedIn, setIsSignedIn]} />
  );
};

export default PrivateRoute;
