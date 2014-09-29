/*

Individual line segment of a cycle's path

*/

var Node = function(className, x, y, width, height, colour, head)
{
	this.pos = {
		x : x,
		y : y
	}
	this.len = {
		width: width,
		height: height
	}

	this.classN = className;
	this.colour = (typeof head != "undefined") ? this.headRgb(colour) : colour;

	this.head = (typeof head != "undefined") ? true : false;
	this.obj; 

	this.new();
}

// Create a new line segment
Node.prototype.new = function()
{
	this.obj = document.createElement("div");
	this.obj.className = this.classN;
	this.transform(this.pos.x, this.pos.y, this.len.width, this.len.height, this.colour);

	screenGame.appendChild(this.obj);
}

// Transform (size and position) an individual element of the cycle tail
Node.prototype.transform = function(x, y, width, height, colour)
{
	// Visual changes
	this.obj.style.left = x + "px";
	this.obj.style.top = y + "px";
	this.obj.style.width = width + "px";
	this.obj.style.height = height + "px";
	if(typeof colour != "undefined" || colour != null) this.obj.style.backgroundColor = colour;

	// Attribute changes
	this.pos = {
		x : x,
		y: y
	}
	this.len = {
		width: width,
		height: height
	}
	this.colour = colour;
}

// Modifies the colour of the head node
Node.prototype.headRgb = function(colour)
{
	var rgb = this.hexToRgb(colour),
		factor = 20;

	return "rgb(" + (rgb.r + factor) + ", " + (rgb.g + factor) + ", " + (rgb.b + factor) + ")";
}

// Converts hexcode colour to rgb
Node.prototype.hexToRgb = function(hex)
{
    var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

    return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
    } : null;
}