import React, { useState } from "react";
import Head from "../components/Head";
import { Desc } from "../components/Desc";
import { Input } from "../components/Input";
import { Button } from "../components/BUtton";
import { Buttontext } from "../components/Buttontext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Signin() {
  const [username, setusername] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();

  return (
    <div className="max-w-sm mx-auto mt-10 border-2 p-6 rounded-lg">
      <Head text="Sign in" />
      <Desc desc="Enter your infomation to login to your account"></Desc>
      <Input
        id="Email"
        placeholder="Your email"
        onchange={(e) => setusername(e.target.value)}
      ></Input>
      <Input
        id="Password"
        placeholder="Your password"
        onchange={(e) => setpassword(e.target.value)}
      ></Input>
      <Button
        text="Sign in"
        onclick={() => {
          console.log(username);
          console.log(password);
          axios
            .post("http://localhost:3000/mypaytm/api/v1/user/signin", {
              username,
              password,
            })
            .then((res) => {
              localStorage.setItem("token", res.data.token);
              navigate("/dashboard");
            })
            .catch((err) => console.log(err));
        }}
      ></Button>
      <Buttontext
        text1="Don't have an account ?"
        text2="Sign up"
        to="/signup"
      ></Buttontext>
    </div>
  );
}
