const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const chalk = require('chalk')
const jwt = require('jsonwebtoken')

const saltRounds = 10

exports.register = async (req, res) => {
    try {
        const user = req.body
        
        const userWithSameEmail = await User.findOne({
                email: user.email
        })
        if (userWithSameEmail) {
            return res.status(409).json({ message: 'User with this email already exists' })
        } else {
            const hashedPassword = await bcrypt.hash(req.body.password, saltRounds)
            user.password = hashedPassword
            await User.create(user)
        }

        const userFromDB = await User.findOne({
            email: user.email
        })
        const jwtToken = jwt.sign({ userFromDB }, process.env.JWT_SECRET)
        
        res.json({ message: 'User created!', jwtToken })
    } catch {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await User.findOne({
           email
        })
        if (! user) return res.status(422).json({ message: 'User with this email does not exist'})

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
