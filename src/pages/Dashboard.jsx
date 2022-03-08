import React, { useEffect } from "react";
import jwt_decode from "jwt-decode";
import axios from "axios";
import axiosInstance from "../utilities/AxiosIntance";
import DashboardSummary from "../components/DashboardSummary";

const Dashboard = () => {
  // const API_ENTRY = import.meta.env.VITE_API_ENTRY;
  // const accessToken = JSON.parse(localStorage.getItem("token"))?.access;
  // console.log(accessToken);

  useEffect(() => {
    const fetch = async () => {
      try {
        // let config = {
        //   headers: {
        //     "content-type": "application/json",
        //     authorization: `Bearer ${accessToken}`,
        //   },
        //   data: {
        //     userid: 2,
        //   },
        // };

        // const serverResponse = await axios.get(
        //   `${API_ENTRY}/api/dashboard/`,
        //   config
        // );
        const serverResponse = await axiosInstance.get("/api/dashboard/");
        console.log("return: ", serverResponse);
        return serverResponse;
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);

  return (
    <div className="p-3">
      <DashboardSummary />
    </div>
  );
};

export default Dashboard;
