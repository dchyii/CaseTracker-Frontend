import React from "react";
import dayjs from "dayjs";
import { capsFirstLetter } from "../utilities/functions";
import CaseDetailsBreakdown from "./CaseDetailsBreakdown";
import { useState } from "react";
import {
  SubmittingBtn,
  ErrorBtn,
  SuccessBtn,
} from "../subcomponents/StepSubmitButton";
import QuickSubmitBtn from "./QuickSubmitBtn";

const CaseDetails = (props) => {
  const [isFocused, setIsFocused] = useState(false);
  // console.log(props.details);

  // Next Step Details //
  const currentStepIndex = props?.details.steps.findIndex(
    (step) => !step.completed_date
  );

  const currentStep = props?.details?.steps[currentStepIndex];
  // console.log("current step: ", currentStep);

  // Stages Details //
  const planning = props?.details?.steps.filter(
    (step) => step?.stage === "1. planning"
  );

  const bidding = props?.details?.steps.filter(
    (step) => step.stage === "2. bidding"
  );

  const approval = props?.details?.steps.filter(
    (step) => step?.stage === "3. approval"
  );

  const contracting = props?.details?.steps.filter(
    (step) => step?.stage === "4. contracting"
  );

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

  const submitBtnText = {
    "1. drafting": "Submitted",
    "2. vetting": "Vetted",
    "3. support1": "Supported",
    "4. support2": "Supported",
    "5. completed": "Completed",
  };

  // Render //
  return (
    <div
      tabIndex="0"
      className="collapse collapse-open border border-slate-300 rounded-md"
    >
      <div className="collapse-title font-medium">
        <div
          onClick={() => {
            console.log("clicked");
            setIsFocused(!isFocused);
          }}
        >
          <p className="text-2xl text-left w-full font-extrabold text-primary">
            {props?.details.title}
            <span className="text-base"> (S${props?.details.value})</span>
          </p>
        </div>
        <div className="divider"></div>
        <div className="px-3 w-full text-left flex">
          <p className="w-1/3 px-3">
            Folder Link:
            <br />
            <a
              href={props?.details.folder_link}
              className="hover:underline hover:text-info"
            >
              {props?.details.folder_link}
            </a>
          </p>
          <div className="divider divider-horizontal"></div>
          <p className="w-1/3 px-3">
            Current Milestone:{" "}
            <span className="font-bold text-primary">
              {capsFirstLetter(props?.details?.currentStage)}
            </span>
            <br />
            (To complete by:{" "}
            {dayjs(props?.details?.currentDeadline).format("DD/MM/YYYY")})
          </p>
          <div className="divider divider-horizontal"></div>
          <div className="w-1/3 px-3 flex">
            <QuickSubmitBtn
              text={submitBtnText[currentStep?.step]}
              submitStep={currentStep}
            />
          </div>
          <div
            className=" right-0 pr-3 pt-3 absolute"
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
      </div>
      <div
        className={`collapse-content origin-top ${isFocused ? "" : "hidden"}`}
      >
        <div className="divider font-semibold bg-secondary rounded-md h-1">
          <span className="px-10 bg-white">Details</span>
        </div>
        {planning.length !== 0 ? (
          <CaseDetailsBreakdown title={"Planning"} details={planning} />
        ) : (
          ""
        )}
        {bidding.length !== 0 ? (
          <CaseDetailsBreakdown title={"Bidding"} details={bidding} />
        ) : (
          ""
        )}
        {approval.length !== 0 ? (
          <CaseDetailsBreakdown title={"Approval"} details={approval} />
        ) : (
          ""
        )}
        {contracting.length !== 0 ? (
          <CaseDetailsBreakdown title={"Contracting"} details={contracting} />
        ) : (
          ""
        )}
      </div>
    </div>
  );
};

export default CaseDetails;
