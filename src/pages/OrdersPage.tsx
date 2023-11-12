import type { FC } from "react";

import { OrderPagination, Orders } from "../components";

const OrdersPage: FC = () => (
  <div style={{ display: "flex", flexDirection: "column" }}>
    <Orders />
    <OrderPagination />
  </div>
);

export { OrdersPage };
