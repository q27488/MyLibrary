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

//页面加载完成后，计算下与服务器的时间差是多少;
$(function() {
	var urlStr = "timestamp";
    //发起http-post请求;
    $.ajax({ 
	    type: 'post', //请求方式;
	    url: urlStr,  //请求的url;
	    data:{ //请求参数;
	    },
        cache:false,  
        dataType:'json', //响应数据格式;
        success:function(data) {
        	//将json以字符串的形式打印出来!
            $('#result').html(JSON.stringify(data));
            //注册时密码加密使用的salt值;
            var localTimestamp = new Date().getTime();
            var serverTimestamp = data.timestamp;
            
            //时间差；
            var timestampCount = localTimestamp-serverTimestamp;
            $.cookie("timestampCount", timestampCount);
        },  
        error:function() {
        	$('#result').html('get server timestamp error');
        }
    });
});

/**
 * 获取用户的salt值;用于还原注册时密码的密文;
 */
function getSalt() {
	var nowServerTimestamp = new Date().getTime()-$.cookie("timestampCount");
	time_str = nowServerTimestamp.toString();
	phone = $('#phone').val();
	console.log(phone);
	var urlStr = "user/salt";
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
        	$('#result').append("<br/>");
            $('#result').append(JSON.stringify(data));
            salt = data.salt;
        },  
        error:function() {
        	
        }
    });
}
        
//  登录接口 ........
function login() {
	var nowServerTimestamp = new Date().getTime()-$.cookie("timestampCount");
	time_str = nowServerTimestamp.toString();
	phone = $('#phone').val();
	passwd = $('#passwd').val();
	passwd = hex_md5(passwd);
	//加密完成后,将会回调下面的loginCallback方法。
	hashpw(passwd, salt, loginCallback);
}
function loginCallback(hashPwd) {
	//参数hashPwd的值为数据库中，用户密码的密文;
	//提交登录请求前, 为了不暴露数据库中的密文，对其进行相应签名;
	//签名规则如下: 
	// md5(timestamp + hashPwd);
	passwd = hex_md5(time_str + hashPwd);
	//发起请求;
	$.ajax({
		type: 'post',
		url:'user/login',
		data:{
			phone: phone,
			passwd: passwd,
			timestamp: time_str,
			sign: hex_md5("user/login"+APP_KEY+time_str)
		},
        cache:false,  
        dataType:'json',  
        success:function(data) {
        	$('#result').append("<br/>");
        	$('#result').append(JSON.stringify(data));
        	if (data.code == 66666) { //登录成功
        	    //登录成功能获取的字段;
        	    var tokenId = data.tokenId;
        	    var clientId = data.clientId;
        	    var token = data.token;
        	    
        	    //将上面的信息保存起来;
        	    $.cookie("tokenId", tokenId);
        	    $.cookie("token", token);
        	    $.cookie("clientId", clientId);
        	}
        },  
        error:function(){}  
	});
}