const userValidators = require('./user.validators')
const jwt = require('jsonwebtoken')

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

exports.login = (req, res, next) => {
    const options = {
        abortEarly: true, // include only first error
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    const { error, value } = userValidators.loginValidator.validate(req.body, options);

    if (error) {
        return res.status(422).json({message: `${error.details[0].message}`});
    } else {
        req.body = value;
        next();
    }
}

exports.update = (req, res, next) => {
    const options = {
        abortEarly: true, // include only first error
        allowUnknown: true, // ignore unknown props
        stripUnknown: true // remove unknown props
    };

    const { error, value } = userValidators.updateValidator.validate(req.body, options);

    if (error) {
        return res.status(422).json({message: `${error.details[0].message}`});
    } else {
        req.body = value;
        next();
    }
}

exports.authenticateToken = (req, res, next) => {
    // Необходимо отправлять заголовок вида: Authorization: Bearer TOKEN
    const authHeader = req.headers['authorization']
    const token = authHeader && authHeader.split(' ')[1]
    if (!token) return res.status(401).json({ errorMessage: 'Authorization token is required' })

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) return res.status(403).json({ errorMessage: 'Invalid token' })
        return res.send(user)
        next()
    })
}