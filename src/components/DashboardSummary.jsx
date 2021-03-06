import React, { useContext } from "react";
import { UserContext } from "../utilities/PrivateRoute";
import jwtDecode from "jwt-decode";
import { capsFirstLetter } from "../utilities/functions";

const DashboardSummary = (props) => {
  const user = useContext(UserContext);

  return (
    <div className="stats shadow lg:w-10/12 mx-auto my-5 bg-background text-primary">
      <div className="stat place-items-center">
        <div className="stat-value">{capsFirstLetter(user?.firstName)}</div>
        <div className="stat-title">{capsFirstLetter(user?.appointment)}</div>
        <div className="stat-title">{capsFirstLetter(user?.domain)}</div>
      </div>

      <div className="stat place-items-center">
        <div className="stat-value text-secondary">{props.numCases.total}</div>
        <div className="stat-title">Total Cases on Hand</div>
      </div>
      <div className="stat place-items-center">
        <div className="stat-title">Due in next 1 month: </div>
        <div className="stat-value text-error">{props.numCases.oneMonth}</div>
        <div className="stat-desc text-secondary">
          Due in next 2 mths: {props.numCases.twoMonths}{" "}
        </div>
        <div className="stat-desc text-secondary">
          Due in next 3 mths: {props.numCases.threeMonths}{" "}
        </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
