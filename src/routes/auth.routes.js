const express = require('express')
const mongoose = require('mongoose')
const User = mongoose.model("User")
const Doctor = mongoose.model("Doctor")
const faker = require('faker')
const router = express.Router()

const authServices = require('@services/auth.services')
const authValidators = require('@validators/auth.validators')
const authForbiddenMiddleware = require('@middlewares/authForbidden')
const authRequiredMiddleware = require('@middlewares/authRequired')

router.get('/state', authServices.state)
router.post('/register', authForbiddenMiddleware, authValidators.bind('register'), authServices.register)
router.post('/login', authForbiddenMiddleware, authValidators.bind('login'), authServices.login)
router.get('/logout', authRequiredMiddleware, authServices.logout)

module.exports = router
