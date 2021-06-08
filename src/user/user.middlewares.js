const userValidators = require('./user.validators')

exports.register = (req, res, next) => {
    const options = {
        abortEarly: true, // include only first error
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    const { error, value } = userValidators.createValidator.validate(req.body, options);

    if (error) {
        return res.status(422).json({message: `${error.details[0].message}`});
    } else {
        req.body = value;
        next();
    }
}