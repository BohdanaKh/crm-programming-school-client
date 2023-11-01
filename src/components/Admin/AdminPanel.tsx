import {FC, useEffect} from 'react';
import {UserCreateForm} from "../User/UserCreateForm";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {adminActions} from "../../redux";
import { IOrderStats} from "../../interfaces";

interface IProps {

}

const AdminPanel: FC<IProps> = () => {
    const { totalOrdersCount, statusCounts } = useAppSelector(state => state.adminReducer)
  const dispatch = useAppDispatch();


    useEffect(() => {
     dispatch(adminActions.getAdminPanel())
    }, [dispatch]);
    console.log(totalOrdersCount);
    console.log(statusCounts);
    return (
        <div>
            <div>total: {totalOrdersCount}</div>
            {statusCounts.map( (item) => (<div key={item.status}> <p> {item.status}: {item._count}</p></div>))}
            <button>CREATE</button>
        </div>
    );
};

export {AdminPanel};
