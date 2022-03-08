import React from "react";
import { useState } from "react";

const CaseDetailsBreakdown = () => {
  const [isEditing, setIsEditing] = useState(false);
  return (
    <div>
      <form>
        <fieldset>
          <legend>Field Set</legend>
          <input type="text" placeholder="input text" />
        </fieldset>
      </form>
      <button className="btn btn-wide btn-success">Button</button>
    </div>
  );
};

export default CaseDetailsBreakdown;
