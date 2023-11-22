import Joi from "joi";

export const userValidator = Joi.object({
  email: Joi.string()
    .regex(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    )
    .messages({
      "string.pattern.base":
        "Email may start of letters and numbers, a few specific special characters, followed by the “@” symbol, and then a standard domain name and TLD",
    })
    .required(),
  name: Joi.string()
    .regex(/^[a-zA-Zа-щА-ЩЬьЮюЯяЇїІіЄєҐґ'\s-]+$/)
    .messages({
      "string.pattern.base":
        "Allowed Latin letters, Ukrainian letters, hyphen, apostrophe and whitespace.",
    })
    .required(),
  surname: Joi.string()
    .regex(/^[a-zA-Zа-щА-ЩЬьЮюЯяЇїІіЄєҐґ'\s-]+$/)
    .messages({
      "string.pattern.base":
        "Allowed Latin letters, Ukrainian letters, hyphen, apostrophe and whitespace.",
    })
    .required(),
});
