var handle_ = "Max Seiden";
var fbid_ = "12345"
var can_say = false;

var port;
var wsocket;

chrome.extension.onConnect.addListener(function(port_) {
	if(!wsocket && !port) {	
		wsocket = new NewsSpeakTransport("141.212.203.50:81");
		(port = port_).onMessage.addListener(messageHandler);
		port.onDisconnect.addListener(disconnectHandler);
		attach_listeners();
	}
});

function messageHandler(msg_)
{
	switch(msg_.path) {
	case "join":
		console.log(msg_);
		wsocket.emit("join", msg_.data);
		break;
	case "say":
		wsocket.emit("say", {fbid: fbid_, name: handle_, msg: msg_.data});
		break;
	default:
		break;
	}
}

function disconnectHandler()
{
	wsocket.close();
	wsocket = port = null
}

function attach_listeners() 
{
	wsocket.on("join.return", function(data) {
		wsocket.emit("fb", {fbid: fbid_, name: handle_});
	});

	wsocket.on("fb.return", function(data) {
		wsocket.emit("list");
	});

	wsocket.on("list.return", function(data) {
		can_say = true;
		console.log(data);
	});

	wsocket.on("say.return", function(data_) {
		port.postMessage({path: "msg", data: data_});
	});
}
