import React from "react";

const InputControl = ({ label, ...props }) => {
  return (
    <div section="container" className="flex flex-col w-2/4">
      {label && <label className="font-semibold text-base">{label}</label>}
      <input
        type="text"
        {...props}
        className="border-2 border-solid border-gray-300 text-base rounded-sm hover:border-gray-500 focus:border-main-hover focus:outline-none"
      />
    </div>
  );
};

export default InputControl;
