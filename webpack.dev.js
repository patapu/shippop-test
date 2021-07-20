const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
const Dotenv = require('dotenv-webpack');
const WebpackShellPlugin = require('webpack-shell-plugin');

module.exports = merge(common, {
    mode: 'development',
    plugins: [
        new WebpackShellPlugin({
            onBuildEnd: ['nodemon build/index.js --watch build']
        })
    ]
});