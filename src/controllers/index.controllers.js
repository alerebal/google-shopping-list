const indexCtrl = {}

indexCtrl.home = (req, res) => {
    res.render('partials/items-list')
}

indexCtrl.error = (req, res) => {
    res.send('<h1>Error</h1>')
}


module.exports = indexCtrl