import type { FC } from "react";
import { Outlet } from "react-router-dom";

import { AdminPanel } from "../components";

const AdminPage: FC = () => (
  <div>
    <AdminPanel />
    <Outlet />
  </div>
);

export { AdminPage };
