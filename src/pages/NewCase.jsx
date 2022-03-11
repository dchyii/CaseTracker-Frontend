import React, { useState } from "react";
import NewCaseDetails from "../components/NewCaseDetails";
import NewStepsDetails from "../components/NewStepsDetails";

const NewCase = () => {
  const [caseDetails, setCaseDetails] = useState();
  const [applicableStages, setApplicableStages] = useState({});

  const renderedComponent = !caseDetails ? (
    <NewCaseDetails
      caseDetails={[caseDetails, setCaseDetails]}
      applicableStages={[applicableStages, setApplicableStages]}
    />
  ) : (
    <NewStepsDetails
      caseDetails={caseDetails}
      applicableStages={applicableStages}
    />
  );

  console.log("case details", caseDetails);
  return <div className="p-3">{renderedComponent}</div>;
};

export default NewCase;
