import React, { useContext, forwardRef } from "react";
import { UserContext } from "../utilities/PrivateRoute";
import { useFormik } from "formik";
import * as Yup from "yup";

const NewCaseDetails = (props) => {
  const user = useContext(UserContext);
  const [caseDetails, setCaseDetails] = props.caseDetails;
  //   console.log(user);

  // Formik Setup //
  const initialFormValues = {
    title: "",
    value: 0,
    folder_link: "",
    purchase_type: null,
    planning_deadline: null,
    bidding_deadline: null,
    approval_type: null,
    approval_deadline: null,
    contracting_type: "",
    contracting_deadline: "",
    need_by_date: "",
    staffer: user?.user_id,
    current_res_party: user?.user_id,
  };

  const NEW_CASE_SCHEMA = Yup.object().shape({
    title: Yup.string().min(2, "too short").required("Required"),
    value: Yup.number("Value must be a number.")
      .positive("Value cannot be less than $0.")
      .integer("Values must be whole number.")
      .required("Required"),
    need_by_date: Yup.date().required("Required").typeError("Required"),
    folder_link: Yup.string().url().required("Required"),
    purchase_type: Yup.string().nullable(),
    planning_deadline: Yup.date()
      .nullable()
      .when("purchase_type", {
        is: (purchase_type) => purchase_type === "L",
        then: Yup.date()
          .required("Planning is required.")
          .typeError("Planning is required.")
          .max(
            Yup.ref("need_by_date"),
            "Date cannot be later than Need By Date."
          ),
      })
      .when("purchase_type", {
        is: (purchase_type) => purchase_type === "D",
        then: Yup.date()
          .required("Planning is required.")
          .typeError("Planning is required.")
          .max(
            Yup.ref("need_by_date"),
            "Date cannot be later than Need By Date."
          ),
      }),
    bidding_deadline: Yup.date()
      .nullable()
      .when("purchase_type", {
        is: (purchase_type) => purchase_type === "O",
        then: Yup.date()
          .required("Bidding is required.")
          .typeError("Bidding is required.")
          .max(
            Yup.ref("need_by_date"),
            "Date cannot be later than Need By Date."
          ),
      })
      .when("purchase_type", {
        is: (purchase_type) => purchase_type === "L",
        then: Yup.date()
          .required("Bidding is required.")
          .typeError("Bidding is required.")
          .max(
            Yup.ref("need_by_date"),
            "Date cannot be later than Need By Date."
          ),
      })
      .when("purchase_type", {
        is: (purchase_type) => purchase_type === "D",
        then: Yup.date()
          .required("Bidding is required.")
          .typeError("Bidding is required.")
          .max(
            Yup.ref("need_by_date"),
            "Date cannot be later than Need By Date."
          ),
      }),
    approval_type: Yup.string().nullable(),
    approval_deadline: Yup.date()
      .nullable()
      .when("approval_type", {
        is: (approval_type) => approval_type,
        then: (schema) =>
          schema
            .required("Approval is required.")
            .typeError("Approval is required.")
            .max(
              Yup.ref("need_by_date"),
              "Date cannot be later than Need By Date."
            ),
      }),
    contracting_type: Yup.string().nullable(),
    contracting_deadline: Yup.date()
      .required("Required")
      .max(Yup.ref("need_by_date"), "Date cannot be later than Need By Date."),
  });

  const formik = useFormik({
    initialValues: { ...initialFormValues },
    validationSchema: NEW_CASE_SCHEMA,
    onSubmit: (values) => {
      //   console.log("form value: ", values);
      const submittedValues = {
        title: values.title,
        value: values.value,
        folder_link: values.folder_link,
        purchase_type: !values.purchase_type ? null : values.purchase_type,
        planning_deadline:
          values.purchase_type === "D" || values.purchase_type === "L"
            ? values.planning_deadline
            : null,
        bidding_deadline:
          values.purchase_type === "D" ||
          values.purchase_type === "L" ||
          values.purchase_type === "O"
            ? values.bidding_deadline
            : null,
        approval_type: !values.approval_type ? null : values.approval_type,
        approval_deadline: !values.approval_type
          ? null
          : values.approval_deadline,
        contracting_type: !values.contracting_type
          ? null
          : values.contracting_type,
        contracting_deadline: !values.contracting_type
          ? null
          : values.approval_deadline,
        need_by_date: values.need_by_date,
        staffer: user?.user_id,
        current_res_party: user?.user_id,
      };
      console.log("cleaned: ", submittedValues);
      setCaseDetails(submittedValues);
    },
  });

  // Render //
  return (
    <div>
      <h1 className="text-3xl font-extrabold text-primary mb-3">New Case</h1>
      <p>Please input the details of the case below.</p>
      <form className="justify-center" onSubmit={formik.handleSubmit}>
        <div className="w-full border border-slate-300 rounded-lg my-3">
          <div className="w-full md:w-1/2">
            <Field
              dot={true}
              error={formik.touched?.title && formik.errors?.title}
              label="Title"
              name="title"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
            />
            <Field
              dot={true}
              error={formik.touched?.value && formik.errors?.value}
              label="Value"
              name="value"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="number"
            />
          </div>
          <div className="flex w-full">
            <div className="w-1/2">
              <Field
                dot={true}
                error={
                  formik.touched?.folder_link && formik.errors?.folder_link
                }
                label="Sharepoint Link"
                name="folder_link"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="url"
              />
            </div>
            <div className="w-1/2">
              <Field
                dot={true}
                error={
                  formik.touched?.need_by_date && formik.errors?.need_by_date
                }
                label="Need By Date"
                name="need_by_date"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                type="date"
              />
            </div>
          </div>
        </div>
        <div className="w-full flex border border-slate-300 rounded-lg my-3">
          <div className="w-1/2">
            <Field
              dot={false}
              error={
                formik.touched?.purchase_type && formik.errors?.purchase_type
              }
              label="Purchase Type"
              name="purchase_type"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="select"
              as="select"
              defaultValue={null}
            >
              <option value={null}> </option>
              <option value="O">O</option>
              <option value="L">L</option>
              <option value="D">D</option>
              <option value="V">V</option>
              <option value="N">N</option>
            </Field>
          </div>
          <div className="w-1/2">
            <Field
              dot={false}
              error={
                formik.touched?.planning_deadline &&
                formik.errors?.planning_deadline
              }
              label="Planning Deadline"
              name="planning_deadline"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="date"
            />
            <Field
              dot={false}
              error={
                formik.touched?.bidding_deadline &&
                formik.errors?.bidding_deadline
              }
              label="Bidding Deadline"
              name="bidding_deadline"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="date"
            />
          </div>
        </div>
        <div className="w-full flex border border-slate-300 rounded-lg my-3">
          <div className="w-1/2">
            <Field
              dot={false}
              error={
                formik.touched?.approval_type && formik.errors?.approval_type
              }
              label="Approval Type"
              name="approval_type"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="select"
              as="select"
              defaultValue={null}
            >
              <option value={null}> </option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
              <option value="D">D</option>
            </Field>
          </div>
          <div className="w-1/2">
            <Field
              dot={false}
              error={
                formik.touched?.approval_deadline &&
                formik.errors?.approval_deadline
              }
              label="Approval Deadline"
              name="approval_deadline"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="date"
            />
          </div>
        </div>
        <div className="w-full flex border border-slate-300 rounded-lg my-3">
          <div className="w-1/2">
            <Field
              dot={true}
              error={
                formik.touched?.contracting_type &&
                formik.errors?.contracting_type
              }
              label="Contracting Type"
              name="contracting_type"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="select"
              as="select"
              defaultValue={null}
            >
              <option value={null}> </option>
              <option value="C">C</option>
              <option value="D">D</option>
              <option value="E">E</option>
              <option value="M">M</option>
            </Field>
          </div>
          <div className="w-1/2">
            <Field
              dot={true}
              error={
                formik.touched?.contracting_deadline &&
                formik.errors?.contracting_deadline
              }
              label="Contracting Deadline"
              name="contracting_deadline"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="date"
            />
          </div>
        </div>

        <div className="w-full flex justify-around">
          <button
            className="w-28 text-white bg-error hover:bg-red-500 hover:shadow-md rounded px-4 py-1"
            type="reset"
            onClick={() => formik.handleReset(formik.initialValues)}
          >
            Reset
          </button>
          <button
            className="w-28 text-white bg-secondary disabled:bg-gray-200 hover:bg-accent hover:shadow-md rounded px-4 py-1"
            type="submit"
            disabled={!(formik.isValid && formik.dirty)}
          >
            Next
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
        <div className="flex px-3 w-2/5 ">
          <label
            htmlFor={name}
            className={`text-gray-700 m-3 w-full text-right ${
              dot && style.dot
            }`}
          >
            {label}
          </label>
        </div>
        <div className="w-3/5">
          {component}
          <p role="alert" className={style.errorMessage}>
            {error ? error : ""}
          </p>
        </div>
      </div>
    );
  }
);

export default NewCaseDetails;
