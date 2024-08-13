import React, { useContext, useEffect, useState } from "react";
import { UserContext } from "./userContext";
import { Navigate } from "react-router-dom";
import { SyncLoader } from "react-spinners";


export const ProtectedRoute = ({ children, requiredRole }) => {
  const { isLoggedin, role, loading} = useContext(UserContext);

  if (loading) {
    <div className="loading-spinner">
    <SyncLoader color={"#00008B"} loading={loading} />
  </div>
  }

  if (!isLoggedin || role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};
