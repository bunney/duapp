const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const webpackHelper = require('../libs/readallhtmlname');
const HtmlAfterWebapckPlugin = require('../libs/htmlAfterWebpackPlugin')

const staticDir = path.join(__dirname, '../web/views');

let plugins = [
    new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: 3,
    }),
    new webpack.optimize.ModuleConcatenationPlugin(),
    new ExtractTextPlugin('css/[name]-[hash:5].css', {
        allChunks: true
    }),
    new HtmlAfterWebapckPlugin({}),
];

const chunks = {
    layout: ['vendor', 'layout'],
    book: ['book'],
    index: ['index']
}

webpackHelper.readAllHtml(staticDir).forEach(fileMap=>{
    plugins.push(
        new HtmlWebpackPlugin({
            template: path.join(__dirname, `../web/views/${fileMap.dir}/pages/${fileMap.filename}.html`),
            filename: path.join(__dirname, `../build/views/${fileMap.dir}/pages/${fileMap.filename}.html`),
            inject: false,
            chunks: chunks[fileMap.filename],
        })
    );
});

webpackHelper.getWidget(path.join(staticDir, '../widget')).forEach(fileMap=>{
    plugins.push(
        new HtmlWebpackPlugin({
            template: path.join(fileMap.baseDir, fileMap.name),
            filename: path.join(__dirname, '../build/widget', fileMap.dir, fileMap.name),
            inject: false,
            chunks: [],
        })
    )
});

module.exports = {
    entry: webpackHelper.getEntry(staticDir),
    output: {
        path: path.join(__dirname, '../build/assets'),
        filename: 'js/[name]-[hash:5].js',
        publicPath:'/',
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        "presets": ['es2015', 'stage-0'],
                        "plugins": ['transform-runtime']
                    },
                },
                exclude: [path.resolve(__dirname, '../node_modules')],
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                    }],
                })
            },
            {
                test: /\.less$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader",
                    use: [{
                        loader: "css-loader",
                    },{
                        loader: 'less-loader',
                    }]
                })
            },
            {
                test: /\.(png|jpg|gif|eot|woff|woff2|ttf|svg|otf)$/,
                loader: 'file-loader?name=img/[name].[ext]'
            }
        ]
    },
    plugins,
};