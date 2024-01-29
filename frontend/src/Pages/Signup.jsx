import React, { useState } from "react";
import Head from "../components/Head";
import { Desc } from "../components/Desc";
import { Input } from "../components/Input";
import { Button } from "../components/BUtton";
import { Buttontext } from "../components/Buttontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [firstname, setfirstname] = useState("");
  const [lastname, setlastname] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState(" ");
  const navigate = useNavigate();

  return (
    <div className="max-w-sm mx-auto mt-10 border-2 p-6 rounded-lg border-black">
      <Head text="Signup"></Head>
      <Desc desc="Enter your infomation to create your account"></Desc>
      <Input
        id="First name"
        placeholder="your firstname"
        label="First name"
        onchange={(e) => setfirstname(e.target.value)}
      ></Input>
      <Input
        id="Last name"
        placeholder="your lastname"
        label="Last name"
        onchange={(e) => setlastname(e.target.value)}
      ></Input>
      <Input
        id="Email"
        placeholder="your email"
        label="hii"
        onchange={(e) => setemail(e.target.value)}
      ></Input>
      <Input
        id="Password"
        placeholder="your password"
        label="Password"
        onchange={(e) => setpassword(e.target.value)}
      ></Input>
      <Button
        text="Sign up"
        onclick={() => {
          axios
            .post("http://localhost:3000/mypaytm/api/v1/user/signup", {
              firstname,
              lastname,
              username: email,
              password,
            })
            .then((res) => {
              localStorage.setItem("token", res.data.token);
              navigate("/dashboard");
            })
            .catch((e) => console.log(e));
        }}
      />
      <Buttontext
        text1="Alrady have an account ?"
        text2="Sign in"
        to="/signin"
      />
    </div>
  );
}
