/*
 * @Author: wt 
 * @Date: 2018-07-16 10:35:33 
 * @Last Modified by: wt
 * @Last Modified time: 2018-07-16 12:52:43
 */
var webpack = require('webpack');// 22行有个webpack
var extractTextPlugin = require('extract-text-webpack-plugin');//提取css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin');//处理HTML

// 获取html-webpack-plugin参数
var getHtmlConfig = function(name) {
    return {
        template: './src/view/'+name+'.html', // 源模板文件
        filename: 'view/'+name+'.html', // 输出文件
        inject: true, // 所有的 javascript 资源将被放置到 body 元素的底部
        hash: true, // 生成hash添加在引入文件地址的末尾
        chunks: ['common',name] // entry中设置多个js时，在这里指定引入的js，如果不设置则默认全部引入
    }
}

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
            {test: /\.css$/, loader: extractTextPlugin.extract("style-loader","css-loader")},
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
        ]
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ // 公共模块配置
            name: 'common',
            filename: 'js/base.js',// 基于path: './dist'底下的目录
        }),
        new extractTextPlugin("css/[name].css"),// css单独打包
        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index')),
        new HtmlWebpackPlugin(getHtmlConfig('login')),
    ]
}

module.exports = config;