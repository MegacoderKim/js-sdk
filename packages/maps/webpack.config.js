var Webpack = require('webpack');
var fs = require('fs');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var path = require('path');
var webpackRxjsExternals = require('webpack-rxjs-externals');
var mainPath = path.resolve(__dirname, 'src', 'ht-map.ts');
var nodeConfig = require('./webpack.config.bundle');

var browserSpecConfig = {
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'ht-maps_browser.js',
        library: "htMaps",
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
            'ht-data': {
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
        new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // new WebpackShellPlugin({onBuildStart:['echo "Webpack Start"'], onBuildExit:['cp -r dist ../../../ht-angular/node_modules/ht-js-map']}),
        // new WebpackShellPlugin({onBuildEnd:['cp -r src ../../../ht-angular/node_modules/ht-js-map']}),
        // new BundleAnalyzerPlugin({analyzerPort: 8088})
    ]
};

var browserConfig = Object.assign({}, nodeConfig, browserSpecConfig);

module.exports = [nodeConfig, browserConfig];