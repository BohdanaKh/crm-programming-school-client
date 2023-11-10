import {FC} from 'react';

import {User} from "../components";
import {useAppSelector} from "../hooks";

interface IProps {

}

const UserPage: FC<IProps> = () => {
    const {me}= useAppSelector(state => state.authReducer);

    return (
        <div>
        User Account
        </div>
    );
};

export {UserPage};
