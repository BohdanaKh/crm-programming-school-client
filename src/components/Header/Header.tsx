import {Link, useNavigate} from 'react-router-dom';
import {useEffect} from 'react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';

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
            <div className={css.logo}>
                <Link to={'orders'}>
                Logo
                </Link>
                </div>
            <div className={css.user}>
            { me.role === 'admin' &&
                <Link to={'adminPanel'}>Admin</Link>
            }
                <Link to={`users/${me.id}`} >
                    <FontAwesomeIcon icon={faUser} style={{color: "#f4f6fb",}} />
                </Link>
                    <Link to={'logout'}>
                        <button onClick={() => authService.logout()} style={{backgroundColor:"green", width: "50px", height: "60px", border: "none"}}>
                        <FontAwesomeIcon icon={faRightFromBracket} style={{color: "#f7f7f8"}} />
                        </button>
                    </Link>
        </div>
        </div>
    );
};

export {Header};