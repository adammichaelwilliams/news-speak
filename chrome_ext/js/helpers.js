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
