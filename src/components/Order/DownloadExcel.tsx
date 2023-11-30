import { format } from "date-fns";
import type { FC } from "react";
import { useSearchParams } from "react-router-dom";
import * as XLSX from "xlsx";

import { useAppSelector } from "../../hooks";
import { orderService } from "../../services";

const DownloadExcel: FC = () => {
  const [searchParams] = useSearchParams();
  const { totalOrders } = useAppSelector((state) => state.orderReducer);
  const { page, ...existingParams } = Object.fromEntries(searchParams);
  const newParams = { limit: totalOrders, ...existingParams };

  const handleDownload = async () => {
    await orderService
      .getAll(newParams)
      .then((value) => value.data)
      .then((value) => {
        const rows = value?.entities?.map((order) => ({
          id: order.id,
          name: order.name,
          surname: order.surname,
          email: order.email,
          phone: order.phone,
          age: order.age,
          course: order.course,
          course_format: order.course_format,
          course_type: order.course_type,
          status: order.status,
          sum: order.sum,
          alreadyPaid: order.alreadyPaid,
          group: order.group,
          created_at: format(new Date(order.created_at), "MMMM dd, yyyy"),
          manager: order.manager,
        }));
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(rows);

        XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

        // customize header names
        XLSX.utils.sheet_add_aoa(worksheet, [
          [
            "Order ID",
            "Name",
            "Surname",
            "Email",
            "Phone",
            "Age",
            "Course",
            "Course format",
            "Course type",
            "Status",
            "Sum",
            "Already paid",
            "Group",
            "Created at",
            "Manager",
          ],
        ]);
        XLSX.writeFile(workbook, "Orders.xlsx", {
          compression: true,
        });
      });
  };

  return (
    <button
      onClick={handleDownload}
      style={{ backgroundColor: "green", border: "none" }}
    >
      <i className="fas fa-file-excel" style={{ color: "white" }} />
    </button>
  );
};

export { DownloadExcel };
