// Contains global variables and methods accessible by all other files

var screenGame = $('gameFrame'),
	screenMsg = $('message'),
	screenWidth = screenGame.offsetWidth,
	screenHeight = screenGame.offsetHeight,

	frameRate = 1000 / 24, // 24 FPS
	playerNum = 1; // Number of players in the game
	playerControls = [["w", "a", "s", "d"], ["t", "f", "g", "h"], ["i", "j", "k", "l"], ["!=", 38, 37, 40, 39]], //!= indicates the charcode
	playerColours = ["#D1E7F9", "#FBFCD0", "#EABEB7", "#FFFEC6"],

	cycles = [],
	ready = 0; // Keep track of players who indicated they are ready
	active = false; // Game is running or not

// Alias for getElementById
function $(elementID) {
	return document.getElementById(elementID);
}

function setFrameRate(fRate) {
	if(1000 / fRate != frameRate) {
		$("viewRate").innerHTML = fRate + " FPS";
		frameRate = 1000 / fRate;

		// Change the speed of the cycles to match the frame rate
		for(var i = 0; i < cycles.length; i++)
		{
			cycles[i].setSpeed(24 / fRate);
		}
	}
}

function setPlayerNum(nPlayers) {
	if(nPlayers != playerNum) {
		var output = nPlayers > 1 ? " Players" : " Player";

		$("viewPlayers").innerHTML = nPlayers + output;
		playerNum = nPlayers;
		gameReset();
		displayControls();
	}
}

// Convert the keys to char codes
// != indicates a character already in char code
(function()
{
	for(var i = 0; i < playerControls.length; i++)
	{
		if(playerControls[i][0] == "!=")
		{
			playerControls[i] = playerControls[i].slice(1);
		} else
		{
			for(var j = 0; j < playerControls[i].length; j++)
			{
				playerControls[i][j] = playerControls[i][j].charCodeAt(0);
			}
		}
	}

})();