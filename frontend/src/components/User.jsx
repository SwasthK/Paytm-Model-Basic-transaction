import React from "react";
import { Icon } from "./Icon";
import { Mosttext } from "./Mosttext";
import { Button } from "./BUtton";
import { useNavigate } from "react-router-dom";

export const User = ({ uname, id }) => {
  const navigate = useNavigate();
  return (
    <div className="text-white px-8 py-6 mt-6 rounded-lg flex justify-between items-center border-2">
      <div className="flex gap-4">
        <Icon icon={uname.charAt(0).toUpperCase()}></Icon>
        <div className="text-black">
          <Mosttext text={uname}></Mosttext>
        </div>
      </div>
      <div>
        <Button
          onclick={(e) => {
            navigate("/send?id=" + id + "&name=" + uname);
          }}
          text="Send Money"
        ></Button>
      </div>
    </div>
  );
};
