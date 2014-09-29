/*

Variables required by every other file.
General methods.

*/

var screenGame = $id('gameFrame'),
	screenWidth = screenGame.offsetWidth,
	screenHeight = screenGame.offsetHeight,

	// 24 FPS
	frameRate = 1000 / 24,

	players = -1,
	playersActive = -1,
	playersControl = [
		["w", "a", "s", "d"], 
		["t", "f", "g", "h"], 
		["i", "j", "k", "l"], 
		["!=", 38, 37, 40, 39]
	], // != -> charcode
	playersColour = [
		"#D1E7F9", 
		"#FBFCD0", 
		"#EABEB7", 
		"#FFFEC6"
	],
	isActive = false;	// Game playing

function initGlobal()
{
	window.requestAnimationFrame = 	window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.oRequestAnimationFrame;

	// Convert the keys to char codes, != indicates a character already in char code
	for(var i = 0; i < playersControl.length; i++)
	{
		if(playersControl[i][0] == "!=")
		{
			playersControl[i] = playersControl[i].slice(1);
		} else
		{
			for(var j = 0; j < playersControl[i].length; j++)
			{
				playersControl[i][j] = playersControl[i][j].charCodeAt(0);
			}
		}
	}
}

// Alias for getElementById
function $id(elementID)
{

	return document.getElementById(elementID);
}

// Alias for getElementsByClassName
function $class(name)
{

	return Array.prototype.slice.call(document.getElementsByClassName(name));
}