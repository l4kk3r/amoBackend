const mongoose = require('mongoose')
const Doctor = mongoose.model("Doctor")

exports.register = async (req, res) => {
    try {

        const doctorData = req.body
        
        const doctorWithSameEmail = await Doctor.findOne({
                email: doctorData.email
        })
        if (doctorWithSameEmail) return res.status(409).json({ message: 'Doctor with this email already exists' })

        const newDoctor = new Doctor(doctorData)
        await newDoctor.save()

        const doctor = await Doctor.findOne({
            email: doctorData.email
        })
        
        req.session.userType = 'doctor'
        req.session.userId = doctor._id
        
        res.json({ message: 'Doctor registered!' })
    } catch(e) {
        console.log(e)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body

        let doctor = await Doctor.findOne({
           email
        }).select("+password")
        if (!doctor) return res.status(422).json({ message: 'Doctor with this email does not exist'})

        const isPasswordCorrect = await doctor.comparePassword(password)
        if (!isPasswordCorrect) return res.status(422).json({ message: 'Doctor with this email or password does not exist'})
        
        req.session.userType = 'doctor'
        req.session.userId = doctor._id
    
        res.json({ message: 'Doctor logged in' })
    } catch(e) {
        console.log(e)
        res.status(500).json({ message: 'Internal Server Error' })
    }
}