const mongoose = require('mongoose')

const Hospital = mongoose.model('Hospital')

exports.getAll = async (req, res) => {
    hospitalsN = await Hospital.find({}).populate('details.languages')

    data = {
        hospitalsN
    }

    res.json({...data})
}