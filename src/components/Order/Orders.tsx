import {FC, useEffect, useState} from 'react';
import { format } from 'date-fns';
import {DataGrid, GridColDef} from '@mui/x-data-grid';
import {useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {orderActions} from "../../redux";
import {OrdersFiltrationForm} from "./OrdersFiltrationForm";


interface IProps {

}

const Orders: FC = () => {
    const {orders, trigger, page} = useAppSelector(state => state.orderReducer);
    const dispatch = useAppDispatch();
    const [query, setQuery] = useSearchParams();
    const [sortModel, setSortModel] = useState([{ field: 'created_at', sort: 'desc'}]);

    useEffect(() => {
        setQuery(prev => ({...prev, page: '1'}))
    }, [])


    useEffect(() => {
        dispatch(orderActions.getAll(+query.get('page')))
    }, [dispatch, query])

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'id', sortable: true,  headerClassName: 'orders-header',
            headerAlign: 'center', hideSortIcons: true},
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
    // const handleSortModelChange = (newSortModel:any) => {
    //     if (newSortModel.length) {
    //         const [sort] = newSortModel;
    //         setSorting({
    //             column: sort.field,
    //             direction: sort.sort,
    //         });
    //         setQuery(prev2 => ({...prev2, sort: sort}))
    //     }}

    const handleSortModelChange = (newSortModel:any) => {
        setSortModel(newSortModel);
        const sortParam = sortModel.map((sort) => {
            const prefix = sort.sort === 'asc' ? '' : '-';
            return `${prefix}${sort.field}`;
        }).join(',');
        console.log(sortParam);
        // setQuery(prev1 => ({...prev1, sort: sortParam}))
        }
    return (
        <div>
            <OrdersFiltrationForm/>


            <div style={{ height: 400, width: '100%' }}>

                <DataGrid rowHeight={25}
                    rows={orders}
                    columns={columns}
                    className="custom-data-grid"
                          // sortModel={[
                          //     {
                          //         field: sorting.column,
                          //         sort: sorting.direction,
                          //     }
                          // ]}
                          sortModel={sortModel}
                          onSortModelChange={handleSortModelChange}
                />
            </div>

            {/*<TableContainer component={Paper}>*/}

            {/*    <Table sx={{ minWidth: 650 }} aria-label="simple table">*/}
            {/*        <TableHead>*/}
            {/*            <TableRow>*/}

            {/*                <TableCell align="center">id</TableCell>*/}
            {/*                <TableCell align="center">name</TableCell>*/}
            {/*                <TableCell align="center">surname</TableCell>*/}
            {/*                <TableCell align="center">email</TableCell>*/}
            {/*                <TableCell align="center">phone</TableCell>*/}
            {/*                <TableCell align="center">age</TableCell>*/}
            {/*                <TableCell align="center">course</TableCell>*/}
            {/*                <TableCell align="center">course_format</TableCell>*/}
            {/*                <TableCell align="center">course_type</TableCell>*/}
            {/*                <TableCell align="center">status</TableCell>*/}
            {/*                <TableCell align="center">sum</TableCell>*/}
            {/*                <TableCell align="center">alreadyPaid</TableCell>*/}
            {/*                <TableCell align="center">group</TableCell>*/}
            {/*                <TableCell align="center">created_at</TableCell>*/}
            {/*                <TableCell align="center">manager</TableCell>*/}
            {/*            </TableRow>*/}
            {/*        </TableHead>*/}
            {/*        <TableBody>*/}
            {/*            {orders.map(order => <Order key={order.id} order={order}/>)}*/}
            {/*        </TableBody>*/}
            {/*    </Table>*/}
            {/*</TableContainer>*/}
        </div>
    );
};

export {Orders};
