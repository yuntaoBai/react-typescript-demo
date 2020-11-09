const paths = require('./paths')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCSSExtractPlugin = require('mini-css-extract-plugin')

module.exports = function (env) {
    const entry = {}
    paths.indexJsPath.forEach(e => {
        entry[e.name] = [e.path].filter(Boolean)
    })
    return {
        mode: env,
        entry,
        output : {
            path: paths.buildPath,
            filename: 'static/js/[name].[contenthash:8].js'
        },
        resolve: {
            extensions: ['.ts', '.tsx', '.js', '.jsx']
        },
        module: {
            rules: [
                { 
                    test: /\.ts[x]?$/, 
                    loader: require.resolve('awesome-typescript-loader') 
                },
                {
                    test: /\.ts[x]$/, 
                    enforce: 'pre', 
                    loader:  require.resolve('source-map-loader')
                },
                {
                    test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                    loader: require.resolve('url-loader'),
                    options: {
                      limit: 1000,
                      name: 'static/img/[name].[hash:8].[ext]'
                    }
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCSSExtractPlugin.loader,
                        'css-loader', 
                        'postcss-loader'
                    ]
                },
                {
                    test: /\.less$/,
                    include: paths.srcPath,
                    use: [
                        MiniCSSExtractPlugin.loader, 
                        'css-loader', 
                        'postcss-loader', 
                        'less-loader'
                    ]
                }
            ]
        },
        plugins: [
            new CleanWebpackPlugin(),
            ...Object.keys(paths.entries).map((name) => {
                const template = name === 'm' ? paths.mHtmlPath : paths.htmlPath
                return new HtmlWebpackPlugin({
                    template,
                    filename: name + '/index.html',
                    chunks: [name],
                    hash: false,
                    minify: {
                        removeAttributeQuotes: true,
                        collapseWhitespace: true
                    }
                })
            }),
            new MiniCSSExtractPlugin({
                filename: 'css/[name].[hash:8].css',
                chunkFilename: 'css/[id].[hash:8].css'
            })
        ]
    }
}