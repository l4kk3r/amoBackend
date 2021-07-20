const mongoose = require('mongoose')

module.exports = async (req, res, next) => {
    const userId = req.session && req.session.userId

    if (userId) return res.status(405).json({ message: 'This route is forbidden for authorized users' })

    next()
}