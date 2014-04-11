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
function selectAll(){
	$(".drop").addClass("dropped")
	$(".dropped").children("input").attr("checked", "checked");
}
function disSelectAll(){
	$(".dropped").children("input").removeAttr("checked");
	$("*").removeClass("dropped");
}
function selectThis(el){
	if(!isCtrl){
		console.log("no ctrl disselecting all");
		disSelectAll();
	}
	$(el).toggleClass("dropped");
	$(".dropped").children("input").attr("checked", "checked");
}

function disSelectThis(el){
	$(el).toggleClass("dropped");
	$(".dropped").children("input").attr("checked", "checked");
}

function selectContinuous(fr, to){
}

document.onkeyup=function(e){
	console.log(e.which)
	if(e.which == 17){
		isCtrl=false;
	}
	if(e.which == 27){
		console.log("pressed ESCAPE disselecting all");
		disSelectAll();
	}
}

document.onkeydown=function(e){
	if(e.which == 17){
		isCtrl=true;
	}
	if(((e.which == 85) || (e.which == 117) || (e.which == 65) || (e.which == 97) || (e.which == 67) || (e.which == 99)) && isCtrl == true){
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