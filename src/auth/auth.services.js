const User = require('@src/user/user.entity')
const bcrypt = require('bcryptjs')
const chalk = require('chalk')

const saltRounds = 10

exports.register = async (req, res) => {
    const user = req.body
    const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
    user.password = hashedPassword
    try {
        await User.create(user)
    } catch {
        return res.status(409).json({ message: 'User with this email already exists' })
    }
    res.json({ message: 'User created!' })
}