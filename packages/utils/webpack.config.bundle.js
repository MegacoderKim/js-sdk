var Webpack = require('webpack');
var fs = require('fs');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var WebpackShellPlugin = require('webpack-shell-plugin');

var path = require('path');

var mainPath = path.resolve(__dirname, 'src', 'ht-utils.ts');

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
        filename: 'ht-utils.js',
        library: "htUtils",
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
        'underscore',
        'moment-mini'
    ],
    plugins: [
        new Webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // new WebpackShellPlugin({onBuildStart:['echo "Webpack Start"'], onBuildExit:['cp -r dist ../../../ht-angular/node_modules/ht-js-utils']}),
        // new WebpackShellPlugin({onBuildEnd:['cp -r src ../../../ht-angular/node_modules/ht-js-utils']})
        // new Webpack.IgnorePlugin(/moment-mini$/),
        // new Webpack.IgnorePlugin(/underscore$/),
        // new BundleAnalyzerPlugin({analyzerPort: 8088})
    ]
};

module.exports = config;