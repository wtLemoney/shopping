/*
 * @Author: wt 
 * @Date: 2018-07-16 10:35:33 
 * @Last Modified by: wt
 * @Last Modified time: 2018-07-16 11:58:40
 */
var webpack = require('webpack');// 22行有个webpack
var extractTextPlugin = require('extract-text-webpack-plugin');//提取css单独打包

var config = {
    entry: {
        'common' : ['./src/page/common/index.js'],
        'index' : ['./src/page/index/index.js'],
        'login' : ['./src/page/login/index.js']
    },
    output: {
        path: './dist',
        filename: 'js/[name].js'
    },
    externals: {// 外部依赖的声明
        'jquery': 'window.jQuery'
    },
    module: {
        loaders: [
              // {test:/\.css$/,loader:'style-loader!css-loader'}, // 将css打包到js中了
            {test: /\.css$/, loader: extractTextPlugin.extract("style-loader","css-loader")}
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ // 公共模块配置
            name: 'common',
            filename: 'js/base.js',// 基于path: './dist'底下的目录
        }),
        new extractTextPlugin("css/[name].css"),// css单独打包
    ]
}

module.exports = config;