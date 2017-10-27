var Webpack = require('webpack');
var fs = require('fs');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var path = require('path');
var webpackRxjsExternals = require('webpack-rxjs-externals');
var mainPath = path.resolve(__dirname, 'src', 'ht-map.ts');
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
        filename: 'ht-map.js',
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
    externals: [
        'ht-js-utils',
        'ht-js-data',
        'ht-models',
        'moment-mini',
        'leaflet',
        'underscore',
        webpackRxjsExternals(),
        /^rxjs\/.+$/
    ],
    plugins: [
        new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // new WebpackShellPlugin({onBuildStart:['echo "Webpack Start"'], onBuildExit:['cp -r dist ../../../ht-angular/node_modules/ht-js-map']}),
        // new WebpackShellPlugin({onBuildEnd:['cp -r src ../../../ht-angular/node_modules/ht-js-map']}),
        // new BundleAnalyzerPlugin({analyzerPort: 8088})
    ]
};

module.exports = config;