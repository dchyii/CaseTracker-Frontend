import React from "react";
import dayjs from "dayjs";
import { useFormik } from "formik";
import { useState, forwardRef } from "react";
import { capsFirstLetter } from "../utilities/functions";
import { useMutation, useQueryClient } from "react-query";
import axiosInstance from "../utilities/AxiosIntance";
import {
  SubmitBtn,
  SubmittingBtn,
  ErrorBtn,
  SuccessBtn,
} from "../subcomponents/StepSubmitButton";

const StepForm = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  const membersList = props?.members?.map((member) => (
    <option key={member.id} value={member.id}>
      {member.name}
    </option>
  ));

  // Update Status //
  const queryClient = useQueryClient();
  const submitUpdate = useMutation(
    (updatedData) => {
      return axiosInstance.put(`/api/steps/${props.details.id}/`, updatedData);
    },
    {
      onSuccess: async () => {
        console.log("async success");
        queryClient.invalidateQueries("cases");
        setTimeout(() => {
          setIsEditing(false);
          submitUpdate.reset();
        }, 1000);
      },
    }
  );

  // Edit button //
  const editButton = isEditing ? (
    <>
      <button
        className=" mx-2 h-fit rounded-full mt-3  "
        onClick={() => setIsEditing(!isEditing)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path
            fillRule="evenodd"
            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </button>
    </>
  ) : (
    <>
      <button
        className=" mx-2 h-fit rounded-full mt-3"
        onClick={() => setIsEditing(!isEditing)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          viewBox="0 0 20 20"
          fill="currentColor"
        >
          <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
        </svg>
      </button>
    </>
  );

  // Formik Setup //
  const formik = useFormik({
    initialValues: { ...props.details },
    onSubmit: (values) => {
      console.log("submitted:", values);
      submitUpdate.mutate(values);
    },
  });

  //   Submit Button //
  const submitBtn = submitUpdate.isLoading ? (
    <SubmittingBtn />
  ) : submitUpdate.isError ? (
    <ErrorBtn resetFn={submitUpdate.reset} />
  ) : submitUpdate.isSuccess ? (
    <SuccessBtn />
  ) : (
    <SubmitBtn submitFn={formik.handleSubmit} />
  );

  return (
    <div>
      <p className="text-base text-left h-12 w-full font-bold text-primary">
        Step: {capsFirstLetter(props.details.step)}
        {editButton}
      </p>

      {/* <form className="flex" onSubmit={formik.handleSubmit}> */}
      <form className="flex">
        <Field
          dot={true}
          label="Responsible Party"
          name="res_party"
          as="select"
          type="select"
          defaultValue={formik.initialValues.res_party}
          onChange={formik.handleChange}
          disabled={!isEditing}
        >
          {membersList}
        </Field>
        <Field
          dot={true}
          label="Completed Date"
          name="completed_date"
          type="date"
          disabled={!isEditing}
          defaultValue={dayjs(formik.initialValues.completed_date).format(
            "YYYY-MM-DD"
          )}
          onChange={formik.handleChange}
        />
        {isEditing ? <div className="mt-12">{submitBtn}</div> : ""}
      </form>
    </div>
  );
};

const style = {
  dot: `after:content-['*'] after:ml-0.5 after:text-red-500`,
  error: `ring-red-500 ring-1`,
  disabled: `cursor-not-allowed`,
  container: `relative mb-6 mt-3`,
  errorMessage: `text-sm text-red-500`,
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
        <div className="relative ">
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
        } px-3 mx-3 w-56`}
      >
        <div className="mx-auto flex justify-between px-3">
          <label htmlFor={name} className={`text-gray-700 ${dot && style.dot}`}>
            {label}
          </label>
          {error && (
            <span role="alert" className={style.errorMessage}>
              {error}
            </span>
          )}
        </div>
        {component}
      </div>
    );
  }
);

export default StepForm;
