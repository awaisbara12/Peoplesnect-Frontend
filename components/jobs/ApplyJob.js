import React, { useState } from "react";
import { TagsInput } from "react-tag-input-component";

const ApplyJob  = () =>  {
  const [selected, setSelected] = useState();

  return (
    <div>
      <h1 className="mb-2">Add Skills</h1>
      <TagsInput
        value={selected}
        onChange={setSelected}
        name="skills"
        placeHolder="Add Skills"
      />
      <em>press enter to add new Skill</em>
    </div>
  );
}
export default ApplyJob;