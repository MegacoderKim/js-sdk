var Webpack = require('webpack');
var fs = require('fs');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

var path = require('path');

var mainPath = path.resolve(__dirname, 'index.ts');

var config = {
    devtool: 'source-map, inline-source-map',
    resolve: {
        modules: ['node_modules'],
        extensions: ['.webpack.js', '.web.js', '.ts', '.js', '.png'],
        alias: {}
    },
    entry: mainPath,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        library: "htFetchClient",
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
        'ht-js-client',
        'ht-js-utils',
        'moment-mini',
        'underscore',
        'whatwg-fetch',
        /^rxjs\/.+$/
    ],
    plugins: [
        new Webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // new Webpack.IgnorePlugin(/moment-mini$/),
        // new Webpack.IgnorePlugin(/underscore$/),
        // new BundleAnalyzerPlugin({analyzerPort: 8088})
    ]
};

module.exports = config;