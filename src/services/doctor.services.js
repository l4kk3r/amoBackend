const mongoose = require('mongoose')
const Doctor = mongoose.model("Doctor")

const isNumeric = require('../helpers/isNumeric')

exports.getDoctorById = async (req, res) => {
    try {
        const url = req.params.url.split('-')
        console.log(url)
        const doctorId = url ? url[url.length - 1] : null

        if (!isNumeric(doctorId)) return res.status(404).json({ message: 'No such doctor' })

        console.log(doctorId)

        const doctor = await Doctor.findById(doctorId).populate('country city')

        if (!doctor) return res.status(404).json({ message: 'No such doctor' })

        res.json({ doctor })
    } catch(e) {
        console.log(e)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}