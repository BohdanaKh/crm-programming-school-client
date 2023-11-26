import type { FC } from "react";
import { useEffect } from "react";

import { useAppDispatch, useAppSelector } from "../../hooks";
import { adminActions, userModalActions } from "../../redux";
import { UserCreateModal } from "../User/CreateUserModal/UserCreateModal";
import { Users } from "../User/Users";
import css from "./AdminPanel.module.css";

const AdminPanel: FC = () => {
  const { totalOrdersCount, statusCounts, showUsers } = useAppSelector(
    (state) => state.adminReducer,
  );
  const { isUserCreateModalOpen } = useAppSelector(
    (state) => state.userModalReducer,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(adminActions.getAdminPanel());
  }, [dispatch]);

  return (
    <div className={css.AdminPanel}>
      <h3>Orders statistic</h3>
      <div className={showUsers ? css.statsWrapRow : css.statsWrapCol}>
        <div className={css.stats}>total: {totalOrdersCount}</div>
        {statusCounts && (
          <>
            <div className={css.stats}>
              {statusCounts[0].status}: {statusCounts[0]._count}
            </div>
            <div className={css.stats}>
              New: {statusCounts[1]._count + statusCounts[5]._count}
            </div>
            <div className={css.stats}>
              {statusCounts[2].status}: {statusCounts[2]._count}
            </div>
            <div className={css.stats}>
              {statusCounts[3].status}: {statusCounts[3]._count}
            </div>
            <div className={css.stats}>
              {statusCounts[4].status}: {statusCounts[4]._count}
            </div>
          </>
        )}
      </div>
      <div className={css.adminActions}>
        <button
          className={css.adminActionButton}
          type={"button"}
          onClick={() => dispatch(userModalActions.openUserCreateModal())}
        >
          CREATE
        </button>
        <button
          className={css.adminActionButton}
          onClick={() => dispatch(adminActions.setShowUsers())}
        >
          Managers
        </button>
      </div>
      {showUsers && <Users />}
      {isUserCreateModalOpen && <UserCreateModal />}
    </div>
  );
};

export { AdminPanel };
