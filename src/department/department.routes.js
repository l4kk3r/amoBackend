const express = require('express')
const router = express.Router()

const departmentServices = require('./department.services')

router.get('/', departmentServices.getAll)

module.exports = router