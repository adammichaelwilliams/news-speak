var port = chrome.extension.connect();
document.body.innerHTML += [
	  '<div id="nsp_wrapper">'
	, '<div id="nsp_chatroom">'
	, '<div id="nsp_toolbar">'
	, '<h4>Room Title</h4>'
	, '<span id="nsp_minimize" class="nsp_toolbar_btn">_</span>'
	, '<span id="nsp_close" class="nsp_toolbar_btn">X</span>'
	, '</div>'
	, '<div id="nsp_conversation">'
	, '<ul id="nsp_comment_list">'
	, '<li class="nsp_comment">'
 	, '<span class="nsp_name" title="Ke Wu"></span>'
 	, '<span class="nsp_content">hello world!  Welcome to Newspeak!</span>'
	, '</li>'
	, '</ul>'
	, '</div>'
	, '<div id="nsp_input">'
	, '<div id="nsp_promt">&gt;</div>'
	, '<textarea id="nsp_text_input" rows="1"></textarea>'
	, '</div>'
	, '</div>'
	, '</div>'
].join("");

$("#nsp_text_input").elastic();

var shift_state = false;

$("#nsp_text_input").keyup(function(e) {
	$("#nsp_input").height($("#nsp_text_input").height());

	if(e.keyCode === 16) {
		shift_state = false;
	} else if(e.keyCode === 13 && !shift_state) {
		$("#nsp_text_input").val("");
		$("#nsp_test_input").height(24);
		$("#nsp_input").height(24);
	}

});

$("#nsp_text_input").keydown(function(e) {
	if(e.keyCode === 16) {
		shift_state = true;
	} else if(e.keyCode === 13 && !shift_state) {
		$("#nsp_text_input").val("");
		$("#nsp_test_input").height(24);
		$("#nsp_input").height(24);
	}

	/*
	var titles = [];
	for(var title in res) {
		titles.push({key:title, val:res[title]});
	}
	titles.sort(function(a, b) {
		return a.val - b.val;
	})
	*/

});

append_msg("Max Seiden", "Hello World!");
