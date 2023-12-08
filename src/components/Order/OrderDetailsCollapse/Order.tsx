import { Box, Button, Collapse, TableCell, TableRow } from "@mui/material";
import { addMinutes, format } from "date-fns";
import type { FC } from "react";
import React, { useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import type { IComment, IOrder } from "../../../interfaces";
import {
  commentActions,
  orderActions,
  orderModalActions,
} from "../../../redux";
import { Comment } from "../../Comment/Comment";
import { StyledTableCell } from "../Orders";
import css from "./Details.module.css";

interface IProps {
  order: IOrder;
}

const Order: FC<IProps> = ({ order }) => {
  const [open, setOpen] = useState<boolean>(false);
  const { comments } = order;

  const { me } = useAppSelector((state) => state.authReducer);
  const dispatch = useAppDispatch();
  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<IComment>({
    mode: "all",
  });
  const createComment: SubmitHandler<IComment> = async (comment: IComment) => {
    await dispatch(commentActions.create({ orderId: order.id, comment }));
    dispatch(orderActions.setTrigger());
    reset();
  };

  const visibleComments = comments.slice(-3);
  const handleEdit = (order: IOrder) => {
    dispatch(orderActions.setOrderForUpdate(order));
    dispatch(orderModalActions.openOrderEditModal());
  };
  // const date = new Date(order.created_at);
  // const newDate = addMinutes(new Date(order.created_at), new Date(order.created_at).getTimezoneOffset());

  return (
    <React.Fragment>
      <TableRow
        hover
        onClick={() => {
          setOpen(!open);
        }}
      >
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
        <StyledTableCell align="left">
          {/* {format(new Date(order.created_at), "MMMM dd, yyyy")} */}
          {format(
            addMinutes(
              new Date(order.created_at),
              new Date(order.created_at).getTimezoneOffset(),
            ),
            "MMMM dd, yyyy",
          )}
        </StyledTableCell>
        <StyledTableCell align="left">{order.manager}</StyledTableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={15}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box className={css.detailsBlock} sx={{ margin: 1 }}>
              <div className={css.message}>
                Message:
                {order.msg && <div>{order.msg}</div>}
              </div>
              <div className={css.utm}>
                utm:
                {order.utm && <div>{order.utm} </div>}
              </div>
              <div className={css.comment}>
                {visibleComments?.map((comment) => (
                  <Comment key={comment.id} item={comment} />
                ))}
                <form onSubmit={handleSubmit(createComment)}>
                  <input
                    type="text"
                    placeholder={"comment"}
                    {...register("comment", {
                      minLength: 1,
                      required: {
                        value: true,
                        message: "Comment must be not empty",
                      },
                    })}
                  />
                  {errors.comment && <span>{errors.comment.message}</span>}
                  <Button
                    type={"submit"}
                    variant="contained"
                    color="success"
                    disabled={!!order.manager && order.managerId !== me?.id}
                  >
                    Submit
                  </Button>
                </form>
              </div>
              <Button
                variant="contained"
                color="success"
                disabled={!!order.manager && order.managerId !== me?.id}
                onClick={() => {
                  handleEdit(order);
                }}
              >
                Edit
              </Button>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
};

export { Order };
