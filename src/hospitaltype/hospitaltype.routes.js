const express = require('express')
const router = express.Router()

const hospitalTypeServices = require('./hospitaltype.services')

router.get('/', hospitalTypeServices.getAll)

module.exports = router