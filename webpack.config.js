var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './react-src/app.js',
    output: { 
        path: path.join(__dirname, 'www/js'), 
        filename: 'react-app.js'
    },
    devtool: 'eval-source-map',
    module: {
        loaders: [
            {
                test: /.js?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'react']
                }
            }
        ]
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin(),
        new webpack.optimize.AggressiveMergingPlugin()
    ],
    target: 'electron'

};