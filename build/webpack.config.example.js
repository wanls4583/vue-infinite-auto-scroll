let webpackBase = require('./webpack.config.base');
let utils = require('./utils');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('deep-assign');

const config = merge(webpackBase,{
	entry: utils.resolve('example-src/index.js'),
    output: {
        path: utils.resolve('example'),
        filename: 'example.js',
    },
    plugins: [
    	new HtmlWebpackPlugin({
    		template: utils.resolve('example-src/template.html')
    	})
    ]
})
module.exports = config;