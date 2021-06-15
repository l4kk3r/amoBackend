const mongoose = require('mongoose')

const Country = mongoose.model('Country')

exports.getAll = async (req, res) => {
    const countries = await Country.find({})

    res.json({countries})
}