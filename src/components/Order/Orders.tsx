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
import { OrderPagination } from "./OrderPagination";
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
  const { orders, trigger, errors } = useAppSelector(
    (state) => state.orderReducer,
  );
  const { trigger1 } = useAppSelector((state) => state.groupReducer);
  const dispatch = useAppDispatch();

  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });

  const { isOrderEditModalOpen } = useAppSelector(
    (state) => state.orderModalReducer,
  );

  useEffect(() => {
    dispatch(groupActions.getAll());
  }, [dispatch, trigger1]);

  useEffect(() => {
    dispatch(
      orderActions.getAll(
        // page: +searchParams.get("page"),
        Object.fromEntries(searchParams),
      ),
    );
  }, [dispatch, searchParams, trigger]);

  const handleHeaderCellClick = (
    event: React.MouseEvent<unknown, MouseEvent>,
    property: keyof IOrder,
  ) => {
    if (
      !searchParams.get("sort") ||
      searchParams.get("sort").startsWith("-") ||
      searchParams.get("sort") !== property
    ) {
      setSearchParams((prev) => {
        prev.set("page", "1");
        prev.set("sort", property);
        return prev;
      });
    } else {
      setSearchParams((prev) => {
        prev.set("page", "1");
        prev.set("sort", `-${property}`);
        return prev;
      });
    }
  };

  return (
    <>
      {errors && (
        <p style={{ fontSize: "18px", color: "coral", textAlign: "center" }}>
          {errors.message}
        </p>
      )}
      <TableContainer component={Paper}>
        <OrdersFiltrationForm />
        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
          <EnhancedTableHead onRequestSort={handleHeaderCellClick} />
          <TableBody>
            {orders?.map((order) => <Order key={order.id} order={order} />)}
          </TableBody>
        </Table>
        {isOrderEditModalOpen && <OrderEditModal />}
      </TableContainer>
      {orders && <OrderPagination />}
    </>
  );
};

export { Orders };
