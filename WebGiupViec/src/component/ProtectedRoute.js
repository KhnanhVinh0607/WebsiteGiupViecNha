import React from "react";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { message } from "antd"; // Import message từ antd

const ProtectedRoute = ({ children }) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
