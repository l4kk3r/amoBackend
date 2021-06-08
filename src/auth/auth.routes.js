const express = require('express')
const router = express.Router()

const authServices = require('./auth.services')
const userMiddlewares = require('@src/user/user.middlewares')

router.post('/register', userMiddlewares.register, authServices.register)

module.exports = router