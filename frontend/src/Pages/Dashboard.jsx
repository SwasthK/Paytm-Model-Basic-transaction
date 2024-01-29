import React, { useEffect, useState } from "react";
import { Mosttext } from "../components/Mosttext";
import { Icon } from "../components/Icon";
import { User } from "../components/User";
import axios from "axios";

export default function Dashboard() {
  const [users, setusers] = useState([]);
  const [filter, setfilter] = useState("");

  useEffect(() => {
    axios
      .get(
        "http://localhost:3000/mypaytm/api/v1/user/allusers?filter=" + filter
      )
      .then((res) => setusers(res.data.users));
  }, [filter]);


  return (
    <>
      <div className="bg-black p-4 m-9 rounded-xl flex justify-between px-9 items-center text-white">
        <p className="font-bold text-2xl">Paytm App</p>
        <div className="flex gap-3 justify-center items-center">
          <Mosttext text="User"></Mosttext>
          <Icon icon="U"></Icon>
        </div>
      </div>
      <div className=" px-8 py-4 pb-9 flex gap-3 items-center justify-center sm:justify-start">
        <p className="font-bold">YOUR BALANCE IS : </p>
        <p className="text-5xl font-extrabold pb-2">$909899</p>
      </div>
      <div className="pt-2 px-8">
        <p className="font-bold py-3 px-1">USERS</p>
        <input
          className="px-5 py-2 font-normal border-2 rounded-md w-full"
          type="search"
          name=""
          id=""
          placeholder="Search users"
          onChange={(e) => setfilter(e.target.value)}
        />
      </div>
      {users.map((val, index) => (
        <User key={index} uname={val.firstname} id={val.id}></User>
      ))}
    </>
  );
}
