import {FC, useEffect, useState} from 'react';
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
import { orderActions} from "../../redux";
import {OrdersFiltrationForm} from "./OrdersFiltrationForm";
import { Order} from "./Order";


export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.success.main,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 12,
    },
}));



const Orders: FC = () => {
    const {orders, trigger, page, sort, name} = useAppSelector(state => state.orderReducer);
    const { groups } = useAppSelector(state => state.groupReducer)
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();
    const location = useLocation();
    const navigate = useNavigate();
    // const queryParams = new URLSearchParams(location.search);
    // const [sortModel, setSortModel] = useState([{ field: 'created_at', sort: 'desc'}]);

    const [expandedRowId, setExpandedRowId] = useState<number>(null);

    // const getDetailPanelContent = useCallback(
    //     ({ row }: GridRowParams) => <DetailPanelContent row={row} />,
    //     [],
    // );

    // const getDetailPanelHeight = useCallback(() => 240, []);


    useEffect(() => {
        setSearchParams(prev => ({...prev, page: '1'}))
    }, [])

    useEffect(() => {
        // @ts-ignore
        const currentParams = Object.fromEntries([...searchParams]);
      
        dispatch(orderActions.getAll(currentParams))
    }, [dispatch, searchParams]);
    // }, [dispatch, query])

    // useEffect(() => {
    //     dispatch(groupActions.getAll())
    // }, [])
    // console.log(groups);


        const handleHeaderCellClick = (column:any) => {
            dispatch(orderActions.setSort(column.field));
            const newSort =
                // sort === `-${column.field}` ? column.field : `-${column.field}`;
                sort === column.field ? `-${column.field}` : column.field;
            dispatch(orderActions.setSort(newSort));
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

    // const handleDetailClick = (event:any) => {
    //     const rowId = event.currentTarget.getAttribute('data-row-id');
    //     if (expandedRowId === rowId) {
    //         setExpandedRowId(null); // Close the detail view
    //     } else {
    //         setExpandedRowId(rowId); // Open the detail view for the clicked row
    //     }
    //     setOpen(!open)
    // };

        return (
            <TableContainer component={Paper}>
                <OrdersFiltrationForm/>
                <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                    <TableHead>
                        <TableRow>
                            <StyledTableCell align="left">id</StyledTableCell>
                            <StyledTableCell align="left">name</StyledTableCell>
                            <StyledTableCell align="left">surname</StyledTableCell>
                            <StyledTableCell align="left">email</StyledTableCell>
                            <StyledTableCell align="left">phone</StyledTableCell>
                            <StyledTableCell align="left">age</StyledTableCell>
                            <StyledTableCell align="left">course</StyledTableCell>
                            <StyledTableCell align="left">course_format</StyledTableCell>
                            <StyledTableCell align="left">course_type</StyledTableCell>
                            <StyledTableCell align="left">status</StyledTableCell>
                            <StyledTableCell align="left">sum</StyledTableCell>
                            <StyledTableCell align="left">alreadyPaid</StyledTableCell>
                            <StyledTableCell align="left">group</StyledTableCell>
                            <StyledTableCell align="left">created_at</StyledTableCell>
                            <StyledTableCell align="left">manager</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order) => (
                            <Order key={order.id} order={order} />
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
    )
}

export {Orders};
