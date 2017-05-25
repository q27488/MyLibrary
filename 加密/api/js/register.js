//手机号码正则表达式;
var phoneCheck = /^1[3|4|5|7|8]\d{9}$/;
//邮箱号码正则表达式;
var emailCheck = /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+)*\.(aero|arpa|biz|com|coop|edu|gov|info|int|mil|museum|name|net|org|pro|travel|mobi|[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/;
//登录的手机号码;
var phone;
//用户输入的密码;
var passwd;
//密码注册时加密时使用的salt值;
var salt;
//发起请求的时间戳字符串;
var time_str;
//AppKey 存储在app代码中的字符串,用于服务器确定请求来自app;
var APP_KEY = "$2a$10$a0J6F5kRBu6uBukyTpabxe";

$(function(){
	
});

/** 手机号输入框失去焦点回调事件，检查手机号是否注册 */
$('#phone').blur(function() {
	//如果输入的是手机号;才进行检测！
	if (phoneCheck.test($('#phone').val())) {
		var nowServerTimestamp = new Date().getTime()-$.cookie("timestampCount");
	    time_str = nowServerTimestamp.toString();
	    phone = $('#phone').val();
	    
	    var urlStr = "user/check";
    
        //发起http-post请求;
        $.ajax({ 
	        type: 'post', //请求方式;
	        url: urlStr,  //请求的url;
	        data:{ //请求参数;
		        phone: phone,
		        timestamp: time_str, 
		        //sign参数签名规则 md5(url + app-key + timestamp);
		        sign: hex_md5(urlStr + APP_KEY +time_str) 
	        },
            cache:false,  
            dataType:'json', //响应数据格式;
            success:function(data) {
        	    //将json以字符串的形式打印出来!
                $('#result').html(JSON.stringify(data));
            },  
            error:function() {
        	
            }
        });
    }
});

//获取短信验证码接口;
function getCode() {
	//如果输入的是手机号;才申请下发验证码！
	if (phoneCheck.test($('#phone').val())) {
		var nowServerTimestamp = new Date().getTime()-$.cookie("timestampCount");
	    time_str = nowServerTimestamp.toString();
	    phone = $('#phone').val();
	    
	    var urlStr = "code";
    
        //发起http-post请求;
        $.ajax({ 
	        type: 'post', //请求方式;
	        url: urlStr,  //请求的url;
	        data:{ //请求参数;
		        phone: phone,
		        timestamp: time_str, 
		        //sign参数签名规则 md5(url + app-key + timestamp);
		        sign: hex_md5(urlStr + APP_KEY +time_str) 
	        },
            cache:false,  
            dataType:'json', //响应数据格式;
            success:function(data) {
        	    //将json以字符串的形式打印出来!
                $('#result').html(JSON.stringify(data));
            },  
            error:function() {
        	
            }
        });
    }
}

//注册接口;
function register() {
	//生成salt;
	salt = gensalt(10);
	//获取手机号码和密码；
	phone = $('#phone').val();
	passwd = $('#password').val();
	//密码初次加密;
	passwd = hex_md5(passwd);
	//对md5签名后的密码签名进行bcrypt加密, registerCallback是加密完成后的回调函数;
	hashpw(passwd, salt, registerCallback);
}
//bcrypt加密完成后，执行此函数， 参数hashPwd是bcrypt密文;
function registerCallback(hashPwd) {
	//如果输入的是手机号;才申请下发验证码！
	if (phoneCheck.test($('#phone').val())) {
		var nowServerTimestamp = new Date().getTime()-$.cookie("timestampCount");
	    time_str = nowServerTimestamp.toString();
	    
	    var urlStr = "user/register";
	    code = $('#verifyCode').val();
    
        //发起http-post请求;
        $.ajax({ 
	        type: 'post', //请求方式;
	        url: urlStr,  //请求的url;
	        data:{ //请求参数;
	        	code: code,
		        phone: phone,
		        passwd: hashPwd,
		        salt: salt,
		        timestamp: time_str, 
		        //sign参数签名规则 md5(url + app-key + timestamp);
		        sign: hex_md5(urlStr + APP_KEY +time_str) 
	        },
            cache:false,  
            dataType:'json', //响应数据格式;
            success:function(data) {
            	//如果注册成功!
            	if (data.code == 20002) {
            		//注册成功能获取的字段;
        	        var tokenId = data.tokenId;
        	        var clientId = data.clientId;
        	        var token = data.token;
        	    
        	        //将上面的信息保存起来;
        	        $.cookie("tokenId", tokenId);
        	        $.cookie("token", token);
        	        $.cookie("clientId", clientId);
        	        
        	        alert(JSON.stringify(data));
        	        //跳转到扫描二维码页面;
        	        window.location.replace("qc-code-scan.html");
            	}
            	else {
            		//将json以字符串的形式打印出来!
                    $('#result').html(JSON.stringify(data));
            	}
            },  
            error:function() {
        	
            }
        });
    }
}
