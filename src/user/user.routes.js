const express = require('express')
const router = express.Router()
const User = require('./user.entity')

router.get('/', async (req, res) => {
    const users = await User.findAll()
    console.log(users)
    res.send(users)
})

module.exports = router