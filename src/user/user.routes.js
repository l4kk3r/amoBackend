const express = require('express')
const router = express.Router()

const userMiddlewares = require('./user.middlewares')
const userServices = require('./user.services')

router.get('/', userMiddlewares.authenticateToken, userServices.get)
router.put('/', userMiddlewares.authenticateToken, userServices.update)

module.exports = router