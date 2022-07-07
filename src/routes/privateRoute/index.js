import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PrivateRoute = ({children}) => {
    const auth =useSelector((state)=>state.auth)
  if (!auth.isAuthenticated) {
    return <Navigate to="/login" replace></Navigate>;
  }
  return children;
};
export default PrivateRoute;
