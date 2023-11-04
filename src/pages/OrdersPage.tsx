import {FC} from 'react';
import {OrderPagination, Orders, OrderEditModal} from "../components";

interface IProps {

}

const OrdersPage: FC<IProps> = () => {

    return (
        <div style={{ display: "flex", flexDirection: "column"}}>
            <Orders/>
            <OrderPagination/>
        </div>
    );
};

export {OrdersPage};
