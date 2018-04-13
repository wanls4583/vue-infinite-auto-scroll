var path = require('path');

// 拼接我们的工作区路径为一个绝对路径
function resolve(dir) {
    return path.join(__dirname, '..', dir);
}

module.exports = {
    entry: resolve('src/index.js'),
    output: {
        path: resolve('dist'),
        // 编译输出的文件名
        filename: 'vue-infinite-scroll.js'
    },
    resolve: {
        // 自动补全的扩展名
        extensions: ['.js', '.vue', '.json'],
        modules: [
            resolve('src'),
            resolve('node_modules')
        ],
        alias: {
            'src': resolve('src')
        }
    },
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            include: [resolve('src'), resolve('test')]
        }]
    }
}
