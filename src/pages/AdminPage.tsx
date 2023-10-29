import {FC} from 'react';

import {AdminPanel} from "../components";


interface IProps {

}

const AdminPage: FC<IProps> = () => {

    return (
        <div>
            <AdminPanel/>
        </div>
    );
};

export {AdminPage};
