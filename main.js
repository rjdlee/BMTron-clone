/*

Main rendering and game instantiation

*/

function gameStart()
{
	window.setTimeout(function() { 
		isActive = true;
		render();
	}, 300);

	screenGame.style.width = "";
	screenGame.style.backgroundColor = "";
	viewMenu(false);
}

function gamePause()
{
	isActive = false;

	screenGame.style.width = (screenWidth - 190) + "px";
	screenGame.style.backgroundColor = "#3FB873";
	viewMenu(true);
}

function gameReset()
{
	for(var i = 0; i < cycles.length; i++)
	{
		cycles[i].reset();
	}

	cycles = [];
	playersActive = players;

	setCycles();
	gamePause();
}

// Main rendering and collision detection process
function render()
{
	// Iterate through all cycles and animate them
	for(var i = 0; i < cycles.length; i++)
	{
		if(cycles[i].isActive == true)
		{
			// cycle.draw returns false when a player collides with something
			if(!cycles[i].draw())
			{
				cycles[i].isActive = false;
				playersActive--;

				if(playersActive < 2)
				{
					for(var j = 0; j < cycles.length; j++)
					{
						if(cycles[j].isActive == true)
						{
							viewMessage("Player " + (cycles[j].idNum + 1) + " is the winner!", 5000);
						}
						cycles[j].reset();
					}

					gameReset();
					return;
				}
			}
		}
	}

	// Limit to frameRate(found in global.js) for efficiency
	if(isActive == true)
	{
		setTimeout( function()
		{
			requestAnimationFrame(render);
		}, frameRate);
	}
}

// Main initialization process
(function()
{
	initGlobal();
	initInput();
	initMenu();
})();