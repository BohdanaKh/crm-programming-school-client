import {NavLink, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';

import css from './Header.module.css';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {authService} from '../../services';
import {authActions} from '../../redux';

const Header = () => {
    const {me} = useAppSelector(state => state.authReducer);
    console.log(me);
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
                <NavLink to={'adminPanel'}>Admin</NavLink>
            }
                        <span>{me.email[0]}</span>


                <div>
                    <NavLink to={'logout'}>Logout</NavLink>
        </div>
        </div>
    );
};

export {Header};