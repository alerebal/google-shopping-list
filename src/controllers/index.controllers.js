const indexCtrl = {}

indexCtrl.home = (req, res) => {
    res.send('<h1>Home</h1>');
}

module.exports = indexCtrl