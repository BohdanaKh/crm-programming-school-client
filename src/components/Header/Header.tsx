import {NavLink} from 'react-router-dom';
import {useEffect} from 'react';

import css from './Header.module.css';
import {useAppDispatch, useAppSelector} from '../../hooks';
import {authService} from '../../services';
import {authActions} from '../../redux';

const Header = () => {
    const {me} = useAppSelector(state => state.authReducer);
    console.log(me);
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
            <NavLink to={'adminPanel'}> Admin</NavLink>}
                    <div>
                        <span>{me.email[0]}</span>
                    </div>
                    {/*<div>*/}
                    {/*    <NavLink to={'login'}>Login</NavLink>*/}
                    {/*</div>*/}
                <div>
                <NavLink to={'logout'}>Logout</NavLink>
        </div>
        </div>
    );
};

export {Header};