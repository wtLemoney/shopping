/*
 * @Author: wt 
 * @Date: 2018-07-16 10:42:25 
 * @Last Modified by: wt
 * @Last Modified time: 2018-07-23 20:15:33
 */
'use strict';
//var $$=require('jquery');
var _base=require('util/base.js');

var html = '<div>{{data}}</div>'
var data = {
    data : 123
}
console.log(_base.renderHtml(html, data))