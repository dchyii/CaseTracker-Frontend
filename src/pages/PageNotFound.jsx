import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

const PageNotFound = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setTimeout(() => {
      console.log("redirect");
      navigate("/");
    }, 3000);
  }, []);

  return (
    <div>
      <h1>Error. Page not found</h1>
      <p>
        You will be redirected to the Dashboard. Click <a href="/">here</a> to
        access the dashboard if you are not automatically redirected.
      </p>
    </div>
  );
};

export default PageNotFound;
