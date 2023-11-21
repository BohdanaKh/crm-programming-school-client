import type { ReactElement } from "react";
import React from "react";
import { Navigate } from "react-router-dom";

import { authService } from "../services";

interface IProps {
  children: ReactElement;
}

const ProtectedRoute: React.FC<IProps> = ({ children }) => {
  const refreshToken = authService.getRefreshToken();
  if (refreshToken) {
    return <Navigate to={"/orders"} />;
  } else {
    return children;
  }
};

export { ProtectedRoute };
