import {
  Button,
  Card,
  CardActions,
  CardContent,
  Typography,
} from "@mui/material";
import type { FC } from "react";
import { useEffect, useState } from "react";

import {
  useAppDispatch,
  useAppSelector,
  useCopyToClipboard,
} from "../../../hooks";
import type { IUser } from "../../../interfaces";
import { EStatus } from "../../../interfaces";
import { userActions } from "../../../redux";
import css from "./Users.module.css";

interface IProps {
  user: IUser;
}

const User: FC<IProps> = ({ user }) => {
  const { id, name, surname, email, is_active, last_login, orders } = user;
  const { activationToken, recoveryToken } = useAppSelector(
    (state) => state.userReducer,
  );
  const [showText, setShowText] = useState(false);
  const dispatch = useAppDispatch();

  const ordersInWork = orders.filter(
    (order) => order.status === EStatus.In_work,
  ).length;
  const ordersAgreed = orders.filter(
    (order) => order.status === EStatus.Aggre,
  ).length;
  const ordersDisagreed = orders.filter(
    (order) => order.status === EStatus.Disaggre,
  ).length;
  const { copyToClipboard } = useCopyToClipboard();

  useEffect(() => {
    if (activationToken) {
      copyToClipboard(`localhost:3000/activate/${activationToken}`);
    }
  }, [activationToken]);

  useEffect(() => {
    if (recoveryToken) {
      copyToClipboard(`localhost:3000/recovery/${recoveryToken}`);
    }
  }, [recoveryToken]);

  const activate = (id: number) => {
    dispatch(userActions.activateUser({ id }));
    setShowText(true);
  };

  const recovery = (id: number) => {
    dispatch(userActions.recovery({ id }));
    setShowText(true);
  };

  useEffect(() => {
    if (showText) {
      const timeoutId = setTimeout(() => {
        setShowText(false);
      }, 1000); // Hide the message after 1 second

      return () => clearTimeout(timeoutId);
    }
  }, [showText]);

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
        <Typography
          sx={{ fontSize: 14 }}
          color={is_active ? "text.success" : "text.secondary"}
          gutterBottom
        >
          is_active: {is_active ? "true" : "false"}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          last_login: {last_login}
        </Typography>
      </CardContent>
      <CardContent className={css.userInfo}>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          total: {orders.length}
        </Typography>
        {ordersInWork > 0 && (
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            in work: {ordersInWork}
          </Typography>
        )}
        {ordersAgreed > 0 && (
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            agree: {ordersAgreed}
          </Typography>
        )}
        {ordersDisagreed > 0 && (
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            disagree: {ordersDisagreed}
          </Typography>
        )}
      </CardContent>
      <CardActions className={css.userActions}>
        <div className={css.userButtons}>
          {!is_active ? (
            <Button
              className={css.userActionButton}
              size="small"
              onClick={() => {
                activate(id);
              }}
            >
              ACTIVATE
            </Button>
          ) : (
            <Button
              className={css.userActionButton}
              size="small"
              onClick={() => {
                recovery(id);
              }}
            >
              RECOVERY PASSWORD
            </Button>
          )}
          <Button
            className={css.userActionButton}
            size="small"
            onClick={async () => await dispatch(userActions.banUser({ id }))}
          >
            BAN
          </Button>
          <Button
            className={css.userActionButton}
            size="small"
            onClick={async () => await dispatch(userActions.unbanUser({ id }))}
          >
            UNBAN
          </Button>
        </div>
        {showText && <p className={css.text}>Link copied to clipboard</p>}
      </CardActions>
    </Card>
  );
};

export { User };
