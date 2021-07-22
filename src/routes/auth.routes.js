const express = require('express')
const router = express.Router()

const authServices = require('@services/auth.services')
const authRequiredMiddleware = require('@middlewares/authRequired')

router.get('/state', authServices.state)
router.get('/logout', authRequiredMiddleware, authServices.logout)

module.exports = router
