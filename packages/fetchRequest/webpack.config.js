var Webpack = require('webpack');
var fs = require('fs');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var webpackRxjsExternals = require('webpack-rxjs-externals');

var path = require('path');

var mainPath = path.resolve(__dirname, 'src', 'ht-fetch-request.ts');

var nodeConfig = require('./webpack.config.bundle');

var browserSpecConfig = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'ht-fetch-request_browser.js',
        library: "htFetchRequest",
        libraryTarget: "umd"
    },
    externals: [
        {
            'ht-client': {
                commonjs: 'htClient',
                commonjs2: 'htClient',
                amd: 'htClient',
                root: 'htClient'
            }
        },
        {
            'ht-utility': {
                commonjs: 'htUtility',
                commonjs2: 'htUtility',
                amd: 'htUtility',
                root: 'htUtility'
            }
        },
        webpackRxjsExternals(),
    ],
    plugins: [
        new Webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        // new Webpack.IgnorePlugin(/moment-mini$/),
        // new Webpack.IgnorePlugin(/underscore$/),
        // new BundleAnalyzerPlugin({analyzerPort: 8088})
    ]
};

var browserConfig = Object.assign({}, nodeConfig, browserSpecConfig);

module.exports = [nodeConfig, browserConfig];