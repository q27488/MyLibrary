//连接成功后的回调函数;
function onConnect(context) {
	console.log("client connected success");
	//订阅;
	subscribe(deviceIdStr);
	connected = true;
}
        
//连接失败后的回调函数
function onFail(context) {
	console.log("failed to connect" + context.errorMessage);
	connected = false;
}
        
//连接断开的监听事件;
function onConnectionLost(responseObject) {
	if (responseObject.errorCode !== 0) {
		console.log("connection lost: " + responseObject.errorMessage);
    }
    connected = false;
}
        
//接收到了所订阅的话题发布的消息监听事件。message为消息对象。
function onMessageArrived(message) {
	//如果是服务器推给该设备的专属消息;
	if (message.destinationName == $.cookie("clientId")) {
		//将服务器推送的消息转化为Json对象;
		var dataJson = JSON.parse(message.payloadString);
		//如果服务器推送的是 账号在别的设备登录消息。则检查当前登录状态;

		if(dataJson.b<=15){
	        $('.band_sueess .huxi').text('呼吸过慢');
	        $('.band_sueess>.jaince>.left>.txt').text(dataJson.b).css('color','#f1ef54');
	    }else if(15<dataJson.b || dataJson.b<40){
	        $('.band_sueess .huxi').text('呼吸正常');
	        $('.band_sueess>.jaince>.left>.txt').text(dataJson.b).css('color','#fff');
	    }else if(dataJson.b >= 40){
	        $('.band_sueess .huxi').text('呼吸过快');
	        $('.band_sueess>.jaince>.left>.txt').text(dataJson.b).css('color','#f0730d');
	    }

	    if(dataJson.h<=50){
	        $('.band_sueess .xint').html('心跳过慢');
	        $('.band_sueess>.jaince>.right>.txt').text(dataJson.h).css('color','#f1ef54');
	    }else if(50<dataJson.h || dataJson.h<120){
	        $('.band_sueess .huxi').text('心跳正常');
	        $('.band_sueess>.jaince>.right>.txt').text(dataJson.h).css('color','#fff');
	    }else if(dataJson.h>=120){
	        $('.band_sueess .xint').html('心跳过快');
	        $('.band_sueess>.jaince>.right>.txt').text(dataJson.h).css('color','#f0730d');
	    }
		// $('#result').html(  "心跳: " + dataJson.h + "<br/>");
		// $('#result').append("呼吸: " + dataJson.b + "<br/>");
	}
	
}        