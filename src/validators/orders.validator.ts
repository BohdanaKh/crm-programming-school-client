import Joi from 'joi';

export const ordersValidator = Joi.object({
    name: Joi.string().regex(/^[A-Za-zА-Яа-яЁё\s]+$/).messages({
        'string.pattern.base': 'Name may consist of uppercase and lowercase Latin letters (A-Za-z), uppercase and lowercase Cyrillic letters (А-Яа-я), Cyrillic soft sign (Ёё), and whitespace characters.'
    }),
    surname: Joi.string().regex(/^[A-Za-zА-Яа-яЁё\s]+$/).messages({
        'string.pattern.base': 'Surname may consist of uppercase and lowercase Latin letters (A-Za-z), uppercase and lowercase Cyrillic letters (А-Яа-я), Cyrillic soft sign (Ёё), and whitespace characters.'
    }),
    email: Joi.string().regex(/^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/).messages({
        'string.pattern.base': 'Email may start of any combination of A-Z (both upper and lowercase) and numbers, and allowing a few specific special characters, followed by the “@” symbol, and then allowing for a standard domain name and TLD after this'
    }),
    phone: Joi.string().regex(/^\+\d{1,3}(\s|\(|\)|-)?\d+$/).messages({
        'string.pattern.base': 'The phone number must start with a plus sign (+) followed by one to three numeric digits representing the country code, allows for zero or one occurrence of a space, an opening parenthesis, a closing parenthesis, or a hyphen, and must end with one or more numeric digits.'
    }),
    age: Joi.number().messages({
        'number.pattern.base': 'Age only consists of numeric characters'
    }),

});