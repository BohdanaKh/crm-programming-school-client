import {FC} from 'react';
import {Button, Card, CardActions, CardContent, Typography} from "@mui/material";

import {EStatus, IUser} from "../../interfaces";
import {useAppDispatch} from "../../hooks";
import {userActions} from "../../redux";
import css from './Users.module.css';
interface IProps {
user: IUser;
}

const User: FC<IProps> = ({user}) => {
const { id, name, surname, email, is_active, last_login, orders } = user;
const dispatch = useAppDispatch();

const ordersInWork = orders.filter(order => order.status === EStatus.In_work).length;
const ordersAgreed = orders.filter(order => order.status === EStatus.Aggre).length;

    return (

            <Card className={css.userBlock}>
                <CardContent className={css.userInfo}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        id: {id}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        email: {email}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        name: {name}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        surname: {surname}
                    </Typography>

                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        is_active: {is_active ? 'true' : 'false'}
                    </Typography>
                    {/*// @ts-ignore*/}
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        last_login: {last_login}
                    </Typography>
                </CardContent>
                <CardContent className={css.userInfo}>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        total: {orders.length}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        in work: {ordersInWork}
                    </Typography>
                    <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                        agree: {ordersAgreed}
                    </Typography>

                </CardContent>
                <CardActions className={css.userActions}>
                    <Button className={css.userActionButton} size="small" onClick={() => dispatch(userActions.activateUser({id}))}>ACTIVATE</Button>
                    <Button className={css.userActionButton} size="small" onClick={() => dispatch(userActions.banUser({id}))}>BAN</Button>
                    <Button className={css.userActionButton} size="small" onClick={() => dispatch(userActions.unbanUser({id}))}>UNBAN</Button>
                </CardActions>
            </Card>

    );
};

export {User};
