import React from "react";
import jwtDecode from "jwt-decode";

const DashboardSummary = (props) => {
  const user = jwtDecode(JSON.parse(localStorage.getItem("token")).access);
  //   console.log(user);
  //   const username = user.username;
  //   console.log("username: ", username);

  return (
    <div className="stats shadow lg:w-10/12 mx-auto my-5 bg-background text-primary">
      <div className="stat place-items-center">
        <div className="stat-value">{user.firstName}</div>
        <div className="stat-title">{user.appointment}</div>
        <div className="stat-title">{user.domain}</div>
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
