import {FC} from 'react';
import { Orders, OrderUpdateForm} from "../components";

interface IProps {

}

const OrdersPage: FC<IProps> = () => {

    return (
        <div>
            <Orders/>
            <OrderUpdateForm/>
        </div>
    );
};

export {OrdersPage};
