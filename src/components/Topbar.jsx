import React from "react";

const Topbar = () => {
  return (
    <div className=" bg-slate-800 text-white w-full h-10 flex fixed top-0">
      <div className="flex align-baseline my-auto ml-10">
        <span className="font-extrabold">CaseTrackerII</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5 inline"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
          />
        </svg>
      </div>
    </div>
  );
};

export default Topbar;
