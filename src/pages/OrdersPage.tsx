import type { FC } from "react";

import { Orders } from "../components";

const OrdersPage: FC = () => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <Orders />
  </div>
);

export { OrdersPage };
