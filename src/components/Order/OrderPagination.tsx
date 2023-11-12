import { Box, Container, CssBaseline, PaginationItem } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import type { FC } from "react";
import { Link, useSearchParams } from "react-router-dom";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { orderActions } from "../../redux";
import css from "../Pagination/Pagination.module.css";

const OrderPagination: FC = () => {
  const [setSearchParams] = useSearchParams();

  const { page, pages } = useAppSelector((state) => state.orderReducer);

  const dispatch = useAppDispatch();
  const getTo = (num: number) => {
    dispatch(orderActions.setPage(num));
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    setSearchParams((prev) => {
      prev.set("page", num.toString());
      return prev;
    });
  };

  return (
    <div>
      <CssBaseline />
      <Container>
        <Box py={3} display="flex" justifyContent="center">
          {!!pages && (
            <Pagination
              className={css.MuiPagination}
              count={pages}
              page={page}
              onChange={(_, num: number) => {
                getTo(num);
              }}
              siblingCount={2}
              boundaryCount={1}
              hidePrevButton={page === 1}
              hideNextButton={page === pages}
              renderItem={(item) => (
                <PaginationItem
                  component={Link}
                  to={`/orders?page=${item.page}`}
                  {...item}
                />
              )}
            />
          )}
        </Box>
      </Container>
    </div>
  );
};

export { OrderPagination };
