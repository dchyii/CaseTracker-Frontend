import React from "react";

const Signin = () => {
  return (
    <div className="w-full h-full pt-24">
      <div className="container w-1/2 h-1/2 m-auto border rounded-3xl bg-slate-50 relative">
        <p className="font-semibold text-2xl">Sign In</p>
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
