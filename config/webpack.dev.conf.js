const merge = require('webpack-merge');
const webpack = require('webpack');
const baseConf = require('./webpack.base.conf');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = merge(baseConf, {
    plugins: [
        new LiveReloadPlugin({
            appendScriptTag: true
        }),
        new webpack.LoaderOptionsPlugin({ //压缩css部分
            minimize: true
        }),
    ]
});