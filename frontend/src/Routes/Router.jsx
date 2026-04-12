import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import Home from "../pages/Home.jsx";
import ProblemPage from "../pages/ProblemPage.jsx";
import Problems from "../pages/Problems.jsx";
import Session from "../pages/Session.jsx";
import Error from "../components/Error.jsx";

const Router = () => {
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
      <Route
        path="session/:id"
        element={
          <ProtectedRoute>
            <Session />
          </ProtectedRoute>
        }
      />
      <Route element={<Error />} path="*" />
    </Routes>
  );
};

export default Router;
