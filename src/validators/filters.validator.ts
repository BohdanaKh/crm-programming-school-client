import Joi from "joi";

import { ECourse, ECourseFormat, ECourseType, EStatus } from "../interfaces";

export const filtersValidator = Joi.object({
  group: Joi.string()
    .allow("")
    .regex(/^[a-zA-Zа-щА-ЩЬьЮюЯяЇїІіЄєҐґ0-9'-]+$/)
    .messages({
      "string.pattern.base": "Allowed letters and numbers, - symbol",
    }),
  name: Joi.string()
    .allow("")
    .regex(/^[a-zA-Zа-щА-ЩЬьЮюЯяЇїІіЄєҐґ'\s-]+$/)
    .messages({
      "string.pattern.base":
        "Allowed letters, hyphen, apostrophe and whitespace.",
    }),
  surname: Joi.string()
    .allow("")
    .regex(/^[a-zA-Zа-щА-ЩЬьЮюЯяЇїІіЄєҐґ'\s-]+$/)
    .messages({
      "string.pattern.base":
        "Allowed letters, hyphen, apostrophe and whitespace.",
    }),
  email: Joi.string()
    .allow("")
    .regex(/^[a-z0-9@.]+$/)
    .messages({
      "string.pattern.base": "Allowed letters and numbers, email symbols",
    }),
  phone: Joi.string()
    .allow("")
    .regex(/^[0-9,()+\s-]+$/)
    .messages({
      "string.pattern.base": "Only numeric digits, phone specific symbols.",
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
      "number.base": " defined values or null",
    }),
  sum: Joi.number()
    .allow(null)
    .min(0)
    .messages({ "number.base": "numeric characters" }),
  alreadyPaid: Joi.number().allow(null).min(0).messages({
    "string.base": "numeric characters",
  }),
  course: Joi.string()
    .allow("")
    .valid(...Object.values(ECourse))
    .messages({
      "string.base": " defined values or null",
    }),
  course_format: Joi.string()
    .allow("")
    .valid(...Object.values(ECourseFormat))
    .messages({
      "string.base": " defined values or null",
    }),
  course_type: Joi.string()
    .allow("")
    .valid(...Object.values(ECourseType))
    .messages({
      "string.base": " defined values or null",
    }),
});
