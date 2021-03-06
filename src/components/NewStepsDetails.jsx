import React, { useState, useContext, forwardRef, useEffect } from "react";
import { UserContext } from "../utilities/PrivateRoute";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../utilities/AxiosIntance";
import { useNavigate } from "react-router-dom";
import { SubmittingBtn } from "../subcomponents/StepSubmitButton";

const NewStepsDetails = (props) => {
  const user = useContext(UserContext);
  const navigate = useNavigate();
  const caseDetails = props.caseDetails;
  const applicableStages = props.applicableStages;
  const [steps, setSteps] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const planningBasicSteps = [
    {
      stage: "1. planning",
      step: "1. drafting",
      completed_date: null,
      case: 0,
      staffer: user.user_id,
      res_party: user.user_id,
      stepName: "aplanningdrafter",
    },
    {
      stage: "1. planning",
      step: "5. completed",
      completed_date: null,
      case: 0,
      staffer: user.user_id,
      res_party: user.user_id,
      stepName: "eplanningCompleted",
    },
  ];

  const biddingBasicSteps = [
    {
      stage: "2. bidding",
      step: "1. drafting",
      completed_date: null,
      case: 0,
      staffer: user.user_id,
      res_party: user.user_id,
      stepName: "fbiddingdrafter",
    },
    {
      stage: "2. bidding",
      step: "5. completed",
      completed_date: null,
      case: 0,
      staffer: user.user_id,
      res_party: user.user_id,
      stepName: "jbiddingCompleted",
    },
  ];

  const approvalBasicSteps = [
    {
      stage: "3. approval",
      step: "1. drafting",
      completed_date: null,
      case: 0,
      staffer: user.user_id,
      res_party: user.user_id,
      stepName: "kapprovaldrafter",
    },
    {
      stage: "3. approval",
      step: "5. completed",
      completed_date: null,
      case: 0,
      staffer: user.user_id,
      res_party: user.user_id,
      stepName: "oapprovalCompleted",
    },
  ];

  const contractingBasicSteps = [
    {
      stage: "4. contracting",
      step: "1. drafting",
      completed_date: null,
      case: 0,
      staffer: user.user_id,
      res_party: user.user_id,
      stepName: "pcontractingdrafter",
    },
    {
      stage: "4. contracting",
      step: "5. completed",
      completed_date: null,
      case: 0,
      staffer: user.user_id,
      res_party: user.user_id,
      stepName: "tcontractingCompleted",
    },
  ];

  // track form update //
  const addStep = (stage, step, res_party, step_name) => {
    const consolSteps = steps;
    const thisStep = {
      stage: stage,
      step: step,
      completed_date: null,
      case: 0,
      staffer: user.user_id,
      res_party: parseInt(res_party),
      stepName: step_name,
    };
    const thisStepIndex = consolSteps.findIndex(
      (step) => step.stepName === thisStep.stepName
    );
    if (thisStepIndex === -1) {
      consolSteps.push(thisStep);
      console.log(consolSteps);
      setSteps(consolSteps);
    } else {
      consolSteps.splice(thisStepIndex, 1, thisStep);
      console.log(consolSteps);
      setSteps(consolSteps);
    }
  };

  // get teammates //
  const teammates = localStorage?.getItem("teammates")
    ? JSON.parse(localStorage.getItem("teammates"))
    : [];
  teammates.unshift({ id: "", name: "-- Select if applicable --" });
  const membersList = teammates?.map((member) => (
    <option key={member.id} value={member.id}>
      {member.name}
    </option>
  ));

  // formik setup //
  const initialFormValues = {
    bplanningVetter: "",
    cplanningSupport1: "",
    dplanningSupport2: "",
    gbiddingVetter: "",
    hbiddingSupport1: "",
    ibiddingSupport2: "",
    lapprovalVetter: "",
    mapprovalSupport1: "",
    napprovalSupport2: "",
    qcontractingVetter: "",
    rcontractingSupport1: "",
    scontractingSupport2: "",
  };

  const formik = useFormik({
    initialValues: { ...initialFormValues },
    onSubmit: async () => {
      setIsSubmitting(true);
      const compare = (a, b) => {
        if (a.stepName < b.stepName) {
          return -1;
        } else {
          return 1;
        }
      };
      const allSteps = (steps) => {
        const stepsArr = steps;
        steps.push(contractingBasicSteps[0]);
        steps.push(contractingBasicSteps[1]);
        if (applicableStages.planning === true) {
          steps.push(planningBasicSteps[0]);
          steps.push(planningBasicSteps[1]);
        }
        if (applicableStages.bidding === true) {
          steps.push(biddingBasicSteps[0]);
          steps.push(biddingBasicSteps[1]);
        }
        if (applicableStages.approval === true) {
          steps.push(approvalBasicSteps[0]);
          steps.push(approvalBasicSteps[1]);
        }
        return stepsArr;
      };
      const allStepsArr = allSteps(steps);
      console.log("all steps arr: ", allStepsArr);
      const sortedSteps = allStepsArr.sort(compare);
      console.log("case details: ", caseDetails);
      console.log("steps details: ", sortedSteps);
      try {
        const submittedCase = await axiosInstance.post(
          "/api/cases/",
          caseDetails
        );
        console.log("return:", submittedCase);
        if (submittedCase.status === 201) {
          const tracker = [];
          const newSteps = sortedSteps.map(async (step) => {
            step = { ...step, case: submittedCase.data.id };
            console.log("submitted Step: ", step);
            try {
              const submittedStep = await axiosInstance.post(
                "/api/steps/",
                step
              );
              if (submittedStep.status === 201) {
                tracker.push(submittedStep.data);
                console.log("tracker:", tracker);
                if (tracker.length === newSteps.length) {
                  setIsSubmitting(false);
                  navigate("/");
                }
              }
            } catch (error) {
              console.log(error);
            }
          });
          // let i = 0;
          // while (i < newSteps.length) {
          //   try {
          //     console.log("current submit: ", newSteps[i]);
          //     const submittedStep = await axiosInstance.post(
          //       "/api/steps/",
          //       newSteps[i]
          //     );
          //     if (submittedStep.status === 201) {
          //       if (i === newSteps.length) {
          //         setIsSubmitting(false);
          //         i += 1;
          //       } else {
          //         i += 1;
          //       }
          //     }
          //   } catch (error) {
          //     console.log(error);
          //     break;
          //   }
          // }
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  // Planning Fields //
  const planningFields = (
    <div className="w-1/2 mx-auto border border-slate-300 rounded-lg my-3">
      <p className="text-xl text-primary text-bold">Planning</p>
      <Field
        dot={false}
        label="Vetter"
        name="bplanningVetter"
        onChange={(value) =>
          addStep(
            "1. planning",
            "2. vetting",
            value.nativeEvent.target.value,
            value.nativeEvent.target.name
          )
        }
        type="select"
        as="select"
      >
        {membersList}
      </Field>
      <Field
        dot={false}
        label="Support1"
        name="cplanningSupport1"
        onChange={(value) =>
          addStep(
            "1. planning",
            "3. support1",
            value.nativeEvent.target.value,
            value.nativeEvent.target.name
          )
        }
        type="select"
        as="select"
      >
        {membersList}
      </Field>
      <Field
        dot={false}
        label="Support2"
        name="dplanningSupport2"
        onChange={(value) =>
          addStep(
            "1. planning",
            "4. support2",
            value.nativeEvent.target.value,
            value.nativeEvent.target.name
          )
        }
        type="select"
        as="select"
      >
        {membersList}
      </Field>
    </div>
  );

  // bidding fields //
  const biddingFields = (
    <div className="w-1/2 mx-auto border border-slate-300 rounded-lg my-3">
      <p className="text-xl text-primary text-bold">Bidding</p>
      <Field
        dot={false}
        label="Vetter"
        name="gbiddingVetter"
        onChange={(value) =>
          addStep(
            "2. bidding",
            "2. vetting",
            value.nativeEvent.target.value,
            value.nativeEvent.target.name
          )
        }
        type="select"
        as="select"
      >
        {membersList}
      </Field>
      <Field
        dot={false}
        label="Support1"
        name="hbiddingSupport1"
        onChange={(value) =>
          addStep(
            "2. bidding",
            "3. support1",
            value.nativeEvent.target.value,
            value.nativeEvent.target.name
          )
        }
        type="select"
        as="select"
      >
        {membersList}
      </Field>
      <Field
        dot={false}
        label="Support2"
        name="ibiddingSupport2"
        onChange={(value) =>
          addStep(
            "2. bidding",
            "4. support2",
            value.nativeEvent.target.value,
            value.nativeEvent.target.name
          )
        }
        type="select"
        as="select"
      >
        {membersList}
      </Field>
    </div>
  );

  // approval fields //
  const approvalFields = (
    <div className="w-1/2 mx-auto border border-slate-300 rounded-lg my-3">
      <p className="text-xl text-primary text-bold">Approval</p>
      <Field
        dot={false}
        label="Vetter"
        name="lapprovalVetter"
        onChange={(value) =>
          addStep(
            "3. approval",
            "2. vetting",
            value.nativeEvent.target.value,
            value.nativeEvent.target.name
          )
        }
        type="select"
        as="select"
      >
        {membersList}
      </Field>
      <Field
        dot={false}
        label="Support1"
        name="mapprovalSupport1"
        onChange={(value) =>
          addStep(
            "3. approval",
            "3. support1",
            value.nativeEvent.target.value,
            value.nativeEvent.target.name
          )
        }
        type="select"
        as="select"
      >
        {membersList}
      </Field>
      <Field
        dot={false}
        label="Support2"
        name="napprovalSupport2"
        onChange={(value) =>
          addStep(
            "3. approval",
            "4. support2",
            value.nativeEvent.target.value,
            value.nativeEvent.target.name
          )
        }
        type="select"
        as="select"
      >
        {membersList}
      </Field>
    </div>
  );

  // contracting fields //
  const contractingFields = (
    <div className="w-1/2 mx-auto border border-slate-300 rounded-lg my-3">
      <p className="text-xl text-primary text-bold">Contracting</p>
      <Field
        dot={false}
        label="Vetter"
        name="qcontractingVetter"
        onChange={(value) =>
          addStep(
            "4. contracting",
            "2. vetting",
            value.nativeEvent.target.value,
            value.nativeEvent.target.name
          )
        }
        type="select"
        as="select"
      >
        {membersList}
      </Field>
      <Field
        dot={false}
        label="Support1"
        name="rcontractingSupport1"
        onChange={(value) =>
          addStep(
            "4. contracting",
            "3. support1",
            value.nativeEvent.target.value,
            value.nativeEvent.target.name
          )
        }
        type="select"
        as="select"
      >
        {membersList}
      </Field>
      <Field
        dot={false}
        label="Support2"
        name="scontractingSupport2"
        onChange={(value) =>
          addStep(
            "4. contracting",
            "4. support2",
            value.nativeEvent.target.value,
            value.nativeEvent.target.name
          )
        }
        type="select"
        as="select"
      >
        {membersList}
      </Field>
    </div>
  );

  return (
    <div>
      <h1 className="text-3xl font-extrabold text-primary mb-3">
        Responsible Parties
      </h1>
      <p>
        Please select the responsible parties for each step (if applicable).
      </p>
      <form className="justify-center" onSubmit={formik.handleSubmit}>
        {applicableStages.planning ? planningFields : ""}
        {applicableStages.bidding ? biddingFields : ""}
        {applicableStages.approval ? approvalFields : ""}
        {contractingFields}
        <div className="w-1/2 mx-auto flex justify-around">
          <button
            className="w-32 text-white bg-error hover:bg-red-500 hover:shadow-md rounded px-4 py-1"
            type="reset"
            disabled={isSubmitting ? true : false}
            onClick={() => formik.handleReset(formik.initialValues)}
          >
            Reset
          </button>
          <button
            className="w-32 text-white bg-secondary disabled:bg-gray-200 hover:bg-accent hover:shadow-md rounded px-4 py-1"
            type="submit"
            disabled={isSubmitting ? true : false}
          >
            Submit
          </button>
        </div>
      </form>
      <div className={`absolute mr-16 right-0 ${isSubmitting ? "" : "hidden"}`}>
        <SubmittingBtn />
      </div>
    </div>
  );
};

const style = {
  dot: `after:content-['*'] after:ml-0.5 after:text-red-500`,
  error: `ring-red-500 ring-1`,
  disabled: `cursor-not-allowed`,
  container: `mb-6 mt-3`,
  errorMessage: `text-sm text-red-500 w-full px-3 text-left h-2`,
  iconContainer: `absolute flex border border-transparent left-0 top-0 h-full w-10`,
  icon: `flex items-center justify-center rounded-tl rounded-bl z-10 text-gray-400 text-lg h-full w-full`,
  default: `text-base relative flex flex-1 w-full mt-1 rounded-md py-2 px-4 bg-white text-gray-700 placeholder-gray-400 text-base focus:outline-none focus:ring-1 focus:border-transparent border`,
};

const Field = forwardRef(
  ({ disabled, dot, error, icon, label, name, type, ...rest }, ref) => {
    let component;

    if (type === "select") {
      component = (
        <select
          aria-required={dot}
          aria-invalid={!!error}
          className={`${style.default} ${disabled ? style.disabled : ""}
                   ${error ? style.error : "border-gray-300"}
                `}
          disabled={disabled}
          id={name}
          name={name}
          ref={ref}
          {...rest}
        />
      );
    }

    if (type !== "select") {
      component = (
        <div className="relative">
          <div className={style.iconContainer}>
            <div className={style.icon}>{icon}</div>
          </div>
          <input
            aria-required={dot}
            aria-invalid={!!error}
            className={`${style.default} ${icon ? "pl-12" : ""}
                   ${error ? style.error : "border-gray-300"}
                   ${disabled ? style.disabled : ""}
                `}
            disabled={disabled}
            id={name}
            name={name}
            type={type}
            ref={ref}
            {...rest}
          />
        </div>
      );
    }

    return (
      <div
        className={`${style.container} ${
          disabled ? "opacity-70" : ""
        } px-3 mx-3 flex`}
      >
        <div className="flex px-3 w-1/4 ">
          <label
            htmlFor={name}
            className={`text-gray-700 m-3 w-full text-right ${
              dot && style.dot
            }`}
          >
            {label}
          </label>
        </div>
        <div className="w-3/4">
          {component}
          <p role="alert" className={style.errorMessage}>
            {error ? error : ""}
          </p>
        </div>
      </div>
    );
  }
);

export default NewStepsDetails;
