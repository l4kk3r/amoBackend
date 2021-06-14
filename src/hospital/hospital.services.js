const mongoose = require('mongoose')

const Hospital = mongoose.model('Hospital')

exports.getAll = async (req, res) => {
    hospitals = await Hospital.find({})

    res.json({hospitals})
}

exports.getOne = async (req, res) => {
    hospital = await Hospital.findOne({ url: req.params.url }).populate('doctors')

    if (!hospital) return res.status(404).json({ message: 'Hospital not found' })

    res.json({hospital})
}