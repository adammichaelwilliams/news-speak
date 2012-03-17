var handle_ = "Max Seiden";

var port;
var wsocket = new NewsSpeakTransport("141.212.203.50:81");

chrome.extension.onConnect.addListener(function(port_) {
	(port = port_).onMessage.addListener(messageHandler);
});

function messageHandler(msg_)
{
	switch(msg_.path) {
	case "join":
		wsocket.emit("join", msg_.data);
		break;
	default:
		break;
	}
}
