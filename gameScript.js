// JavaScript Document
function setScreen(){
	var screenMidWidth = Math.round(window.innerWidth / 2);
	var screenMidHeight = Math.round(window.innerHeight / 2);
	
	var path = document.createElement("boxLead");
	path.className = "followBox";
	path.name = "player1";
	path.setAttribute("style","left: " + screenMidWidth + "px; top: " + screenMidHeight + "px;");
	
	var element = document.getElementById('divBound');
	element.setAttribute("style", "width: " + window.innerWidth + "px; height: " + window.innerHeight + "px;");
	element.appendChild(path);
	
	document.getElementById('touchstart').addEventListener('touchstart', hello, false);
    document.getElementById('touchend').addEventListener('touchend', bye, false);
}

var drawing = false;
var trailCount = 0;
var drawLines = new Array(0, -10);
var prevDrawLines = new Array(0, 0);

function drawPath(){
	drawing = true;
	var headOne = document.getElementsByClassName("followBox").item(0);
	
	var clock = setInterval(function(){	
		if(drawing == false){
			clearInterval(clock);
			return;
		}
		
		if(drawLines[0] == prevDrawLines[0] && drawLines[1] == prevDrawLines[1]){
			var trail = document.getElementsByClassName("followBox").item(trailCount);
			if(drawLines[0] < 0){
				trail.setAttribute("style","left: " + (trail.offsetLeft + drawLines[0]) + "px; top: " + (trail.offsetTop) + "px;" +
				"width: " + (trail.offsetWidth - drawLines[0]) + "px; height: " + (trail.offsetHeight + drawLines[1]) + "px;");
			} else if(drawLines[1] < 0){
				trail.setAttribute("style","left: " + (trail.offsetLeft) + "px; top: " + (trail.offsetTop + drawLines[1]) + "px;" +
				"width: " + (trail.offsetWidth + drawLines[0]) + "px; height: " + (trail.offsetHeight - drawLines[1]) + "px;");
			} else {
				trail.setAttribute("style","left: " + (trail.offsetLeft) + "px; top: " + (trail.offsetTop) + "px;" +
				"width: " + (trail.offsetWidth + drawLines[0]) + "px; height: " + (trail.offsetHeight + drawLines[1]) + "px;");
			}
		} else {
			
			var trail = document.createElement("box" + trailCount);
			trail.className = "followBox";
			trail.setAttribute("style","left: " + headOne.offsetLeft + "px; top: " + headOne.offsetTop + "px; width: 10px; height: 10px;");

			document.getElementById('divBound').appendChild(trail);
			trailCount++;
		}
		
		prevDrawLines[0] = drawLines[0];
		prevDrawLines[1] = drawLines[1];
		headOne.setAttribute("style", "left: " + (headOne.offsetLeft + drawLines[0]) + "px; top: " + (headOne.offsetTop + drawLines[1]) + "px;");
		collisionTrail(headOne);
	}, 50);
}

function collisionTrail(headOne){
	var followBoxes = document.getElementsByClassName("followBox");
	for(var i = 1; i < followBoxes.length; i++){
		if(headOne.offsetLeft + 5 >= followBoxes[i].offsetLeft && headOne.offsetLeft + 5 <= followBoxes[i].offsetLeft + followBoxes[i].offsetWidth &&
			headOne.offsetTop + 5 >= followBoxes[i].offsetTop && headOne.offsetTop + 5 <= followBoxes[i].offsetTop + followBoxes[i].offsetHeight ||
			headOne.offsetLeft <= 0 || headOne.offsetTop <= 0 || headOne.offsetLeft >= document.getElementById('divBound').offsetWidth || 
			headOne.offsetTop >= document.getElementById('divBound').offsetHeight){
				drawing = false;
				resetTrails();
				return;
		}
	}
	return;
}

function resetTrails(){
	var screenMidWidth = Math.round(window.innerWidth / 2);
	var screenMidHeight = Math.round(window.innerHeight / 2);
	var followBoxes = document.getElementsByClassName("followBox");
	
	for(var y = followBoxes.length - 1; y > 0; y--){
		document.getElementById('divBound').removeChild(followBoxes[y]);
	}
			
	followBoxes[0].setAttribute("style","left: " + screenMidWidth + "px; top: " + screenMidHeight + "px;");
	trailCount = 0;
	drawLines = new Array(0, -10);
	prevDrawLines = new Array(0, 0);	
}

function keyListener(e){
	var evtobj = window.event? event : e //distinguish between IE's explicit event object (window.event) and Firefox's implicit.
	var unicode = evtobj.charCode? evtobj.charCode : evtobj.keyCode;
	var actualkey= String.fromCharCode(unicode);
	if (actualkey == "w" && drawing == true){
		drawLines[0] = 0;
		drawLines[1] = -10;
	} else if (actualkey == "d" && drawing == true){
		drawLines[0] = 10;
		drawLines[1] = 0;
	} else if (actualkey == "s" && drawing == true){
		drawLines[0] = 0;
		drawLines[1] = 10;
	} else if (actualkey == "a" && drawing == true){
		drawLines[0] = -10;
		drawLines[1] = 0;
	} else if (actualkey == "b"){
		if(drawing == true){
			drawing = false;
			resetTrails();
		} else {
			drawPath();
		}
	}
}