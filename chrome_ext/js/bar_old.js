
$(document).ready(

function(){
$("body").append("

<div id="footpanel">
	<ul id="mainpanel">    	
        <li><a href="http://adamwillia.ms/" class="home">Adam Williams <small>Home</small></a></li>
        <li id="alertpanel">
        	<a href="#" class="alerts">Alerts</a>
            <div style="height: auto;" class="subpanel">
            <h3><span> &#8211; </span>Notifications</h3>
            <ul style="height: auto;">
            	<li class="view"><a href="#">View All</a></li>
            	<li><a href="#" class="delete">X</a><p><a href="#">Antehabeo</a> abico quod duis odio tation luctus eu ad <a href="#">lobortis facilisis</a>.</p></li>
                <li><a href="#" class="delete">X</a><p><a href="#">Et voco </a> Duis vel quis at metuo obruo, turpis quadrum nostrud <a 
href="#">lobortis facilisis</a>.</p></li>
                <li><a href="#" class="delete">X</a><p><a href="#">Tego</a> nulla eum probo metuo nullus indoles os consequat commoveo os<a 
href="#">lobortis facilisis</a>.</p></li>
                <li><a href="#" class="delete">X</a><p><a href="#">Antehabeo</a> abico quod duis odio tation luctus eu ad <a href="#">lobortis facilisis</a>.</p></li>
                <li><a href="#" class="delete">X</a><p><a href="#">Nonummy</a> nulla eum probo metuo nullus indoles os consequat commoveo <a href="#">lobortis
 facilisis</a>.</p></li>
                <li><a href="#" class="delete">X</a><p><a href="#">Tego</a> minim autem aptent et jumentum metuo uxor nibh euismod si <a href="#">lobortis
 facilisis</a>.</p></li>
                <li><a href="#" class="delete">X</a><p><a href="#">Antehabeo</a> abico quod duis odio tation luctus eu ad <a href="#">lobortis facilisis</a>.</p></li>
            </ul>
            </div>
        </li>
        <li id="chatpanel">
        	<a href="#" class="chat">
			<div id="chatMainFrLi" >
									 Appear Offline
							</div>
			</a>
            <div style="height: 515px;" class="subpanel">
            <h3><span> &#8211; </span>Friends Online</h3>

            <ul style="height: 490px;">
			<li>
				<div class="chatsettings">
				<table class="barsetingtable" align="right"><tr>
					<td align="center" width="18"><div onclick="showSetMenue();"><img src="images/setting.jpg" border="0" height="13"/></div></td>
					<td width="60" align="center"><div onclick="showSetMenue();">Settings</div></td>
				</tr></table>
				</div>
				<div class="settingmenue" id="settingmenue">
					<table>
						<tr><td height="20"><input type="radio" id="apearON" name="apearStatus" checked='checked' onclick="changeChatState(0)"/>
						</td><td><div onclick="changeChatState(0)" class="cursorOver">Appear Offline</div></td></tr>
						<tr><td  height="20"><input type="radio" id="apearOFF" name="apearStatus"  onclick="changeChatState(1)"/>
						</td><td><div onclick="changeChatState(1)" class="cursorOver">Appear Online</div></td></tr>
					</table>
				</div>
			</li>
            	<li><span>Family Members</span></li>
									<!--
                <li><a href="#"><img src="userimages/chat_thumb.gif" alt=""> Your Friend</a></li>
                <li><span>Other Friends</span></li>
                <li><a href="#"><img src="userimages/chat_thumb.gif" alt=""> Your Friend</a></li>
				-->
            </ul>
            </div>
        </li>
        
        
	</ul>
</div>

");

}

function(){


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
