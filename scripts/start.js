process.env.NODE_ENV = 'development'

const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const webpackConfig = require('../config/webpack.config')
const serverConfig = require('../config/webpackDevServer.config')

const config = webpackConfig(process.env.NODE_ENV)

const compiler = webpack(config)

const PORT = parseInt(process.env.PORT, 10) || 3001;
const HOST = process.env.HOST || '0.0.0.0';

const devServer = new WebpackDevServer(compiler, serverConfig)

devServer.listen(PORT, HOST, err => {
    if (err) {
        return console.log(err);
    }
})
