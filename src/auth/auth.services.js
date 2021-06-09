const User = require('@src/user/user.entity')
const bcrypt = require('bcryptjs')
const chalk = require('chalk')
const jwt = require('jsonwebtoken')

const saltRounds = 10

exports.register = async (req, res) => {
    try {
        const user = req.body
        
        const userWithSameEmail = await User.findOne({
            where: {
                email: user.email
            }
        })
        if (userWithSameEmail) {
            return res.status(409).json({ message: 'User with this email already exists' })
        } else {
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
            user.password = hashedPassword
            await User.create(user)
        }

        res.json({ message: 'User created!' })
    } catch {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        const userFromDB = await User.findOne({
            where: {
                email
            }
        })
        if (!userFromDB) return res.status(422).json({ message: 'User with this email does not exist'})

        const user = userFromDB.dataValues

    
        const hashedPassword = user.password
        const isPasswordCorrect = await bcrypt.compareSync(password, hashedPassword)
        if (!isPasswordCorrect) return res.status(422).json({ message: 'User with this email or password does not exist'})
        
        delete user.password
    
        const jwtToken = jwt.sign({ user }, process.env.JWT_SECRET)
    
        res.json({jwtToken})
    } catch(e) {
        console.log(e)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}
