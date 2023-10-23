import {FC} from 'react';
import {UserCreateForm, Users} from "../components";

interface IProps {

}

const UsersPage: FC<IProps> = () => {

    return (
        <div>
            <Users/>
            <UserCreateForm/>
        </div>
    );
};

export {UsersPage};
