const mongoose = require('mongoose')

const Department = mongoose.model('Department')

exports.getAll = async (req, res) => {
    const departments = await Department.find({})

    res.json({departments})
}