import React, { useState, useEffect } from "react";
import axiosInstance from "../utilities/AxiosIntance";
import DashboardSummary from "../components/DashboardSummary";
import dayjs from "dayjs";
import CaseDetails from "../components/CaseDetails";

const Dashboard = () => {
  // const API_ENTRY = import.meta.env.VITE_API_ENTRY;
  // const accessToken = JSON.parse(localStorage.getItem("token"))?.access;
  // console.log(accessToken);

  const [isLoading, setIsLoading] = useState(true);
  const [cases, setCases] = useState([]);

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
        const outstandingCases = serverResponse.data.filter(
          (item) => item.current_status !== "completed"
        );
        setCases(outstandingCases);
        setIsLoading(false);
        // return serverResponse;
      } catch (error) {
        console.log(error);
      }
    };

    fetch();
  }, []);

  // filtering cases //
  const dueOneMonth = cases?.filter((item) => {
    const oneMonth = dayjs().add(1, "month");
    return dayjs(item.current_status_due_date).isBefore(oneMonth, "day");
  });
  const dueTwoMonths = cases?.filter((item) => {
    const twoMonth = dayjs().add(2, "month");
    return dayjs(item.current_status_due_date).isBefore(twoMonth, "day");
  });
  const dueThreeMonths = cases?.filter((item) => {
    const threeMonths = dayjs().add(1, "month");
    return dayjs(item.current_status_due_date).isBefore(threeMonths, "day");
  });

  // number of cases //
  const numCases = {
    total: cases?.length,
    oneMonth: dueOneMonth?.length,
    twoMonths: dueTwoMonths?.length - dueOneMonth?.length,
    threeMonths: dueThreeMonths?.length - dueTwoMonths?.length,
  };

  const list = cases.map((item, index) => {
    return <CaseDetails key={index} details={item} />;
  });

  if (isLoading) {
    return (
      <div className="hero min-h-screen bg-background">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <span className="text-3xl font-extrabold text-primary">
              loading...
            </span>
          </div>
        </div>
      </div>
    );
  }
  return (
    <div className="p-3">
      <DashboardSummary numCases={numCases} />
      {list}
    </div>
  );
};

export default Dashboard;
