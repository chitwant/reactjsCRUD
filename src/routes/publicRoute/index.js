import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
const PublicRoute =({children})=>{
    const auth =useSelector((state)=>state.auth)
   if (auth.isAuthenticated) {
    return <Navigate to="/profile" replace></Navigate>;
  }
  return children;
}
export default PublicRoute;