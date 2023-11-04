import {FC} from 'react';
import {UserCreateModal, Users} from "../components";

interface IProps {

}

const UsersPage: FC<IProps> = () => {

    return (
        <div>
            <Users/>
            <UserCreateModal/>
        </div>
    );
};

export {UsersPage};
