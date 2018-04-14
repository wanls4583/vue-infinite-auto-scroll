var path = require('path');
const webpack = require('webpack')
const version = require('../package.json').version
// 拼接我们的工作区路径为一个绝对路径
function resolve(dir) {
    return path.join(__dirname, '..', dir);
}
module.exports = {
    entry: resolve('src/index.js'),
    output: {
        path: resolve('dist'),
        filename: 'vue-infinite-auto-scroll.min.js',
        library: 'vueInfiniteAutoScroll',
        // libraryExport和libraryTarget必须，否则vue导入时报template undefined错误
        libraryExport: 'default',
        libraryTarget: 'umd'
    },
    resolve: {
        modules: [
            resolve('src'),
            resolve('node_modules')
        ],
        alias: {
            src: 'src',
            vue$: 'vue/dist/vue.common.js'
        },
        extensions: ['.js', '.json', '.vue']
    },
    module: {
        rules: [{
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    loaders: {}
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: '"production"'
            },
            VERSION: JSON.stringify(version)
        }),
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: false,
            compress: {
                warnings: false,
                drop_debugger: true,
                drop_console: true
            }
        })
    ]
}
