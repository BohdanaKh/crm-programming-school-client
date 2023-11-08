import Joi from 'joi';

export const passwordValidator = Joi.object({
    password: Joi.string().regex(/^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\s])\S{8,20}$/).messages({
        'string.pattern.base': 'Password must consists from 1 uppercase, 1 lowercase, 1 number, 1 non-alphanumeric. Length min 8 max 20 chs'
    }).required(),
    confirm_password: Joi.string().valid(Joi.ref('password')).messages({
       'string.match':'Passwords must match'
    }).required()

});