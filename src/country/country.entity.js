const mongoose = require('mongoose')

const { Schema } = mongoose

const countrySchema = new Schema({
    name: {
        type: String,
        required: true
    },
    nameTranslit: {
        type: String
    }
})

countrySchema.pre('save', async function (next) {
    const country = this

    if (!country.isModified('name')) return next();

    const nameTranslit = country.name.trim().replace(/ /g, '-').replace(/&/g, 'and').replace(/\//g, 'or').toLowerCase()

    country.nameTranslit = nameTranslit
    next()
})


mongoose.model('Country', countrySchema)