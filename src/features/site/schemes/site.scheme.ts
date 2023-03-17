import Joi, { ObjectSchema } from 'joi';
import { BadRequestError } from '@globals/helpers/errorHandler';

const createSchema: ObjectSchema = Joi.object().keys({
    name: Joi.string().required().messages({
        'any.required': 'Email is required',
        'string.empty': 'Email is required',
    }),
    description: Joi.string().required().messages({
        'any.required': 'Password is required',
        'string.empty': 'Password is required',
    }),
    image: Joi.string().required().messages({
        'any.required': 'Image is required',
        'string.empty': 'Image is required',
    }),
    address: Joi.string().required().messages({
        'any.required': 'Address is required',
        'string.empty': 'Address is required',
    }),
    phone_no: Joi.string().required().messages({
        'any.required': 'Phone no is required',
        'string.empty': 'Phone no is required',
    }),
    social_fb: Joi.string().messages({
        'any.required': 'Phone no is required',
    }),
    social_insta: Joi.string().messages({
        'any.required': 'Phone no is required',
    })
});

export default function validate(phone_number: string, social_fb: string, social_insta: string): void {
    if (!phone_number.match('^\+[0-9]{1,2}-[0-9]{10}$'))
        throw new BadRequestError('Invalid phone number');
    if (!social_fb.match('^https:\/\/www.facebook.com\/[A-Za-z0-9\.]+$'))
        throw new BadRequestError('Invalid fb link');
    if (!social_insta.match('^https:\/\/www.instagram.com\\/[A-Za-z0-9\\.]+$'))
        throw new BadRequestError('Invalid insta link');
}

export { createSchema };