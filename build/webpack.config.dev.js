var webpack = require('webpack');
var path = require('path');
var merge = require('deep-assign');
var HtmlWebpackPlugin = require('html-webpack-plugin');
var webpackBaseConfig = require('./webpack.config.base');
var utils = require('./utils');

function resolve(path){
    return __dirname + '/' + path;
}

webpackBaseConfig = merge(webpackBaseConfig,{
    devtool: '#cheap-module-eval-source-map',
    entry: {example: utils.resolve('example-src/index.js')},
    output: {
        path: utils.resolve('example'),
        filename: '[name].js'
    },
    module: {
        rules:[
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]'
                }
            }
        ]
    },
    plugins: [
        //HotModule 插件在页面进行变更的时候只会重回对应的页面模块，不会重绘整个 html 文件
        //需要配合webpack-hot-middleware一起使用
        new webpack.HotModuleReplacementPlugin(),
        //在编译出现错误时，使用 NoEmitOnErrorsPlugin 来跳过输出阶段。这样可以确保输出资源不会包含错误
        new webpack.NoEmitOnErrorsPlugin(),
        // HMR shows correct file names in console on update.
        new webpack.NamedModulesPlugin()
    ]
})

module.exports = webpackBaseConfig;