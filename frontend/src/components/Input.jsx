import React from "react";

export const Input = ({ id, placeholder ,onchange }) => {
  return (
    <div className="mt-3">
      <label
        htmlFor={id}
        className="block mb-2 text-sm font-medium text-black-900 "
      >
        {id}
      </label>
      <input
        type="text"
        id={id}
        className="text-gray-900 text-sm rounded-lg block w-full p-2.5 border-gray-200 border-2 dark:placeholder-gray-400 focus:border-blue-500 focus:outline-none Class
        Properties
        border-solid "
        placeholder={placeholder}
        required
        onChange={onchange}
      ></input>
    </div>
  );
};
