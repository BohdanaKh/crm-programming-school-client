import React from 'react';
import {FC, useState} from 'react';
import {SubmitHandler, useForm} from "react-hook-form";
import {format} from "date-fns";
import {Box, Button, Collapse, createStyles, TableCell, TableRow, Theme, withStyles} from "@mui/material";
import styled from "@emotion/styled";



import {IComment, IOrder} from "../../interfaces";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {commentActions, orderActions, orderModalActions} from "../../redux";
import {Comment} from "../Comment/Comment";
import { StyledTableCell } from './Orders';
import { OrderEditModal} from "./OrderEditModal";


interface IProps {
order: IOrder,
}

const Order: FC<IProps> =  ({order}) =>  {
    const [ open, setOpen ] = useState<boolean>(false);


    // const id = Number(rowId);
    // const detailOrder = useAppSelector((state) => state.orderReducer.orders.find((item) => item.id === id));



    // const detailState = useAppSelector((state) => state.detailReducer);
    const {comment} = useAppSelector(state => state.commentReducer);
    // const commentManager = useAppSelector((state) => state.userReducer.users.find((user) => user.id === comment.managerId ))
    const dispatch = useAppDispatch();
    const {reset, handleSubmit, register, setValue} = useForm<IComment>();
    const createComment:SubmitHandler<IComment> = async (comment:IComment) => {
      const newComment =  await dispatch(commentActions.create({orderId: order.id, comment} ));
       // order.comments.push(newComment);
       reset();
    };

    const handleEdit = (order: IOrder) => {
       dispatch(orderActions.setOrderForUpdate(order));
        dispatch(orderModalActions.openOrderEditModal())

    };
    // const handleCloseDetail = () => {
    //     dispatch(detailActions.closeDetail());
    // }
    // if (!detailState.open) {
    //     return null;
    // }

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
     <React.Fragment>
         <TableRow hover onClick={() => setOpen(!open)}>
         <StyledTableCell component="th" scope="row">
             {order.id}
         </StyledTableCell>
         <StyledTableCell align="left">{order.name}</StyledTableCell>
         <StyledTableCell align="left">{order.surname}</StyledTableCell>
         <StyledTableCell align="left">{order.email}</StyledTableCell>
         <StyledTableCell align="left">{order.phone}</StyledTableCell>
         <StyledTableCell align="left">{order.age}</StyledTableCell>
         <StyledTableCell align="left">{order.course}</StyledTableCell>
         <StyledTableCell align="left">{order.course_format}</StyledTableCell>
         <StyledTableCell align="left">{order.course_type}</StyledTableCell>
         <StyledTableCell align="left">{order.status}</StyledTableCell>
         <StyledTableCell align="left">{order.sum}</StyledTableCell>
         <StyledTableCell align="left">{order.alreadyPaid}</StyledTableCell>
         <StyledTableCell align="left">{order.group}</StyledTableCell>
         <StyledTableCell align="left">{format(new Date(order.created_at), 'MMMM dd, yyyy')}</StyledTableCell>
         <StyledTableCell align="left">{order.manager}</StyledTableCell>
     </TableRow>
         <TableRow>
             <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                 <Collapse in={open} timeout="auto" unmountOnExit>
                     <Box sx={{ margin: 1 }}>
    Message:
            { order.msg &&
         <div>{order.msg}</div>}
     utm:
            { order.utm &&
            <div>{order.utm} </div>}
            {  order.comments &&

                order.comments.map((item) => <Comment key={item.id} item={item}/>)}
            <form onSubmit={handleSubmit(createComment)}>
                <input type="text" placeholder={'comment'} {...register('comment')} />
            <Button variant="contained" color="primary" >
                Submit
            </Button>
            </form>
            <Button variant="contained" color="primary" onClick={() => handleEdit(order)}>
                Edit
            </Button>
            {/*<Button variant="contained" color="secondary" onClick={handleCloseDetail}>*/}
            {/*    Close*/}
            {/*</Button>*/}
                     </Box>
                 </Collapse>
             </TableCell>
         </TableRow>
     </React.Fragment>
    );
};

export {Order};
