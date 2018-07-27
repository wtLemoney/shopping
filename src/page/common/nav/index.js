require('./nav.css');

var _base = require('util/base.js');

var nav = {
    init : function(){
        this.bindEvent();
        this.loadUserInfo();
        this.loadCartCount();
        return this;
    },
    bindEvent : function(){
        //登陆点击事件
        $('.js-login').click(function(){
            _base.doLogin();
        });
        //注册点击事件
        $('.js-register').click(function(){
            window.location.href = './user-register.html';
        });
        //退出
        // $('.js-logout').click(function(){

        // })
    }
}