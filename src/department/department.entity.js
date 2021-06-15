const mongoose = require('mongoose')

const { Schema } = mongoose

const departmentSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    nameTranslit: {
        type: String
    }
}, { versionKey: false })

departmentSchema.pre('save', async function (next) {
    const depratment = this

    if (!depratment.isModified('name')) return next();

    const nameTranslit = depratment.name.trim().replace(/ /g, '-').replace(/&/g, 'and').replace(/\//g, 'or').toLowerCase()

    depratment.nameTranslit = nameTranslit
    next()
})


mongoose.model('Department', departmentSchema)