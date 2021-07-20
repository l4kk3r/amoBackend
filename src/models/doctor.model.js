const mongoose = require('mongoose')
const Country = mongoose.model('Country')
const bcrypt = require('bcryptjs')
const slugify = require('slugify')
const autoIncrement = require('mongoose-auto-increment');

const saltRounds = 10

const careerSchema = new mongoose.Schema({
    startYear: Number,
    endYear: Number,
    place: String,
    position: String     
})
const experienceSchema = new mongoose.Schema({
    startYear: Number,
    endYear: Number,
    place: String
})

const doctorSchema = new mongoose.Schema({
    _id: Number,
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    sex: {
        type: String,
        enum: ['male', 'female'],
        required: true
    },
    country: {
        type: Number,
        ref: 'Country'
    },
    city: {
        type: Number,
        ref: 'City'
    },
    adress: {
        type: String
    },
    education: {
        type: [experienceSchema]
    },
    advancedTraining: {
        type: [experienceSchema]
    },
    career: {
        type: [careerSchema]
    },
    yearsOfPractice: {
        type: String
    },
    treatments: [String],
    url: {
        type: String
    },
    password: {
        type: String,
        required: true,
        select: false
    },
}, {
    timestamps: true,
    versionKey: false
})

doctorSchema.plugin(autoIncrement.plugin, { 
    model: 'Doctor',
    startAt: 1
})

doctorSchema.pre('save', async function(next) {
    const doctor = this;

    doctor.url = (doctor.firstName + '-' + doctor.lastName + '-' + doctor._id).toLowerCase()

    if (!doctor.isModified('password')) return next();

    const hashedPassword = await bcrypt.hash(doctor.password, saltRounds)
    doctor.password = hashedPassword
    next();
});

doctorSchema.methods.comparePassword = async function(password) {
    const hashedPassword = this.password
    const isPasswordCorrect = bcrypt.compareSync(password, hashedPassword)
    return isPasswordCorrect
};

mongoose.model("Doctor", doctorSchema)