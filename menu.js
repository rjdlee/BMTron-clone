// User interface and menu handler

function menuAddListeners() {
	var numPlayers = $("numPlayers"),
		fRate = $("frameRate");

	numPlayers.addEventListener("mousemove", function() { setPlayerNum(this.value); }, false);
	numPlayers.addEventListener("click", function() { setPlayerNum(this.value); }, false);
	fRate.addEventListener("mousemove", function() { setFrameRate(this.value); }, false);
	fRate.addEventListener("click", function() { setFrameRate(this.value); }, false);
}

// Sets the message to the winner message
function setWinner(num) {
	screenMsg.innerHTML = "Player " + num + " is the winner!";
}

// Show or hide the side menu
function toggleMenu(visible) {
	if(visible != null) {
		if(visible == true) {
			screenGame.style.left = "190px";
		} else {
			screenGame.style.left = "0";
		}
	} else {
		if(screenGame.style.visibility == "hidden") {
			screenGame.style.left = "190px";
		} else {
			screenGame.style.left = "0";
		}
	}
}

// Show each player's keyboard controls in the side menu
function displayControls() {
	var data = "";
	for(var i = 0; i < playerNum; i++) {
		data += "<p><b style='color: " + cycles[i].colour + "'>Player " + (i + 1) + "</b> ";
		if(i == 3) {
			data += "<bdi style='letter-spacing: 0px; font-size: 10px'>";
		} else {
			data += "<bdi>";
		}

		for(var j = 0; j < playerControls[i].length; j++) {
			var key = String.fromCharCode(playerControls[i][j]).toUpperCase();
			switch (key) {
			case "&":
				data += "Up "; break;
			case "%":
				data += "Left "; break;
			case "(":
				data += "Right "; break;
			case "'":
				data += "Down"; break;
			default:
				data += key
			}
		}
		data += "</bdi></p>"
	}

	$("controlView").innerHTML = data;
}