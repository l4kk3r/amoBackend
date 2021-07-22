const express = require('express')
const router = express.Router()

const userAuthServices = require('@services/user.auth.services')
const userAuthValidators = require('@validators/user.auth.validators')
const authForbiddenMiddleware = require('@middlewares/authForbidden')

router.post('/auth/register', authForbiddenMiddleware, userAuthValidators.bind('register'), userAuthServices.register)
router.post('/auth/login', authForbiddenMiddleware, userAuthValidators.bind('login'), userAuthServices.login)

module.exports = router
