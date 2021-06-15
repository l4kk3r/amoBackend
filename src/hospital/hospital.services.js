const mongoose = require('mongoose')

const Hospital = mongoose.model('Hospital')

const convertQuery = (param) => {
    return param.replace(/-/g, ' ').replace(/or/g, '/').replace(/and/g, '&')
}
const getFiltersFromQuery = (query) => {
    let filters = {
        country: query.country,
        department: query.department,
        hospitalType: query.type
    }
    Object.keys(filters).forEach(key => filters[key] === undefined ? delete filters[key] : filters[key] = convertQuery(filters[key])) // удаление полей с undefined значением + преобразование полей
    return filters
}

exports.getAll = async (req, res) => {
    const filters = getFiltersFromQuery(req.query)

    hospitals = await Hospital.find(filters)
    if (!hospital) return res.status(404).json({ message: 'Hospitals not found' })

    res.json({hospitals})
}

exports.getOne = async (req, res) => {
    hospital = await Hospital.findOne({ url: req.params.url }).populate('doctors')

    if (!hospital) return res.status(404).json({ message: 'Hospital not found' })

    res.json({hospital})
}