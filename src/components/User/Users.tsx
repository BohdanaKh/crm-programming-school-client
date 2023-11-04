import {FC, useEffect} from 'react';
import {useSearchParams} from "react-router-dom";

import {useAppDispatch, useAppSelector} from "../../hooks";
import {userActions} from "../../redux";
import { User } from './User';

interface IProps {

}

const Users: FC<IProps> = () => {
    const { users, trigger } = useAppSelector(state => state.userReducer);
    const dispatch = useAppDispatch();
    const [searchParams, setSearchParams] = useSearchParams();

    useEffect(() => {
        // @ts-ignore
        const currentParams = Object.fromEntries([...searchParams]);
        dispatch(userActions.getAll())
    }, [dispatch, searchParams, trigger]);

    return (
        <div style={{ display: "flex", flexDirection: "column"}}>
            {
                users.map(user => <User key={user.id} user={user}/>)
            }
        </div>
    );
};

export {Users};
