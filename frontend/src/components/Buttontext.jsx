import React from "react";
import { Link } from "react-router-dom";

export const Buttontext = ({ text1,text2,to }) => {
  return (
    <div className="flex gap-2 justify-center">
      <p>{text1}</p>
      <Link className="font-medium underline hover:text-blue-700" to={to}>
        {text2}
      </Link>
    </div>
  );
};
