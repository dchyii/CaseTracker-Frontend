import React from "react";
import { useState } from "react";

const CaseDetailsBreakdown = (props) => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div className="border rounded-md px-5 py-3">
      <p className=" font-semibold text-primary text-xl text-left">
        {props.title}
      </p>
      <form>
        <fieldset>
          <legend>Field Set</legend>
          <input type="text" placeholder="input text" />
        </fieldset>
      </form>
      <button className="btn btn-wide btn-success">Button</button>
      <p>{JSON.stringify(props.details)}</p>
    </div>
  );
};

export default CaseDetailsBreakdown;
