import type { FC, ReactElement } from "react";
import { Navigate } from "react-router-dom";

import { authService } from "../services";

interface IProps {
  children: ReactElement;
  roles: string[];
}

const RequiredAuth: FC<IProps> = ({ children, roles }) => {
  const accessToken = authService.getAccessToken();
  const me = JSON.parse(localStorage.getItem("me"));
  const canAccess = roles.includes(me?.role);
  if (!accessToken) {
    return <Navigate to={"/login"} />;
  }
  if (!canAccess) {
    return <div>You do not have roles to access this route</div>;
  } else {
    return children;
  }
};

export { RequiredAuth };
