import {FC} from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

import {IOrder} from "../../interfaces";
import {useAppDispatch} from "../../hooks";
import {DataGrid} from "@mui/x-data-grid";

interface IProps {
order: IOrder
}

const Order: FC<IProps> = ({order}) => {
    const {id, name, surname, email, phone, age, course, course_format, course_type, sum, alreadyPaid, group, created_at, status, manager } = order;
    const dispatch = useAppDispatch();
    console.log(created_at);
    // const columns = [
    //     { field: 'id', headerName: 'id', width:10 , sortable: true },
    //     { field: 'name', headerName: 'name', width: 10, sortable: true },
    //     { field: 'surname', headerName: 'surname', width: 10, sortable: true },
    //     { field: 'email', headerName: 'email', width: 10, sortable: true },
    //     { field: 'phone', headerName: 'phone', width: 10, sortable: true },
    //     { field: 'age', headerName: 'age', width:10 , sortable: true },
    //     { field: 'course', headerName: 'course', width: 10, sortable: true },
    //     { field: 'course_format', headerName: 'course_format', width:10 , sortable: true },
    //     { field: 'course_type', headerName: 'course_type', width: 10, sortable: true },
    //     { field: 'status', headerName: 'status', width: 10, sortable: true },
    //     { field: 'sum', headerName: 'sum', width:10 , sortable: true },
    //     { field: 'alreadyPaid', headerName: 'alreadyPaid', width: 10, sortable: true },
    //     { field: 'group', headerName: 'group', width: 10, sortable: true },
    //     { field: 'created_a', headerName: 'created_a', width: 10, sortable: true },
    //     { field: 'manager', headerName: 'manager', width: 10, sortable: true },
    // ];

    return (

        // <TableRow
        //     sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        // >
        //     {/*<TableCell component="th" scope="row">{id}</TableCell>*/}
        //     <TableCell align="right">{id}</TableCell>
        //     <TableCell align="right">{name}</TableCell>
        //     <TableCell align="right">{surname}</TableCell>
        //     <TableCell align="right">{email}</TableCell>
        //     <TableCell align="right">{phone}</TableCell>
        //     <TableCell align="right">{age}</TableCell>
        //     <TableCell align="right">{course}</TableCell>
        //     <TableCell align="right">{course_format}</TableCell>
        //     <TableCell align="right">{course_type}</TableCell>
        //     <TableCell align="right">{status}</TableCell>
        //     <TableCell align="right">{sum}</TableCell>
        //     <TableCell align="right">{alreadyPaid}</TableCell>
        //     <TableCell align="right">{group}</TableCell>
        //     {/*<TableCell align="right">{created_at}</TableCell>*/}
        //     <TableCell align="right">{manager}</TableCell>
        // </TableRow>
        <div></div>
    );
};

export {Order};
