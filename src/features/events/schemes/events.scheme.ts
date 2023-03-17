import Joi, { ObjectSchema } from 'joi';
import { BadRequestError } from '@globals/helpers/errorHandler';

const createSchema: ObjectSchema = Joi.object().keys({
    name: Joi.string().required().messages({
        'any.required': 'Name is required',
        'string.empty': 'Name is required',
    }),
    description: Joi.string().required().messages({
        'any.required': 'Description is required',
        'string.empty': 'Description is required',
    }),
    image: Joi.string().required().messages({
        'any.required': 'Image is required',
        'string.empty': 'Image is required',
    })
});

export { createSchema };