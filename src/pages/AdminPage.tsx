import {FC} from 'react';

import {AdminPanel} from "../components";
import {Outlet} from "react-router-dom";


interface IProps {

}

const AdminPage: FC<IProps> = () => {

    return (
        <div>
            <AdminPanel/>
            <Outlet/>
        </div>
    );
};

export {AdminPage};
