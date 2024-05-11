import React from "react";

import { PATH } from "../../constansts";
import { Navigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

interface ProtectedRouteProps {
  children: any;
}
const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const { authedUser } = useSelector((state: any) => state.authentication);

  if (authedUser) {
    return <>{children}</>;
  } else
    return (
      <Navigate replace to={PATH.LOGIN} state={{ path: location.pathname }} />
    );
};

export default ProtectedRoute;
