const Joi = require('joi');

exports.createValidator = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().options({ messages: { 'any.only': 'Passwords do not match'} })
});

exports.loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

exports.updateValidator = Joi.object({
    name: Joi.string().required(),
    email: Joi.string().email().required()
});
