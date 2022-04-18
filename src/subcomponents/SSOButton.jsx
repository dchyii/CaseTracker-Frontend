import axios from "axios";
import jwt_decode from "jwt-decode";
import React, { useState } from "react";

const SSOButton = (props) => {
  const [isSigningIn, setIsSigningIn] = useState(false);
  const API_ENTRY = import.meta.env.VITE_API_ENTRY;
  const signInDetails = {
    staff: {
      user: import.meta.env.VITE_STAFF_USER,
      pw: import.meta.env.VITE_STAFF_PW,
    },
    manager: {
      user: import.meta.env.VITE_MANAGER_USER,
      pw: import.meta.env.VITE_MANAGER_PW,
    },
    dd: {
      user: import.meta.env.VITE_DD_USER,
      pw: import.meta.env.VITE_DD_PW,
    },
    dir: {
      user: import.meta.env.VITE_DIR_USER,
      pw: import.meta.env.VITE_DIR_PW,
    },
  };

  const handleSSO = async () => {
    setIsSigningIn(true);
    console.log("SSO");
    try {
      const serverResponse = await axios({
        method: "post",
        url: `${API_ENTRY}/token/`,
        data: {
          username: signInDetails[props.role].user,
          password: signInDetails[props.role].pw,
        },
      });
      console.log("return: ", serverResponse);
      if (serverResponse.status === 200) {
        localStorage.setItem("token", JSON.stringify(serverResponse.data));
        props.setIsSignedIn(true);
        props.setUser(jwt_decode(serverResponse.data.access));
      }
    } catch (error) {
      console.log(error);
      setIsSigningIn(false);
    }
  };

  return (
    <button
      className={`btn btn-wide m-3 bg-secondary text-white hover:text-slate-800 border-none hover:bg-success ${
        isSigningIn ? "loading" : ""
      }`}
      onClick={handleSSO}
    >
      {isSigningIn ? "Signing in" : props.name}
    </button>
  );
};

export default SSOButton;
