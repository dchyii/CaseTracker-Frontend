import React from "react";
import dayjs from "dayjs";
import CaseDetailsBreakdown from "./CaseDetailsBreakdown";
import { useState } from "react";

const CaseDetails = (props) => {
  const [isFocused, setIsFocused] = useState(false);

  const expandBtn = isFocused ? (
    <path
      fillRule="evenodd"
      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
      clipRule="evenodd"
    />
  ) : (
    <path
      fillRule="evenodd"
      d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
      clipRule="evenodd"
    />
  );

  const capsFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  const submitBtnText = {
    vetting: "Submit for Vetting",
    clearance1: "Submit for Clearance",
    clearance2: "Submit for Clearance",
    "pending approval": "Approved",
    completed: "Completed",
  };

  return (
    <div
      tabIndex="0"
      className="collapse collapse-open border border-slate-300 rounded-md"
    >
      <div
        className="collapse-title font-medium"
        onClick={() => {
          console.log("clicked");
          setIsFocused(!isFocused);
        }}
      >
        <p className="text-2xl text-left w-full">
          {props.details.title}
          <span className="text-base"> (S${props.details.value})</span>
        </p>
        <div className="divider"></div>
        <div className="px-3 w-full text-left flex">
          <p className="w-1/3 px-3">
            Folder Link:
            <br />
            <a href={props.details.folder_link}>{props.details.folder_link}</a>
          </p>
          <div className="divider divider-horizontal"></div>
          <p className="w-1/3 px-3">
            Current Milestone: <br />
            {capsFirstLetter(props.details.current_status)} (To complete by:{" "}
            {dayjs(props.details.current_status_due_date).format("DD/MM/YYYY")})
          </p>
          <div className="divider divider-horizontal"></div>
          <p className="w-1/3 px-3 flex">
            <button
              className="btn btn-wide btn-success"
              onClick={() => setIsFocused(!isFocused)}
            >
              {submitBtnText[props.details.next_step]}
            </button>
          </p>
          <div
            className=" right-0 pr-3 pt-3 absolute"
            onClick={() => {
              console.log("clicked");
              setIsFocused(!isFocused);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              {expandBtn}
            </svg>
          </div>
        </div>
      </div>
      <div
        className={`collapse-content origin-top ${isFocused ? "" : "hidden"}`}
      >
        <div className="divider font-semibold bg-secondary rounded-md h-1">
          <span className="px-10 bg-white">Details</span>
        </div>
        <CaseDetailsBreakdown details={props.details} />
      </div>
    </div>
  );
};

export default CaseDetails;
