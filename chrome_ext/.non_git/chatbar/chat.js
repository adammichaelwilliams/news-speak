var windowFocus = true;
var username;
var chatHeartbeatCount = 0;
var minChatHeartbeat = 1000;
var maxChatHeartbeat = 33000;
var chatHeartbeatTime = minChatHeartbeat;
var originalTitle;
var blinkOrder = 0;
var lastm = 0;
var maximumWindows = 3;

var chatboxFocus = new Array();
var newMessages = new Array();
var newMessagesWin = new Array();
var chatBoxes = new Array();

$(document).ready(function(){
	originalTitle = document.title;
	startChatSession();

	$([window, document]).blur(function(){
		windowFocus = false;
	}).focus(function(){
		windowFocus = true;
		document.title = originalTitle;
	});
});

function restructureChatBoxes() {
	align = 0;
	for (x in chatBoxes) {
		chatboxtitle = chatBoxes[x];

		if ($("#chatbox_"+chatboxtitle).css('display') != 'none') {
			if (align == 0) {
				$("#chatbox_"+chatboxtitle).css('right', '235px'); //270/20
			} else {
				width = (align)*(225+7)+235; //270/20
				$("#chatbox_"+chatboxtitle).css('right', width+'px');
			}
			align++;
		}
	}
}

function chatWith(chatuser) {
	var ShaNewAr = new Array(); 
	var ShaWinCount = 0;  

	if ($("#chatbox_"+chatuser).css('display') == 'block') { //if already chat opened
		return;
	}

	for(var sh=0;sh<chatBoxes.length;sh++){  //sha
		if($('#chatbox_'+chatBoxes[sh]).css('display')!='none'){  
			ShaNewAr[ShaWinCount] = chatBoxes[sh];
			ShaWinCount++;
		}
		else {  
			closeChatBox(chatBoxes[sh]);
		}
	}
	chatBoxes = ShaNewAr;  
	if(chatBoxes.length>maximumWindows-1){  
		closeChatBox(chatBoxes[0]);
	}
	
	createChatBox(chatuser,0);
	$("#chatbox_"+chatuser+" .chatboxtextarea").focus();
}

function createChatBox(chatboxtitle,minimizeChatBox) {
	if ($("#chatbox_"+chatboxtitle).css('display') == 'block') { //if already chat opened
		return;
	}
	else { 
			/*tmperary disabled
			if ($("#chatbox_"+chatboxtitle).length > 0) {
				if ($("#chatbox_"+chatboxtitle).css('display') == 'none') {
					$("#chatbox_"+chatboxtitle).css('display','block');
					//alert('b');
					restructureChatBoxes();
				}
				$("#chatbox_"+chatboxtitle+" .chatboxtextarea").focus();
				return;
			}
			*/
			 //tmp sha $('#chatbox_'+chatboxtitle+' .chatboxhead').toggleClass('baronminimize');  //minimize
			
			$(" <div />" ).attr("id","chatbox_"+chatboxtitle)
			.addClass("chatbox")
			.html('<div class="chatboxhead" onclick="toggleChatBoxGrowth(\''+chatboxtitle+'\')" ><div class="chatboxtitle"><b>'+getNameWithStatus(chatboxtitle)+'</b></div><div class="chatboxoptions"><a href="javascript:void(0)" title="Minimize/Maximize">_</a>&nbsp;&nbsp;<a href="javascript:void(0)" title="Close" onclick="closeChatBox(\''+chatboxtitle+'\')">X</a></div><br clear="all"/></div><div class="chatboxcontent"></div><div class="chatboxinput"><textarea class="chatboxtextarea" onfocus="return checkChatBoxInputKey(event,this,\''+chatboxtitle+'\');" onkeydown="return checkChatBoxInputKey(event,this,\''+chatboxtitle+'\');"></textarea></div><div class="shawinbottomarea" id="shawinbottomarea" onclick="toggleChatBoxGrowth(\''+chatboxtitle+'\')" >'+getNameWithStatus(chatboxtitle)+'</div>')
			.appendTo($( "#footpanel" ));
			$("#chatbox_"+chatboxtitle).css('bottom', '0px');
		
			chatBoxeslength = 0;
		
		
			for (x in chatBoxes) {
				if ($("#chatbox_"+chatBoxes[x]).css('display') != 'none') {
					chatBoxeslength++;
				}
			}
		
			if (chatBoxeslength == 0) {
				$("#chatbox_"+chatboxtitle).css('right', '235px'); //270/20
			} else {
				width = (chatBoxeslength)*(225+7)+235; //270/20
				$("#chatbox_"+chatboxtitle).css('right', width+'px');
			}
			chatBoxes.push(chatboxtitle);
		
			if (minimizeChatBox == 1) {
				minimizedChatBoxes = new Array();
		
				if ($.cookie('chatbox_minimized')) {
					minimizedChatBoxes = $.cookie('chatbox_minimized').split(/\|/);
				}
				minimize = 0;
				for (j=0;j<minimizedChatBoxes.length;j++) {
					if (minimizedChatBoxes[j] == chatboxtitle) {
						minimize = 1;
					}
				}
		
				if (minimize == 1) {
					$('#chatbox_'+chatboxtitle+' .chatboxcontent').css('display','none');
					$('#chatbox_'+chatboxtitle+' .chatboxinput').css('display','none');
					
					$('#chatbox_'+chatboxtitle+' .shawinbottomarea').css('display','none'); 
					$('#chatbox_'+chatboxtitle+' .chatboxhead').toggleClass('baronminimize');  //minimize
				}
			}
		
			chatboxFocus[chatboxtitle] = false;
		
			$("#chatbox_"+chatboxtitle+" .chatboxtextarea").blur(function(){
				chatboxFocus[chatboxtitle] = false;
				$("#chatbox_"+chatboxtitle+" .chatboxtextarea").removeClass('chatboxtextareaselected');
			}).focus(function(){
				chatboxFocus[chatboxtitle] = true;
				newMessages[chatboxtitle] = false;
			});
		
			$("#chatbox_"+chatboxtitle).click(function() {
				if ($('#chatbox_'+chatboxtitle+' .chatboxcontent').css('display') != 'none') {
					$("#chatbox_"+chatboxtitle+" .chatboxtextarea").focus();
					return;
				}
			});
		
			$("#chatbox_"+chatboxtitle).show();
			showNewWin(chatboxtitle); 
	}
}

function showNewWin(chatboxtitle){ //show up opened window
	//reopen poblem  
	$('#chatbox_'+chatboxtitle+' .chatboxcontent').css('display','block');
	$('#chatbox_'+chatboxtitle+' .chatboxinput').css('display','block');
	$('#chatbox_'+chatboxtitle+' .shawinbottomarea').css('display','block'); 
	$('#chatbox_'+chatboxtitle+' .chatboxhead').removeClass('baronminimize'); 
	$('#chatbox_'+chatboxtitle+' .chatboxhead').addClass('baronmaximize'); 
	$("#chatbox_"+chatboxtitle+" .chatboxtextarea").addClass('chatboxtextareaselected');
	$("#chatbox_"+chatboxtitle+" .chatboxtextarea").focus();
}

function chatHeartbeat(){

	var itemsfound = 0;
	
	if (windowFocus == false) {
 
		var blinkNumber = 0;
		var titleChanged = 0;
		for (x in newMessagesWin) {
			if (newMessagesWin[x] == true) {
				++blinkNumber;
				if (blinkNumber >= blinkOrder) {
					document.title = 'Message from '+getName(x)+' ...';
					titleChanged = 1;
					break;	
				}
			}
		}
		
		if (titleChanged == 0) {
			document.title = originalTitle;
			blinkOrder = 0;
		} else {
			++blinkOrder;
		}

	} else {
		for (x in newMessagesWin) {
			newMessagesWin[x] = false;
		}
	}

	for (x in newMessages) {
		if (newMessages[x] == true) {
			if (chatboxFocus[x] == false) {
				//FIXME: add toggle all or none policy, otherwise it looks funny
				//tmp $('#chatbox_'+x+' .chatboxhead').toggleClass('chatboxblink'); //bcz both side blinks
			}
		}
	}
	
	
	
	$.ajax({
	  url: "chatOne2One/chat.php?action=chatheartbeat&lastm="+lastm,
	  cache: false,
	  dataType: "json",
	  success: function(data) {

		$.each(data.items, function(i,item){
			if (item)	{ // fix ie bug
			lastm = item.i;
					if(item.me!=item.t) {
						item.f = item.me;
						chatboxtitle = item.t;
					}
					else {
						chatboxtitle = item.f;
					}
				

				if ($("#chatbox_"+chatboxtitle).length <= 0) {
					createChatBox(chatboxtitle,0);
				}
				if ($("#chatbox_"+chatboxtitle).css('display') == 'none') {
					$("#chatbox_"+chatboxtitle).css('display','block');
					restructureChatBoxes();
				}
				
				if (item.s == 1) {
					item.f = username;
				}

				if (item.s == 2) {				
					$("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxinfo">'+item.m+'</span></div>');
				} else { // latest msgs //who recives
					newMessages[chatboxtitle] = true;
					newMessagesWin[chatboxtitle] = true;
					$("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">'+getName(item.f)+'</span><br><span class="chatboxmessagecontent">'+item.m+'</span></div>');
						
						if(item.me==item.t) {
						    $('#chatbox_'+chatboxtitle+' .chatboxhead').blink({ color1: '#F9DF79', color2:'#DDDDDD'}); //176689' });
						}

				}

				$("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop($("#chatbox_"+chatboxtitle+" .chatboxcontent")[0].scrollHeight);
				
				itemsfound += 1;
			}
		});

		chatHeartbeatCount++;

		if (itemsfound > 0) {
			chatHeartbeatTime = minChatHeartbeat;
			chatHeartbeatCount = 1;
		} else if (chatHeartbeatCount >= 10) {
			chatHeartbeatTime *= 2;
			chatHeartbeatCount = 1;
			if (chatHeartbeatTime > maxChatHeartbeat) {
				chatHeartbeatTime = maxChatHeartbeat;
			}
		}
		
		  //setTimeout('chatHeartbeat();',chatHeartbeatTime);
			setTimeout('chatHeartbeat();', 300);
	}});
}

function closeChatBox(chatboxtitle) {
	$('#chatbox_'+chatboxtitle).css('display','none');
	restructureChatBoxes();
	$.post("chatOne2One/chat.php?action=closechat", { chatbox: chatboxtitle} , function(data){	
	});

}

function toggleChatBoxGrowth(chatboxtitle) {
	if ($('#chatbox_'+chatboxtitle+' .chatboxcontent').css('display') == 'none') {  
		var minimizedChatBoxes = new Array();
		
		if ($.cookie('chatbox_minimized')) {
			minimizedChatBoxes = $.cookie('chatbox_minimized').split(/\|/);
		}

		var newCookie = '';

		for (i=0;i<minimizedChatBoxes.length;i++) {
			if (minimizedChatBoxes[i] != chatboxtitle) {
				newCookie += chatboxtitle+'|';
			}
		}

		newCookie = newCookie.slice(0, -1)


		$.cookie('chatbox_minimized', newCookie);
		$('#chatbox_'+chatboxtitle+' .chatboxcontent').css('display','block');
		$('#chatbox_'+chatboxtitle+' .chatboxinput').css('display','block');
		
		//$('#chatbox_'+chatboxtitle+' .chatboxhead').css('width','209px'); 
		$('#chatbox_'+chatboxtitle+' .shawinbottomarea').css('display','block'); 
		//$('#chatbox_'+chatboxtitle+' .chatboxhead').toggleClass('baronmaximize'); 
				$('#chatbox_'+chatboxtitle+' .chatboxhead').toggleClass('baronmaximize'); 
		$("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop($("#chatbox_"+chatboxtitle+" .chatboxcontent")[0].scrollHeight);
	} else {
		var newCookie = chatboxtitle;

		if ($.cookie('chatbox_minimized')) {
			newCookie += '|'+$.cookie('chatbox_minimized');
		}


		$.cookie('chatbox_minimized',newCookie);
		$('#chatbox_'+chatboxtitle+' .chatboxcontent').css('display','none');
		$('#chatbox_'+chatboxtitle+' .chatboxinput').css('display','none');
		
		//$('#chatbox_'+chatboxtitle+' .chatboxhead').css('width','100px'); 
		$('#chatbox_'+chatboxtitle+' .chatboxhead').removeClass('baronmaximize');  
		$('#chatbox_'+chatboxtitle+' .chatboxhead').addClass('baronminimize');  
		$('#chatbox_'+chatboxtitle+' .shawinbottomarea').css('display','none'); 

	}
	
}

function checkChatBoxInputKey(event,chatboxtextarea,chatboxtitle) {
	
	if(event.keyCode == 13 && event.shiftKey == 0)  {
		message = $(chatboxtextarea).val();
		message = message.replace(/^\s+|\s+$/g,"");

		$(chatboxtextarea).val('');
		$(chatboxtextarea).focus();
		$(chatboxtextarea).css('height','25px');
		if (message != '') {  //who sending msgs
			$.post("chatOne2One/chat.php?action=sendchat&lastm="+lastm, {to: chatboxtitle, message: message} , function(data){
			   //message = message;//tmp
				$("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop($("#chatbox_"+chatboxtitle+" .chatboxcontent")[0].scrollHeight);
				/*							
				message = message.replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/\"/g,"&quot;");
				$("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">'+getName(username)+'</span><br><span class="chatboxmessagecontent">'+message+'</span></div>');
				$("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop($("#chatbox_"+chatboxtitle+" .chatboxcontent")[0].scrollHeight);
				*/
			});
		}
		chatHeartbeatTime = minChatHeartbeat;
		chatHeartbeatCount = 1;

		return false;
	}

	var adjustedHeight = chatboxtextarea.clientHeight;
	var maxHeight = 25;

	if (maxHeight > adjustedHeight) {
		adjustedHeight = Math.max(chatboxtextarea.scrollHeight, adjustedHeight);
		if (maxHeight)
			adjustedHeight = Math.min(maxHeight, adjustedHeight);
		if (adjustedHeight > chatboxtextarea.clientHeight)
			$(chatboxtextarea).css('height',adjustedHeight+8 +'px');
	} else {
		$(chatboxtextarea).css('overflow','auto');
	}

}

function startChatSession(){  

	$.ajax({
	  url: "chatOne2One/chat.php?action=startchatsession",
	  cache: false,
	  dataType: "json",
	  success: function(data) {
		username = data.username;
		$.each(data.items, function(i,item){
			if (item)	{ // fix strange ie bug
				if(item.i!=lastm && item.i!=0 && item.i>lastm) { 
					
						lastm = item.i;
						//chatboxtitle = item.f;//
						if(item.me!=item.t) {
							item.f = item.me;
							chatboxtitle = item.t;
						}
						else {
							chatboxtitle = item.f;
						}
						if ($("#chatbox_"+chatboxtitle).length <= 0) {
							createChatBox(chatboxtitle,1);
						}
						
						if (item.s == 1) {
							item.f = username;
						}
		
						if (item.s == 2) { //saved msgs
							$("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxinfo">'+item.m+'</span></div>');
						} else {
							$("#chatbox_"+chatboxtitle+" .chatboxcontent").append('<div class="chatboxmessage"><span class="chatboxmessagefrom">'+getName(item.f)+'</span><br><span class="chatboxmessagecontent">'+item.m+'</span></div>');
						}
				}
			}
		});
		
		for (i=0;i<chatBoxes.length;i++) {
			chatboxtitle = chatBoxes[i];
			$("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop($("#chatbox_"+chatboxtitle+" .chatboxcontent")[0].scrollHeight);
			setTimeout('$("#chatbox_"+chatboxtitle+" .chatboxcontent").scrollTop($("#chatbox_"+chatboxtitle+" .chatboxcontent")[0].scrollHeight);', 100); // yet another strange ie bug
		}
		
				
	
	lastm = lastm;

	//setTimeout('chatHeartbeat();',chatHeartbeatTime);
	setTimeout('chatHeartbeat();',300);
		
	}});
}




jQuery.cookie = function(name, value, options) {
    if (typeof value != 'undefined') { // name and value given, set cookie
        options = options || {};
        if (value === null) {
            value = '';
            options.expires = -1;
        }
        var expires = '';
        if (options.expires && (typeof options.expires == 'number' || options.expires.toUTCString)) {
            var date;
            if (typeof options.expires == 'number') {
                date = new Date();
                date.setTime(date.getTime() + (options.expires * 24 * 60 * 60 * 1000));
            } else {
                date = options.expires;
            }
            expires = '; expires=' + date.toUTCString(); // use expires attribute, max-age is not supported by IE
        }
        // CAUTION: Needed to parenthesize options.path and options.domain
        // in the following expressions, otherwise they evaluate to undefined
        // in the packed version for some reason...
        var path = options.path ? '; path=' + (options.path) : '';
        var domain = options.domain ? '; domain=' + (options.domain) : '';
        var secure = options.secure ? '; secure' : '';
        document.cookie = [name, '=', encodeURIComponent(value), expires, path, domain, secure].join('');
    } else { // only name given, get cookie
        var cookieValue = null;
        if (document.cookie && document.cookie != '') {
            var cookies = document.cookie.split(';');
            for (var i = 0; i < cookies.length; i++) {
                var cookie = jQuery.trim(cookies[i]);
                // Does this cookie string begin with the name we want?
                if (cookie.substring(0, name.length + 1) == (name + '=')) {
                    cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                    break;
                }
            }
        }
        return cookieValue;
    }
};


function getName(chatboxtitle) {
		var $j = jQuery;
		var results = $j.ajax({
			type: "POST",
			url: "chatOne2One/aquery.php",
			data: "get=dif73ud6uzkc45xkc3sa42dwa3sw&is="+chatboxtitle+"&li=asd87a8d8asduiaudioad789ad78",
			async: false
		}).responseText.split("|");
	return results; 
}

function getNameWithStatus(chatboxtitle) {
		var $j = jQuery;
		var results = $j.ajax({
			type: "POST",
			url: "chatOne2One/aquery.php",
			data: "get=342423k4jkl34j32kl4&is="+chatboxtitle+"&li=asda9f87f8a0f09asialsd",
			async: false
		}).responseText.split("|");
	return results; 
}


(function($) { //blinking
    $.fn.blink = function(options) {
        var opts = $.extend({}, $.fn.blink.defaults, options);
        return this.each(function() {
            var $this = $(this);
            var currentColor = opts.color1;
			var val = 0;

            $this.css({backgroundColor: currentColor});
            window.setInterval(function (){DoTheBlink();}, 1000);
            function DoTheBlink()
            {
				val++;
				if(val<=10){
					if (currentColor == opts.color1)
						currentColor = opts.color2;
					else
						currentColor = opts.color1;
					$this.css({ backgroundColor: currentColor });
				}
            }
        });
    };


    $.fn.blink.defaults = {
        color1: '#F9DF79',
        color2: '#DDDDDD'
    };
 })(jQuery); 


