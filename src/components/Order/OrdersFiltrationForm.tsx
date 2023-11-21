import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { joiResolver } from "@hookform/resolvers/joi";
import type { FC } from "react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

import { useAppSelector } from "../../hooks";
import type { IOrder } from "../../interfaces";
import { ECourse, ECourseFormat, ECourseType, EStatus } from "../../interfaces";
import { filtersValidator } from "../../validators";
import { DownloadExcel } from "./DownloadExcel";
import css from "./Filters.module.css";

const OrdersFiltrationForm: FC = () => {
  const { me } = useAppSelector((state) => state.authReducer);
  const { groups } = useAppSelector((state) => state.groupReducer);
  const [isChecked, setIsChecked] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const {
    handleSubmit,
    reset,
    register,
    formState: { errors, isValid },
    setValue,
  } = useForm<IOrder>({
    mode: "all",
    resolver: joiResolver(filtersValidator),
  });

  useEffect(() => {
    if (searchParams) {
      setValue("name", searchParams.get("name") || "", {
        shouldValidate: true,
      });
      setValue("surname", searchParams.get("surname") || "", {
        shouldValidate: true,
      });
      setValue("email", searchParams.get("email") || "", {
        shouldValidate: true,
      });
      setValue("phone", searchParams.get("phone") || "", {
        shouldValidate: true,
      });
      setValue("age", searchParams.get("age") || "", { shouldValidate: true });
      setValue("group", searchParams.get("group" || ""));
    }
  }, [searchParams]);

  const timerRef = useRef(null);
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    timerRef.current = setTimeout(() => {
      if (event.target.value) {
        setSearchParams((prev) => {
          prev.set(event.target.name, event.target.value);
          prev.set("page", "1");
          return prev;
        });
      } else {
        setSearchParams((prev) => {
          prev.delete(event.target.name);
          return prev;
        });
      }
    }, 300);
  };

  useEffect(() => () => clearTimeout(timerRef.current), []);

  // const handleInputChange = useMemo(
  //   () =>
  //     debounce(
  //       (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
  //         if (event.target.value) {
  //           // setSearchParams((prev) => {
  //           //   prev.set(event.target.name, event.target.value);
  //           //   return prev;
  //           // });
  //           searchParams.set(event.target.name, event.target.value);
  //           setSearchParams((searchParams) => searchParams);
  //         } else {
  //           setSearchParams((prev) => {
  //             prev.delete(event.target.name);
  //             return prev;
  //           });
  //         }
  //       },
  //       500,
  //     ),
  //   [],
  // );
  // useEffect(
  //   () => () => {
  //     handleInputChange.cancel();
  //   },
  //   [handleInputChange],
  // );
  const clearFilterForm = () => {
    reset();
    searchParams.delete("name");
    searchParams.delete("surname");
    searchParams.delete("email");
    searchParams.delete("phone");
    searchParams.delete("age");
    searchParams.delete("course");
    searchParams.delete("course_format");
    searchParams.delete("course_type");
    searchParams.delete("status");
    searchParams.delete("group");
    setSearchParams((prev) => prev);
  };
  const filterMy = () => {
    setIsChecked(!isChecked);
    if (!isChecked) {
      const id = me?.id;
      setSearchParams((params) => {
        params.set("page", "1");
        params.set("managerId", id?.toString());
        return params;
      });
    } else {
      reset();
      setSearchParams((params) => {
        params.delete("managerId");
        params.set("page", "1");
        return params;
      });
    }
  };

  return (
    <div className={css.Filters}>
      <form onSubmit={handleSubmit(handleInputChange)}>
        <div className={css.formInputs}>
          <div className={css.formInputWrapper}>
            {errors.name && (
              <div className={css.errorsBlock}>{errors.name.message}</div>
            )}
            <input
              className={isValid ? css.formInputValid : css.formInputNotValid}
              type={"text"}
              placeholder={"name"}
              {...register("name")}
              onChange={handleInputChange}
            />
          </div>
          <div className={css.formInputWrapper}>
            {errors.surname && (
              <span className={css.errorsBlock}>{errors.surname.message}</span>
            )}
            <input
              className={isValid ? css.formInputValid : css.formInputNotValid}
              type={"text"}
              placeholder={"surname"}
              {...register("surname")}
              onChange={handleInputChange}
            />
          </div>
          <div className={css.formInputWrapper}>
            {errors.email && (
              <span className={css.errorsBlock}>{errors.email.message}</span>
            )}
            <input
              className={isValid ? css.formInputValid : css.formInputNotValid}
              type="text"
              placeholder={"email"}
              {...register("email")}
              onChange={handleInputChange}
            />
          </div>
          <div className={css.formInputWrapper}>
            {errors.phone && (
              <span className={css.errorsBlock}>{errors.phone.message}</span>
            )}
            <input
              className={isValid ? css.formInputValid : css.formInputNotValid}
              type="text"
              placeholder={"phone"}
              {...register("phone")}
              onChange={handleInputChange}
            />
          </div>
          <div className={css.formInputWrapper}>
            {errors.age && (
              <span className={css.errorsBlock}>{errors.age.message}</span>
            )}
            <input
              className={isValid ? css.formInputValid : css.formInputNotValid}
              type="text"
              placeholder={"age"}
              {...register("age")}
              onChange={handleInputChange}
            />
          </div>
          <div className={css.formInputWrapper}>
            {errors.course && (
              <span className={css.errorsBlock}>{errors.course.message}</span>
            )}
            <select
              className={isValid ? css.formInputValid : css.formInputNotValid}
              {...register("course")}
              onChange={handleInputChange}
            >
              <option value={""}>all courses</option>
              <option value={ECourse.FS}>{ECourse.FS}</option>
              <option value={ECourse.QACX}>{ECourse.QACX}</option>
              <option value={ECourse.JCX}>{ECourse.JCX}</option>
              <option value={ECourse.JSCX}>{ECourse.JSCX}</option>
              <option value={ECourse.FE}>{ECourse.FE}</option>
              <option value={ECourse.PCX}>{ECourse.PCX}</option>
            </select>
          </div>
          <div className={css.formInputWrapper}>
            {errors.course_format && (
              <span className={css.errorsBlock}>
                {errors.course_format.message}
              </span>
            )}
            <select
              className={isValid ? css.formInputValid : css.formInputNotValid}
              {...register("course_format")}
              onChange={handleInputChange}
            >
              <option value={""}>all formats</option>
              <option value={ECourseFormat.static}>
                {ECourseFormat.static}
              </option>
              <option value={ECourseFormat.online}>
                {ECourseFormat.online}
              </option>
            </select>
          </div>
          <div className={css.formInputWrapper}>
            {errors.course_type && (
              <span className={css.errorsBlock}>
                {errors.course_type.message}
              </span>
            )}
            <select
              className={isValid ? css.formInputValid : css.formInputNotValid}
              {...register("course_type")}
              onChange={handleInputChange}
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
          </div>
          <div className={css.formInputWrapper}>
            {errors.status && (
              <span className={css.errorsBlock}>{errors.status.message}</span>
            )}
            <select
              className={isValid ? css.formInputValid : css.formInputNotValid}
              {...register("status")}
              onChange={handleInputChange}
            >
              <option value={""}>all statuses</option>
              <option value={EStatus.In_work}>{EStatus.In_work}</option>
              <option value={EStatus.New}>{EStatus.New}</option>
              <option value={EStatus.Aggre}>{EStatus.Aggre}</option>
              <option value={EStatus.Disaggre}>{EStatus.Disaggre}</option>
              <option value={EStatus.Dubbing}>{EStatus.Dubbing}</option>
            </select>
          </div>
          <div className={css.formInputWrapper}>
            {errors.group && (
              <span className={css.errorsBlock}>{errors.group.message}</span>
            )}
            <select
              className={isValid ? css.formInputValid : css.formInputNotValid}
              {...register("group")}
              onChange={handleInputChange}
            >
              <option value={""}>all groups</option>
              {groups?.map((group) => (
                <option key={group.id} value={group.title}>
                  {group.title}
                </option>
              ))}
            </select>
          </div>
          <div className={css.formInputWrapper}>
            <input
              className={isValid ? css.formInputValid : css.formInputNotValid}
              type="text"
              placeholder={"Start date"}
            />
          </div>
          <div className={css.formInputWrapper}>
            <input
              className={isValid ? css.formInputValid : css.formInputNotValid}
              type="text"
              placeholder={"End date"}
            />
          </div>
          <button
            className={css.formAction}
            type={"button"}
            onClick={clearFilterForm}
            style={{ backgroundColor: "green" }}
          >
            <FontAwesomeIcon
              icon={faRotateRight}
              style={{ color: "#fafafa" }}
            />
          </button>
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

        <DownloadExcel />
      </div>
    </div>
  );
};

export { OrdersFiltrationForm };
