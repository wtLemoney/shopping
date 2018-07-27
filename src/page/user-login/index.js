require('./user-login.css');
require('page/common/nav-simple/index.js');
var _base = require('util/base.js');

//错误提示
var formError = {
    show : function(errMsg){
        $('.error-item').show().find('.err-msg').text(errMsg);
    },
    hide : function(){
        $('.error-item').hide().find('.err-msg').text('');
    }
};


var page = {
    init : function(){
        this.bindEvent();
    },
    bindEvent : function(){
        var _this = this;
        //点击登陆
        $('#submit').click(function(){
            _this.submit();
        });
        //点击回车
        $('.user-content').keyup(function(e){
            if(e.keyCode === 13){
                _this.submit();
            }
        });
    },
    //提交表单
    submit : function(){
        var formData = {
            username : $.trim($('#username').val()),
            password : $.trim($('#password').val())
        },
        validateResult = this.formValidate(formData);
        //验证成功
        if(validateResult.status){
            
        }
        //验证失败
        else{

        }
    },
    //表单字段的验证
    formValidate : function(formData){
        var result = {
            status : false,
            msg : ''
        };
        if(!_base.validate(formData.username,'require')){
            result.msg = '用户名不能为空';
            return result;
        }
        if(!_base.validate(formData.password,'require')){
            result.msg = '密码不能为空';
            return result;
        }
        //通过验证，返回正确提示
        result.status = true;
        result.msg  = '验证通过';
        return result;
    }
};
$(function(){
    page.init();
})