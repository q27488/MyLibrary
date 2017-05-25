//AppKey 存储在app代码中的字符串,用于服务器确定请求来自app;
var APP_KEY = "$2a$10$a0J6F5kRBu6uBukyTpabxe";
var time_str;

function getSleepData() {
	var nowServerTimestamp = new Date().getTime()-$.cookie("timestampCount");
	time_str = nowServerTimestamp.toString();
	//获取那啥 ，登录的时候保存的那些值;
	var token = $.cookie("token");
	var tokenId = $.cookie("tokenId");
	var clientId = $.cookie("clientId");
	
	var urlStr = "data";
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
            
        },  
        error:function() {
        	
        }
    });
}

function getSleepReport() {
	var nowServerTimestamp = new Date().getTime()-$.cookie("timestampCount");
	time_str = nowServerTimestamp.toString();
	//获取那啥 ，登录的时候保存的那些值;
	var token = $.cookie("token");
	var tokenId = $.cookie("tokenId");
	var clientId = $.cookie("clientId");
	
	var urlStr = "data/report";
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
            
        },  
        error:function() {
        	
        }
    });
}
