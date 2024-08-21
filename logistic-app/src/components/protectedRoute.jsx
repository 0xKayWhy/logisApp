import React, { useContext} from "react";
import { UserContext } from "./userContext";
import { Navigate } from "react-router-dom";


//check on user status consistantly if they are eligible to visit the page
export const ProtectedRoute = ({ children, requiredRole }) => {
  const { isLoggedin, role} = useContext(UserContext);


  if (!isLoggedin || role !== requiredRole) {
    return <Navigate to="/" replace />;
  }

  return children;
};
