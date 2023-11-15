import Joi from "joi";

export const authValidator = Joi.object({
  email: Joi.string()
    .regex(
      /^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
    )
    .messages({
      "string.pattern.base":
        "Email may start of any combination of A-Z (both upper and lowercase) and numbers, and allowing a few specific special characters, followed by the “@” symbol, and then allowing for a standard domain name and TLD after this",
    })
    .required(),
  password: Joi.string()
    .regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s])\S{8,20}$/)
    .messages({
      "string.pattern.base":
        "Password must consists from 1 uppercase, 1 lowercase, 1 number, 1 non-alphanumeric. Length min 8 max 20 chs",
    }),
});
