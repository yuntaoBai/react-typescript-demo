process.env.BABEL_ENV = 'production'

const webpack = require('webpack')
const webpackConfig = require('../config/webpack.config')

const config = webpackConfig(process.env.NODE_ENV)

const compiler = webpack(config)
compiler.run((err, stats) => {
    if (err) {
        if (!err.message) {
          console.log(err)
        }
    } else {
        stats.toJson({ all: false, warnings: true, errors: true })
    }
})

