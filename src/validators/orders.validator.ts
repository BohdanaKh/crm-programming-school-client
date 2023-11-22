import Joi from "joi";

import { ECourse, ECourseFormat, ECourseType, EStatus } from "../interfaces";

export const ordersValidator = Joi.object({
  // group: Joi.string()
  //   .allow("")
  //   .regex(
  //     /^[a-zA-Zа-щА-ЩЬьЮюЯяЇїІіЄєҐґ0-9']+(?:-[a-zA-Zа-щА-ЩЬьЮюЯяЇїІіЄєҐґ0-9']+)?$/,
  //   )
  //   .messages({
  //     "string.pattern.base":
  //       "Group name may consist of uppercase and lowercase Latin letters or Ukrainian letters, digits and hyphen.",
  //   }),
  group: Joi.string()
    .allow("")
    .regex(/^[a-zA-Zа-щА-ЩЬьЮюЯяЇїІіЄєҐґ0-9'\s-]+$/)
    .messages({
      "string.pattern.base":
        "Allowed Latin letters, Ukrainian letters,digits, hyphen, apostrophe and whitespace.",
    }),
  name: Joi.string()
    .allow("")
    .regex(/^[a-zA-Zа-щА-ЩЬьЮюЯяЇїІіЄєҐґ'\s-]+$/)
    .messages({
      "string.pattern.base":
        "Allowed Latin letters, Ukrainian letters, hyphen, apostrophe and whitespace.",
    }),
  surname: Joi.string()
    .allow("")
    .regex(/^[a-zA-Zа-щА-ЩЬьЮюЯяЇїІіЄєҐґ'\s-]+$/)
    .messages({
      "string.pattern.base":
        "Allowed Latin letters, Ukrainian letters, hyphen, apostrophe and whitespace.",
    }),
  email: Joi.string()
    .allow("")
    .regex(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    )
    .messages({
      "string.pattern.base":
        "Email may start of any combination of letters and numbers, a few specific special characters, followed by the “@” symbol, and then standard domain name and TLD",
    }),
  phone: Joi.string()
    .allow("")
    .regex(
      /^\s*(?:\+?(\d{1,3}))?([-. (]*(\d{3})[-. )]*)?((\d{3})[-. ]*(\d{2,4})(?:[-.x ]*(\d+))?)\s*$/,
    )
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
