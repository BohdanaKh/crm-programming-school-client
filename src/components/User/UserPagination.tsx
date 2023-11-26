import { Box, Container, CssBaseline } from "@mui/material";
import Pagination from "@mui/material/Pagination";
import type { FC } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { userActions } from "../../redux";
import css from "../PaginationStyles/Pagination.module.css";

const UserPagination: FC = () => {
  const { page, pages } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

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
              onChange={(_, num) => dispatch(userActions.setPage(num))}
              siblingCount={2}
              boundaryCount={1}
              hidePrevButton={page === 1}
              hideNextButton={page === pages}
            />
          )}
        </Box>
      </Container>
    </div>
  );
};

export { UserPagination };
