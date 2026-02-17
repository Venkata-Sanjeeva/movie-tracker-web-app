import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = localStorage.getItem("user");

  if (!user) {
    return (
      <Navigate
        to="/login"
        replace
        state={{ toastMessage: "⚠️ Please login to access this page!", toastType: "danger" }}
      />
    );
  }

  return children;
};

export default ProtectedRoute;
