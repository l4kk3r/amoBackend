const mongoose = require('mongoose')
const User = mongoose.model("User")
const bcrypt = require('bcryptjs')
const chalk = require('chalk')
const jwt = require('jsonwebtoken')

const saltRounds = 10

exports.register = async (req, res) => {
    try {
        const userData = req.body
        
        const userWithSameEmail = await User.findOne({
                email: userData.email
        })
        if (userWithSameEmail) {
            return res.status(409).json({ message: 'User with this email already exists' })
        } else {
            const hashedPassword = await bcrypt.hash(userData.password, saltRounds)
            userData.password = hashedPassword
            await User.create(userData)
        }

        const user = await User.findOne({
            email: userData.email
        })
        const jwtToken = jwt.sign({ user }, process.env.JWT_SECRET)
        
        res.json({ message: 'User created!', jwtToken })
    } catch {
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        let user = await User.findOne({
           email
        }).select("+password")
        if (! user) return res.status(422).json({ message: 'User with this email does not exist'})

        const hashedPassword = user.password
        const isPasswordCorrect = await bcrypt.compareSync(password, hashedPassword)
        if (!isPasswordCorrect) return res.status(422).json({ message: 'User with this email or password does not exist'})
        console.log("USER IS", user)
        delete user.password
    
        const jwtToken = jwt.sign({ user }, process.env.JWT_SECRET)
    
        res.json({jwtToken})
    } catch(e) {
        console.log(e)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}
