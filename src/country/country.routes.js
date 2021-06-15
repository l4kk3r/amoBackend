const express = require('express')
const router = express.Router()

const countryServices = require('./country.services')

router.get('/', countryServices.getAll)

module.exports = router