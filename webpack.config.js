/*
 * @Author: wt 
 * @Date: 2018-07-16 10:35:33 
 * @Last Modified by: wt
 * @Last Modified time: 2018-07-27 17:14:40
 */
var webpack = require('webpack');// 22行有个webpack
var extractTextPlugin = require('extract-text-webpack-plugin');//提取css单独打包
var HtmlWebpackPlugin = require('html-webpack-plugin');//处理HTML

// 环境变量配置，dev / online
var WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';

// 获取html-webpack-plugin参数
var getHtmlConfig = function(name,title) {
    return {
        template: './src/view/'+name+'.html', // 源模板文件
        filename: 'view/'+name+'.html', // 输出文件
        title: title,
        inject: true, // 所有的 javascript 资源将被放置到 body 元素的底部
        hash: true, // 生成hash添加在引入文件地址的末尾
        chunks: ['common',name] // entry中设置多个js时，在这里指定引入的js，如果不设置则默认全部引入
    }
}


var config = {
    entry: {
        'common' : ['./src/page/common/index.js','webpack-dev-server/client?http://localhost:8088/'],
        'index' : ['./src/page/index/index.js'],
        'result' : ['./src/page/result/index.js'],
        'user-login' : ['./src/page/user-login/index.js'],
    },
    output: {
        path: './dist',
        publicPath : '/dist',
        filename: 'js/[name].js'
    },
    externals: {// 外部依赖的声明
        'jquery': 'window.jQuery'
    },
    module: {
        loaders: [
              // {test:/\.css$/,loader:'style-loader!css-loader'}, // 将css打包到js中了
            { test: /\.css$/, loader: extractTextPlugin.extract("style-loader","css-loader") },
            { test: /\.(gif|png|jpg|woff|svg|eot|ttf)\??.*$/, loader: 'url-loader?limit=100&name=resource/[name].[ext]' },
            { test: /\.string$/, loader: 'html-loader'}
        ]
    },
    resolve : {
        alias : {
            node_modules: __dirname + '/node_modules',
            util: __dirname + '/src/util',
            page: __dirname + '/src/page',
            service: __dirname + '/src/service',
            image: __dirname + '/src/image'
        }
    },
    plugins: [
        new webpack.optimize.CommonsChunkPlugin({ // 公共模块配置
            name: 'common',
            filename: 'js/base.js',// 基于path: './dist'底下的目录
        }),
        new extractTextPlugin("css/[name].css"),// css单独打包
        // html模板的处理
        new HtmlWebpackPlugin(getHtmlConfig('index', '首页')),
        new HtmlWebpackPlugin(getHtmlConfig('result', '操作结果')),
        new HtmlWebpackPlugin(getHtmlConfig('user-login', '用户登陆')),
    ]
}


if('dev' === WEBPACK_ENV){
    config.entry.common.push('webpack-dev-server/client?http://localhost:8088/');
}

module.exports = config;