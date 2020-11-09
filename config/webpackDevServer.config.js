const paths = require('./paths')
const apiMocker = require('mocker-api')

module.exports = {
    contentBase: paths.buildPath,
    host: process.env.HOST || '0.0.0.0',
    hot: true,
    open: false,
    before(app){
        apiMocker(app, paths.mockPath)
    }
}