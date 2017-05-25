//连接成功后的回调函数;
function onConnect(context) {
	console.log("client connected success")
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
	if (message.destinationName == '$client/'+$.cookie("clientId")) {
		//将服务器推送的消息转化为Json对象;
		var pushJson = JSON.parse(message.payloadString);
		//如果服务器推送的是 账号在别的设备登录消息。则检查当前登录状态;
		if (pushJson.code == 30001) {
			tokenCheck();
		}
		else {
			var descriptionStr = '后期随着功能负责化，服务器推送给设备的肯定不止账号在别的设备登录消息';
			descriptionStr += '各种消息的区别，就在pushJson.code字段';
		}
	}
}        