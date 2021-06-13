exports.update = async (req, res) => {
    res.send('s')
}

exports.get = (req, res) => {
    res.json({ user: req.body })
}