var path = require('path');
var webpack = require('webpack');

module.exports = {
    entry: './react-src/app.js',
    devtool: 'source-map',
    output: {
        path: path.join(__dirname, 'www/js'),
        filename: 'react-app.js'
    },

    module: {
        rules: [{
            test: /.js?$/,

            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env', 'react'],
                    plugins: ["transform-class-properties"]
                }
            }
        }]
    },
    plugins: [

    ],
    target: 'electron-main'

};