var path = require("path");

module.exports = {
    entry: "./react-src/App.js",
    devtool: "source-map",
    output: {
        path: path.join(__dirname, "www/js"),
        filename: "khb-app.js"
    },

    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: ['babel-loader']
            }
        ]
    },
    resolve: {
        extensions: ['*', '.js', '.jsx']
    },
    plugins: [],
    target: "electron-main"
};
