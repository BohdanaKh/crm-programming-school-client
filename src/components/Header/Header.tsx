import {Link, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

import css from './Header.module.css';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {authService} from '../../services';
import {authActions} from '../../redux';

const Header = () => {
    const {me} = useAppSelector(state => state.authReducer);
    const navigate = useNavigate();
    // const dispatch = useAppDispatch();
    //
    // useEffect(() => {
    //     if (!me && authService.getAccessToken()) {
    //         dispatch(authActions.login())
    //     }
    // }, [me, dispatch])

    return (
        <div className={css.Header}>
            <div>Logo</div>
            { me.role === 'admin' &&
                <Link to={'adminPanel'}>Admin</Link>
            }
                        <span>{me.name}</span>


                <div>
                    <Link to={'logout'}>Logout</Link>
        </div>
        </div>
    );
};

export {Header};