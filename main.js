// Main rendering and game clock

function render() {
	// Iterate through all cycles and animate them
	for(var i = 0; i < cycles.length; i++)
	{
		// cycle.draw returns false when a player collides with something
		if(!cycles[i].draw())
		{
			// Reset the game if there is only 1 player left
			if(cycles.length <= 2)
			{
				cycles.splice(i, i + 1);

				// If is needed if there is only one player since they have already been spliced out
				if(cycles[0] != null)
				{
					cycles[0].reset();
					setWinner(cycles[0].idNum + 1);
				}

				gameReset();
				return;
			} else
			{
				cycles.splice(i, 1);
			}
		}
	}

	// Limit to frameRate(found in global.js) for efficiency
	if(active == true) {
		setTimeout( function() {
			requestAnimationFrame(render);
		}, frameRate);
	}

}

// Create player cycles and set their position
// The algorithm attempts to place all players in a square or equilateral triangle
function setPlayers()
{
	var numPlayers = playerNum,
		lenX = Math.ceil(Math.sqrt(numPlayers)), // Finds side length
		lenY = Math.ceil(numPlayers / lenX), 
		spaceX 	= screenWidth / (lenX + 1),
		spaceY 	= screenHeight / (lenY + 1),
		i = 0;

	for(var y = 1; y <= lenY; y++)
	{
		// Determine if this is a full row or not
		lenX = numPlayers >= lenX ? lenX : numPlayers; 

		for(var x = 1; x <= lenX; x++)
		{
			// Determine side offset based on number of cycles in this row
			spaceX = screenWidth / (lenX + 1);
			cycles.push(new Cycle(i, x * spaceX, y * spaceY));
			i++;
		}

		numPlayers -= lenX;
	}

	// Set the players speed in relation to frameRate
	for(var i = 0; i < cycles.length; i++)
	{
		cycles[i].setSpeed(frameRate * (24 / 1000));
	}
}

// Convert getElementsByClassName to an array
function classToArray(name)
{
	return Array.prototype.slice.call(document.getElementsByClassName(name));
}

// Initialization
(function()
{
	inputAddListeners();
	menuAddListeners();
	setPlayers();
	bindKeys();
})();