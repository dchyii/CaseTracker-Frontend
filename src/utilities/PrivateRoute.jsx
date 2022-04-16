import { Outlet, Route } from "react-router-dom";
import { useState, useEffect, createContext, useContext } from "react";

import React from "react";
import Signin2 from "../components/Signin2";
import Sidebar from "../components/Sidebar";
import jwtDecode from "jwt-decode";
import dayjs from "dayjs";
import axios from "axios";

export const UserContext = createContext();

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
  const [user, setUser] = useState({
    user_id: "",
    username: "",
    appointment: "",
    domain: "",
    firstName: "",
    email: "",
  });

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
        setUser(accessToken);
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
                setUser(jwtDecode(response.data.access));
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
    <UserContext.Provider value={user}>
      <PrivateComponent />
    </UserContext.Provider>
  ) : (
    <Signin2 state={[isSignedIn, setIsSignedIn]} user={[user, setUser]} />
  );
};

export default PrivateRoute;
