import {FC, useEffect, useState} from 'react';
import { format } from 'date-fns';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {groupActions, orderActions} from "../../redux";
import {OrdersFiltrationForm} from "./OrdersFiltrationForm";
import {Autocomplete, Container, Table, TableBody, TableContainer, TableHead, TableRow, TextField} from "@mui/material";
import Paper from "@mui/material/Paper";
import TableCell from "@mui/material/TableCell";




const datagridSx = {
    borderRadius: 2,
    "& .MuiDataGrid-main": { borderRadius: 2 },
    "& .MuiDataGrid-virtualScrollerRenderZone": {
        "& .MuiDataGrid-row": {
            "&:nth-child(2n)": { backgroundColor: "rgba(235, 235, 235, .7)" }
        }
    },
    "& .MuiDataGrid-columnHeaders": {
        backgroundColor: "rgba(0,255,0,0.3)",
        fontSize: 12
    }
};

const Orders: FC = () => {
    const {orders, trigger, page, sort, name} = useAppSelector(state => state.orderReducer);
    const { groups } = useAppSelector(state => state.groupReducer)
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();
    // const queryParams = new URLSearchParams(location.search);
    // const [sortModel, setSortModel] = useState([{ field: 'created_at', sort: 'desc'}]);

    useEffect(() => {
        setSearchParams(prev => ({...prev, page: '1'}))
    }, [])

    // @ts-ignore
    // console.log(Object.fromEntries([...searchParams]));
    useEffect(() => {
        // @ts-ignore
        const currentParams = Object.fromEntries([...searchParams]);
        console.log(currentParams);
      
        dispatch(orderActions.getAll(currentParams))
    }, [dispatch, searchParams]);
    // }, [dispatch, query])

    // useEffect(() => {
    //     dispatch(groupActions.getAll())
    // }, [])
    // console.log(groups);

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'id', sortable: true,  headerClassName: 'orders-header',
            headerAlign: 'center', },
        { field: 'name', headerName: 'name', sortable: true, headerClassName: 'orders-header',
            headerAlign: 'center' },
        { field: 'surname', headerName: 'surname', sortable: true, headerClassName: 'orders-header',
            headerAlign: 'center' },
        { field: 'email', headerName: 'email', sortable: true, headerClassName: 'orders-header',
            headerAlign: 'center' },
        { field: 'phone', headerName: 'phone', sortable: true, headerClassName: 'orders-header',
            headerAlign: 'center' },
        { field: 'age', headerName: 'age' , sortable: true, headerClassName: 'orders-header',
            headerAlign: 'center' },
        { field: 'course', headerName: 'course', sortable: true, headerClassName: 'orders-header',
            headerAlign: 'center' },
        { field: 'course_format', headerName: 'course_format', sortable: true, headerClassName: 'orders-header',
            headerAlign: 'center' },
        { field: 'course_type', headerName: 'course_type', sortable: true, headerClassName: 'orders-header',
            headerAlign: 'center' },
        { field: 'status', headerName: 'status', sortable: true, headerClassName: 'orders-header',
            headerAlign: 'center' },
        { field: 'sum', headerName: 'sum', sortable: true, headerClassName: 'orders-header',
            headerAlign: 'center' },
        { field: 'alreadyPaid', headerName: 'alreadyPaid',  sortable: true, headerClassName: 'orders-header',
            headerAlign: 'center' },
        { field: 'group', headerName: 'group', sortable: true, headerClassName: 'orders-header',
            headerAlign: 'center' },
        { field: 'created_at', headerName: 'created_at', sortable: true, headerClassName: 'orders-header',
            headerAlign: 'center', valueGetter: (params) => {
                const originalDate = params.row.created_at;
                return originalDate;
            },
            valueFormatter: (params) => {
                const originalDate = params.value;
                const formattedDate = format(new Date(originalDate), 'MMMM dd, yyyy');
                return formattedDate;
            }, },
        { field: 'manager', headerName: 'manager', sortable: true, headerClassName: 'orders-header',
            headerAlign: 'center' },
    ];
        const handleHeaderCellClick = (column:any) => {
            dispatch(orderActions.setSort(column.field));
            const newSort =
                // sort === `-${column.field}` ? column.field : `-${column.field}`;
                sort === column.field ? `-${column.field}` : column.field;
            dispatch(orderActions.setSort(newSort)); // Replace with your actual action and payload
            setSearchParams(prev => ({...prev, page: page, sort: newSort}))
        }

    // const handleSortModelChange = (newSortModel:any) => {
    //     setSortModel(newSortModel);
    //     const sortParam = sortModel.map((sort) => {
    //         const prefix = sort.sort === 'asc' ? '' : '-';
    //         return `${prefix}${sort.field}`;
    //     }).join(',');
    //     console.log(sortParam);
        // setQuery(prev1 => ({...prev1, sort: sortParam}))
        // }

    // const all_groups = groups.map(group => group.title);

    return (
        <Container>
            <OrdersFiltrationForm/>

            <div style={{ height: 700, width: "100%" }}>
                <DataGrid
                    columnHeaderHeight={30}
                    rowHeight={20}
                    sx={datagridSx}
                    rows={orders}
                    autoPageSize={true}
                    columns={columns}
                    onColumnHeaderClick={handleHeaderCellClick}
                />
                          {/* // onRowClick={handleRowClick}*/}
                          {/*// sortModel={[*/}
                          {/*//     {*/}
                          {/*//         field: sorting.column,*/}
                          {/*//         sort: sorting.direction,*/}
                          {/*//     }*/}
                          {/*// ]}*/}
                          {/*// sortModel={sortModel}*/}
                          {/*// onSortModelChange={handleSortModelChange}*/}
             </div>

       {/*<TableContainer component={Paper}>*/}

       {/*         <Table sx={{ minWidth: 650 }} aria-label="simple table">*/}
       {/*             <TableHead sx={{ background:'green', padding:0, height: '10px' }}>*/}
       {/*                 <TableRow >*/}

       {/*                     <TableCell align="center" onClick={}>id</TableCell>*/}
       {/*                     <TableCell align="center">name</TableCell>*/}
       {/*                     <TableCell align="center">surname</TableCell>*/}
       {/*                     <TableCell align="center">email</TableCell>*/}
       {/*                     <TableCell align="center">phone</TableCell>*/}
       {/*                     <TableCell align="center">age</TableCell>*/}
       {/*                     <TableCell align="center">course</TableCell>*/}
       {/*                     <TableCell align="center">course_format</TableCell>*/}
       {/*                     <TableCell align="center">course_type</TableCell>*/}
       {/*                     <TableCell align="center">status</TableCell>*/}
       {/*                     <TableCell align="center">sum</TableCell>*/}
       {/*                     <TableCell align="center">alreadyPaid</TableCell>*/}
       {/*                     <TableCell align="center">group</TableCell>*/}
       {/*                     <TableCell align="center">created_at</TableCell>*/}
       {/*                     <TableCell align="center">manager</TableCell>*/}
       {/*                 </TableRow>*/}
       {/*             </TableHead>*/}
       {/*             <TableBody   sx={{*/}
       {/*                 "& tr:nth-of-type(2n+1)": {*/}
       {/*                     backgroundColor: "grey.100",*/}
       {/*                 },*/}
       {/*             }}>*/}
       {/*                 {orders.map(order => <TableRow*/}
       {/*                         sx={{ '&:last-child td, &:last-child th': { border: 0 } }} key={order.id}*/}
       {/*                     >*/}
       {/*                         <TableCell align="right">{order.id}</TableCell>*/}
       {/*                         <TableCell align="right">{order.name}</TableCell>*/}
       {/*                         <TableCell align="right">{order.surname}</TableCell>*/}
       {/*                         <TableCell align="right">{order.email}</TableCell>*/}
       {/*                         <TableCell align="right">{order.phone}</TableCell>*/}
       {/*                         <TableCell align="right">{order.age}</TableCell>*/}
       {/*                         <TableCell align="right">{order.course}</TableCell>*/}
       {/*                         <TableCell align="right">{order.course_format}</TableCell>*/}
       {/*                         <TableCell align="right">{order.course_type}</TableCell>*/}
       {/*                         <TableCell align="right">{order.status}</TableCell>*/}
       {/*                         <TableCell align="right">{order.sum}</TableCell>*/}
       {/*                         <TableCell align="right">{order.alreadyPaid}</TableCell>*/}
       {/*                         <TableCell align="right">{order.group}</TableCell>*/}
       {/*                         <TableCell align="right">{format(new Date(order.created_at), 'MMMM dd, yyyy')}</TableCell>*/}
       {/*                         <TableCell align="right">{order.manager}</TableCell>*/}
       {/*                     </TableRow>*/}
       {/*                 )}*/}
       {/*             </TableBody>*/}
       {/*         </Table>*/}
       {/*     </TableContainer>*/}
        </Container>
    )
}

export {Orders};
