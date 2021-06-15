const mongoose = require('mongoose')

const Hospital = mongoose.model('Hospital')
const Country = mongoose.model('Country')

const getFiltersFromQuery = async (query) => {
    const queryData = {
        country: query.country
    }
    const filters = {}
    console.log(queryData.country.toLowerCase())
    const  countryFromDB = queryData.country ? await Country.findOne({nameTranslit: queryData.country.toLowerCase()}) : undefined
    filters.country_id = countryFromDB ? countryFromDB._id : null
    Object.keys(filters).forEach(key => filters[key] === undefined && delete filters[key]) // удаление полей с undefined значением
    return filters
}

exports.getAll = async (req, res) => {
    const filters = await getFiltersFromQuery(req.query)
    console.log(filters)

    hospitals = await Hospital.find({ 'country': filters.country_id })
    if (!hospitals.length > 0) return res.status(404).json({ message: 'Hospitals not found' })

    res.json({ hospitals })
}

exports.getOne = async (req, res) => {
    hospital = await Hospital.findOne({ url: req.params.url }).populate('doctors country')

    if (!hospital) return res.status(404).json({ message: 'Hospital not found' })

    res.json({hospital})
}