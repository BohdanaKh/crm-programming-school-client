import {FC} from 'react';
import {Button} from "@mui/material";
import {Link} from "react-router-dom";



const LogoutPage: FC = () => {

    return (
        <div>
            <Link to={'/'}>
            <Button variant="contained" color="success">Sign in</Button>
            </Link>
        </div>
    );
};

export {LogoutPage};
