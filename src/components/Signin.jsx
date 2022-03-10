import axios from "axios";
import { useFormik } from "formik";
import jwt_decode from "jwt-decode";
import React, { forwardRef, useState } from "react";
import * as Yup from "yup";

const Signin = (props) => {
  const [isSignedIn, setIsSignedIn] = props.state;
  const [user, setUser] = props.user;
  const [message, setMessage] = useState("");
  const API_ENTRY = import.meta.env.VITE_API_ENTRY;

  /*  FORM SETUP */

  const LOG_IN_SCHEMA = Yup.object().shape({
    username: Yup.string()
      .matches(/^[0-9A-Za-z]*$/, "Please use alphanumeric characters")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string().required("Required"),
  });

  const initialFormValues = {
    username: "",
    password: "",
  };

  const formik = useFormik({
    initialValues: initialFormValues,
    validationSchema: LOG_IN_SCHEMA,
    onSubmit: async (values) => {
      console.log(JSON.stringify(values));
      setMessage("Signing in...");
      try {
        const serverResponse = await axios({
          method: "post",
          url: `${API_ENTRY}/token/`,
          data: values,
        });
        console.log("return: ", serverResponse);
        if (serverResponse.status === 200) {
          localStorage.setItem("token", JSON.stringify(serverResponse.data));
          setIsSignedIn(true);
          setUser(jwt_decode(serverResponse.data.access));
        }
      } catch (error) {
        console.log(error);
        setMessage(error.response.data.detail);
      }
    },
  });

  return (
    <div className="w-full h-full pt-24">
      <div className="container w-1/2 h-fit m-auto border rounded-3xl bg-slate-50 relative">
        <p className="font-semibold text-2xl my-3">Sign In</p>
        <div className="mx-12 mb-12 border p-6">
          <form onSubmit={formik.handleSubmit}>
            <Field
              dot={true}
              error={formik.touched?.username && formik.errors?.username}
              label="Username"
              name="username"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="text"
            />
            <Field
              dot={true}
              error={formik.touched?.password && formik.errors?.password}
              icon={<LockIcon />}
              label="Password"
              name="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              type="password"
            />
            <div className="h-6">
              {message === "Signing in..." ? (
                <p className="text-primary">{message}</p>
              ) : (
                <p className="text-error">{message}</p>
              )}
            </div>
            <button
              className="mt-8 text-base bg-black disabled:bg-gray-200 active:bg-gray-900 focus:outline-none text-white rounded px-4 py-1"
              type="submit"
              disabled={!(formik.isValid && formik.dirty)}
            >
              Submit
            </button>
          </form>
        </div>
        <div className="absolute bottom-0 my-3 w-full">
          <p className="mx-auto">
            Don't have an account?{" "}
            <a href="/" className=" text-blue-600 hover:underline">
              Sign up now
            </a>
            !
          </p>
        </div>
      </div>
    </div>
  );
};

/*  COMPONENT LOGIC */

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
  (
    { disabled, dot, error, icon, label, name, type = "text", ...rest },
    ref
  ) => {
    let component;

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
        {error && <ErrorIcon />}
      </div>
    );

    return (
      <div className={`${style.container} ${disabled ? "opacity-50" : ""}`}>
        <div className="mx-auto flex justify-between">
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

Field.displayName = "Field";

const ErrorIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="15"
    height="15"
    fill="currentColor"
    className="absolute right-2 -mt-7 text-red-500"
    viewBox="0 0 1792 1792"
  >
    <path d="M1024 1375v-190q0-14-9.5-23.5t-22.5-9.5h-192q-13 0-22.5 9.5t-9.5 23.5v190q0 14 9.5 23.5t22.5 9.5h192q13 0 22.5-9.5t9.5-23.5zm-2-374l18-459q0-12-10-19-13-11-24-11h-220q-11 0-24 11-10 7-10 21l17 457q0 10 10 16.5t24 6.5h185q14 0 23.5-6.5t10.5-16.5zm-14-934l768 1408q35 63-2 126-17 29-46.5 46t-63.5 17h-1536q-34 0-63.5-17t-46.5-46q-37-63-2-126l768-1408q17-31 47-49t65-18 65 18 47 49z" />
  </svg>
);

const LockIcon = () => (
  <svg
    height="20"
    width="20"
    stroke="currentColor"
    fill="currentColor"
    strokeWidth="0"
    viewBox="0 0 448 512"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path d="M400 224h-24v-72C376 68.2 307.8 0 224 0S72 68.2 72 152v72H48c-26.5 0-48 21.5-48 48v192c0 26.5 21.5 48 48 48h352c26.5 0 48-21.5 48-48V272c0-26.5-21.5-48-48-48zm-104 0H152v-72c0-39.7 32.3-72 72-72s72 32.3 72 72v72z" />
  </svg>
);

export default Signin;
