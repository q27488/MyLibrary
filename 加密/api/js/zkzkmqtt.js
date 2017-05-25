//Mqtt 客户端;
client = null;
//是否已连接服务器;
connected = false;

function connect(clientId) {
    var hostname = "www.zkzk365.com";
    var port = "8084";

    var path = "";
    var user = "zkzkEmqttdWeb@201612131430";
    var pass = "J3ejdVfKVGEE3xJEm4YDRiZdLbEH5dAv3NiV4S@zkzkWeb1431";
    var keepAlive = 20;
    var timeout = 3;
    var ssl = true;
    var cleanSession = true;
    
    //创建Mqtt客户端!
    if(path.length > 0) {
    	client = new Paho.MQTT.Client(hostname, Number(port), path, clientId);
    } 
    else {
    	client = new Paho.MQTT.Client(hostname, Number(port), clientId);
    }
    console.info('Connecting to Server: Hostname: ', hostname, '. Port: ', port, '. Path: ', client.path, '. Client ID: ', clientId);

    //设置相应的回调函数;
    client.onConnectionLost = onConnectionLost;
    client.onMessageArrived = onMessageArrived;
    
    //配置那啥Mqtt连接参数;
    var options = {
        invocationContext: {host : hostname, port: port, path: client.path, clientId: clientId},
        timeout: timeout,
        keepAliveInterval:keepAlive,
        cleanSession: cleanSession,
        useSSL: ssl,
        onSuccess: onConnect,
        onFailure: onFail
    };

    //如果存在账号密码，即连接服务器需要认证;
    if(user.length > 0){
        options.userName = user;
    }
    if(pass.length > 0){
        options.password = pass;
    }
    //开始连接服务器;
    client.connect(options);
}

function disconnect(){
    console.info('Disconnecting from Server');
    client.disconnect();
    connected = false;
}

function subscribe(topic) {
    var qos = 0;
    console.info('Subscribing to: Topic: ', topic, '. QoS: ', qos);
    client.subscribe(topic, {qos: 1});
}

function unsubscribe(topic){
    console.info('Unsubscribing from ', topic);
    client.unsubscribe(topic, {
         onSuccess: unsubscribeSuccess,
         onFailure: unsubscribeFailure,
         invocationContext: {topic : topic}
    });
}

function unsubscribeSuccess(context) {
    console.info('Successfully unsubscribed from ', context.invocationContext.topic);
}

function unsubscribeFailure(context) {
    console.info('Failed to  unsubscribe from ', context.invocationContext.topic);
}
