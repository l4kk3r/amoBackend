const mongoose = require('mongoose')
const slugify = require('slugify')
const autoIncrement = require('mongoose-auto-increment');


const citySchema = new mongoose.Schema({
    _id: Number,
    title: {
        type: String,
        required: true
    },
    url: String
}, {
    versionKey: false
})

citySchema.plugin(autoIncrement.plugin, { 
    model: 'City',
    startAt: 1
})

citySchema.pre('save', async function(next) {
    const city = this;

    city.url = slugify(city.title).toLowerCase()
    
    next();
});

mongoose.model("City", citySchema)