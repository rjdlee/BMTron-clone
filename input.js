// Capture user keyboard inputs

function inputAddListeners()
{
	document.body.addEventListener("keypress", function(e) {
		keyListener(e);
		return false;
	}, false);
}

// Starts a new game
function gameStart() {
	window.setTimeout(function() { 
		active = true;
		render();
	}, 300);
	screenGame.style.width = "";
	screenGame.style.backgroundColor = "";
	toggleMenu(false);
}

// Pauses a game
function gamePause() {
	active = false;
	screenGame.style.width = (screenWidth - 190) + "px";
	screenGame.style.backgroundColor = "#3FB873";
	toggleMenu(true);
}

// Resets a game
function gameReset() {
	active = false;
	for(var i = 0; i < cycles.length; i++) {
		cycles[i].reset();
	}

	cycles = [];
	setPlayers();
	bindKeys();
	screenGame.style.width = (screenWidth - 190) + "px";
	screenGame.style.backgroundColor = "#3FB873";
	toggleMenu(true);
}

// Bind key controls and color to each cycle
function bindKeys()
{
	for(var i = 0; i < cycles.length; i++) {
		cycles[i].controls = playerControls[i];
		cycles[i].colour = playerColours[i];
	}
}

// Listen for key presses for players
function keyListener(e)
{
	var evtobj = window.event ? event : e,
		charKey = evtobj.charCode ? evtobj.charCode : evtobj.keyCode;

	// Only listen for movement keys when game is running
	if(active == true)
	{
		for(var i = 0; i < cycles.length; i++) {
			if (charKey == cycles[i].controls[0]) { 		// Up
				cycles[i].translateUp();
			} else if (charKey == cycles[i].controls[2]) {	// Down
				cycles[i].translateDown();
			} else if (charKey == cycles[i].controls[1]) {	// Left
				cycles[i].translateLeft();
			} else if (charKey == cycles[i].controls[3]) {	// Right
				cycles[i].translateRight();
			}
		}
	}

	// Activate the menu if game is paused
	if (charKey == 112 || charKey == 32)
	{
		if(active == true) {
			gamePause();
		} else {
			gameStart();
		}
	}
}