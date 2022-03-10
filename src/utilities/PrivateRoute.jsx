import { Outlet, Route } from "react-router-dom";
import { useState, useEffect } from "react";

import React from "react";
import Signin from "../components/Signin";
import Sidebar from "../components/Sidebar";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
import axios from "axios";

const PrivateComponent = ({ children }) => {
  return (
    <div className="w-full h-full flex">
      <Sidebar />
      <div className="w-full overflow-scroll">{<Outlet />}</div>
    </div>
  );
};

const PrivateRoute = ({ children, ...rest }) => {
  const baseURL = import.meta.env.VITE_API_ENTRY;
  const [isSignedIn, setIsSignedIn] = useState(false);

  useEffect(() => {
    let authTokens = localStorage.getItem("token")
      ? JSON.parse(localStorage.getItem("token"))
      : null;

    console.log(authTokens);

    if (authTokens) {
      const accessToken = jwtDecode(authTokens?.access);
      const refreshToken = jwtDecode(authTokens?.refresh);

      // check acess token validity //
      const accessIsExpired = dayjs.unix(accessToken.exp).diff(dayjs()) < 1;
      if (!accessIsExpired) {
        setIsSignedIn(true);
      } else {
        // check refresh token validty //
        const refreshIsExpired = dayjs.unix(refreshToken.exp).diff(dayjs()) < 1;
        if (!refreshIsExpired) {
          const refreshSignin = async () => {
            try {
              console.log("refresh signin");
              const response = await axios.post(`${baseURL}/token/refresh/`, {
                refresh: authTokens.refresh,
              });
              if (response.status === 200) {
                localStorage.setItem("token", JSON.stringify(response.data));
                setIsSignedIn(true);
              }
            } catch (error) {
              console.log(error);
            }
          };
          refreshSignin();
        }
      }
    }
  }, []);

  return isSignedIn ? (
    <PrivateComponent />
  ) : (
    <Signin state={[isSignedIn, setIsSignedIn]} />
  );
};

export default PrivateRoute;
