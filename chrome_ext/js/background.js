var port;
chrome.extension.onConnect.addListener(function(port_) {
	(port = port_).onMessage.addListener(messageHandler);
});

function messageHandler(msg) 
{
	
}

