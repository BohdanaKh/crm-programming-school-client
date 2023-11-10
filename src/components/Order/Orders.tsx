import React, {FC, useEffect, useState} from 'react';
import {useLocation, useNavigate, useSearchParams} from "react-router-dom";
import {
    Paper, styled,
    Table,
    TableBody,
    TableCell,
    tableCellClasses,
    TableContainer,
    TableHead,
    TableRow
} from "@mui/material";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {groupActions, orderActions } from "../../redux";
import {OrdersFiltrationForm} from "./OrdersFiltrationForm";
import { Order} from "./Order";
import {IOrder} from "../../interfaces";
import {OrderEditModal} from "./OrderEditModal";



export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.success.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
    },
}));


interface EnhancedTableProps {
    onRequestSort: (event: React.MouseEvent<unknown>, property: keyof IOrder) => void;
}
interface HeadCell {
    id: keyof IOrder;
}
const headCells: readonly HeadCell[] = [
    {
        id: 'id',
    },
    {
        id: 'name',

    },
    {
        id:'surname'
    },
     {
        id:'email'
    },
     {
        id:'phone'
    },
     {
        id:'age'
    },
     {
        id:'course'
    },
     {
        id:'course_format'
    },
     {
        id:'course_type'
    },
     {
        id:'status'
    },
     {
        id:'sum'
    },
     {
        id:'alreadyPaid'
    },
     {
        id:'group'
    },
     {
        id:'created_at'
    },
    {
        id:'manager'
    },
];

function EnhancedTableHead(props: EnhancedTableProps) {
    const { onRequestSort } = props;
    const createSortHandler =
        (property: keyof IOrder) => (event: React.MouseEvent<HTMLTableCellElement>) => {
            onRequestSort(event, property);
        };

    return (
        <TableHead>
            <TableRow>
                {headCells.map((headCell) => (
                    <StyledTableCell
                        key={headCell.id}
                        align={'left'}
                        onClick={createSortHandler(headCell.id)}
                    >
                        {headCell.id}
                    </StyledTableCell>
                ))}
            </TableRow>
        </TableHead>
    );
}

const Orders: FC = () => {
    const {orders, page,  trigger, params} = useAppSelector(state => state.orderReducer);
    const { groups } = useAppSelector(state => state.groupReducer)
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams({page: '1'});

    // const location = useLocation();
    // const navigate = useNavigate();
    // const queryParams = new URLSearchParams(location.search);
    // const [sortModel, setSortModel] = useState('');
    const {isOrderEditModalOpen} = useAppSelector(state => state.orderModalReducer);


    useEffect(() => {
        setSearchParams(prev => ({...prev, page: '1'}))
    }, [])


    useEffect(() => {
        dispatch(groupActions.getAll())
    }, [dispatch])

    // useEffect(() => {
    //     // @ts-ignore
    //     const currentParams = Object.fromEntries([...searchParams]);
    //     dispatch(orderActions.getAll(currentParams))
    //
    // }, [dispatch, searchParams]);

    useEffect(() => {
        dispatch(orderActions.getAll({page, ...params}))
    }, [dispatch, page, params])




        // const handleHeaderCellClick = ( event: React.MouseEvent<HTMLTableCellElement>,
        //                                 property: keyof IOrder,) => {
        //    setSortModel(property);
        //     const newSort =
        //         // sort === `-${column.field}` ? column.field : `-${column.field}`;
        //         sortModel === property ? `-${property}` : property;
        //    setSortModel(newSort);
        //
        //     // // @ts-ignore
        //     // const currentParams = Object.fromEntries([...searchParams]);
        //     // setSearchParams({...currentParams, sort: newSort} )
        //
        //         setSearchParams(params => { params.set("sort", newSort);
        //             return params})
        //
        //
        // }



    const handleHeaderCellClick =  ( event: React.MouseEvent<HTMLTableCellElement>,
                                    property: keyof IOrder,) => {
     dispatch(orderActions.setParams({sort: property}));
       if ( params ) {
            const newSort =
                params.sort === property ? `-${property}` : property;
            dispatch(orderActions.setParams({sort: newSort})
    )
        ;
        // // @ts-ignore
        // const currentParams = Object.fromEntries([...searchParams]);
        // setSearchParams({...currentParams, sort: newSort} )

        setSearchParams(params => {
            params.set("sort", newSort);
            return params
        });
    }


    }



    return (
            <TableContainer component={Paper}>
                <OrdersFiltrationForm/>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table" >
    {/*// @ts-ignore*/}
                    <EnhancedTableHead  onRequestSort={handleHeaderCellClick}>
                        {/*<TableRow>*/}
                        {/*    <StyledTableCell align="left">id</StyledTableCell>*/}
                        {/*    <StyledTableCell align="left">name</StyledTableCell>*/}
                        {/*    <StyledTableCell align="left">surname</StyledTableCell>*/}
                        {/*    <StyledTableCell align="left">email</StyledTableCell>*/}
                        {/*    <StyledTableCell align="left">phone</StyledTableCell>*/}
                        {/*    <StyledTableCell align="left">age</StyledTableCell>*/}
                        {/*    <StyledTableCell align="left">course</StyledTableCell>*/}
                        {/*    <StyledTableCell align="left">course_format</StyledTableCell>*/}
                        {/*    <StyledTableCell align="left">course_type</StyledTableCell>*/}
                        {/*    <StyledTableCell align="left">status</StyledTableCell>*/}
                        {/*    <StyledTableCell align="left">sum</StyledTableCell>*/}
                        {/*    <StyledTableCell align="left">alreadyPaid</StyledTableCell>*/}
                        {/*    <StyledTableCell align="left">group</StyledTableCell>*/}
                        {/*    <StyledTableCell align="left">created_at</StyledTableCell>*/}
                        {/*    <StyledTableCell align="left">manager</StyledTableCell>*/}
                        {/*</TableRow>*/}
                    </EnhancedTableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <Order key={order.id} order={order} />
                        ))}
                    </TableBody>
                </Table>
                {isOrderEditModalOpen && <OrderEditModal />}
            </TableContainer>
    )
}

export {Orders};
