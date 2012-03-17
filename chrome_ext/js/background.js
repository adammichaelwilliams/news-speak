var handle_; 
var fbid_;
var token_;
var can_say = false;
var profile_url_;

var room = {};

var port;
var wsocket;

var sys_pic = chrome.extension.getURL("icon.png");
console.log(sys_pic);

chrome.browserAction.onClicked.addListener(function(tab) {
		var appID = "305239899542726";
    var path = 'https://www.facebook.com/dialog/oauth?';
    var queryParams = ['client_id=' + appID,
        ('redirect_uri='+'https://www.facebook.com/connect/login_success.html'),
        'response_type=token'];
    var query = queryParams.join('&');
    var url_ = path + query;

		chrome.tabs.create({index: tab.index+1, url: url_});
		chrome.tabs.onUpdated.addListener(function(id, change, tab) {
			if(change.status === "complete" && tab.title === "Success") {
				var new_url = tab.url.replace(/(.+\#)/, "").split("&");
				token_ = new_url[0].replace("access_token=", "");
				
				var ajax_url = "https://graph.facebook.com/me?";
				ajax_url += ("&access_token="+token_);
				
				$.ajax({
						url: ajax_url
					, dataType: "json"
					, success: function(data) {
							fbid_ = data.id;
							handle_ = data.first_name;
							port.postMessage({path: "fb", data: {fbid: fbid_}});
						}
				});
				chrome.tabs.remove(tab.id);
			}
		});
});

chrome.extension.onConnect.addListener(function(port_) {
	console.log("A");
	if(!wsocket && !port) {	
		wsocket = new NewsSpeakTransport("141.212.203.50:81");
		(port = port_).onMessage.addListener(messageHandler);
		port.onDisconnect.addListener(disconnectHandler);
		attach_listeners();
		console.log(handle_, fbid_, token_);
		port.postMessage({path: "fb", data: {fbid: fbid_}});
	}
});

function messageHandler(msg_)
{
	switch(msg_.path) {
	case "join":
		if(msg_.data.keywords.length > 3) {
			while(msg_.data.keywords.length > 3) msg_.data.keywords.pop();
		} else if(msg_.data.keywords.length > 3) {
			while(msg_.data.keywords.length < 3) msg_.data.keywords.push("");
		}
		console.log("A", msg_.data);
		wsocket.emit("join", msg_.data);
		break;
	case "say":
		wsocket.emit("say", {msg: msg_.data});
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

	wsocket.on("sys", function(data) {
		switch(data.cmd) {
		case "join":
			var msg = "Joined from <a href='"+data.arg.url+"'>this article</a>"; 
			say_respond(msg, data.arg.name, sys_pic, data.arg.fbid);
			break;
		case "leave":
			
			break;
		}
	});

	wsocket.on("list.return", function(data) {
		can_say = true;
		console.log(data);
	});

	wsocket.on("say.return", function(data_) {
		console.log(room);
		if(!room[data_.fbid] || !room[data_.fbid].picture) {
			var ajax_url = "https://graph.facebook.com/"+data_.fbid+"?fields=picture";
			ajax_url += ("&access_token="+token_);
			
			$.ajax({
					url: ajax_url
				, dataType: "json"
				, success: function(data) {
						console.log(data);
						room[data_.fbid] = {picture: data.picture};
						say_respond(data_.msg, data_.name, data.picture, data_.fbid);
					}
			});
		} else {
		    say_respond(data_.msg, data_.name, room[data_.fbid].picture, data_.fbid);
		}
	});

    function say_respond(msg_, name_, pic_, fbid_) {
	var result = {msg: msg_, name: name_, pic: pic_, fbid:fbid_};
		port.postMessage({path: "msg", data: result});
	}
}
