var port = chrome.extension.connect();

port.postMessage({path: "join"});

port.onMessage.addListener(function(msg) {
	append_msg(msg.handle, msg.msg);
});

function join_room(data_)
{
	port.postMessage({path: "join", data: data_});
}

function send_msg(msg) 
{
	port.postMessage(msg);
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
