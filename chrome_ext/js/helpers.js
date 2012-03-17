var port = chrome.extension.connect();
var query_;
var can_init = false;

port.onMessage.addListener(function(msg_) {
	console.log(msg_.data.fbid);
	switch(msg_.path) {
	case "msg":
	    append_msg(msg_.data.name, msg_.data.msg, msg_.data.pic, msg_.data.fbid);
	break;
	case "fb":
		if(msg_.data.fbid) {
			can_init = true;
			if(query_) { join_room(); }
		}
		break;
	default:
		break;
	}
});

function store_room_data(d)
{
	console.log("Data Stored");
	query_ = {title: d.title, keywords: d.keywords, url: d.url};
	if(can_init) {join_room();}
}

function join_room() 
{
	console.log("join room");
	port.postMessage({path: "join", data: query_});
}

function send_msg(data_) 
{
	if(!can_init) {
		append_msg("", "You're not logged in!");
	} else {
		port.postMessage({path: "say", data: data_});
	}
}

function append_msg(handle, msg_, pic, fbid)
{
	var comments = document.getElementById("nsp_comment_list");

	var comment = document.createElement("li");
	comment.setAttribute("class", "nsp_comment");

	var name = document.createElement("span");
	$(name).css('background-image', 'url('+pic+')');	
	name.setAttribute("class", "nsp_name");
	name.setAttribute("title", handle);

	console.log("HI: ", fbid);

	var message = document.createElement("span");
	message.setAttribute("class", "nsp_content");
  var msg = "<a href = 'http://www.facebook.com/addfriend.php?id="; 
	msg += (fbid + "' target='_blank'>" + handle + "</a>: " + msg_);
	console.log(msg);
	message.innerHTML = msg;
        
	comment.appendChild(name);
	comment.appendChild(message);

	comments.appendChild(comment);

	var conv = $("#nsp_conversation");
	conv.scrollTop(conv.prop("scrollHeight"));
}
