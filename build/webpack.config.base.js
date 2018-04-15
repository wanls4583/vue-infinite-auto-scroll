let utils = require('./utils');

module.exports = {
    resolve: {
        modules: [
            utils.resolve('src'),
            utils.resolve('node_modules')
        ],
        alias: {
            src: 'src'
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
    }
}
