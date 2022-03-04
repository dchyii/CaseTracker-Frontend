import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const Signin = (props) => {
  const [isSignedIn, setIsSignedIn] = props.state;
  const API_ENTRY = import.meta.env.VITE_API_ENTRY;

  const LOG_IN_SCHEMA = Yup.object().shape({
    username: Yup.string()
      .matches(/^[0-9A-Za-z]*[^ ]$/, "Please use alphanumeric characters")
      .max(50, "Too Long!")
      .required("Required"),
    password: Yup.string().required("Required"),
  });

  const initialFormValues = {
    username: "",
    password: "",
  };

  return (
    <div className="w-full h-full pt-24">
      <div className="container w-1/2 h-80 m-auto border rounded-3xl bg-slate-50 relative">
        <p className="font-semibold text-2xl my-3">Sign In</p>
        <div>
          <Formik
            initialValues={initialFormValues}
            validationSchema={LOG_IN_SCHEMA}
            validateOnBlur={true}
            validateOnChange={true}
            onSubmit={async (values) => {
              console.log(values);
              setIsSignedIn(true);
            }}
          >
            {({ errors, touched, isValid, dirty }) => (
              <Form>
                <div className="my-3">
                  <div className="w-3/5 mx-auto flex justify-between">
                    <label htmlFor="username" className="font-semibold">
                      Username:{" "}
                    </label>
                    {errors.username && touched.username ? (
                      <ErrorMessage
                        name="username"
                        component="div"
                        className=" text-red-500 font-semibold text-sm"
                      />
                    ) : (
                      <span> </span>
                    )}
                  </div>
                  <Field
                    type="username"
                    name="username"
                    className="w-3/5 border"
                  />
                </div>
                <div className="my-3">
                  <div className="w-3/5 mx-auto flex justify-between">
                    <label htmlFor="password" className="font-semibold">
                      Password:{" "}
                    </label>
                    {errors.username && touched.username ? (
                      <ErrorMessage
                        name="password"
                        component="div"
                        className=" text-red-500 font-semibold text-sm align-baseline"
                      />
                    ) : (
                      <span> </span>
                    )}
                  </div>
                  <Field
                    type="password"
                    name="password"
                    className="w-3/5 border"
                  />
                </div>
                <button
                  type="submit"
                  disabled={!(dirty && isValid)}
                  className="mt-8 text-base bg-black disabled:bg-gray-200 active:bg-gray-900 focus:outline-none text-white rounded px-4 py-1"
                >
                  Submit
                </button>
              </Form>
            )}
          </Formik>
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

export default Signin;
