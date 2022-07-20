const indexCtrl = {}

indexCtrl.home = (req, res) => {
    res.send('<h1>Home</h1> <a href="/auth/google">Authorize with Google</a>');
}

indexCtrl.error = (req, res) => {
    res.send('<h1>Error</h1>')
}

module.exports = indexCtrl