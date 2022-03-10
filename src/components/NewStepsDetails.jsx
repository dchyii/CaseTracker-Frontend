import React, { useState, useContext, forwardRef } from "react";
import { UserContext } from "../utilities/PrivateRoute";
import { useFormik } from "formik";
import * as Yup from "yup";

const NewStepsDetails = (props) => {
  const user = useContext(UserContext);
  const caseDetails = props.caseDetails;
  const [steps, setSteps] = useState([]);

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
    aplanningVetter: "",
    bplanningSupport1: "",
    cplanningSupport2: "",
    dbiddingVetter: "",
    ebiddingSupport1: "",
    fbiddingSupport2: "",
    gapprovalVetter: "",
    happrovalSupport1: "",
    iapprovalSupport2: "",
    jcontractingVetter: "",
    kcontractingSupport1: "",
    lcontractingSupport2: "",
  };

  const formik = useFormik({
    initialValues: { ...initialFormValues },
    onSubmit: (values) => {
      const compare = (a, b) => {
        if (a.stepName < b.stepName) {
          return -1;
        } else {
          return 1;
        }
      };
      const sortedSteps = steps.sort(compare);
      console.log("submitted steps: ", sortedSteps);
    },
  });

  // Planning Fields //
  const planningFields = (
    <div className="w-1/2 mx-auto border border-slate-300 rounded-lg my-3">
      <p className="text-xl text-primary text-bold">Planning</p>
      <Field
        dot={false}
        label="Vetter"
        name="aplanningVetter"
        onChange={(value) =>
          addStep(
            "planning",
            "vetting",
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
        name="bplanningSupport1"
        onChange={(value) =>
          addStep(
            "planning",
            "support1",
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
        name="cplanningSupport2"
        onChange={(value) =>
          addStep(
            "planning",
            "support2",
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
        name="dbiddingVetter"
        onChange={(value) =>
          addStep(
            "bidding",
            "vetting",
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
        name="ebiddingSupport1"
        onChange={(value) =>
          addStep(
            "bidding",
            "support1",
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
        name="fbiddingSupport2"
        onChange={(value) =>
          addStep(
            "bidding",
            "support2",
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
        name="gapprovalVetter"
        onChange={(value) =>
          addStep(
            "approval",
            "vetting",
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
        name="happrovalSupport1"
        onChange={(value) =>
          addStep(
            "approval",
            "support1",
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
        name="iapprovalSupport2"
        onChange={(value) =>
          addStep(
            "approval",
            "support2",
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
        name="jcontractingVetter"
        onChange={(value) =>
          addStep(
            "contracting",
            "vetting",
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
        name="kcontractingSupport1"
        onChange={(value) =>
          addStep(
            "contracting",
            "support1",
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
        name="lcontractingSupport2"
        onChange={(value) =>
          addStep(
            "contracting",
            "support2",
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
        {caseDetails?.planningDeadline ? planningFields : ""}
        {caseDetails?.biddingDeadline ? biddingFields : ""}
        {caseDetails?.approvalDeadline ? approvalFields : ""}
        {contractingFields}
        <div className="w-1/2 mx-auto flex justify-around">
          <button
            className="w-32 text-white bg-error hover:bg-red-500 hover:shadow-md rounded px-4 py-1"
            type="reset"
            onClick={() => formik.handleReset(formik.initialValues)}
          >
            Reset
          </button>
          <button
            className="w-32 text-white bg-secondary disabled:bg-gray-200 hover:bg-accent hover:shadow-md rounded px-4 py-1"
            type="submit"
          >
            Submit
          </button>
        </div>
      </form>
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
