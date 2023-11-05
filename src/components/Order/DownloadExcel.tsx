import {FC} from 'react';
import * as XLSX from "xlsx";

import {useAppSelector} from "../../hooks";


const DownloadExcel: FC = () => {
const { orders } = useAppSelector(state => state.orderReducer);
    const handleDownload = () => {
        const rows = orders.map((order) => ({
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
            created_at: order.created_at,
            manager: order.manager,
        }));
        const workbook = XLSX.utils.book_new();
        const worksheet = XLSX.utils.json_to_sheet(rows);

        XLSX.utils.book_append_sheet(workbook, worksheet, "Orders");

        // customize header names
        XLSX.utils.sheet_add_aoa(worksheet, [
            ["Order ID", "Name", "Surname", "Email", "Phone", "Age", "Course", "Course format", "Course type", "Status", "Sum", "Already paid", "Group", "Created at", "Manager" ],
        ]);

        XLSX.writeFile(workbook, "Orders.xlsx", { compression: true });
    };
    return (
        <div>
            <button onClick={handleDownload}>DOWNLOAD EXCEL</button>
        </div>
    );
};

export {DownloadExcel};
