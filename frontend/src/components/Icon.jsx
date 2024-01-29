import React from "react";

export const Icon = ({ icon }) => {
  return (
    <div className=" bg-white rounded-full w-11 h-11 flex justify-center items-center border-2 border-black">
      <p className="font-bold text-2xl text-black">{icon}</p>
    </div>
  );
};
