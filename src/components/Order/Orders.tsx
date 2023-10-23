import {FC, useEffect} from 'react';
import {useAppDispatch, useAppSelector} from "../../hooks";
import {orderActions} from "../../redux";
import {Order} from "./Order";
import {OrdersFiltrationForm} from "./OrdersFiltrationForm";

interface IProps {

}

const Orders: FC<IProps> = () => {
    const {orders, trigger} = useAppSelector(state => state.orderReducer);
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(orderActions.getAll())
    }, [dispatch, trigger])

    return (
        <div>
            <OrdersFiltrationForm/>
            <table>
                <tr>
                    <th>id</th>
                    <th>name</th>
                    <th>surname</th>
                    <th>email</th>
                    <th>phone</th>
                    <th>age</th>
                    <th>course</th>
                    <th>course_format</th>
                    <th>course_type</th>
                    <th>status</th>
                    <th>sum</th>
                    <th>alreadyPaid</th>
                    <th>group</th>
                    {/*<th>created_at</th>*/}
                    <th>manager</th>
                </tr>
            {orders.map(order => <Order key={order.id} order={order}/>)}

            </table>
        </div>
    );
};

export {Orders};
