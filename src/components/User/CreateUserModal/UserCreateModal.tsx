import { joiResolver } from "@hookform/resolvers/joi";
import { Modal, Popover, Typography } from "@mui/material";
import type { FC } from "react";
import React from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import type { IUser } from "../../../interfaces";
import { adminActions, userActions, userModalActions } from "../../../redux";
import { userValidator } from "../../../validators";
import css from "./UserModal.module.css";

const UserCreateModal: FC = () => {
  const { error } = useAppSelector((state) => state.userReducer);
  const dispatch = useAppDispatch();
  const { isUserCreateModalOpen } = useAppSelector(
    (state) => state.userModalReducer,
  );
  const [anchor, setAnchor] = React.useState<null | HTMLElement>(null);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<IUser>({
    mode: "all",
    resolver: joiResolver(userValidator),
  });
  const open = Boolean(anchor);
  const id = open ? "simple-popper" : undefined;
  const handleClose = () => {
    setAnchor(null);
  };

  const createUser: SubmitHandler<IUser> = async (user) => {
    const {
      meta: { requestStatus },
    } = await dispatch(userActions.create({ user }));
    if (requestStatus === "fulfilled") {
      dispatch(userModalActions.closeUserCreateModal());
      dispatch(adminActions.setShowUsers());
      handleClose();
    }
    if (requestStatus === "rejected") {
      setAnchor(document.getElementById("create-button"));
    }
  };

  return (
    <Modal
      open={isUserCreateModalOpen}
      onClose={() => dispatch(userModalActions.closeUserCreateModal())}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className={css.modalBackground}
    >
      <div className={css.modalContent}>
        <form onSubmit={handleSubmit(createUser)}>
          <div>
            <label className={css.formLabel}>Email</label>
            <input
              className={css.formInput}
              type="text"
              placeholder={"Email"}
              {...register("email")}
            />
            {errors.email && (
              <span className={css.errorsBlock}>{errors.email.message}</span>
            )}
          </div>
          <div>
            <label className={css.formLabel}>Name</label>
            <input
              className={css.formInput}
              type="text"
              placeholder={"Name"}
              {...register("name")}
            />
            {errors.name && (
              <span className={css.errorsBlock}>{errors.name.message}</span>
            )}
          </div>
          <div>
            <label className={css.formLabel}>Surname</label>
            <input
              className={css.formInput}
              type="text"
              placeholder={"Surname"}
              {...register("surname")}
            />
            {errors.surname && (
              <span className={css.errorsBlock}>{errors.surname.message}</span>
            )}
          </div>
          <button
            id={"create-button"}
            className={css.formButton}
            disabled={!isValid}
          >
            CREATE
          </button>
          {/* {Object.keys(errors).length > 0 && ( */}
          {/*  <div>{Object.values(errors)[0].message}</div> */}
          {/* )} */}
          <button
            className={css.formButton}
            type={"button"}
            onClick={() => dispatch(userModalActions.closeUserCreateModal())}
          >
            CANCEL
          </button>
          <Popover
            id={id}
            open={open}
            anchorEl={anchor}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
          >
            <Typography sx={{ p: 2 }}>{error?.message}</Typography>
          </Popover>
        </form>
      </div>
    </Modal>
  );
};

export { UserCreateModal };
