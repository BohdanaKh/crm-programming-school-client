import { joiResolver } from "@hookform/resolvers/joi";
import { Modal } from "@mui/material";
import type { FC } from "react";
import React, { useEffect, useState } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";

import { useAppDispatch, useAppSelector } from "../../../hooks";
import type { IOrder } from "../../../interfaces";
import {
  ECourse,
  ECourseFormat,
  ECourseType,
  EStatus,
} from "../../../interfaces";
import { groupActions, orderActions, orderModalActions } from "../../../redux";
import { ordersValidator } from "../../../validators";
import { Groups } from "../../Group/Groups";
import css from "./OrderModal.module.css";

const OrderEditModal: FC = () => {
  const {
    handleSubmit,
    register,
    setValue,
    formState: { errors },
  } = useForm<IOrder>({
    mode: "all",
    resolver: joiResolver(ordersValidator),
  });
  const dispatch = useAppDispatch();
  const { orderForUpdate } = useAppSelector((state) => state.orderReducer);
  const { groups } = useAppSelector((state) => state.groupReducer);
  const { isOrderEditModalOpen } = useAppSelector(
    (state) => state.orderModalReducer,
  );
  const [isInputVisible, setInputVisible] = useState(false);
  const [groupName, setGroupName] = useState<string>("");
  const [filteredGroups, setFilteredGroups] = useState([]);

  useEffect(() => {
    if (orderForUpdate) {
      setValue("group", orderForUpdate.group, { shouldValidate: true });
      setValue("name", orderForUpdate.name, { shouldValidate: true });
      setValue("surname", orderForUpdate.surname, { shouldValidate: true });
      setValue("email", orderForUpdate.email, { shouldValidate: true });
      setValue("phone", orderForUpdate.phone, { shouldValidate: true });
      setValue("age", orderForUpdate.age?.toString(), { shouldValidate: true });
      setValue(
        "status",
        orderForUpdate.status === EStatus.New || orderForUpdate.status === null
          ? EStatus.In_work
          : orderForUpdate.status,
        { shouldValidate: true },
      );
      setValue("sum", orderForUpdate.sum, { shouldValidate: true });
      setValue("alreadyPaid", orderForUpdate.alreadyPaid, {
        shouldValidate: true,
      });
      setValue("course", orderForUpdate.course, { shouldValidate: true });
      setValue("course_format", orderForUpdate.course_format, {
        shouldValidate: true,
      });
      setValue("course_type", orderForUpdate.course_type, {
        shouldValidate: true,
      });
    }
  }, [orderForUpdate, setValue]);

  // useEffect(() => {
  //   dispatch(groupActions.getAll());
  // }, [dispatch, trigger1]);

  useEffect(() => {
    const filtered = groups?.filter(
      (group) => group?.title.includes(groupName),
    );
    setFilteredGroups(filtered);
    if (groupName === "") {
      setFilteredGroups([]);
    }
  }, [groupName, groups]);

  const createGroup = async (groupName: string) => {
    const {
      meta: { requestStatus },
    } = await dispatch(groupActions.create({ group: { title: groupName } }));
    if (requestStatus === "fulfilled") {
      setValue("group", groupName);
    }
  };

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
              <div className={css.groupsBlock}>
                <label className={css.inputLabel}>Group</label>
                {isInputVisible ? (
                  <>
                    <input
                      className={css.formInput}
                      type={"text"}
                      placeholder={"enter new group name"}
                      value={groupName}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                        setGroupName(e.target.value);
                      }}
                    />
                    <div
                      className={css.filteredGroups}
                      hidden={!filteredGroups.length}
                    >
                      <Groups filteredGroups={filteredGroups} />
                    </div>
                  </>
                ) : (
                  <select className={css.formInput} {...register("group")}>
                    <option value={undefined} />
                    {groups?.map((group) => (
                      <option key={group.id} value={group.title}>
                        {group.title}
                      </option>
                    ))}
                  </select>
                )}

                <button
                  type={"button"}
                  className={css.groupsButton}
                  onClick={() => {
                    setInputVisible(!isInputVisible);
                  }}
                >
                  {isInputVisible ? "SELECT" : "ADD GROUP"}
                </button>
                <button
                  type={"button"}
                  className={css.groupsButton}
                  onClick={async () => {
                    await createGroup(groupName);
                  }}
                  hidden={!isInputVisible}
                >
                  ADD GROUP
                </button>
              </div>
              <label className={css.inputLabel}>Name</label>
              <input
                className={css.formInput}
                type="text"
                {...register("name")}
              />
              {errors?.name && (
                <span className={css.errorsBlock}>{errors.name.message}</span>
              )}

              <label className={css.inputLabel}>Surname</label>
              <input
                className={css.formInput}
                type="text"
                {...register("surname")}
              />
              {errors.surname && (
                <span className={css.errorsBlock}>
                  {errors.surname.message}
                </span>
              )}

              <label className={css.inputLabel}>Email</label>
              <input
                className={css.formInput}
                type="text"
                {...register("email")}
              />
              {errors.email && (
                <span className={css.errorsBlock}>{errors.email.message}</span>
              )}

              <label className={css.inputLabel}>Phone</label>
              <input
                className={css.formInput}
                type="text"
                {...register("phone")}
              />
              {errors.phone && (
                <span className={css.errorsBlock}>{errors.phone.message}</span>
              )}

              <label className={css.inputLabel}>Age</label>
              <input className={css.formInput} {...register("age")} />
              {errors.age && (
                <span className={css.errorsBlock}>{errors.age.message}</span>
              )}
            </div>
            <div className={css.formColumn}>
              <label className={css.inputLabel}>Status</label>
              <select className={css.formInput} {...register("status")}>
                <option value={undefined} />
                <option value={EStatus.In_work}>{EStatus.In_work}</option>
                <option value={EStatus.New}>{EStatus.New}</option>
                <option value={EStatus.Aggre}>{EStatus.Aggre}</option>
                <option value={EStatus.Disaggre}>{EStatus.Disaggre}</option>
                <option value={EStatus.Dubbing}>{EStatus.Dubbing}</option>
              </select>
              {errors.status && (
                <span className={css.errorsBlock}>{errors.status.message}</span>
              )}
              <label className={css.inputLabel}>Sum</label>
              <input
                className={css.formInput}
                type="text"
                {...register("sum", {
                  valueAsNumber: true,
                })}
              />
              {errors.sum && (
                <span className={css.errorsBlock}>{errors.sum.message}</span>
              )}

              <label className={css.inputLabel}>Already paid</label>
              <input
                className={css.formInput}
                type="text"
                {...register("alreadyPaid", {
                  valueAsNumber: true,
                })}
              />
              {errors.alreadyPaid && (
                <span className={css.errorsBlock}>
                  {errors.alreadyPaid.message}
                </span>
              )}

              <label className={css.inputLabel}>Course</label>
              <select className={css.formInput} {...register("course")}>
                <option value={undefined} />
                <option value={ECourse.FS}>{ECourse.FS}</option>
                <option value={ECourse.QACX}>{ECourse.QACX}</option>
                <option value={ECourse.JCX}>{ECourse.JCX}</option>
                <option value={ECourse.JSCX}>{ECourse.JSCX}</option>
                <option value={ECourse.FE}>{ECourse.FE}</option>
                <option value={ECourse.PCX}>{ECourse.PCX}</option>
              </select>
              {errors.course && (
                <span className={css.errorsBlock}>{errors.course.message}</span>
              )}

              <label className={css.inputLabel}>Course format</label>
              <select className={css.formInput} {...register("course_format")}>
                <option value={undefined} />
                <option value={ECourseFormat.static}>
                  {ECourseFormat.static}
                </option>
                <option value={ECourseFormat.online}>
                  {ECourseFormat.online}
                </option>
              </select>
              {errors.course_format && (
                <span className={css.errorsBlock}>
                  {errors.course_format.message}
                </span>
              )}

              <label className={css.inputLabel}>Course type</label>
              <select className={css.formInput} {...register("course_type")}>
                <option value={undefined} />
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
              {errors.course_type && (
                <span className={css.errorsBlock}>
                  {errors.course_type.message}
                </span>
              )}

              <button type={"submit"} className={css.editButton}>
                SUBMIT
              </button>
            </div>
          </div>
        </form>
        <button
          className={css.closeButton1}
          onClick={() => dispatch(orderModalActions.closeOrderEditModal())}
        >
          CLOSE
        </button>
      </div>
    </Modal>
  );
};

export { OrderEditModal };
