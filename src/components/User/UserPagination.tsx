import {FC, useEffect} from 'react';
import {Link, useSearchParams} from "react-router-dom";
import {Box, Container, CssBaseline, makeStyles, PaginationItem, Theme} from "@mui/material";
import Pagination from "@mui/material/Pagination";

import {useAppDispatch, useAppSelector} from "../../hooks";
import { userActions} from "../../redux";
import css from '../Pagination/Pagination.module.css';

const UserPagination: FC = () => {
    // const [searchParams, setSearchParams] = useSearchParams();
    const { page, pages} = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();


    // useEffect(() => {
    //     dispatch(userActions.setPage(+searchParams.get('page') || 1))
    // }, []);
    return  (

        <div>
            <CssBaseline />
            <Container>
                <Box py={3} display="flex" justifyContent="center">
                    {!!pages &&
                        <Pagination
                            className={css.MuiPagination}
                            count={pages}
                            page={page}
                            // onChange={(_, value) => setQuery(prev1 => ({...prev1, page: value}))}
                            onChange={(_, num) => dispatch(userActions.setPage(num))}

                            siblingCount={2}
                            boundaryCount={1}
                            hidePrevButton={page === 1}
                            hideNextButton={page === pages}
                            // renderItem={
                            //     (item) => (
                            //         <PaginationItem
                            //             component={Link} to={`/users?page=${item.page}`}
                            //             {...item}
                            //         />
                            //     )
                            // }
                        />
                    }
                </Box>
            </Container>
        </div>
    )
};

export {UserPagination};
