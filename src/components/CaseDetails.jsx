import React from "react";
import dayjs from "dayjs";

const CaseDetails = (props) => {
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
      tabindex="0"
      className="collapse collapse-arrow border border-slate-300 rounded-md"
    >
      <div className="collapse-title font-medium">
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
          <p className="w-1/3 px-3">
            <button className="btn btn-wide btn-success">
              {submitBtnText[props.details.next_step]}
            </button>
          </p>
        </div>
      </div>
      <div className="collapse-content">
        <div className="divider font-semibold bg-secondary rounded-md h-1">
          <span className="px-10 bg-white">Details</span>
        </div>

        <p>tabindex="0" attribute is necessary to make the div focusable</p>
      </div>
    </div>
  );
};

export default CaseDetails;
