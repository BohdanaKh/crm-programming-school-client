import {FC, useEffect} from 'react';
import {UserCreateForm} from "../User/UserCreateForm";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {adminActions} from "../../redux";
import { IOrderStats} from "../../interfaces";

interface IProps {

}

const AdminPanel: FC<IProps> = () => {
    const { data } = useAppSelector(state => state.adminReducer)
  const dispatch = useAppDispatch();


    useEffect(() => {
     dispatch(adminActions.getAdminPanel())
    }, [dispatch]);

 const { totalOrdersCount, statusCounts } = data;
    return (
        <div>
            <div>total: {totalOrdersCount}</div>
            {statusCounts.map( (item) => (<div> key={item.status} <p> `${item.status}: {item._count}`</p></div>))}
            <button>CREATE</button>
        </div>
    );
};

export {AdminPanel};
