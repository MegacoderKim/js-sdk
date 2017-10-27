var Webpack = require('webpack');
var fs = require('fs');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var path = require('path');

var mainPath = path.resolve(__dirname, 'src', 'ht-data.ts');
var nodeConfig = require('./webpack.config.bundle');

var browserSpecConfig = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'ht-data_browser.js',
        library: "htData",
        libraryTarget: "umd"
    },
    externals: [
        {
            'moment-mini': {
                commonjs: 'moment',
                commonjs2: 'moment',
                amd: 'moment',
                root: 'moment'
            },
            'ht-utils': {
                commonjs: 'htUtils',
                commonjs2: 'htUtils',
                amd: 'htUtils',
                root: 'htUtils'
            },
            'underscore': {
                commonjs: 'underscore',
                commonjs2: 'underscore',
                amd: 'underscore',
                root: '_'
            }
        }
    ],
    plugins: [
        new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // new Webpack.IgnorePlugin(/moment-mini$/),
        // new Webpack.IgnorePlugin(/underscore$/),
        // new BundleAnalyzerPlugin({analyzerPort: 8088})
    ]
};

var browserConfig = Object.assign({}, nodeConfig, browserSpecConfig);

module.exports = [nodeConfig, browserConfig];