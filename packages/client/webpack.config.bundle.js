var Webpack = require('webpack');
var fs = require('fs');
var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
var webpackRxjsExternals = require('webpack-rxjs-externals');
var path = require('path');
var WebpackShellPlugin = require('webpack-shell-plugin');
var mainPath = path.resolve(__dirname, 'src', 'ht-client.ts');
var TypedocWebpackPlugin = require('typedoc-webpack-plugin');
const rxPaths = require('rxjs/_esm5/path-mapping');
var nodeConfig = {
    devtool: 'source-ht-map, inline-source-ht-map',
    resolve: {
        modules: ['node_modules'],
        extensions: ['.webpack.js', '.web.js', '.ts', '.js', '.png'],
        alias: rxPaths()
    },
    entry: mainPath,
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'ht-client.js',
        library: "htClient",
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
        'ht-utility',
        'ht-data',
        'moment-mini',
        'underscore',
        webpackRxjsExternals(),
        /^rxjs\/.+$/
    ],
    plugins: [
        new Webpack.LoaderOptionsPlugin({
            minimize: true,
            debug: false
        }),
        new Webpack.optimize.ModuleConcatenationPlugin(),
        new Webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
        // new WebpackShellPlugin({onBuildStart:['echo "Webpack Start"'], onBuildExit:['cp -r dist ../../../ht-angular/node_modules/ht-client']}),
        // new WebpackShellPlugin({onBuildEnd:['cp -r src ../../../ht-angular/node_modules/ht-client']}),
        // new Webpack.IgnorePlugin(/moment-mini$/),
        // new Webpack.IgnorePlugin(/underscore$/),
        new BundleAnalyzerPlugin({analyzerPort: 8088})
    ]
};

module.exports = nodeConfig;