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
    </div>
  );
};

export default App;
