const mongoose = require('mongoose')

const Hospital = mongoose.model('Hospital')
const Country = mongoose.model('Country')

const modelIdByNameTranslit = async (Model, nameTranslit) => {
    const object = await Model.findOne({nameTranslit})
    if (!object) return [null, `Hospitals not found`]
    return [object._id, null]
}

const getFiltersFromQuery = async (query) => {
    const filters = {}
    if (query.country) {
        const [country_id, error] = await modelIdByNameTranslit(Country, query.country)
        if (error) return [null, error]
        filters.country = country_id
    }
    return [filters, null]
}

exports.getAll = async (req, res) => {
    const [filters, error] = await getFiltersFromQuery(req.query)
    if (error) return res.status(404).json({ message: error })

    hospitals = await Hospital.find(filters).populate('country').select('-country._id')
    if (!hospitals.length > 0) return res.status(404).json({ message: 'Hospitals not found' })

    res.json({ hospitals })
} 

exports.getOne = async (req, res) => {
    hospital = await Hospital.findOne({ url: req.params.url }).populate('doctors country')

    if (!hospital) return res.status(404).json({ message: 'Hospital not found' })

    res.json({hospital})
}