import {FC} from 'react';
import {UserCreateForm} from "../User/UserCreateForm";

interface IProps {

}

const AdminPanel: FC<IProps> = () => {

    return (
        <div>
            AdminPanel
            <button onClick={<UserCreateForm/>}>CREATE</button>
        </div>
    );
};

export {AdminPanel};
