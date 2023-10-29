import {FC} from 'react';
import {useAppSelector} from "../../hooks";
import {useSearchParams} from "react-router-dom";
import Pagination from '@mui/material/Pagination';
import {Box, Container, CssBaseline} from "@mui/material";

interface IProps {

}

const OrderPagination: FC<IProps> = () => {
    const {page, pages, totalOrders} = useAppSelector(state => state.orderReducer);
    const [_, setQuery] = useSearchParams();
    // const handleChange = ( event: React.ChangeEvent<unknown>, selectedPage: number) => {
    //     setQuery(prev1 =>( {...prev1, page: selectedPage}));
    // };


    return  (

        <div>
            <CssBaseline />
            <Container>
                <Box py={3} display="flex" justifyContent="center">
                    <Pagination
                        count={pages}
                        page={page}
                        color="secondary"
                        variant="outlined"
                        onChange={(e, value) => setQuery(prev1 =>( {...prev1, page:value}))}

                        siblingCount={2}
                        boundaryCount={1}
                        hidePrevButton={page === 1}
                        hideNextButton={page === pages}
                    />
                </Box>
            </Container>
            {/*<Pagination count={pages} page={page} onChange={handleChange} variant="outlined" siblingCount={7} boundaryCount={1} />*/}
        </div>
    )
};

export {OrderPagination};
