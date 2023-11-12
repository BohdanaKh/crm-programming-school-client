import type { FC } from "react";
import { Outlet } from "react-router-dom";

import { Header } from "../components";

const HomePage: FC = () => (
  <div>
    <Header />
    <Outlet />
  </div>
);

export { HomePage };
