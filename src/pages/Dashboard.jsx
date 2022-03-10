import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../utilities/AxiosIntance";
import DashboardSummary from "../components/DashboardSummary";
import dayjs from "dayjs";
import CaseDetails from "../components/CaseDetails";
import { useQuery } from "react-query";
import { UserContext } from "../utilities/PrivateRoute";

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
  const user = useContext(UserContext);
  // console.log("user: ", user);
  // fetch data //
  const { data, error, status } = useQuery("cases", fetchData);
  const { memberData, memberError, memberStatus } = useQuery(
    "members",
    fetchDomainMembers
  );
  // console.log("query data: ", data?.data);

  // filtering cases //
  //! vvv this works for staffer vvv !//
  // const currentCases = data?.data.map((item) => {
  //   const filteredSteps = item.steps.filter(
  //     (step) =>
  //       step.res_party === data.data[1].staffer &&
  //       !step.completed_date &&
  //       step.step !== "completed"
  //   );
  //   console.log(filteredSteps);
  //   const stage = filteredSteps[0]?.stage;
  //   const deadline = stage + "_deadline";
  //   const currentDeadline = item[deadline];
  //   item = {
  //     ...item,
  //     userSteps: filteredSteps,
  //     stage: stage,
  //     currentDeadline: currentDeadline,
  //   };
  //   return item;
  // });
  // console.log("current cases: ", currentCases);
  //! ^^^ this works for staffer ^^^ !//

  // populate cases info //
  const allUserCases = data?.data.map((item) => {
    const currentStageIndex = item.steps.findIndex(
      (step) => !step.completed_date
    );
    const currentStage = item.steps[currentStageIndex].stage;
    const currentResParty = item.steps[currentStageIndex].res_party;
    const deadline = currentStage + "_deadline";
    const currentDeadline = item[deadline];
    item = {
      ...item,
      currentResParty: currentResParty,
      currentStage: currentStage,
      currentDeadline: currentDeadline,
    };
    return item;
  });

  console.log("all user cases: ", allUserCases);

  // filter for current user cases //
  const currentCases = allUserCases?.filter((item) => {
    return (
      item.currentResParty === user?.user_id || item.staffer === user?.user_id
    );
  });

  console.log("current user cases: ", currentCases);

  const dueOneMonth = currentCases?.filter((item) => {
    const oneMonth = dayjs().add(1, "month");
    return dayjs(item.currentDeadline).isBefore(oneMonth, "day");
  });
  const dueTwoMonths = currentCases?.filter((item) => {
    const twoMonth = dayjs().add(2, "month");
    return dayjs(item.currentDeadline).isBefore(twoMonth, "day");
  });
  const dueThreeMonths = currentCases?.filter((item) => {
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
