var path = require("path");
var webpack = require("webpack");
module.exports = {
    entry: ['babel-polyfill', './src/main.ts'],
    output: {
        path: path.join(__dirname, "dist"),
        publicPath: "dist/",
        filename: "typescript_base_frontend.js"
    },
    devtool: "source-map",
    cssnext: {
        browsers: "last 2 versions"
    },
    resolve: {
        // Add `.ts` and `.tsx` and `.css` as a resolvable extension.
        extensions: ['', '.webpack.js', '.web.js', '.ts', '.tsx', '.js', '.css']
    },
    plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ],
    module: {
        loaders: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {test: /\.tsx?$/, loader: 'babel-loader?{plugins:["transform-runtime"],presets:["es2015"]}!ts-loader'},
            // all files with a `.css` extension will be handled by `style`, `css` loaders
            {test: /\.css$/, loader: 'style!css!cssnext-loader'}
        ]
    }
};