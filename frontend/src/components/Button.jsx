import React from "react";

export const Button = ({ text ,onclick}) => {
  return (
    <button onClick={onclick} className="bg-slate-900 block w-full p-2.5 font-bold rounded-lg mt-4 mb-4 text-white cursor-pointer hover:bg-slate-800">
      {text}
    </button>
  );
};
