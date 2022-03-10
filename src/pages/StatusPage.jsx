import React from "react";
import { TailSpin } from "react-loader-spinner";

const StatusPage = (props) => {
  const screen = {
    loading: (
      <>
        <TailSpin color="#2b6777" />
        <p className="text-3xl font-extrabold text-primary">{props.message}</p>
      </>
    ),
    error: (
      <>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-24 w-24 text-error"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>{" "}
        <p className="text-3xl font-extrabold text-error">{props.message}</p>
      </>
    ),
  };

  return (
    <div className="hero min-h-screen bg-background">
      <div className="hero-content text-center flex-col">
        {screen[props.status]}
      </div>
    </div>
  );
};

export default StatusPage;
