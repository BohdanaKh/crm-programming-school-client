import { Box, Container, CssBaseline } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import type { FC } from "react";
import { useSearchParams } from "react-router-dom";

import { useAppSelector } from "../../hooks";
import css from "../Pagination/Pagination.module.css";

const OrderPagination: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams({ page: "1" });

  const { pages } = useAppSelector((state) => state.orderReducer);

  // const dispatch = useAppDispatch();
  const getTo = (num: number) => {
    // dispatch(orderActions.setPage(num));
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
              page={+searchParams.get("page")}
              onChange={(_, num: number) => {
                getTo(num);
              }}
              siblingCount={2}
              boundaryCount={1}
              hidePrevButton={+searchParams.get("page") === 1}
              hideNextButton={+searchParams.get("page") === pages}
            />
          )}
        </Box>
      </Container>
    </div>
  );
};

export { OrderPagination };
