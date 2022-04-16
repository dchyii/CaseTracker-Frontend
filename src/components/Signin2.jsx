import React from "react";
import axios from "axios";

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
          <button className="btn btn-wide m-3 bg-secondary text-white hover:text-slate-800 border-none hover:bg-success">
            Staff Aden
          </button>
          <button className="btn btn-wide m-3 bg-secondary text-white hover:text-slate-800 border-none hover:bg-success">
            Manager Cheryl
          </button>
          <button className="btn btn-wide m-3 bg-secondary text-white hover:text-slate-800 border-none hover:bg-success">
            Deputy Director Denise
          </button>
          <button className="btn btn-wide m-3 bg-secondary text-white hover:text-slate-800 border-none hover:bg-success">
            Director Zack
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signin2;
