import React from "react";

const Checkbox = ({ id, type, name, handleClick, isChecked }) => {
  return (
<div className="">
<input
      id={id}
      name={name}
      type={type}
      onChange={handleClick}
      checked={isChecked}
    />
</div>
  );
};

export default Checkbox;
