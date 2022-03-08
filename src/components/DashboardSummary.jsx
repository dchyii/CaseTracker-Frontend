import React from "react";
import jwtDecode from "jwt-decode";

const DashboardSummary = (props) => {
  const user = jwtDecode(JSON.parse(localStorage.getItem("token")).access);
  console.log(user);
  //   const username = user.username;
  //   console.log("username: ", username);

  return (
    <div className="stats shadow lg:w-10/12 mx-auto bg-background text-primary">
      <div className="stat place-items-center">
        <div className="stat-value">{user.username}</div>
        <div className="stat-title">{user.appointment}</div>
      </div>

      <div className="stat place-items-center">
        <div className="stat-value text-secondary">4,200</div>
        <div className="stat-title">Total Cases on Hand</div>
      </div>
      <div className="stat place-items-center">
        <div className="stat-title">Due in next 1 month: </div>
        <div className="stat-value text-error">4,200</div>
        <div className="stat-desc text-secondary">Due in next 2 mths: x </div>
        <div className="stat-desc text-secondary">Due in next 3 mths: x </div>
      </div>
    </div>
  );
};

export default DashboardSummary;
