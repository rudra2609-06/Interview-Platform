import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Problems from "../pages/Problems.jsx";
import { useUser } from "@clerk/react";

const Router = () => {
  const { isSignedIn } = useUser();

  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route
        element={isSignedIn ? <Problems /> : <Navigate to="/" />}
        path="/problems"
      />
    </Routes>
  );
};

export default Router;
