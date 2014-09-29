/*

Manages menu output, sets the number of players and frame rate

*/

var isEdit = false;
	editControl = null,
	editCycleID = 0,
	editKeyID = 0;

function menuAddListeners()
{
	$id("numPlayers").addEventListener("mousemove", function() { viewCycles(this.value); }, false);
	$id("numPlayers").addEventListener("click", function() { viewCycles(this.value); }, false);

	$id("frameRate").addEventListener("mousemove", function() { viewFrameRate(this.value); }, false);
	$id("frameRate").addEventListener("click", function() { viewFrameRate(this.value); }, false);
}

function initMenu()
{
	viewCycles($id("numPlayers").value);
	viewFrameRate($id("frameRate").value);

	menuAddListeners();
}

// Show or hide the side menu
function viewMenu(visible)
{
	if(visible == true)
	{
		screenGame.style.left = "190px";
	} else
	{
		screenGame.style.left = "0";
	}
}

// Sets the display message for delay amount of time
function viewMessage(message, delay)
{
	$id("message").innerHTML = message;
	$id("message").style.opacity = 1;

	var messageTimer = setTimeout(function()
	{
		$id("message").style.opacity = 0;
	}, delay);
}

// Displays and changes the framerate
function viewFrameRate(fRate)
{
	var fRateMilliseconds = 1000 / fRate;

	if(fRateMilliseconds != frameRate)
	{
		$id("viewRate").innerHTML = fRate + " FPS";
		frameRate = fRateMilliseconds;

		// Change the speed of the cycles to match the framerate
		for(var i = 0; i < cycles.length; i++)
		{
			cycles[i].setSpeed(24 / fRate);
		}
	}
}

// Displays and changes the number of players
function viewCycles(numPlayers)
{
	if(numPlayers != players)
	{
		players = numPlayers;
		playersActive = numPlayers;

		gameReset();
		viewControls();
	}
}

// Show each player's keyboard controls in the side menu
function viewControls()
{
	var output = players > 1 ? " Players" : " Player";

	$id("viewPlayers").innerHTML = players + output;
	$id("controlView").innerHTML = "";

	for(var i = 0; i < players; i++)
	{
		var controlDiv = document.createElement("div");
		$id("controlView").appendChild(controlDiv);

		var controlB = document.createElement("b");
		controlB.style.color = cycles[i].colour;
		controlB.innerHTML = "Player " + (i + 1) + " ";
		controlDiv.appendChild(controlB);

		var controlUl = document.createElement("ul");
		if(cycles[i].controls[0] == 38)
		{
			controlUl.style.letterSpacing = "0";
			controlUl.style.fontSize = "10px";
		}
		controlDiv.appendChild(controlUl);

		for(var j = 0; j < cycles[i].controls.length; j++)
		{
			var key = String.fromCharCode(cycles[i].controls[j]).toUpperCase(),
				controlLi = document.createElement("li");

			controlLi.addEventListener("click", function() { setControl(this); }, false);
			controlLi.id = "" + i + j;
			controlLi.setAttribute("data-cycleID", i);
			controlLi.setAttribute("data-keyID", j);

			switch (key)
			{
			case "&":
				controlLi.innerHTML = "Up&nbsp"; break;
			case "%":
				controlLi.innerHTML = "Left&nbsp"; break;
			case "(":
				controlLi.innerHTML = "Down&nbsp"; break;
			case "'":
				controlLi.innerHTML = "Right"; break;
			default:
				controlLi.innerHTML = key;
			}

			controlUl.appendChild(controlLi);
		}
	}
}

// Enable modification of key bindings
function setControl(control)
{
	if(isEdit)
	{
		editControl.style.color = "";
		if(typeof controlTimer != "undefined") clearTimeout(controlTimer);
	}

	editControl = control;
	editCycleID = control.getAttribute("data-CycleID"),
	editKeyID = control.getAttribute("data-keyID");
	
	viewMessage("Enter a new key.", 3000);
	control.style.color = "#3FB873";

	isEdit = true;

	var controlTimer = setTimeout(function()
	{
		control.style.color = "";
		isEdit = false;
	}, 3000);
}