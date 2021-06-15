const mongoose = require('mongoose')

const { Schema } = mongoose

const doctorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }
}, { versionKey: false })

mongoose.model('Doctor', doctorSchema)

const detailsSchema = new Schema({
    numberOfEmployees: Number,
    numberOfDoctors: Number,
    openingHours: String,
    officeForInternationalPatients: Boolean,
    numberOfBeds: Number,
    numberOfHospitals: Number,
    languages: [String]
})
const termsAndConditionsSchema = new Schema({
    transfer: {
        type: Boolean,
        default: false
    },
    hospitalAccomodation: {
        type: Boolean,
        default: false
    },
    translator: {
        type: Boolean,
        default: false
    },
    religiousServices: {
        type: Boolean,
        default: false
    }
})

const addressSchema = new Schema({
    address: String,
    country: String,
    zip: String,
    city: String,
    country: String,
    state: String
})

const hospitalSchema = new Schema({
    title: {
        type: String,
        required: true,
        unique: true
    },
    imagePath: {
        type: String
    },
    hospitalType: {
        type: String,
        // required: true
    },
    country: {
        type: Schema.Types.ObjectId,
        ref: 'Country'
    },
    city: {
        type: String,
        // required: true
    },
    latitudue: {
        type: Number,
        // required: true
    },
    longtitude: {
        type: Number,
        // required: true
    },
    description: {
        type: String
    },
    details: {
        type: detailsSchema
    },
    departments:  [String],
    termsAndConditions: {
        type: termsAndConditionsSchema
    },
    address: {
        type: addressSchema
    },
    doctors: [{
        type: Schema.Types.ObjectId,
        ref: 'Doctor'
    }],
    url: {
        type: String,
        unique: true
    },
}, { versionKey: false })

hospitalSchema.pre('save', async function (next) {
    const hospital = this

    if (!hospital.isModified('title')) return next();

    const url = hospital.title.trim().replace(/ /g, '-').toLowerCase()

    hospital.url = url
    next()
})

mongoose.model('Hospital', hospitalSchema)

