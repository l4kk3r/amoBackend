const express = require('express')
const router = express.Router()

const hospitalServices = require('./hospital.services')

router.get('/', hospitalServices.getAll)

module.exports = router