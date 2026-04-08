import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Problems from "../pages/Problems.jsx";
import { useUser } from "@clerk/react";
import Dashboard from "../pages/Dashboard.jsx";

const Router = () => {
  const { isSignedIn } = useUser();

  return (
    <Routes>
      <Route
        element={!isSignedIn ? <Home /> : <Navigate to="/dashboard" />}
        path="/"
      />
      <Route
        path="/dashboard"
        element={isSignedIn ? <Dashboard /> : <Navigate to={"/"} />}
      />
      <Route
        element={isSignedIn ? <Problems /> : <Navigate to="/" />}
        path="/problems"
      />
    </Routes>
  );
};

export default Router;
