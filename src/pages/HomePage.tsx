import {FC} from 'react';
import {Outlet} from "react-router-dom";

import {Header} from "../components";



const HomePage: FC = () => {

    return (
        <div>
            <Header/>
            <Outlet/>
        </div>
    );
};

export {HomePage};
