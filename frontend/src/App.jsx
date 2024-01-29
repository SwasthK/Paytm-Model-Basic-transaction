import { useState } from "react";
import "./App.css";
import Signup from "./pages/signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import  Dashboard  from "./Pages/Dashboard";
import  Send  from "./Pages/Send";
import Signin from "./Pages/Signin";

function App() {
  const [count, setCount] = useState(0);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/signin" element={<Signin />}></Route>
        <Route path="/dashboard" element={<Dashboard />}></Route>
        <Route path="send" element={<Send />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
