var path = require('path');
var express = require('express');
var webpack = require('webpack');
var webpackConfig = require('./webpack.config.dev.js');

// 创建一个express实例
var app = express()

// 动态向入口配置中注入 webpack-hot-middleware/client
var devClient = 'webpack-hot-middleware/client';
Object.keys(webpackConfig.entry).forEach(function (name, i) {
    var extras = [devClient]
    webpackConfig.entry[name] = extras.concat(webpackConfig.entry[name])
})

// 调用webpack并把配置传递过去
var compiler = webpack(webpackConfig);

// 使用 webpack-dev-middleware 中间件
var devMiddleware = require('webpack-dev-middleware')(compiler, {
    publicPath: '/',
    stats: {
        colors: true,
        chunks: false
    }
})

var hotMiddleware = require('webpack-hot-middleware')(compiler)

// webpack插件，监听html文件改变事件
compiler.plugin('compilation', function (compilation) {
    compilation.plugin('html-webpack-plugin-after-emit', function (data, cb) {
        // 发布事件
        hotMiddleware.publish({ action: 'reload' })
        cb()
    })
})

// 注册中间件
app.use(devMiddleware)
// 注册中间件
app.use(hotMiddleware)

// app.use(express.static(path.join(__dirname, '/dist')));

// 监听 8888端口，开启服务器
app.listen(8880, function (err) {
    if (err) {
        console.log(err)
        return
    }
    console.log('Listening at http://localhost:8888')
})