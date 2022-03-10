import React from "react";
import dayjs from "dayjs";
import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../utilities/AxiosIntance";
import {
  SubmittingBtn,
  ErrorBtn,
  SuccessBtn,
} from "../subcomponents/StepSubmitButton";

const QuickSubmitBtn = (props) => {
  const submitData = {
    ...props.submitStep,
    completed_date: dayjs().format("YYYY-MM-DD"),
  };

  // quick submit function //
  const queryClient = useQueryClient();
  const submitUpdate = useMutation(
    (updatedData) => {
      return axiosInstance.put(`api/steps/${submitData.id}/`, updatedData);
    },
    {
      onSuccess: async () => {
        queryClient.invalidateQueries("cases");
        setTimeout(() => {
          submitUpdate.reset();
        }, 1000);
      },
    }
  );

  // mutate status //
  const mutateStatus = submitUpdate.isLoading ? (
    <SubmittingBtn />
  ) : submitUpdate.isError ? (
    <ErrorBtn resetFn={submitUpdate.reset} />
  ) : submitUpdate.isSuccess ? (
    <SuccessBtn />
  ) : (
    ""
  );

  return (
    <div className="flex">
      <button
        className="btn btn-wide btn-success"
        onClick={() => {
          console.log("quick submit: ", submitData);
          submitUpdate.mutate(submitData);
        }}
      >
        {props.text}
      </button>
      <div className="ml-5 pt-3 h-12">{mutateStatus}</div>
    </div>
  );
};

export default QuickSubmitBtn;
