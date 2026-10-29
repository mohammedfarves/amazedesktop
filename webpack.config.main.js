// Copyright (c) 2016-present Mattermost, Inc. All Rights Reserved.
// See LICENSE.txt for license information.
// Copyright (c) 2015-2016 Yuya Ochiai

const CopyPlugin = require('copy-webpack-plugin');
const {merge} = require('webpack-merge');

const base = require('./webpack.config.base');

module.exports = merge(base, {
    entry: {
        index: './src/main/app/index.ts',
    },
    externals: {
        'macos-notification-state': 'require("macos-notification-state")',
        'windows-focus-assist': 'require("windows-focus-assist")',

        // registry-js loads its native binary at import time and throws if it is missing
        // (e.g. a Windows build packaged on another OS); fall back to its no-op behaviour.
        'registry-js': '(() => { try { return require("registry-js"); } catch (e) { return {HKEY: {}, enumerateValues: () => [], enumerateValuesSafe: () => []}; } })()',
        'cf-prefs': 'require("cf-prefs")',
        koffi: 'require("koffi")',
    },
    externalsPresets: {
        electronMain: true,
    },
    module: {
        rules: [{
            test: /\.node$/,
            loader: 'node-loader',
        }],
    },
    plugins: [
        new CopyPlugin({
            patterns: [{
                from: 'assets/**/*',
                context: 'src',
            }, {

                // Amaze One About/Privacy/Terms pages, served via mattermost-desktop://renderer/brand/
                from: 'assets/brand',
                to: 'renderer/brand',
                context: 'src',
            }],
        }),
    ],
    node: {
        __filename: true,
        __dirname: true,
    },
    target: 'electron-main',
});
