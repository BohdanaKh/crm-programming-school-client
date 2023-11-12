import {
  Paper,
  styled,
  Table,
  TableBody,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import type { FC } from "react";
import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import type { IOrder } from "../../interfaces";
import { groupActions, orderActions } from "../../redux";
import { Order } from "./Order";
import { OrderEditModal } from "./OrderEditModal";
import { OrdersFiltrationForm } from "./OrdersFiltrationForm";

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
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof IOrder,
  ) => void;
}
interface HeadCell {
  id: keyof IOrder;
}
const headCells: readonly HeadCell[] = [
  {
    id: "id",
  },
  {
    id: "name",
  },
  {
    id: "surname",
  },
  {
    id: "email",
  },
  {
    id: "phone",
  },
  {
    id: "age",
  },
  {
    id: "course",
  },
  {
    id: "course_format",
  },
  {
    id: "course_type",
  },
  {
    id: "status",
  },
  {
    id: "sum",
  },
  {
    id: "alreadyPaid",
  },
  {
    id: "group",
  },
  {
    id: "created_at",
  },
  {
    id: "manager",
  },
];

function EnhancedTableHead(props: EnhancedTableProps) {
  const { onRequestSort } = props;
  const createSortHandler =
    (property: keyof IOrder) =>
    (event: React.MouseEvent<HTMLTableCellElement>) => {
      onRequestSort(event, property);
    };

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <StyledTableCell
            key={headCell.id}
            align={"left"}
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
  const { orders, page, trigger, params } = useAppSelector(
    (state) => state.orderReducer,
  );

  const dispatch = useAppDispatch();
  const [setSearchParams] = useSearchParams({ page: "1" });

  const { isOrderEditModalOpen } = useAppSelector(
    (state) => state.orderModalReducer,
  );

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    setSearchParams((prev) => ({ ...prev, page: "1" }));
  }, []);

  useEffect(() => {
    dispatch(groupActions.getAll());
  }, [dispatch, trigger]);

  useEffect(() => {
    dispatch(orderActions.getAll({ page, ...params }));
  }, [dispatch, page, params, trigger]);

  const handleHeaderCellClick = (
    event: React.MouseEvent<unknown, MouseEvent>,
    property: keyof IOrder,
  ) => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    setSearchParams((prev) => {
      prev.set("sort", property);
      return prev;
    });
    dispatch(orderActions.setParams({ sort: property }));
    if (params) {
      const newSort = params.sort === property ? `-${property}` : property;
      dispatch(orderActions.setParams({ sort: newSort }));

      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      setSearchParams((prev) => {
        prev.set("sort", newSort);
        return prev;
      });
    }
  };

  return (
    <TableContainer component={Paper}>
      <OrdersFiltrationForm />
      <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
        <EnhancedTableHead onRequestSort={handleHeaderCellClick} />
        <TableBody>
          {orders.map((order) => (
            <Order key={order.id} order={order} />
          ))}
        </TableBody>
      </Table>
      {isOrderEditModalOpen && <OrderEditModal />}
    </TableContainer>
  );
};

export { Orders };
