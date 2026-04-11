import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import Home from "../pages/Home.jsx";
import Problems from "../pages/Problems.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import ProblemPage from "../pages/ProblemPage.jsx";
// import { useEffect } from "react";

const Router = () => {
  // useEffect(() => {

  // },[]);
  // TODO handle route not found page also

  return (
    <Routes>
      <Route element={<Home />} path="/" />
      <Route
        path="/problems"
        element={
          <ProtectedRoute>
            <Problems />
          </ProtectedRoute>
        }
      />
      <Route
        path="problem/:id"
        element={
          <ProtectedRoute>
            <ProblemPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default Router;
