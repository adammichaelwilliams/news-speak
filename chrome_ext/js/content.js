var port = chrome.extension.connect();
document.body.innerHTML += [
	  '<div id="wrapper">'
	, '<div id="chatroom">'
	, '<div id="toolbar">'
	, '<h4>Room Title</h4>'
	, '<span id="minimize" class="toolbar_btn">_</span>'
	, '<span id="close" class="toolbar_btn">X</span>'
	, '</div>'
	, '<div id="conversation">'
	, '<ul id="nsp_comment_list">'
	, '<li class="comment">'
	, '<span class="name" title="Ke Wu"></span>'
 	, '<span class="content">hello world!  Welcome to Newspeak!</span>'
	, '</li>'
	, '</ul>'
	, '</div>'
	, '<div id="input">'
	, '<div id="promt">&gt;</div>'
	, '<textarea id="text_input" rows="1"></textarea>'
	, '</div>'
	, '</div>'
	, '</div>'
].join("");




function append_msg(handle, msg)
{
	var comments = document.getElementById("nsp_comment_list");

	var comment = document.createElement("li");
	comment.setAttribute("class", "comment");

	var name = document.createElement("span");
	name.setAttribute("class", "name");
	name.setAttribute("title", handle);

	var message = document.createElement("span");
	message.setAttribute("class", "content");
	message.innerHTML = msg;

	comment.appendChild(name);
	comment.appendChild(message);

	comments.appendChild(comment);
}
