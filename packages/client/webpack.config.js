var Webpack = require('webpack');
var fs = require('fs');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var webpackRxjsExternals = require('webpack-rxjs-externals');
var path = require('path');
var WebpackShellPlugin = require('webpack-shell-plugin');
var mainPath = path.resolve(__dirname, 'src', 'ht-client.ts');
var TypedocWebpackPlugin = require('typedoc-webpack-plugin');

var nodeConfig = require('./webpack.config.bundle.js');

var browserSpecConfig = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'ht-client_browser.js',
        library: "htClient",
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
            'ht-js-utils': {
                commonjs: 'htUtils',
                commonjs2: 'htUtils',
                amd: 'htUtils',
                root: 'htUtils'
            },
            'ht-js-data': {
                commonjs: 'htData',
                commonjs2: 'htData',
                amd: 'htData',
                root: 'htData'
            },
            'underscore': {
                commonjs: 'underscore',
                commonjs2: 'underscore',
                amd: 'underscore',
                root: '_'
            }
        },
        webpackRxjsExternals(),
    ],
    plugins: [
        new Webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        // new BundleAnalyzerPlugin({analyzerPort: 8088})
    ]
};

var browserConfig = Object.assign({}, nodeConfig, browserSpecConfig);

module.exports = [browserConfig, nodeConfig];