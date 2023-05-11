import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

//*Conditionally render a route based on if user is logged in
//*Props: component - component to render, ...rest is any other props passed in
function PrivateRoute({ component: Component, ...rest }) {
  const { currentUser } = useAuth();

  // if login user exist render, else redirect to login
  return currentUser ? <Outlet /> : <Navigate to="/login" />;
}

export default PrivateRoute;
