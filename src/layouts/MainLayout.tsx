import type { FC } from "react";
import { Outlet } from "react-router-dom";

const MainLayout: FC = () => (
  <div>
    <Outlet />
  </div>
);

export { MainLayout };
