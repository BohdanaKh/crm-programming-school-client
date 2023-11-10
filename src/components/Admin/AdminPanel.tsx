import {FC, useEffect, useState} from 'react';
import { useNavigate} from "react-router-dom";

import {UserCreateModal} from "../User/UserCreateModal";
import {useAppDispatch, useAppSelector} from "../../hooks";
import {adminActions, userActions, userModalActions} from "../../redux";
import {Users} from "../User/Users";
import { IOrderStats} from "../../interfaces";

interface IProps {

}

const AdminPanel: FC<IProps> = () => {
    const { totalOrdersCount, statusCounts, showUsers } = useAppSelector(state => state.adminReducer)
    const { isUserCreateModalOpen } = useAppSelector(state => state.userModalReducer);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    // const [showUsers, setShowUsers] = useState(false);

    // const toggleUsers = () => {
    //     setShowUsers(!showUsers);
    // };


    useEffect(() => {
     dispatch(adminActions.getAdminPanel())
    }, [dispatch]);
    console.log(totalOrdersCount);
    console.log(statusCounts);

    return (
        <div>
            <div>total: {totalOrdersCount}</div>
            { statusCounts && (
            statusCounts.map( (item) => (<div key={item.status}> <p> {item.status}: {item._count}</p></div>))
                )}
            <button type={"button"} onClick={() => dispatch(userModalActions.openUserCreateModal())}>CREATE</button>
            <button onClick={() => dispatch(adminActions.setShowUsers())}>Managers</button>
            {showUsers && <Users />}
            {isUserCreateModalOpen && <UserCreateModal />}
        </div>
    );
};

export {AdminPanel};
