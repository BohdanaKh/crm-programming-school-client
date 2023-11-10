import {FC} from 'react';

import {CreatePasswordForm} from "../components";
import {useAppLocation} from "../hooks";
import {useParams} from "react-router-dom";


const AccountActivationPage: FC = () => {
 const params = useParams();
    return (
        <div>
            { params.activationToken && (
      <CreatePasswordForm/>
            )  }
        </div>
    );
};

export {AccountActivationPage};
