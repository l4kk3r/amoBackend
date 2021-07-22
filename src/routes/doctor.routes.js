const express = require('express')
const router = express.Router()

const doctorAuthServices = require('@services/doctor.auth.services')
const doctorServices = require('@services/doctor.services')
const authForbiddenMiddleware = require('@middlewares/authForbidden')

router.post('/auth/register', authForbiddenMiddleware, doctorAuthServices.register)
router.post('/auth/login', authForbiddenMiddleware, doctorAuthServices.login)

router.put('/', doctorServices.changeInfo)

router.get('/:url', doctorServices.getDoctorById)

module.exports = router
