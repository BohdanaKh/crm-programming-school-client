import type { ECourse, ECourseFormat, ECourseType, EStatus } from "./enums";

export interface IFilter {
  name: string;
  surname: string;
  email: string;
  phone: string;
  age: number;
  course: ECourse;
  course_format: ECourseFormat;
  course_type: ECourseType;
  status: EStatus;
  group: string;
}
