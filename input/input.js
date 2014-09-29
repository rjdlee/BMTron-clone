/*

Captures only keyboard inputs and routes them to either players or the menu

*/

function inputAddListeners()
{

	document.body.addEventListener("keypress", function(e) { keyListener(e);}, false);
}

function initInput()
{

	inputAddListeners();
}

// Route key presses to either players or menu
function keyListener(e)
{
	var evtobj = window.event ? event : e,
		charKey = evtobj.charCode ? evtobj.charCode : evtobj.keyCode;

	// Only listen for movement keys when game is running
	if(isActive == true)
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
		if(isActive == true) {
			gamePause();
		} else {
			gameStart();
		}
		return;
	}

	// Editing key bindings
	if(isEdit == true && charKey > 36)
	{
		cycles[editCycleID].controls[editKeyID] = charKey;
		editControl.innerHTML = String.fromCharCode(charKey).toUpperCase();

		editControl.style.color = "";
		$id("message").style.opacity = 0;

		if(typeof controlTimer != "undefined") clearTimeout(controlTimer);
		isEdit = false;
	}
}