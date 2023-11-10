import {FC, useEffect, useState} from 'react';
import {Link, useLocation, useSearchParams} from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import {Box, Container, CssBaseline, PaginationItem} from "@mui/material";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {orderActions} from "../../redux";
import css from '../Pagination/Pagination.module.css';
import {lightGreen} from "@mui/material/colors";


const OrderPagination: FC = () => {

    const [searchParams, setSearchParams] = useSearchParams();


    const { page, pages} = useAppSelector(state => state.orderReducer);

    const dispatch = useAppDispatch();
    const handleChange = ( num: number) => {
        // setSearchParams(params => { params.set("page", num.toString());
        //     console.log(params);
        //     return params})
         // @ts-ignore
        const currentParams = Object.fromEntries([...searchParams]);
        // console.log(currentParams);
        // setSearchParams({ page: num.toString(), ...currentParams} )
        currentParams.page = num.toString();
        currentParams.sort = searchParams.get('sort');
        console.log(currentParams);
        setSearchParams(currentParams);
    };

    const getTo = (num: number) => {
        dispatch(orderActions.setPage(num));
        searchParams.set('page', num.toString());
        console.log(searchParams);
        return { search: searchParams.toString() };
    };


    // useEffect(() => {
    //     dispatch(orderActions.setPage(+searchParams.get('page') || 1))
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
                        // onChange={(_, num:number) => handleChange(num)}
                        onChange={(_, num:number) => getTo(num)}
                        // onChange={(_, num) => dispatch(orderActions.setPage(num))}

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
        </div>
    )
};

export {OrderPagination};
