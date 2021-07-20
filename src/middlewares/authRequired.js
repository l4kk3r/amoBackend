const mongoose = require('mongoose')
const User = mongoose.model('User')

module.exports = async (req, res, next) => {
    const userId = req.session && req.session.userId

    if (!userId) return res.status(403).json({ message: 'User not logged in' })

    const userFromDb = await User.findById(userId)

    if (!userFromDb) return req.session.destroy(), res.status(403).json({ message: 'User not logged in' })

    req.user = userFromDb

    next()
}