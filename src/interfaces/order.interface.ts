import {ECourse, ECourseFormat, ECourseType, EStatus} from "./enums";

export interface IOrder {
    id: number,
    name: string,
    surname: string,
    email: string,
    phone: string,
    age: number,
    course: ECourse,
    course_format: ECourseFormat,
    course_type: ECourseType,
    status: EStatus,
    sum: number,
    alreadyPaid: number,
    group: string,
    created_at: Date,
    manager: string

}