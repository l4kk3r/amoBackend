const User = require('@src/user/user.entity')
const bcrypt = require('bcryptjs')
const chalk = require('chalk')

const saltRounds = 10

exports.register = async (req, res) => {
    const user = req.body
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
    user.password = hashedPassword
    await User.create(user)
    res.json({ message: 'User created!' })
}