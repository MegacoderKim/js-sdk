var Webpack = require('webpack');
var fs = require('fs');

var path = require('path');

var mainPath = path.resolve(__dirname, 'src', 'index.ts');

var config = {
    devtool: 'source-ht-map, inline-source-ht-map',
    resolve: {
        modules: ['node_modules'],
        extensions: ['.webpack.js', '.web.js', '.ts', '.js', '.png'],
        alias: {}
    },
    entry: mainPath,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: "htMaps",
        libraryTarget: "umd"
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [
                    { loader: 'ts-loader' }
                ]
            }
        ]
    },
    plugins: [
        new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)
    ]
};

module.exports = config;