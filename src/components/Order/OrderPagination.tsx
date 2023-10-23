import {useSearchParams} from "react-router-dom";

import {useAppSelector} from "../../hooks";

const OrderPagination = () => {
    const {page, pages, totalOrders} = useAppSelector(state => state.orderReducer);
    const [,setQuery] = useSearchParams();
    const prev = () => {
        setQuery(prev1 => ({...prev1, page:+prev1.get('page')-1}))
    }
    const next = ()=>{
        setQuery(prev1 => ({...prev1, page:+prev1.get('page')+1}))
    }
    return (
        <div>
            <button disabled={(page===1)} onClick={prev}>prev</button>
            <button disabled={(page===pages)} onClick={next}>next</button>
        </div>
    );
};

export {OrderPagination};
