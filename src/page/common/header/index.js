require('./header.css');

var _base = require('util/base.js');

//通用页面头部
var header = {
    init : function(){
        this.onLoad();
        this.bindEvent();
    },
    onLoad : function(){
        var keyword = _base.getUrlParam('keyword');
        //keyword存在，则回填输入框
        if(keyword){
            $('#search-input').val(keyword);
        }
    },
    bindEvent : function(){
        var _this=this;
        //点击搜索按钮，做搜索提交
        $('#search-btn').click(function(){
            _this.searchSubmit();
        });
        //输入回车，做搜索提交
        $('#search-input').keyup(function(e){
            if(e.keyCode === 13){//回车键
                _this.searchSubmit()
            }
        });
    },
    //搜索的提交
    searchSubmit : function(){
        var keyword = $.trim($('#search-input').val());
        //有keyword，跳转到list页
        if(keyword){
            window.location.href = './list.html?keyword='+keyword;
            // console.log(1)
        }
       //否则，直接返回首页
       else{
           _base.goHome();
       } 

    }
}

header.init();