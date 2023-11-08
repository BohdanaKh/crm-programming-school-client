import {FC, useEffect} from 'react';
import {useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {userActions} from "../../redux";
import { User } from './User';
import css from './Users.module.css';
import {UserPagination} from "./UserPagination";



const Users: FC = () => {
    const { users, trigger } = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        // // @ts-ignore
        // const currentParams = Object.fromEntries([...searchParams]);
        dispatch(userActions.getAll())
    }, [dispatch, trigger]);

    return (
        <div className={css.userContainer}>
            {
                users.map(user => <User key={user.id} user={user}/>)
            }
            <UserPagination/>
        </div>
    );
};

export {Users};
