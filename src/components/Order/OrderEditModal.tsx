import { Button, Modal } from "@mui/material";
import type { FC } from "react";
import React, { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../hooks";
import type { IOrder } from "../../interfaces";
import { ECourse, ECourseFormat, ECourseType, EStatus } from "../../interfaces";
import { groupActions, orderActions, orderModalActions } from "../../redux";
import { Groups } from "../Groups/Groups";
import css from "./OrderModal.module.css";

const OrderEditModal: FC = () => {
  const { handleSubmit, register, setValue } = useForm();
  const dispatch = useAppDispatch();
  const { orderForUpdate } = useAppSelector((state) => state.orderReducer);
  const { groups, trigger1 } = useAppSelector((state) => state.groupReducer);
  const { isOrderEditModalOpen } = useAppSelector(
    (state) => state.orderModalReducer,
  );
  const [isInputVisible, setInputVisible] = useState(false);

  useEffect(() => {
    if (orderForUpdate) {
      setValue("group", orderForUpdate.group);
      setValue("name", orderForUpdate.name);
      setValue("surname", orderForUpdate.surname);
      setValue("email", orderForUpdate.email);
      setValue("phone", orderForUpdate.phone);
      setValue("age", orderForUpdate.age);
      setValue("status", orderForUpdate.status);
      setValue("sum", orderForUpdate.sum);
      setValue("alreadyPaid", orderForUpdate.alreadyPaid);
      setValue("course", orderForUpdate.course);
      setValue("course_format", orderForUpdate.course_format);
      setValue("course_type", orderForUpdate.course_type);
    }
  }, [orderForUpdate, setValue]);

  useEffect(() => {
    dispatch(groupActions.getAll());
  }, [dispatch, trigger1]);

  const update: SubmitHandler<IOrder> = async (order) => {
    await dispatch(orderActions.update({ id: orderForUpdate.id, order }));
    dispatch(orderModalActions.closeOrderEditModal());
  };

  return (
    <Modal
      open={isOrderEditModalOpen}
      onClose={() => dispatch(orderModalActions.closeOrderEditModal())}
      className={css.modalBackground}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <div className={css.modalContent}>
        <form onSubmit={handleSubmit(update)}>
          <div className={css.formContainer}>
            <div className={css.formColumn}>
              <label>Group</label>
              {isInputVisible ? (
                <Groups />
              ) : (
                <select className={css.formInput} {...register("group")}>
                  {groups?.map((group) => (
                    <option key={group.id} value={group.title}>
                      {group.title}
                    </option>
                  ))}
                </select>
              )}

              <Button
                variant="contained"
                size="small"
                sx={{
                  width: "49%",
                  maxHeight: "20px",
                  backgroundColor: "green",
                }}
                onClick={() => {
                  setInputVisible(!isInputVisible);
                }}
              >
                {isInputVisible ? "SELECT" : "ADD GROUP"}
              </Button>

              <label>Name</label>
              <input
                className={css.formInput}
                type="text"
                {...register("name")}
              />

              <label>Surname</label>
              <input
                className={css.formInput}
                type="text"
                {...register("surname")}
              />
              <label>Email</label>
              <input
                className={css.formInput}
                type="text"
                {...register("email")}
              />
              <label>Phone</label>
              <input
                className={css.formInput}
                type="text"
                {...register("phone")}
              />
              <label>Age</label>
              <input
                className={css.formInput}
                {...register("age", {
                  valueAsNumber: true,
                })}
              />
            </div>
            <div className={css.formColumn}>
              <label>Status</label>
              <select className={css.formInput} {...register("status")}>
                <option value={EStatus.In_work}>{EStatus.In_work}</option>
                <option value={EStatus.New}>{EStatus.New}</option>
                <option value={EStatus.Aggre}>{EStatus.Aggre}</option>
                <option value={EStatus.Disaggre}>{EStatus.Disaggre}</option>
                <option value={EStatus.Dubbing}>{EStatus.Dubbing}</option>
                <option value={EStatus.empty}>{EStatus.empty}</option>
              </select>
              <label>Sum</label>
              <input
                className={css.formInput}
                type="text"
                {...register("sum", {
                  valueAsNumber: true,
                })}
              />
              <label>Already paid</label>
              <input
                className={css.formInput}
                type="text"
                {...register("alreadyPaid", {
                  valueAsNumber: true,
                })}
              />
              <label>Course</label>
              <select className={css.formInput} {...register("course")}>
                <option value={ECourse.FS}>{ECourse.FS}</option>
                <option value={ECourse.QACX}>{ECourse.QACX}</option>
                <option value={ECourse.JCX}>{ECourse.JCX}</option>
                <option value={ECourse.JSCX}>{ECourse.JSCX}</option>
                <option value={ECourse.FE}>{ECourse.FE}</option>
                <option value={ECourse.PCX}>{ECourse.PCX}</option>
              </select>
              <label>Course format</label>
              <select className={css.formInput} {...register("course_format")}>
                <option value={ECourseFormat.static}>
                  {ECourseFormat.static}
                </option>
                <option value={ECourseFormat.online}>
                  {ECourseFormat.online}
                </option>
              </select>
              <label>Course type</label>
              <select className={css.formInput} {...register("course_type")}>
                <option value={ECourseType.pro}>{ECourseType.pro}</option>
                <option value={ECourseType.minimal}>
                  {ECourseType.minimal}
                </option>
                <option value={ECourseType.premium}>
                  {ECourseType.premium}
                </option>
                <option value={ECourseType.incubator}>
                  {ECourseType.incubator}
                </option>
                <option value={ECourseType.vip}>{ECourseType.vip}</option>
              </select>

              <Button
                type={"submit"}
                className={css.formButton}
                variant="contained"
                color="primary"
              >
                SUBMIT
              </Button>
            </div>
          </div>
        </form>
        <Button
          className={css.formButton}
          variant="contained"
          color="secondary"
          onClick={() => dispatch(orderModalActions.closeOrderEditModal())}
        >
          CLOSE
        </Button>
      </div>
    </Modal>
  );
};

export { OrderEditModal };
