import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { joiResolver } from "@hookform/resolvers/joi";
import type { FC } from "react";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";
import { useDebounce } from "use-debounce";

import { useAppDispatch, useAppSelector } from "../../hooks";
import type { IFilter, IOrder } from "../../interfaces";
import { ECourse, ECourseFormat, ECourseType, EStatus } from "../../interfaces";
import { orderActions } from "../../redux";
import { ordersValidator } from "../../validators";
import { DownloadExcel } from "./DownloadExcel";
import css from "./Filters.module.css";

const OrdersFiltrationForm: FC = () => {
  const { me } = useAppSelector((state) => state.authReducer);
  const { params } = useAppSelector((state) => state.orderReducer);
  const { groups } = useAppSelector((state) => state.groupReducer);
  const dispatch = useAppDispatch();
  const [searchTerm, setSearchTerm] = useState<IFilter>();
  const [isChecked, setIsChecked] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const { reset, register } = useForm<IOrder>({
    mode: "all",
    resolver: joiResolver(ordersValidator),
  });

  const [debouncedText] = useDebounce(searchTerm, 3000, { leading: true });

  useEffect(() => {
    if (debouncedText) {
      dispatch(orderActions.setParams(debouncedText));
    }
  }, [debouncedText]);

  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = event.target;
    setSearchParams((params) => {
      params.set(name, value);
      return params;
    });

    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-expect-error
    const currentParams = Object.fromEntries([...searchParams]);
    setSearchTerm(currentParams);
  };

  const clearFilterForm = () => {
    dispatch(orderActions.setNullParams());
    dispatch(orderActions.setPage(1));
    reset();
    setSearchParams((prev) => ({ ...prev, page: 1 }));
  };

  const filterMy = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      const id = me?.id;
      dispatch(orderActions.setParams({ managerId: id }));
      setSearchParams((params) => {
        params.set("managerId", id?.toString());
        return params;
      });
    } else {
      dispatch(orderActions.setParams({ ...params, managerId: null }));
      // dispatch(orderActions.setPage(1));
      reset();
      setSearchParams((params) => {
        params.delete("managerId");
        return params;
      });
    }
  };
  return (
    <div className={css.Filters}>
      <form>
        <div className={css.formInputs}>
          <input
            className={css.formInput}
            type={"text"}
            placeholder={"name"}
            {...register("name")}
            onChange={handleInputChange}
          />
          <input
            className={css.formInput}
            type={"text"}
            placeholder={"surname"}
            {...register("surname")}
            onChange={handleInputChange}
          />
          <input
            className={css.formInput}
            type="text"
            placeholder={"email"}
            {...register("email")}
            onChange={handleInputChange}
          />

          <input
            className={css.formInput}
            type="text"
            placeholder={"phone"}
            {...register("phone")}
            onChange={handleInputChange}
          />

          <input
            className={css.formInput}
            type="text"
            placeholder={"age"}
            {...register("age")}
            onChange={handleInputChange}
          />

          <select
            className={css.formInput}
            {...register("course")}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              handleInputChange(e);
            }}
          >
            <option value={""}>all courses</option>
            <option value={ECourse.FS}>{ECourse.FS}</option>
            <option value={ECourse.QACX}>{ECourse.QACX}</option>
            <option value={ECourse.JCX}>{ECourse.JCX}</option>
            <option value={ECourse.JSCX}>{ECourse.JSCX}</option>
            <option value={ECourse.FE}>{ECourse.FE}</option>
            <option value={ECourse.PCX}>{ECourse.PCX}</option>
          </select>
          <select
            className={css.formInput}
            {...register("course_format")}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              handleInputChange(e);
            }}
          >
            <option value={""}>all formats</option>
            <option value={ECourseFormat.static}>{ECourseFormat.static}</option>
            <option value={ECourseFormat.online}>{ECourseFormat.online}</option>
          </select>

          <select
            className={css.formInput}
            {...register("course_type")}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              handleInputChange(e);
            }}
          >
            <option value={""}>all types</option>
            <option value={ECourseType.pro}>{ECourseType.pro}</option>
            <option value={ECourseType.minimal}>{ECourseType.minimal}</option>
            <option value={ECourseType.premium}>{ECourseType.premium}</option>
            <option value={ECourseType.incubator}>
              {ECourseType.incubator}
            </option>
            <option value={ECourseType.vip}>{ECourseType.vip}</option>
          </select>

          <select
            className={css.formInput}
            {...register("status")}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              handleInputChange(e);
            }}
          >
            <option value={""}>all statuses</option>
            <option value={EStatus.In_work}>{EStatus.In_work}</option>
            <option value={EStatus.New}>{EStatus.New}</option>
            <option value={EStatus.Aggre}>{EStatus.Aggre}</option>
            <option value={EStatus.Disaggre}>{EStatus.Disaggre}</option>
            <option value={EStatus.Dubbing}>{EStatus.Dubbing}</option>
          </select>

          <select
            className={css.formInput}
            {...register("group")}
            onChange={(e: React.ChangeEvent<HTMLSelectElement>) => {
              handleInputChange(e);
            }}
          >
            <option value={""}>all groups</option>
            {groups?.map((group) => (
              <option key={group.id} value={group.title}>
                {group.title}
              </option>
            ))}
          </select>
          <input
            className={css.formInput}
            type="text"
            placeholder={"Start date"}
          />
          <input
            className={css.formInput}
            type="text"
            placeholder={"End date"}
          />
        </div>
      </form>
      <div className={css.formActions}>
        <label className={css.formAction}>My</label>
        <input
          className={css.formAction}
          type={"checkbox"}
          name={"My"}
          value={"My"}
          checked={isChecked}
          onChange={filterMy}
          style={{ marginLeft: "1px" }}
        />
        <button
          className={css.formAction}
          onClick={clearFilterForm}
          style={{ backgroundColor: "green" }}
        >
          <FontAwesomeIcon icon={faRotateRight} style={{ color: "#fafafa" }} />
        </button>
        <DownloadExcel />
      </div>
    </div>
  );
};

export { OrdersFiltrationForm };
