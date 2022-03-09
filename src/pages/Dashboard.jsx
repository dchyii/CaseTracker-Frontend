import React, { useState, useEffect } from "react";
import axiosInstance from "../utilities/AxiosIntance";
import DashboardSummary from "../components/DashboardSummary";
import dayjs from "dayjs";
import CaseDetails from "../components/CaseDetails";
import { useQuery } from "react-query";

const fetchData = async () => {
  // try {
  const response = await axiosInstance.get("/api/cases/");
  return response;
  // } catch (error) {
  // console.log(error);
  // }
};

const fetchDomainMembers = async () => {
  try {
    const response = await axiosInstance.get("/api/domain/members/");
    const domainMembers = response?.data.map((member) => {
      const user = { id: member.user.id, name: member.user.first_name };
      return user;
    });
    localStorage.setItem("teammates", JSON.stringify(domainMembers));
  } catch (error) {
    console.log(error);
  }
};

const Dashboard = () => {
  // const API_ENTRY = import.meta.env.VITE_API_ENTRY;
  // const accessToken = JSON.parse(localStorage.getItem("token"))?.access;
  // console.log(accessToken);

  //! vvv current working codes vvv !//
  // const [isLoading, setIsLoading] = useState(true);
  // const [cases, setCases] = useState([]);

  // useEffect(() => {
  //   const fetch = async () => {
  //     try {
  //       const serverResponse = await axiosInstance.get("/api/cases/");
  //       console.log("return: ", serverResponse);
  //       const outstandingCases = serverResponse.data.filter(
  //         (item) => item.current_status !== "completed"
  //       );
  //       setCases(outstandingCases);
  //       setIsLoading(false);
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   };

  //   fetch();
  // }, []);
  //! ^^^ current working codes ^^^ !//

  // fetch data //
  const { data, error, status } = useQuery("cases", fetchData);
  const { memberData, memberError, memberStatus } = useQuery(
    "members",
    fetchDomainMembers
  );
  console.log("query data: ", data);

  // fetch domain members

  // filtering cases //
  const currentCases = data?.data.map((item) => {
    const filteredSteps = item.steps.filter(
      (step) =>
        step.res_party === data.data[1].staffer &&
        !step.completed_date &&
        step.step !== "completed"
    );
    console.log(filteredSteps);
    const stage = filteredSteps[0]?.stage;
    const deadline = stage + "_deadline";
    const currentDeadline = item[deadline];
    item = {
      ...item,
      userSteps: filteredSteps,
      stage: stage,
      currentDeadline: currentDeadline,
    };
    return item;
  });
  console.log("current cases: ", currentCases);

  const dueOneMonth = currentCases?.filter((item) => {
    const oneMonth = dayjs().add(1, "month");
    return dayjs(item.currentDeadline).isBefore(oneMonth, "day");
  });
  const dueTwoMonths = data?.data.filter((item) => {
    const twoMonth = dayjs().add(2, "month");
    return dayjs(item.currentDeadline).isBefore(twoMonth, "day");
  });
  const dueThreeMonths = data?.data.filter((item) => {
    const threeMonths = dayjs().add(1, "month");
    return dayjs(item.currentDeadline).isBefore(threeMonths, "day");
  });

  // number of cases //
  const numCases = {
    total: currentCases?.length,
    oneMonth: dueOneMonth?.length,
    twoMonths: dueTwoMonths?.length - dueOneMonth?.length,
    threeMonths: dueThreeMonths?.length - dueTwoMonths?.length,
  };

  const list = currentCases?.map((item, index) => {
    return <CaseDetails key={index} details={item} />;
  });

  if (status !== "success") {
    return (
      <div className="hero min-h-screen bg-background">
        <div className="hero-content text-center">
          <div className="max-w-md">
            <span className="text-3xl font-extrabold text-primary">
              {status === "loading" && "loading"}
              {status === "error" && `error. ${error.message}`}
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
