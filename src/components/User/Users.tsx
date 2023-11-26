import type { FC } from "react";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { userActions } from "../../redux";
import { User } from "./User/User";
import css from "./User/Users.module.css";
import { UserPagination } from "./UserPagination";

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
