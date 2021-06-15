const mongoose = require('mongoose')

const HospitalType = mongoose.model('HospitalType')

exports.getAll = async (req, res) => {
    const hospitaltypes = await HospitalType.find({})

    res.json({hospitaltypes})
}