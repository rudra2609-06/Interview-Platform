import {
  Show,
  SignInButton,
  SignOutButton,
  UserButton,
  UserProfile,
} from "@clerk/react";
import React from "react";
import "./style.css";
import Router from "./Routes/Router.jsx";
import ToasterCom from "./components/ToasterCom.jsx";

const App = () => {
  return (
    <div>
      <Router />
      <ToasterCom />
      <h1 className="bg-fuchsia-800">welcome to app</h1>
    </div>
  );
};

export default App;
