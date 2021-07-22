const Joi = require('joi');

const options = {
    abortEarly: true, // include only first error
    allowUnknown: true, // ignore unknown props
    stripUnknown: true // remove unknown props
}

const registerValidator = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    sex: Joi.string().valid('male', 'female').required(),
    password: Joi.string().min(6).required(),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().options({ messages: { 'any.only': 'Passwords do not match'} })
});

const loginValidator = Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required()
});

const validatorsConverter = {
    'register': registerValidator,
    'login': loginValidator
}

module.exports = async function (req, res, next) {
    try {
        const neededValidator = validatorsConverter[this]
        console.log(this)

        const filteredBody = await neededValidator.validateAsync(req.body, options);

        req.body = filteredBody

        next()
    } catch (e) {
        return res.status(422).json({message: `${e.details[0].message}`});
    }
}
