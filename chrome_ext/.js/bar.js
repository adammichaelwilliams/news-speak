
$(document).ready(


function(){
var foot = chrome.extension.getURL("foot.html");

$.get(foot, function(data){
    $("body").append(data);
    });

chrome.extension.onConnect.addListener(function(port) {
  console.assert(port.name == "knockknock");
  port.onMessage.addListener(function(msg) {
    if (msg.joke == "Knock knock")
      port.postMessage({question: "Who's there?"});
    else if (msg.answer == "Madame")
      port.postMessage({question: "Madame who?"});
    else if (msg.answer == "Madame... Bovary")
      port.postMessage({question: "I don't get it."});
  });
});




/*
chrome.tabs.onUpdated.addListener(onTabUpdated);

function onTabUpdated(tabId, changeInfo, tab) {
  if (changeInfo.url &&
    changeInfo.url.indexOf("https://www.facebook.com/connect/login_success.html") == 0) {
    var access_code = accessTokenFromSuccessURL(changeInfo.url);
    
    $("body").append("<strong>"+access_code+"</strong>");
  }
}

function accessTokenFromSuccessURL(url) {
var hashSplit = url.split('#');
if (hashSplit.length > 1) {
  var paramsArray = hashSplit[1].split('&');
  for (var i = 0; i < paramsArray.length; i++) {
      var paramTuple = paramsArray[i].split('=');
      if (paramTuple.length > 1 && paramTuple[0] == 'access_token')
        return paramTuple[1];
  }
}
return null;
}

*/


/*
$("body").append("<strong>Adam</strong>");

var $foot_div = $('<div id="footpanel" />'),
    $main_ul = $('<ul id="mainpanel" />');

$("body").append($foot_div, $main_ul);

	//Adjust panel height
	$.fn.adjustPanel = function(){ 
		$(this).find("ul, .subpanel").css({ 'height' : 'auto'}); //Reset subpanel and ul height
		
		var windowHeight = $(window).height(); //Get the height of the browser viewport
		var panelsub = $(this).find(".subpanel").height(); //Get the height of subpanel	
		var panelAdjust = windowHeight - 100; //Viewport height - 100px (Sets max height of subpanel)
		var ulAdjust =  panelAdjust - 25; //Calculate ul size after adjusting sub-panel (27px is the height of the base panel)
		
		if ( panelsub >= panelAdjust ) {	 //If subpanel is taller than max height...
			$(this).find(".subpanel").css({ 'height' : panelAdjust }); //Adjust subpanel to max height
			$(this).find("ul").css({ 'height' : ulAdjust}); //Adjust subpanel ul to new size
		}
		else if ( panelsub < panelAdjust ) { //If subpanel is smaller than max height...
			$(this).find("ul").css({ 'height' : 'auto'}); //Set subpanel ul to auto (default size)
		}
	};
	
	//Execute function on load
	$("#chatpanel").adjustPanel(); //Run the adjustPanel function on #chatpanel
	$("#alertpanel").adjustPanel(); //Run the adjustPanel function on #alertpanel
	
	//Each time the viewport is adjusted/resized, execute the function
	$(window).resize(function () { 
		$("#chatpanel").adjustPanel();
		$("#alertpanel").adjustPanel();
	});
	
	//Click event on Chat Panel + Alert Panel	
	$("#chatpanel a:first, #alertpanel a:first").click(function() { //If clicked on the first link of #chatpanel and #alertpanel...
		if($(this).next(".subpanel").is(':visible')){ //If subpanel is already active...
			$(this).next(".subpanel").hide(); //Hide active subpanel
			$("#footpanel li a").removeClass('active'); //Remove active class on the subpanel trigger
		}
		else { //if subpanel is not active...
			$(".subpanel").hide(); //Hide all subpanels
			$(this).next(".subpanel").toggle(); //Toggle the subpanel to make active
			$("#footpanel li a").removeClass('active'); //Remove active class on all subpanel trigger
			$(this).toggleClass('active'); //Toggle the active class on the subpanel trigger
		}
		return false; //Prevent browser jump to link anchor
	});
	
	//Click event outside of subpanel
	$(document).click(function() { //Click anywhere and...
		$(".subpanel").hide(); //hide subpanel
		$("#footpanel li a").removeClass('active'); //remove active class on subpanel trigger
	});
	$('.subpanel ul').click(function(e) { 
		e.stopPropagation(); //Prevents the subpanel ul from closing on click
	});
	
	//Delete icons on Alert Panel
	$("#alertpanel li").hover(function() {
		$(this).find("a.delete").css({'visibility': 'visible'}); //Show delete icon on hover
	},function() {
		$(this).find("a.delete").css({'visibility': 'hidden'}); //Hide delete icon on hover out
	});

});


function showSetMenue(){
	if(document.getElementById('settingmenue').style.display=="block"){
		document.getElementById('settingmenue').style.display="none";
		not = 0;
	}
	else {
		document.getElementById('settingmenue').style.display="block";
	}
}

function changeChatState(state){
	showSetMenue(); //hide chat settings menue
	if(state==0){ //offline
		document.getElementById('chatMainFrLi').innerHTML = 'Appear Offline';
		var $j = jQuery;
		var results = $j.ajax({
			type: "POST",
			url: "chatOne2One/aquery.php",
			data: "chnagestatus=czxic87a89dasdadsualsdua9ds8a09d&st="+state+"&session=cty75z767ao687a6datd87ad",
			async: false
		}).responseText.split("|");
			document.getElementById('apearOFF').checked=false;
			document.getElementById('apearON').checked=true;
	}
	else if (state==1){ //online
		var $j = jQuery;
		var results = $j.ajax({
			type: "POST",
			url: "chatOne2One/aquery.php",
			data: "chnagestatus=czxic87a89dasdadsualsdua9ds8a09d&st=1&session=cty75z767ao687a6datd87ad",
			async: false
		}).responseText.split("|");
		document.getElementById('chatMainFrLi').innerHTML = 'Chat Online ('+results[0]+')';
			document.getElementById('apearON').checked=false;
			document.getElementById('apearOFF').checked=true;

	}
}

*/
