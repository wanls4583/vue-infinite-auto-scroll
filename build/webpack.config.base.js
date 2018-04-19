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
                    loaders: {
                        'scss': 'style-loader!css-loader!sass-loader',
                        'sass': 'style-loader!css-loader!sass-loader'
                    }
                }
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]'
                }
            }
        ]
    }
}