import {FC, useEffect, useState} from 'react';
import {Link, useLocation, useSearchParams} from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import {Box, Container, CssBaseline, PaginationItem} from "@mui/material";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {orderActions} from "../../redux";
import css from '../Pagination/Pagination.module.css';
import {lightGreen} from "@mui/material/colors";


const OrderPagination: FC = (props) => {
    // console.log(props);
    // const location = useLocation();
    // console.log(location);
    const [searchParams, setSearchParams] = useSearchParams();

    // const [page, setPage ] = useState<number>(+searchParams.get('page') || 1)
    const { page, pages} = useAppSelector(state => state.orderReducer);
    // const [_, setQuery] = useSearchParams();
    const dispatch = useAppDispatch();
    // const handleChange = ( num: number) => {
    //     const selectedPage = num.toString();
    //     // @ts-ignore
    //     const currentParams = Object.fromEntries([...searchParams]);
    //     setSearchParams({ ...currentParams, page: selectedPage} )
    //
    //     setPage(num);
    //
    // };

    useEffect(() => {
        dispatch(orderActions.setPage(+searchParams.get('page') || 1))
    }, []);
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
                        onChange={(_, num) => dispatch(orderActions.setPage(num))}

                        siblingCount={2}
                        boundaryCount={1}
                        hidePrevButton={page === 1}
                        hideNextButton={page === pages}
                        renderItem={
                            (item) => (
                                <PaginationItem
                                    component={Link} to={`/orders?page=${item.page}`}
                                    {...item}
                                    />
                            )
                            }
                    />
                        }
                </Box>
            </Container>
            {/*<Pagination count={pages} page={page} onChange={handleChange} variant="outlined" siblingCount={7} boundaryCount={1} />*/}
        </div>
    )
};

export {OrderPagination};
