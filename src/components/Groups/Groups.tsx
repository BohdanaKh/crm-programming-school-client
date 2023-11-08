import {FC, useEffect} from 'react';
import {groupActions} from "../../redux";
import {useAppDispatch} from "../../hooks";



const Groups:FC = () => {
    const dispatch = useAppDispatch();

    // useEffect(() => {
    //     dispatch(groupActions.getAll())
    // }, [dispatch])

    return (
        <div>

        </div>
    );
};

export {Groups};
