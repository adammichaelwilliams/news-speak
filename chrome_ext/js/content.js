document.body.innerHTML += [
	  '<div id="nsp_wrapper" style="z-index:1000000001;">'
	, '<div id="nsp_chatroom">'
	, '<div id="nsp_toolbar">'
	, '<h4 id="nsp_title" style="color: #f6f6f6 !important;">NewSpeak room</h4>'
	, '<span id="nsp_minimize" style="color: #f6f6f6 !important;" class="nsp_toolbar_btn">_</span>'
	, '<span id="nsp_close" style="color: #f6f6f6 !important; visibility:hidden;" class="nsp_toolbar_btn">X</span>'
	, '</div>'
	, '<div id="nsp_body">'
	, '<div id="nsp_conversation">'
	, '<ul id="nsp_comment_list" style="list-style-type: none !important;">'
	, '</ul>'
	, '</div>'
	, '<div id="nsp_input">'
	, '<div id="nsp_promt">&gt;</div>'
	, '<textarea id="nsp_text_input" rows="1" style="margin:0;padding:0;"></textarea>'
	, '</div>'
	, '</div>'
	, '</div>'
	, '</div>'
].join("");

$("#nsp_text_input").elastic();

var shift_state = false;
var new_height = 27;
$("#nsp_test_input").height(new_height);
$("#nsp_input").height(new_height);

$("#nsp_text_input").keyup(function(e) {
	$("#nsp_input").height($("#nsp_text_input").height());
	if(e.keyCode === 16) {
		shift_state = false;	
	} else if(e.keyCode === 13 && !shift_state) {
		send_msg($("#nsp_text_input").val());
		$("#nsp_text_input").val("");
		$("#nsp_test_input").height(new_height);
		$("#nsp_input").height(new_height);
	}
});

$("#nsp_text_input").keydown(function(e) {
	if(e.keyCode === 16) {
		shift_state = true;
	}
});

var nsp_min = false;
$("#nsp_minimize").click(function(){
    $("#nsp_body").slideToggle('fast', function(){
        if(!nsp_min){
            $("#nsp_minimize").text('+');
            nsp_min = true;
        }else{
            $("#nsp_minimize").text('_');
            nsp_min = false;
        }
    });
});
