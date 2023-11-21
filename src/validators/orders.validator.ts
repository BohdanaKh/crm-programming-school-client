import Joi from "joi";

import { ECourse, ECourseFormat, ECourseType, EStatus } from "../interfaces";

export const ordersValidator = Joi.object({
  group_create: Joi.string()
    .allow("")
    .regex(/^[a-zA-Z-а-яА-Я0-9]+(?:-[a-zA-Z-а-яА-Я0-9]+)?$/)
    .messages({
      "string.pattern.base":
        "Group name may consist of uppercase and lowercase Latin letters or Cyrillic letters, digits and '-'.",
    }),
  group: Joi.string().allow(null).messages({
    "string.base": "Group must be one of the defined values or null",
  }),
  name: Joi.string()
    .allow("")
    .regex(/^[A-Za-zА-Яа-я\s]+$/)
    .messages({
      "string.pattern.base":
        "Allowed Latin letters, Cyrillic letters and whitespace characters.",
    }),
  surname: Joi.string()
    .allow("")
    .regex(/^[A-Za-zА-Яа-я\s]+$/)
    .messages({
      "string.pattern.base":
        "Allowed uppercase and lowercase Latin letters, Cyrillic letters and whitespace characters.",
    }),
  email: Joi.string()
    .allow("")
    .regex(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    )
    .messages({
      "string.pattern.base":
        "Email may start of any combination of A-Z (both upper and lowercase) and numbers, and allowing a few specific special characters, followed by the “@” symbol, and then standard domain name and TLD after this",
    }),
  phone: Joi.string()
    .allow("")
    .regex(/^\+\d{1,3}(\s|\(|\)|-)?\d+$/)
    .messages({
      "string.pattern.base":
        "The phone number must start with a plus sign (+) followed by the country code, end with numeric digits.",
    }),
  age: Joi.string()
    .allow("")
    .regex(/^(0|[1-9][0-9]?|100)$/)
    .messages({
      "string.pattern.base": "Only numbers, min 0 max 100.",
    }),
  status: Joi.string()
    .allow("")
    .valid(...Object.values(EStatus))
    .messages({
      "number.base": "Status must be one of the defined values or null",
    }),
  sum: Joi.number()
    .allow(null)
    .min(0)
    .messages({ "number.base": "Sum only consists of numeric characters" }),
  alreadyPaid: Joi.number().allow(null).min(0).messages({
    "string.base": "This field must consist of numeric characters",
  }),
  course: Joi.string()
    .allow("")
    .valid(...Object.values(ECourse))
    .messages({
      "string.base": "Course must be one of the defined values or null",
    }),
  course_format: Joi.string()
    .allow("")
    .valid(...Object.values(ECourseFormat))
    .messages({
      "string.base": "Course format must be one of the defined values or null",
    }),
  course_type: Joi.string()
    .allow("")
    .valid(...Object.values(ECourseType))
    .messages({
      "string.base": "Course type must be one of the defined values or null",
    }),
});
