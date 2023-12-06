import { faRotateRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { joiResolver } from "@hookform/resolvers/joi";
import type { FC } from "react";
import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useSearchParams } from "react-router-dom";

import { useAppSelector } from "../../../hooks";
import type { IGroup, IOrder } from "../../../interfaces";
import {
  ECourse,
  ECourseFormat,
  ECourseType,
  EStatus,
} from "../../../interfaces";
import { filtersValidator } from "../../../validators";
import { DownloadExcel } from "../DownloadExcel";
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
    formState: { errors },
    setValue,
  } = useForm<IOrder>({
    mode: "all",
    resolver: joiResolver(filtersValidator),
  });
  const statuses = Object.values(EStatus);
  const courses = Object.values(ECourse);
  const courseFormats = Object.values(ECourseFormat);
  const courseTypes = Object.values(ECourseType);
  useEffect(() => {
    if (searchParams.get("name")) {
      setValue("name", searchParams.get("name"), {
        shouldValidate: true,
      });
    }
    if (searchParams.get("surname")) {
      setValue("surname", searchParams.get("surname"), {
        shouldValidate: true,
      });
    }
    if (searchParams.get("email")) {
      setValue("email", searchParams.get("email") || "", {
        shouldValidate: true,
      });
    }
    if (searchParams.get("phone")) {
      setValue("phone", searchParams.get("phone") || "", {
        shouldValidate: true,
      });
    }
    if (searchParams.get("age")) {
      setValue("age", +searchParams.get("age") || null, {
        shouldValidate: true,
      });
    }
    if (searchParams.get("course")) {
      const existCourse = courses?.find(
        (course) => course === searchParams.get("course")?.toUpperCase(),
      );
      if (existCourse) {
        setValue("course", ECourse[existCourse], { shouldValidate: true });
      }
    }
    if (searchParams.get("course_format")) {
      const existCourseFormat = courseFormats?.find(
        (course_format) => course_format === searchParams.get("course_format"),
      );
      if (existCourseFormat) {
        setValue("course_format", ECourseFormat[existCourseFormat], {
          shouldValidate: true,
        });
      }
    }
    if (searchParams.get("course_type")) {
      const existingCourseType = courseTypes?.find(
        (courseType) => courseType === searchParams.get("course_type"),
      );
      if (existingCourseType) {
        setValue("course_type", ECourseType[existingCourseType], {
          shouldValidate: true,
        });
      }
    }
    if (searchParams.get("group")) {
      const existingGroup: IGroup = groups?.find((group) =>
        group.title.includes(searchParams.get("group")),
      );
      existingGroup && setValue("group", existingGroup.title);
    }
    if (searchParams.get("status")) {
      const existingStatus = statuses?.find(
        (status) => status === searchParams.get("status"),
      );
      if (existingStatus) {
        setValue("status", EStatus[existingStatus], { shouldValidate: true });
      }
    }
    if (searchParams.has("start_date")) {
      setValue(
        "start_date",
        new Date(searchParams.get("start_date"))
          .toLocaleDateString()
          .slice(0, 10) || null,
        {
          shouldValidate: true,
        },
      );
    }
    if (searchParams.has("end_date")) {
      setValue(
        "end_date",
        new Date(searchParams.get("end_date"))
          .toLocaleDateString()
          .slice(0, 10) || "",
        {
          shouldValidate: true,
        },
      );
    }
  }, [searchParams, groups]);

  const timerRef = useRef(null);
  const handleInputChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>,
  ) => {
    timerRef.current = setTimeout(() => {
      if (event.target.value) {
        setSearchParams((prev) => {
          prev.set("page", "1");
          prev.set(event.target.name, event.target.value);
          return prev;
        });
      } else {
        setSearchParams((prev) => {
          prev.delete(event.target.name);
          prev.set("page", "1");
          return prev;
        });
      }
    }, 500);
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
    if (isChecked) {
      setIsChecked(!isChecked);
    }
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
    searchParams.delete("manager");
    searchParams.delete("managerId");
    searchParams.delete("start_date");
    searchParams.delete("end_date");
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
              className={
                !errors.name ? css.formInputValid : css.formInputNotValid
              }
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
              className={
                !errors.surname ? css.formInputValid : css.formInputNotValid
              }
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
              className={
                !errors.email ? css.formInputValid : css.formInputNotValid
              }
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
              className={
                !errors.phone ? css.formInputValid : css.formInputNotValid
              }
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
              className={
                !errors.age ? css.formInputValid : css.formInputNotValid
              }
              type="number"
              placeholder={"age"}
              {...register("age")}
              onChange={handleInputChange}
            />
          </div>
          <div className={css.formInputWrapper}>
            <select
              className={css.formInputValid}
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
            <select
              className={css.formInputValid}
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
            <select
              className={css.formInputValid}
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
            <select
              className={css.formInputValid}
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
            <select
              className={css.formInputValid}
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
            {errors.start_date && (
              <span className={css.errorsBlock}>
                {errors.start_date.message}
              </span>
            )}
            <input
              className={css.datepickerInput}
              type="text"
              placeholder="Start date"
              {...register("start_date")}
              onChange={handleInputChange}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
            />
          </div>
          <div className={css.formInputWrapper}>
            {errors.end_date && (
              <span className={css.errorsBlock}>{errors.end_date.message}</span>
            )}
            <input
              className={css.datepickerInput}
              type="text"
              placeholder="End date"
              {...register("end_date")}
              onChange={handleInputChange}
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
            />
          </div>
        </div>
        <button
          className={css.formClear}
          type={"button"}
          onClick={clearFilterForm}
          style={{ backgroundColor: "green", border: "none" }}
        >
          <FontAwesomeIcon
            icon={faRotateRight}
            style={{ color: "#fafafa", marginRight: "3px" }}
          />
        </button>
      </form>
      <div className={css.formActions}>
        <label className={css.formAction}>My</label>
        <input
          id={"myOrders"}
          className={css.formAction}
          type={"checkbox"}
          name={"My"}
          value={"My"}
          checked={isChecked || !!searchParams.get("managerId")}
          onChange={filterMy}
          style={{ marginLeft: "1px", marginRight: "20px" }}
        />

        <DownloadExcel />
      </div>
    </div>
  );
};

export { OrdersFiltrationForm };
