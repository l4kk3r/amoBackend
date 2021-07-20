const express = require('express')
const router = express.Router()

const doctorServices = require('@services/doctor.services')

router.get('/:url', doctorServices.getDoctorById)

module.exports = router
