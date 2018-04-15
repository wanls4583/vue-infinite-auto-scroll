let webpackBase = require('./webpack.config.base');
let utils = require('./utils');
const merge = require('deep-assign');
const webpack = require('webpack')
const version = require('../package.json').version

const config = merge(webpackBase,{
	entry: utils.resolve('src/index.js'),
    output: {
        path: utils.resolve('dist'),
        filename: 'vue-infinite-auto-scroll.min.js',
        library: 'vueInfiniteAutoScroll',
        // libraryExport和libraryTarget必须，否则vue导入时报template undefined错误
        libraryExport: 'default',
        libraryTarget: 'umd'
    },
    resolve: {
        alias: {
            vue$: 'vue/dist/vue.common.js'
        }
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
})

module.exports = config;