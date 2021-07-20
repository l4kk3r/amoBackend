const mongoose = require('mongoose')
const slugify = require('slugify')
const autoIncrement = require('mongoose-auto-increment');


const countrySchema = new mongoose.Schema({
    _id: Number,
    title: {
        type: String,
        required: true
    },
    url: String
}, {
    versionKey: false
})

countrySchema.plugin(autoIncrement.plugin, { 
    model: 'Country',
    startAt: 1
})

countrySchema.pre('save', async function(next) {
    const country = this;

    country.url = slugify(country.title).toLowerCase()

    next();
});

mongoose.model("Country", countrySchema)