const mongoose = require('mongoose')

const { Schema } = mongoose

const countrySchema = new Schema({
    name: {
        type: String,
        required: true
    }
})

mongoose.model('Country', countrySchema)