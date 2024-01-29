import React, { useState } from "react";
import Head from "../components/Head";
import { Icon } from "../components/Icon";
import { Input } from "../components/Input";
import { useLocation, useSearchParams } from "react-router-dom";
import axios from "axios";

export default function Send() {
  // const { search } = useLocation();
  // const query = new URLSearchParams(search);
  // const name = query.get("name");
  const [ammount, setammount] = useState("");

  const [search] = useSearchParams();
  const name = search.get("name");
  const id = search.get("id");

  console.log(ammount);

  return (
    <div className="max-w-sm mx-auto mt-10 border-2 p-6 rounded-lg bg-slate-200">
      <div className="pb-16 ">
        <Head text="Send Money"></Head>
      </div>
      <div className="flex gap-4 items-center">
        <Icon icon={name.charAt(0).toUpperCase()}></Icon>
        <p className="font-bold text-2xl">{name}</p>
      </div>
      <Input
        id="Amount (in Rs)"
        placeholder="Enter amount"
        onchange={(e) => setammount(e.target.value)}
      ></Input>
      <button
        className="w-full bg-green-500 py-2 text-lg font-semibold rounded-xl mt-4"
        onClick={() => {
          axios
            .put(
              "http://localhost:3000/mypaytm/api/v1/account/transfer",
              {
                to: id,
                ammount,
              },
              {
                headers: {
                  Authorization: "Bearer " + localStorage.getItem("token"),
                },
              }
            )
            .then((res) => console.log("sucess"));
        }}
      >
        Transfer money
      </button>
    </div>
  );
}
