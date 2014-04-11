/*
	Used for testing.
	Needs Improvement in performence and readability.
	KeyMap: 
		17: "CTRL", 
		16: "SHIFT", 
		27: "ESCAPE"
*/
var isNS = (navigator.appName == "Netscape") ? 1 : 0;

if(navigator.appName == "Netscape"){
	document.captureEvents(Event.MOUSEDOWN||Event.MOUSEUP);
} 

function mischandler(){
	console.log("Right Click happened");
	return false;
}

function mousehandler(e){
	var myevent = (isNS) ? e : event;
	var eventbutton = (isNS) ? myevent.which : myevent.button;
	if((eventbutton==2)||(eventbutton==3)) {
		return false;
	}
}
function checkSpecialCase(el){
	if(!isCtrl && !isShift){
		console.log("no ctrl or shift disselecting all");
		disSelectAll();
	}
	if(isShift && lastSelected){
		var diffc = eval(lastSelected.dataset.attr) - eval(el.dataset.attr);
		diffc > 0 ? selectContinuous(el, lastSelected, diffc) : selectContinuous(lastSelected, el, -diffc);
	}
	
}
function selectAll(){
	$(".drop").addClass("dropped")
	$(".dropped").children("input").attr("checked", "checked");
}
function disSelectAll(){
	$(".dropped").children("input").removeAttr("checked");
	$("*").removeClass("dropped");
}
function selectThis(el, noCheck){
	console.log("selectThis: ", el);

	if(!noCheck){
		checkSpecialCase(el);
	}
	$(el).addClass("dropped");
	$(".dropped").children("input").attr("checked", "checked");
	lastSelected = el;

}
function selectContinuous(fr, to, diffc){
	var thisEl;
	console.log(diffc," = ",  fr.dataset.attr, to.dataset.attr);
	for(var i = eval(fr.dataset.attr); i<=eval(to.dataset.attr); i++){
		console.log(i);
		thisEl = $("div.drop[data-attr="+i+"]");
		selectThis(thisEl, true);
	}
	console.log("lastSelected", lastSelected);

}

document.onkeyup=function(e){
	console.log(e.which)
	if(e.which == 17){
		$(".flash_msg").hide();
		isCtrl=false;
	}
	if(e.which == 16){
		$(".flash_msg").hide();
		isShift = false;
	}
	if(e.which == 27){
		console.log("pressed ESCAPE disselecting all");
		disSelectAll();
	}
}

document.onkeydown=function(e){
	if(e.which == 17){
		$(".flash_msg").text("CTRL Pressed")
		$(".flash_msg").show();
		isCtrl = true;
	}
	if(e.which == 16){
		$(".flash_msg").text("Shift Pressed")
		$(".flash_msg").show();
		console.log("shift turned on")
		isShift = true;
	}
	// FOR CTRL + A
	if(isCtrl && ((e.which == 85) || (e.which == 117) || (e.which == 65) || (e.which == 97) || (e.which == 67) || (e.which == 99))){
	    selectAll();
			return false;
	}
}
document.oncontextmenu = mischandler;
document.onmousedown = mousehandler;
document.onmouseup = mousehandler;
var isCtrl = false;
var isShift = false;
var lastSelected = undefined;