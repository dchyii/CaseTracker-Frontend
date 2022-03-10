import React, { useState } from "react";
import NewCaseDetails from "../components/NewCaseDetails";
import NewStepsDetails from "../components/NewStepsDetails";

const NewCase = () => {
  const [caseDetails, setCaseDetails] = useState();
  const [stepsDetails, setStepsDetails] = useState();
  // const [planningDetails, setPlanningDetails] = useState();
  // const [biddingDetails, setBiddingDetails] = useState();
  // const [approvalDetails, setApprovalDetails] = useState();
  // const [contractingDetails, setContractingDetails] = useState();

  const renderedComponent = !caseDetails ? (
    <NewCaseDetails caseDetails={[caseDetails, setCaseDetails]} />
  ) : (
    <p>case details completed</p>
  );

  console.log("case details", caseDetails);
  // return <div className="p-3">{renderedComponent}</div>;
  return (
    <div className="p-3">
      <NewStepsDetails caseDetails={caseDetails} stepsDetails={stepsDetails} />
    </div>
  );
};

export default NewCase;
