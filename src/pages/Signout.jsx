import React from "react";
import { useNavigate } from "react-router-dom";

const Signout = () => {
  const navigate = useNavigate();
  const handleRedirect = () => {
    navigate("/");
  };

  return (
    <div className="hero min-h-screen bg-background">
      <div className="hero-content text-center">
        <div className="max-w-md">
          <p className="">You have successfully</p>
          <h1 className="text-5xl font-bold text-primary">signed out.</h1>
          <button
            className="btn btn-primary bg-secondary hover:bg-primary border-0 mt-12"
            onClick={handleRedirect}
          >
            Sign in again
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signout;
