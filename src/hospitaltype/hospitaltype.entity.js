const mongoose = require('mongoose')

const { Schema } = mongoose

const hospitalTypeSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    nameTranslit: {
        type: String
    }
}, { versionKey: false })

hospitalTypeSchema.pre('save', async function (next) {
    const hospitalType = this

    if (!hospitalType.isModified('name')) return next();

    const nameTranslit = hospitalType.name.trim().replace(/ /g, '-').replace(/&/g, 'and').replace(/\//g, 'or').toLowerCase()

    hospitalType.nameTranslit = nameTranslit
    next()
})


mongoose.model('HospitalType', hospitalTypeSchema)