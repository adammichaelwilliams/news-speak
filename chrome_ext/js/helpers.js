var port = chrome.extension.connect();

port.onMessage.addListener(function(msg_) {
	switch(msg_.path) {
	case "msg":
		append_msg(msg_.data.name, msg_.data.msg);
	break;
	default:
		break;
	}
});

join_room({title: "New Room!", url: "1", keywords: ["a", "b", "c"]});

function join_room(d)
{
	var query = {title: d.title, keywords: d.keywords, url: d.url};
	port.postMessage({path: "join", data: query});
}

function send_msg(data_) 
{
	port.postMessage({path: "say", data: data_});
}

function append_msg(handle, msg)
{
	var comments = document.getElementById("nsp_comment_list");

	var comment = document.createElement("li");
	comment.setAttribute("class", "nsp_comment");

	var name = document.createElement("span");
	name.setAttribute("class", "nsp_name");
	name.setAttribute("title", handle);

	var message = document.createElement("span");
	message.setAttribute("class", "nsp_content");
	message.innerHTML = msg;

	comment.appendChild(name);
	comment.appendChild(message);

	comments.appendChild(comment);
}
