import {FC} from 'react';
import {OrderPagination, Orders, OrderUpdateForm} from "../components";

interface IProps {

}

const OrdersPage: FC<IProps> = () => {

    return (
        <div>
            <Orders/>
            <OrderPagination/>
            <OrderUpdateForm/>
        </div>
    );
};

export {OrdersPage};
