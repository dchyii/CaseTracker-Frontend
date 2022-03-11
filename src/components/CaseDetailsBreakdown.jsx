import React from "react";
import { useState } from "react";
import StepForm from "./StepForm";
import { useQuery } from "react-query";
import axiosInstance from "../utilities/AxiosIntance";
import { capsFirstLetter } from "../utilities/functions";

const CaseDetailsBreakdown = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  const domainMembers = localStorage.getItem("teammates")
    ? JSON.parse(localStorage.getItem("teammates"))
    : [];

  console.log(props.details);

  // UI Controller //
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

  // Subcomponents //
  const steps = props.details.map((step) => (
    <StepForm key={step.id} details={step} members={domainMembers} />
  ));

  return (
    <div className="border rounded-md px-5 py-3">
      <div className="flex w-full justify-center">
        <p
          className="text-xl font-bold text-secondary"
          onClick={() => setIsFocused(!isFocused)}
        >
          {capsFirstLetter(props?.details[0]?.stage)}
        </p>
        <div
          className="  pt-1 "
          onClick={() => {
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
      <div className={isFocused ? "" : "hidden"}>{steps}</div>
    </div>
  );
};

export default CaseDetailsBreakdown;
