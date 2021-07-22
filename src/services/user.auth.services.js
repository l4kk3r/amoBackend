const mongoose = require('mongoose')
const User = mongoose.model("User")

exports.register = async (req, res) => {
    try {

        const userData = req.body
        
        const userWithSameEmail = await User.findOne({
                email: userData.email
        })
        if (userWithSameEmail) return res.status(409).json({ message: 'User with this email already exists' })

        const newUser = new User(userData)
        await newUser.save()

        const user = await User.findOne({
            email: userData.email
        })
        
        req.session.userType = 'user'
        req.session.userId = user._id
        
        res.json({ message: 'User created!' })
    } catch(e) {
        console.log(e)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        let user = await User.findOne({
           email
        }).select("+password")
        if (!user) return res.status(422).json({ message: 'User with this email does not exist'})

        const isPasswordCorrect = await user.comparePassword(password)
        if (!isPasswordCorrect) return res.status(422).json({ message: 'User with this email or password does not exist'})
        
        req.session.userType = 'user'
        req.session.userId = user._id
    
        res.json({ message: 'User logged in' })
    } catch(e) {
        console.log(e)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}