import type { FC } from "react";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { userActions } from "../../redux";
import { User } from "./User";
import { UserPagination } from "./UserPagination";
import css from "./Users.module.css";

const Users: FC = () => {
  const { users, trigger, page } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(userActions.getAll({ page }));
  }, [dispatch, trigger, page]);

  return (
    <div className={css.userContainer}>
      {users.map((user) => (
        <User key={user.id} user={user} />
      ))}
      <UserPagination />
    </div>
  );
};

export { Users };
