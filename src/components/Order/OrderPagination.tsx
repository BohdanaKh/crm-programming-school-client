import {FC, useState} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {Link, useLocation, useSearchParams} from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import {Box, Container, CssBaseline, PaginationItem} from "@mui/material";
import {orderActions} from "../../redux";


const OrderPagination: FC = (props) => {
    console.log(props);
    const location = useLocation();
    console.log(location);
    const [page, setPage ] = useState<number>(+location.search?.split('=')[1] || 1)
    const { pages, totalOrders} = useAppSelector(state => state.orderReducer);
    // const [_, setQuery] = useSearchParams();
    // const dispatch = useAppDispatch();
    // const handleChange = ( event: React.ChangeEvent<unknown>, selectedPage: number) => {
    //     setQuery(prev1 =>( {...prev1, page: selectedPage}));
    // };


    return  (

        <div>
            <CssBaseline />
            <Container>
                <Box py={3} display="flex" justifyContent="center">
                    {!!pages &&
                    <Pagination
                        count={pages}
                        page={page}
                        color="secondary"
                        variant="outlined"
                        // onChange={(_, value) => setQuery(prev1 => ({...prev1, page: value}))}
                        onChange={(_, num) => setPage(num)}

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
