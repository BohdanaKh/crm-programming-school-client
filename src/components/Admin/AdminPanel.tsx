import {FC} from 'react';
import {UserCreateForm} from "../User/UserCreateForm";

interface IProps {

}

const AdminPanel: FC<IProps> = () => {

    return (
        <div>
            AdminPanel
            <button>CREATE</button>
        </div>
    );
};

export {AdminPanel};
