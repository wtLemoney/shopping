require('./result.css');
require('page/common/nav-simple/index.js');
var _base = require('util/base.js');

$(function(){
    var type        = _base.getUrlParam('type') || 'default',
        $element    = $('.' + type + '-success');
    // 显示对应的提示元素
    $element.show();
})