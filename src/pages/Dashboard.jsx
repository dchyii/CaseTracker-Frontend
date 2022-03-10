import React, { useContext } from "react";
import axiosInstance from "../utilities/AxiosIntance";
import DashboardSummary from "../components/DashboardSummary";
import dayjs from "dayjs";
import CaseDetails from "../components/CaseDetails";
import { useQuery } from "react-query";
import { UserContext } from "../utilities/PrivateRoute";
import StatusPage from "./StatusPage";

const fetchData = async () => {
  const response = await axiosInstance.get("/api/cases/");
  return response;
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
  const user = useContext(UserContext);

  // fetch data //
  const { data, error, status } = useQuery("cases", fetchData);
  const { memberData, memberError, memberStatus } = useQuery(
    "members",
    fetchDomainMembers
  );

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

  // filter for current user cases //
  const currentCasesUnsorted = allUserCases?.filter((item) => {
    return (
      item.currentResParty === user?.user_id || item.staffer === user?.user_id
    );
  });

  const currentCases = currentCasesUnsorted?.sort((a, b) =>
    dayjs(a.currentDeadline).diff(dayjs(b.currentDeadline))
  );

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

  const list = currentCases?.map((item) => {
    return <CaseDetails key={item.id} details={item} />;
  });

  if (status === "loading") {
    return <StatusPage status={"loading"} message={"Loading..."} />;
  }

  if (status === "error") {
    return <StatusPage status={"error"} message={error.message} />;
  }

  return (
    <div className="p-3">
      <DashboardSummary numCases={numCases} />
      {list}
    </div>
  );
};

export default Dashboard;
