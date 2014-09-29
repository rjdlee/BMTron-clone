/*

Manages all the cycles

*/

var cycles = [];

// Create player cycles and sets their position (in a square or triangle)
function setCycles()
{
	setCyclesPos();
	setCyclesAttributes();
}

// Sets the cycles' starting positions and colours
function setCyclesPos()
{
	var numPlayers = players,
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

			cycles.push(new Cycle(i, x * spaceX, y * spaceY, playersColour[i]));
			i++;
		}

		numPlayers -= lenX;
	}
}

// Sets player controls and speed
function setCyclesAttributes()
{
	var keyLen = players / 2;

	for(var i = 0; i < Math.ceil(keyLen); i++)
	{
		cycles[i].controls = playersControl[i];
		cycles[i].setSpeed(frameRate * (24 / 1000));
	}
	for(var i = 1; i <= Math.floor(keyLen); i++)
	{
		cycles[cycles.length - i].controls = playersControl[playersControl.length - i];
		cycles[cycles.length - i].setSpeed(frameRate * (24 / 1000));
	}
}