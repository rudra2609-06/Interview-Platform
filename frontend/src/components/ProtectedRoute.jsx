import { useUser } from "@clerk/react";
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const { isLoaded, isSignedIn } = useUser();

  if (!isLoaded)
    return (
      <div className="w-full h-screen flex inset-0 justify-center items-center">
        <span className="loading loading-bars loading-md "></span>
      </div>
    );

  if (!isSignedIn) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
