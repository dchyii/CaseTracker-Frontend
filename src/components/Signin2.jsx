import React from "react";
import axios from "axios";
import SSOButton from "../subcomponents/SSOButton";

const Signin2 = (props) => {
  const [isSignedIn, setIsSignedIn] = props.state;
  const [user, setUser] = props.user;
  const API_ENTRY = import.meta.env.VITE_API_ENTRY;

  return (
    <div className="hero min-h-screen bg-white">
      <div className="hero-content text-center bg-background rounded-lg shadow-lg w-full sm:w-3/5">
        <div className="py-12 px-0 sm:px-12">
          <h1 className="text-5xl font-bold">
            Welcome to <br /> CaseTrackerII
          </h1>
          <p className="py-6">Sign in as:</p>
          <div className="grid grid-cols-1 xl:grid-cols-2">
            <SSOButton
              role="staff"
              name="Staff Aden"
              setIsSignedIn={setIsSignedIn}
              setUser={setUser}
            />

            <SSOButton
              role="manager"
              name="Manager Cheryl"
              setIsSignedIn={setIsSignedIn}
              setUser={setUser}
            />

            <SSOButton
              role="dd"
              name="Deputy Director Denise"
              setIsSignedIn={setIsSignedIn}
              setUser={setUser}
            />

            <SSOButton
              role="dir"
              name="Director Zack"
              setIsSignedIn={setIsSignedIn}
              setUser={setUser}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signin2;
