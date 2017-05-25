//AppKey 存储在app代码中的字符串,用于服务器确定请求来自app;
var APP_KEY = "$2a$10$a0J6F5kRBu6uBukyTpabxe";
var time_str;

// 检查当前登录状态是否有效。
function tokenCheck() {
	var nowServerTimestamp = new Date().getTime()-$.cookie("timestampCount");
	time_str = nowServerTimestamp.toString();
	//获取那啥 ，登录的时候保存的那些值;
	var token = $.cookie("token");
	var tokenId = $.cookie("tokenId");
	var clientId = $.cookie("clientId");
	
	if (token==null || tokenId==null || clientId==null) {
		window.location.replace("login.html");
		return;
	}
	
	var urlStr = "user/token";
	//发起http-post请求;
    $.ajax({ 
	    type: 'post', //请求方式;
	    url: urlStr,  //请求的url;
	    data:{ //请求参数;
		    tokenId: tokenId,
		    timestamp: time_str, 
		    //sign参数签名规则 md5(url + app-key + timestamp + token);
		    token: hex_md5(urlStr + APP_KEY + time_str + token) 
	    },
        cache:false,  
        dataType:'json', //响应数据格式;
        success:function(data) {
        	//将json以字符串的形式打印出来!
            $('#result').html(JSON.stringify(data));
            //如果当前登录状态有效，则订阅该设备的专属话题。开始接收服务器对该设备的推送消息;
            if (data.code == 66666) {
            	//直接使用clientId 连接mqtt服务器!
            	connect($.cookie("clientId"));
            }
            else { //如果 token 失效或已删除。则清除缓存，退出登录，回到初始状态;
            	alert(data.msg);
            	$.removeCookie("clientId");
            	$.removeCookie("token");
            	$.removeCookie("tokenId");
            	
            	window.location.replace("login.html");
            }
        },  
        error:function() {
        	
        }
    });
}

function loginOut() {
	var nowServerTimestamp = new Date().getTime()-$.cookie("timestampCount");
	time_str = nowServerTimestamp.toString();
	//获取那啥 ，登录的时候保存的那些值;
	var token = $.cookie("token");
	var tokenId = $.cookie("tokenId");
	var clientId = $.cookie("clientId");
	
	var urlStr = "user/out";
	//发起http-post请求;
    $.ajax({ 
	    type: 'post', //请求方式;
	    url: urlStr,  //请求的url;
	    data:{ //请求参数;
		    tokenId: tokenId,
		    timestamp: time_str, 
		    //sign参数签名规则 md5(url + app-key + timestamp + token);
		    token: hex_md5(urlStr + APP_KEY + time_str + token) 
	    },
        cache:false,  
        dataType:'json', //响应数据格式;
        success:function(data) {
            //如果退出登录成功，清除缓存;
            if (data.code == 66666) {
            	$.removeCookie("clientId");
            	$.removeCookie("token");
            	$.removeCookie("tokenId");
            	alert(JSON.stringify(data));
            	window.location.replace("login.html");
            }
            else { //退出登录失败，打印出json字符串
            	$('#result').html(JSON.stringify(data));
            }
        },  
        error:function() {
        	
        }
    });
}
