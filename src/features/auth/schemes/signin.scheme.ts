import Joi, { ObjectSchema } from 'joi';

const signinSchema: ObjectSchema = Joi.object().keys({
    email: Joi.string().email().required().messages({
        'any.required': 'Email is required',
        'string.empty': 'Email is required',
    }),
    password: Joi.string().required().messages({
        'any.required': 'Password is required',
        'string.empty': 'Password is required',
    }),
});

export { signinSchema };