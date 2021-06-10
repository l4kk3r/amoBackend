const mongoose = require('mongoose')

const { Schema } = mongoose

const deparmentSchema = new Schema({
    title: {
        type: String,
        required: true
    }
})

mongoose.model('Department', deparmentSchema)

const languageSchema = new Schema({
    title: {
        type: String,
        required: true
    }
})

mongoose.model('Language', languageSchema)

const detailsSchema = new Schema({
    numberOfEmployees: Number,
    numberOfDoctors: Number,
    openingHours: String,
    officeForInternationalPatients: Boolean,
    numberOfBeds: Number,
    numberOfHospitals: Number,
    languages: [{
        type: Schema.Types.ObjectId,
        ref: 'Language'
    }]
}, { _id: false })

const addressSchema = new Schema({
    address: String,
    country: String,
    zip: String,
    city: String,
    country: String,
    state: String
}, { _id: false })

const hospitalSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    details: {
        type: detailsSchema
    },
    departments:  [{
        type: Schema.Types.ObjectId,
        ref: 'Department',
    }],
    address: {
        type: addressSchema
    }
})

mongoose.model('Hospital', hospitalSchema)
